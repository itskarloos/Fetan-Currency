import mongoose, { Schema, Document } from "mongoose";

interface ExchangeRate {
  currency_code: string;
  cash_buying: string;
  cash_selling: string;
}

export interface IExchangeRate extends Document {
  timestamp: string;
  exchange_rates: ExchangeRate[];
}

// Schema for exchange rates
const ExchangeRateSchema = new Schema<ExchangeRate>({
  currency_code: { type: String, required: true },
  cash_buying: { type: String, required: true },
  cash_selling: { type: String, required: true },
});

// Schema for the main document
const ExchangeSchema = new Schema<IExchangeRate>({
  timestamp: { type: String, required: true },
  exchange_rates: { type: [ExchangeRateSchema], required: true },
});

// Function to get a model for a specific collection
const getExchangeRateModel = (collectionName: string) => {
  return (
    mongoose.models[collectionName] ||
    mongoose.model<IExchangeRate>(
      collectionName,
      ExchangeSchema,
      collectionName
    )
  );
};

export default getExchangeRateModel;
