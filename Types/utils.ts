export type ExchangeRate = {
  currency_code: string;
  cash_buying: number;
  cash_selling: number;
};

export type BankRates = {
  [currencyCode: string]: ExchangeRate;
};

export type BankExchangeRate = {
  bank: string;
  timestamp?: string; // Make timestamp optional to handle undefined values
  rates?: BankRates; // Make rates optional to handle undefined values
};

export type LatestExchangeProp = BankExchangeRate[];

interface Currency {
  currency_code: string;
  cash_buying: number;
  cash_selling: number;
}

export interface SearchParams {
  bank: string;
  timestamp: Date;
  rates: Record<string, Currency>;
}

export type ExchangeAmount = {
  currency_code: string;
  cash_buying: number;
  cash_selling: number;
};

export type BankAmount = {
  [currencyCode: string]: ExchangeAmount;
};

export type BankExchangeAmount = {
  bank: string;
  timestamp?: string; // Make timestamp optional to handle undefined values
  rates: BankAmount; // Make rates optional to handle undefined values
};

export type LatestAmountProp = BankExchangeAmount[];

export type ExchangeRateComparison = {
  bankRate: {
    name: string;
    rate: {
      cash_buying: number;
      cash_selling: number;
    };
  };
  nbeRate: {
    name: string;
    rate: {
      cash_buying: number;
      cash_selling: number;
    };
  };
  buyingComparison: {
    difference: string;
    percentageDifference: string;
  };
  sellingComparison: {
    difference: string;
    percentageDifference: string;
  };
} | null;
