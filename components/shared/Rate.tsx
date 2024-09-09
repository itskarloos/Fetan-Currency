"use client";
import React, { useEffect, useState } from "react";
import ExchangeCard from "./ExchangeCard";
import { LatestExchangeProp } from "@/Types/utils";
import ExchageTable from "./ExchageRateTable";
import { useSearchParams } from "next/navigation";
import Chart from "./Chart";

const Rate = ({ latestExchange }: { latestExchange: LatestExchangeProp }) => {
  const params = useSearchParams();
  const currency = params.get("currency") || "";
  const bank = params.get("bank") || "";

  return (
    <div
      className="h-[100] w-full flex bg-white dark:bg-black p-5 md:p-10 flex-col  gap-2 md:gap-6"
      id="rate"
    >
      <p className="text-2xl md:text-3xl dark:text-neutral-200 text-neutral-900">
        Exchange Rate
      </p>
      <ExchangeCard latestExchange={latestExchange} />
      <ExchageTable latestExchange={latestExchange} />
      <Chart bank={bank} currency={currency} />
    </div>
  );
};

export default Rate;
