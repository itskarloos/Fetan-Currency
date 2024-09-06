import getExchangeRateModel from "../models/exchange_rate"; // Path to your generic model
import { connectToDatabase } from "../index";

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

export const getLatestBankRates = async (currencyCode?: string) => {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    const latestRates = await Promise.all(
      bankCollections.map(async (bank) => {
        const BankModel = getExchangeRateModel(bank);
        const latestRate = await BankModel.findOne()
          .sort({ timestamp: -1 })
          .limit(1);

        if (!latestRate) {
          return { bank, latestExchangeRate: null };
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
          bank,
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
