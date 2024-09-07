"use client";

import * as React from "react";
import Select from "./ExchangeCardPopover";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

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

const ExchangeCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bank, setBank] = React.useState(searchParams.get("bank") || "");
  const [currency, setCurrency] = React.useState(
    searchParams.get("currency") || ""
  );

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

  return (
    <div className="flex md:flex-row flex-col md:gap-6 gap-4">
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
    </div>
  );
};

export default ExchangeCard;
