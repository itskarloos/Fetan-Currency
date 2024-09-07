"use client";

import * as React from "react";
import Select from "./ExchangeCardPopover";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LatestAmountProp, LatestExchangeProp } from "@/Types/utils";
import { Card, CardContent, CardFooter } from "../ui/card";

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
  { value: "KWD", label: "KWD" },
];

const ExchangeCard: React.FC<{ latestExchange: LatestExchangeProp }> = ({
  latestExchange,
}) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select
        options={banks}
        value={bank}
        onChange={setBank}
        placeholder="Select Bank..."
      />
      <Select
        options={currencies}
        value={currency}
        onChange={setCurrency}
        placeholder="Select Currency..."
      />
      <Input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      {exchangeAmount !== undefined && (
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-5xl font-bold">
              {exchangeAmount.toFixed(2)} <span className="text-xl">ETB</span>
            </div>
            <div className="text-2xl">Exchange Amount </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-200">
            Bank: {bank} | Currency: {currency}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ExchangeCard;
