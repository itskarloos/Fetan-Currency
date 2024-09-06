"use client";
import React, { useEffect, useState } from "react";
import ExchangeCard from "./ExchangeCard";
import { Chart } from "./chart";
import { LatestExchangeProp } from "@/Types/utils";
import ExchageTable from "./ExchageRateTable";

const Rate = ({ latestExchange }: { latestExchange: LatestExchangeProp }) => {
  return (
    <div className="h-[100] w-full flex bg-white dark:bg-black p-5 md:p-10 flex-col  gap-2 md:gap-6">
      <p className="text-2xl md:text-3xl dark:text-neutral-200 text-neutral-900">
        Exchange Rate
      </p>
      <ExchangeCard />
      <ExchageTable latestExchange={latestExchange} />
      <Chart />
    </div>
  );
};

export default Rate;
