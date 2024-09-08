import getExchangeRateModel from "../models/exchange_rate"; // Path to your generic model
import { connectToDatabase } from "../index";
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

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
];

// Function to get the NBE exchange rates without sorting
export const getNBEExchangeRates = async (
  date?: string,
  currencyCode?: string
) => {
  try {
    await connectToDatabase();

    const NBEModel = getExchangeRateModel("nbe_exchange_rates");

    const query: any = {};
    if (date) {
      query.timestamp = date;
    }

    const nbeExchangeRate = await NBEModel.findOne(query);

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
    console.error("Error fetching NBE exchange rates:", error);
    throw new Error("Failed to fetch NBE exchange rates");
  }
};

export const getLatestBankRates = async (
  currencyCode?: string,
  bank?: string
) => {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    let banksToQuery = bank ? [bank] : bankCollections;

    const latestRates = await Promise.all(
      banksToQuery.map(async (bankName) => {
        const BankModel = getExchangeRateModel(bankName);
        const latestRate = await BankModel.findOne()
          .sort({ timestamp: -1 })
          .limit(1);

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

    return latestRates;
  } catch (error) {
    console.error("Error fetching latest bank rates:", error);
    throw new Error("Failed to fetch latest bank rates");
  }
};

export const getExchangeRateHistory = async (
  currencyCode: string | "USD",
  bank: string | "cbe_rates"
) => {
  if (
    !currencyCode ||
    !bank ||
    currencyCode.trim() === "" ||
    bank.trim() === ""
  ) {
    return null; // Return null if currencyCode or bank is missing or empty
  }

  try {
    await connectToDatabase();

    const BankModel = getExchangeRateModel(bank);
    const NBEModel = getExchangeRateModel("nbe_exchange_rates");

    const bankHistory = await BankModel.find({
      "exchange_rates.currency_code": currencyCode,
    })
      .sort({ timestamp: -1 })
      .limit(5);

    const nbeHistory = await NBEModel.find({
      "exchange_rates.currency_code": currencyCode,
    })
      .sort({ timestamp: -1 })
      .limit(5);

    const formatHistory = (history: any[]) =>
      history
        .map((entry) => ({
          timestamp: entry.timestamp,
          rate: entry.exchange_rates.find(
            (rate: { currency_code: string }) =>
              rate.currency_code === currencyCode
          ),
        }))
        .reverse();

    return {
      bankHistory: formatHistory(bankHistory),
      nbeHistory: formatHistory(nbeHistory),
    };
  } catch (error) {
    console.error("Error fetching exchange rate history:", error);
    throw error;
  }
};

export const getLatestExchangeRates = async (
  currencyCode: string,
  bank: string
) => {
  if (
    !currencyCode ||
    !bank ||
    currencyCode.trim() === "" ||
    bank.trim() === ""
  ) {
    return null;
  }

  const cacheKey = `${currencyCode}-${bank}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  try {
    await connectToDatabase();

    const BankModel = getExchangeRateModel(bank);
    const NBEModel = getExchangeRateModel("nbe_exchange_rates");

    const getLatestRate = async (Model: any) => {
      const latest = await Model.findOne({
        "exchange_rates.currency_code": currencyCode,
      }).sort({ timestamp: -1 });

      return latest
        ? {
            timestamp: latest.timestamp,
            rate: latest.exchange_rates.find(
              (rate: { currency_code: string }) =>
                rate.currency_code === currencyCode
            ),
          }
        : null;
    };

    const [bankLatest, nbeLatest] = await Promise.all([
      getLatestRate(BankModel),
      getLatestRate(NBEModel),
    ]);

    const result = {
      bankLatest,
      nbeLatest,
    };

    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching latest exchange rates:", error);
    throw error;
  }
};
