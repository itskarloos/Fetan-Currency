import React from "react";
import ExchangeCard from "./ExchangeCard";
import { Chart } from "./chart";

const Rate = () => {
  return (
    <div className="h-[100] w-full flex p-5 md:p-10 flex-col mt-10 gap-2 md:gap-6">
      <p className="text-2xl md:text-3xl text-white">Exchange Rate</p>
      <ExchangeCard />
      <Chart />
    </div>
  );
};

export default Rate;
