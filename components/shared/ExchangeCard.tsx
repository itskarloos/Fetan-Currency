"use client";

import * as React from "react";
import Select from "./ExchangeCardPopover";

// Data
const banks = [
  { value: "Cbe", label: "Cbe" },
  { value: "Dashen", label: "Dashen" },
  { value: "Awash", label: "Awash" },
  { value: "Zemen", label: "Zemen" },
  { value: "Abysinya", label: "Abysinya" },
  { value: "Nbe", label: "Nbe" },
  { value: "Wegagen", label: "Wegagen" },
];

const currencies = [
  { value: "dollar", label: "USD" },
  { value: "Euro", label: "EUR" },
  { value: "Pound", label: "GBP" },
  { value: "Ethiopian Birr", label: "ETB" },
  { value: "Indian Rupee", label: "INR" },
  { value: "United Arab Emirates Dirham", label: "AED" },
  { value: "Saudi Riyal", label: "SAR" },
  { value: "Kuwaiti Dinar", label: "KWD" },
  { value: "Qatari Riyal", label: "QAR" },
  { value: "Bahraini Dinar", label: "BHD" },
  { value: "Omani Rial", label: "OMR" },
  { value: "Jordanian Dinar", label: "JOD" },
  { value: "Kuwaiti Dinar", label: "KWD" },
];

const ExchangeCard: React.FC = () => {
  const [bank, setBank] = React.useState("");
  const [currency, setCurrency] = React.useState("");

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
