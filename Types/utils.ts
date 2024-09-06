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
