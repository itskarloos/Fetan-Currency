"use client";

import * as React from "react";
import Select from "./ExchangeCardPopover";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LatestAmountProp, LatestExchangeProp } from "@/Types/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
// Data
const banks = [
  { value: "cbe_rates", label: "Cbe" },
  { value: "amhara_bank_rates", label: "Amhara" },
  { value: "dashen_bank_rates", label: "Dashen" },
  { value: "awash_bank_rates", label: "Awash" },
  { value: "zemen_bank_rates", label: "Zemen" },
  { value: "bank_of_abyssinia_rates", label: "Abysinya" },
  { value: "nbe_exchange_rates", label: "Nbe" },
  { value: "wegagen_bank_rates", label: "Wegagen" },
];

const currencies = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "ETB", label: "ETB" },
  { value: "INR", label: "INR" },
  { value: "AED", label: "AED" },
  { value: "SAR", label: "SAR" },
  { value: "KWD", label: "KWD" },
  { value: "QAR", label: "QAR" },
  { value: "BHD", label: "BHD" },
  { value: "OMR", label: "OMR" },
  { value: "JOD", label: "JOD" },
];

const ExchangeCard: React.FC<{ latestExchange: LatestExchangeProp }> = ({
  latestExchange,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bank, setBank] = React.useState(searchParams.get("bank") || "");
  const [currency, setCurrency] = React.useState(
    searchParams.get("currency") || ""
  );
  const [amount, setAmount] = React.useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (bank && currency) {
      params.set("bank", bank);
      params.set("currency", currency);
    } else {
      params.delete("bank");
      params.delete("currency");
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [bank, currency, router, searchParams]);

  let exchangeAmount: number | undefined;

  // Assuming latestExchange is the first item in the array
  if (currency && bank && amount && latestExchange[0]?.rates) {
    const selectedRate = latestExchange[0].rates[currency]?.cash_selling;
    exchangeAmount = selectedRate ? selectedRate * Number(amount) : undefined;
  }

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex-1 w-full">
          <Select
            options={banks}
            value={bank}
            onChange={setBank}
            placeholder="Select Bank..."
          />
        </div>
        <div className="flex-1 w-full">
          <Select
            options={currencies}
            value={currency}
            onChange={setCurrency}
            placeholder="Select Currency..."
          />
        </div>
      </div>
      <Input
        type="number"
        value={amount}
        placeholder="Amount"
        className="w-full mt-4 text-base h-[30px]"
        onChange={(e) => setAmount(e.target.value)}
      />

      {exchangeAmount !== undefined && (
        <Card className="w-full max-w-[400px] mx-auto mt-4 overflow-hidden shadow-lg dark:border-gray-900 border-gray-100">
          <div className="relative">
            <div className="absolute inset-0 pattern-wavy"></div>
            <CardContent className="relative flex flex-col items-center justify-center gap-4 p-8 bg-white/80 dark:bg-black/70">
              <div className="text-5xl font-bold text-gray-700 dark:text-gray-300">
                {exchangeAmount.toFixed(2)} <span className="text-xl">ETB</span>
              </div>
              <div className="text-2xl text-gray-800 dark:text-gray-100">
                Exchange Amount
              </div>
            </CardContent>
            <CardFooter className="relative text-center text-xs text-gray-800 dark:text-gray-200 p-1 bg-white/80 dark:bg-black/80">
              <div className="flex items-center justify-center mx-auto">
                <div>
                  Bank :{" "}
                  {bank === "cbe_rates"
                    ? "CBE"
                    : bank === "amhara_bank_rates"
                    ? "Amhara "
                    : bank === "dashen_bank_rates"
                    ? "Dashen Bank "
                    : bank === "awash_bank_rates"
                    ? "Awash Bank "
                    : bank === "zemen_bank_rates"
                    ? "Zemen Bank "
                    : bank === "bank_of_abyssinia_rates"
                    ? "Abysinya Bank"
                    : bank === "nbe_exchange_rates"
                    ? "NBE "
                    : bank === "wegagen_bank_rates"
                    ? "Wegagen Bank"
                    : bank}
                  | Currency : {currency}
                </div>
                <Image
                  src={
                    theme === "dark"
                      ? "/assets/fetan-light.png"
                      : "/assets/fetan-dark.png"
                  }
                  alt="exchange"
                  width={80}
                  height={80}
                />
              </div>
            </CardFooter>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExchangeCard;
