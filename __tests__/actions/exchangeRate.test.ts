import { getLatestBankRates } from "../../lib/database/actions/exchangeRate.actions";
import { connectToDatabase } from "../../lib/database/index";
import getExchangeRateModel from "../../lib/database/models/exchange_rate";

jest.mock("../../lib/database/index", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("../../lib/database/models/exchange_rate");

describe("getLatestBankRates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the latest rates for a specific currency and bank", async () => {
    const mockFindOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({
        timestamp: new Date("2023-04-01"),
        exchange_rates: [
          { currency_code: "USD", cash_buying: "50", cash_selling: "51" },
        ],
      }),
    });

    (getExchangeRateModel as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
    });

    const rates = await getLatestBankRates("USD", "cbe_rates", true);

    expect(connectToDatabase).toHaveBeenCalledTimes(1);
    expect(getExchangeRateModel).toHaveBeenCalledWith("cbe_rates");
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(rates).toEqual([
      {
        bank: "cbe_rates",
        timestamp: expect.any(Date),
        rates: {
          USD: {
            cash_buying: 50,
            cash_selling: 51,
          },
        },
      },
    ]);
  });

  it("should fetch the latest rates for all banks when no bank is specified", async () => {
    const mockFindOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({
        timestamp: new Date("2023-04-01"),
        exchange_rates: [
          { currency_code: "USD", cash_buying: "50", cash_selling: "51" },
        ],
      }),
    });

    (getExchangeRateModel as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
    });

    const rates = await getLatestBankRates("USD", undefined, true);

    expect(connectToDatabase).toHaveBeenCalledTimes(1);
    expect(getExchangeRateModel).toHaveBeenCalledTimes(10); // Assuming 10 banks in bankCollections
    expect(mockFindOne).toHaveBeenCalledTimes(10);

    expect(rates).toHaveLength(10);
    expect(rates[0]).toEqual({
      bank: expect.any(String),
      timestamp: expect.any(Date),
      rates: {
        USD: {
          cash_buying: 50,
          cash_selling: 51,
        },
      },
    });
  });

  it("should handle cases where no rates are found", async () => {
    const mockFindOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(null),
    });

    (getExchangeRateModel as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
    });

    const rates = await getLatestBankRates("USD", "cbe_rates", true);

    expect(connectToDatabase).toHaveBeenCalledTimes(1);
    expect(getExchangeRateModel).toHaveBeenCalledWith("cbe_rates");
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(rates).toEqual([
      {
        bank: "cbe_rates",
        latestExchangeRate: null,
      },
    ]);
  });
});
