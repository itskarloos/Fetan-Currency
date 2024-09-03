import React from "react";
import ExchangeCard from "./ExchangeCard";
import { Chart } from "./chart";

const Rate = () => {
  return (
    <div className="h-[100] w-full flex bg-white dark:bg-black p-5 md:p-10 flex-col  gap-2 md:gap-6">
      <p className="text-2xl md:text-3xl dark:text-neutral-200 text-neutral-900">
        Exchange Rate
      </p>
      <ExchangeCard />
      <Chart />
    </div>
  );
};

export default Rate;
