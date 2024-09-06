"use client";

import * as React from "react";
import Select from "./ExchangeCardPopover";

// Data
const banks = [
  { value: "Cbe", label: "Cbe" },
  { value: "Dashen", label: "Dashen" },
  { value: "Abysinya", label: "Abysinya" },
  { value: "Zemen", label: "Zemen" },
  { value: "Wegagen", label: "Wegagen" },
];

const currencies = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "ETB", label: "ETB" },
];

const ExchangeCard: React.FC = () => {
  const [bank, setBank] = React.useState("");
  const [currency, setCurrency] = React.useState("");

  return (
    <div className="flex md:flex-row flex-col md:gap-6 space-y-3">
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
