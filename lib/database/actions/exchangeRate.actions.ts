"use server";
import getExchangeRateModel from "../models/exchange_rate"; // Path to your generic model
import { connectToDatabase } from "../index";
import { createClient } from "redis";
import { promisify } from "util";

// List of bank collections
const bankCollections = [
  "amhara_bank_rates",
  "awash_bank_rates",
  "bank_of_abyssinia_rates",
  "cbe_rates",
  "dashen_bank_rates",
  "nbe_exchange_rates",
  "wegagen_bank_rates",
  "zemen_bank_rates",
  "coop_bank_rates",
  "oromia_bank_rates",
];

// Redis client setup
const redisClient = createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Cache expiration time (e.g., 5 minutes)
const CACHE_EXPIRATION = 5 * 60; // in seconds

// Function to get the NBE exchange rates without sorting
export const getNBEExchangeRates = async (currencyCode?: string) => {
  try {
    await connectToDatabase();

    const NBEModel = getExchangeRateModel("nbe_exchange_rates");

    const nbeExchangeRate = await NBEModel.findOne()
      .sort({ timestamp: -1 })
      .limit(1);

    if (!nbeExchangeRate) {
      return {
        bank: "nbe_exchange_rates",
        latestExchangeRate: null,
      };
    }

    const formattedRates = nbeExchangeRate.exchange_rates.reduce(
      (
        acc: Record<string, { cash_buying: number; cash_selling: number }>,
        rate: {
          currency_code: string;
          cash_buying: string;
          cash_selling: string;
        }
      ) => {
        if (
          !currencyCode ||
          rate.currency_code.toLowerCase() === currencyCode.toLowerCase()
        ) {
          acc[rate.currency_code] = {
            cash_buying: parseFloat(rate.cash_buying),
            cash_selling: parseFloat(rate.cash_selling),
          };
        }
        return acc;
      },
      {}
    );

    return {
      bank: "nbe_exchange_rates",
      timestamp: nbeExchangeRate.timestamp,
      rates: formattedRates,
    };
  } catch (error) {
    console.error("Error fetching latest NBE exchange rates:", error);
    throw new Error("Failed to fetch latest NBE exchange rates");
  }
};

export const getLatestBankRates = async (
  currencyCode?: string,
  bank?: string,
  bypassCache: boolean = false
) => {
  try {
    await connectToDatabase();

    let banksToQuery = bank ? [bank] : bankCollections;
    const cacheKey = `${currencyCode || "all"}_${bank || "all"}`;

    // Check if cached data is available and not expired, unless bypassCache is true
    if (!bypassCache) {
      const cachedData = await getAsync(cacheKey);
      if (cachedData) {
        console.log("Returning cached data");
        return JSON.parse(cachedData);
      }
    }

    const latestRates = await Promise.all(
      banksToQuery.map(async (bankName) => {
        const BankModel = getExchangeRateModel(bankName);
        console.log(`Querying ${bankName}...`);
        const latestRate = await BankModel.findOne()
          .sort({ timestamp: -1 })
          .limit(1);

        console.log(`Result for ${bankName}:`, latestRate);

        if (!latestRate) {
          return { bank: bankName, latestExchangeRate: null };
        }

        const formattedRates = latestRate.exchange_rates.reduce(
          (
            acc: Record<string, { cash_buying: number; cash_selling: number }>,
            rate: any
          ) => {
            if (
              !currencyCode ||
              rate.currency_code.toLowerCase() === currencyCode.toLowerCase()
            ) {
              acc[rate.currency_code] = {
                cash_buying: parseFloat(rate.cash_buying),
                cash_selling: parseFloat(rate.cash_selling),
              };
            }
            return acc;
          },
          {}
        );

        return {
          bank: bankName,
          timestamp: latestRate.timestamp,
          rates: formattedRates,
        };
      })
    );

    // Cache the fetched rates in Redis, unless bypassCache is true
    if (!bypassCache) {
      await setAsync(
        cacheKey,
        JSON.stringify(latestRates),
        "EX",
        CACHE_EXPIRATION
      );
    }

    console.log("Fetched rates:", JSON.stringify(latestRates, null, 2));

    return latestRates;
  } catch (error) {
    console.error("Error fetching latest bank rates:", error);
    throw new Error("Failed to fetch latest bank rates");
  }
};

export async function getAllDashenBankRates() {
  try {
    console.log("Fetching all Dashen Bank rates...");
    const DashenBankModel = getExchangeRateModel("awash_bank_rates");

    const allRates = await DashenBankModel.find().sort({ timestamp: -1 });

    if (!allRates || allRates.length === 0) {
      console.log("No rates found for Dashen Bank");
      return [];
    }

    const formattedRates = allRates.map((rate) => ({
      timestamp: rate.timestamp,
      rates: rate.exchange_rates.reduce(
        (
          acc: Record<string, { cash_buying: number; cash_selling: number }>,
          currencyRate: any
        ) => {
          acc[currencyRate.currency_code] = {
            cash_buying: parseFloat(currencyRate.cash_buying),
            cash_selling: parseFloat(currencyRate.cash_selling),
          };
          return acc;
        },
        {}
      ),
    }));

    const result = {
      bank: "dashen Bank",
      exchangeRates: formattedRates,
    };

    console.log(
      `Fetched ${formattedRates.length} rate records for Dashen Bank`
    );
    return result;
  } catch (error) {
    console.error("Error fetching all Dashen Bank rates:", error);
    throw new Error("Failed to fetch all Dashen Bank rates");
  }
}

export async function compareBankToNBEExchangeRates(
  currencyCode: string,
  bankToCompare: string
) {
  try {
    console.log(
      `Comparing rates for currency: ${currencyCode}, bank: ${bankToCompare}`
    );

    // Get NBE exchange rates
    const nbeRates = await getNBEExchangeRates(currencyCode);
    console.log("NBE Rates:", JSON.stringify(nbeRates, null, 2));

    // Get the rates for the bank to compare
    const bankRates = await getLatestBankRates(currencyCode, bankToCompare);
    console.log("Bank Rates:", JSON.stringify(bankRates, null, 2));

    if (!nbeRates.rates || Object.keys(nbeRates.rates).length === 0) {
      console.error("NBE rates not available");
      throw new Error("NBE rates not available for the specified currency");
    }

    if (
      !bankRates[0] ||
      !bankRates[0].rates ||
      Object.keys(bankRates[0].rates).length === 0
    ) {
      console.error(`Rates for ${bankToCompare} not available`);
      throw new Error(
        `Rates for ${bankToCompare} not available for the specified currency`
      );
    }

    const nbeRate = nbeRates.rates[currencyCode];
    const bankRate = bankRates[0].rates[currencyCode];

    console.log("NBE Rate:", nbeRate);
    console.log("Bank Rate:", bankRate);

    const comparison = {
      currencyCode,
      nbe: {
        bank: "National Bank of Ethiopia",
        timestamp: nbeRates.timestamp,
        cashBuying: nbeRate.cash_buying,
        cashSelling: nbeRate.cash_selling,
      },
      comparedBank: {
        bank: bankToCompare,
        timestamp: bankRates[0].timestamp,
        cashBuying: bankRate.cash_buying,
        cashSelling: bankRate.cash_selling,
      },
      difference: {
        cashBuying: bankRate.cash_buying - nbeRate.cash_buying,
        cashSelling: bankRate.cash_selling - nbeRate.cash_selling,
      },
    };

    console.log("Comparison result:", JSON.stringify(comparison, null, 2));

    return comparison;
  } catch (error) {
    console.error("Error comparing bank rates:", error);
    throw new Error("Failed to compare bank rates");
  }
}
