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

export const compareBankToNBEExchangeRates = async (
  currencyCode: string,
  bank: string
) => {
  try {
    console.log(`Comparing rates for currency: ${currencyCode}, bank: ${bank}`);

    await connectToDatabase();

    // Fetch bank rates
    const BankModel = getExchangeRateModel(bank);
    const latestBankRate = await BankModel.findOne()
      .sort({ timestamp: -1 })
      .limit(1);

    // Fetch NBE rates
    const NBEModel = getExchangeRateModel("nbe_exchange_rates");
    const latestNBERate = await NBEModel.findOne()
      .sort({ timestamp: -1 })
      .limit(1);

    if (!latestBankRate || !latestNBERate) {
      console.error("No bank rates or NBE rates returned");
      return null;
    }

    const bankRate = latestBankRate.exchange_rates.find(
      (rate: any) =>
        rate.currency_code.toLowerCase() === currencyCode.toLowerCase()
    );
    const nbeRate = latestNBERate.exchange_rates.find(
      (rate: any) =>
        rate.currency_code.toLowerCase() === currencyCode.toLowerCase()
    );

    if (!bankRate || !nbeRate) {
      console.error(
        `Bank rate or NBE rate not found for ${bank} and ${currencyCode}`
      );
      return null;
    }

    console.log("Bank rate:", bankRate);
    console.log("NBE rate:", nbeRate);

    const calculateDifference = (bankValue: number, nbeValue: number) => {
      const diff = bankValue - nbeValue;
      const percentDiff = ((diff / nbeValue) * 100).toFixed(2);
      console.log(
        `Difference calculation: ${bankValue} - ${nbeValue} = ${diff}`
      );
      console.log(`Percentage difference: ${percentDiff}%`);
      return {
        difference: diff.toFixed(4),
        percentageDifference: `${percentDiff}%`,
      };
    };

    const result = {
      bankRate: {
        name: bank,
        rate: {
          cash_buying: parseFloat(bankRate.cash_buying),
          cash_selling: parseFloat(bankRate.cash_selling),
        },
      },
      nbeRate: {
        name: "NBE",
        rate: {
          cash_buying: parseFloat(nbeRate.cash_buying),
          cash_selling: parseFloat(nbeRate.cash_selling),
        },
      },
      buyingComparison: calculateDifference(
        parseFloat(bankRate.cash_buying),
        parseFloat(nbeRate.cash_buying)
      ),
      sellingComparison: calculateDifference(
        parseFloat(bankRate.cash_selling),
        parseFloat(nbeRate.cash_selling)
      ),
    };

    console.log("Comparison result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error in compareBankToNBEExchangeRates:", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    throw error;
  }
};
