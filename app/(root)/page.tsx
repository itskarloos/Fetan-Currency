import React from "react";
import NavBar from "@/components/shared/NavBar";
import Hero from "@/components/shared/Hero";
import Rate from "@/components/shared/Rate";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";

export default async function Home() {
  const latestBankRate = await getLatestBankRates();

  return (
    <div className="bg-black w-full dark:border dark:border-white/[0.1] overflow-clip">
      <Hero />
      <Rate latestExchange={latestBankRate} />
    </div>
  );
}
