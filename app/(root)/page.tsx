import React from "react";
import Hero from "@/components/shared/Hero";
import Rate from "@/components/shared/Rate";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";

export const revalidate = 0; // This ensures the page is not cached

export default async function Home() {
  const latestBankRate = await getLatestBankRates();

  return (
    <div className="bg-black w-full dark:border dark:border-white/[0.1] overflow-clip">
      <Hero />
      <Rate latestExchange={latestBankRate} />
    </div>
  );
}
