import React from "react";
import Hero from "@/components/shared/Hero";
import Rate from "@/components/shared/Rate";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";
import { SearchParams } from "@/Types/utils";

// This ensures the page is not cached

type HomeProps = {
  searchParams: {
    currency?: string;
    bank?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const latestBankRate = await getLatestBankRates(
    searchParams.currency,
    searchParams.bank
  );

  return (
    <div className="w-full overflow-clip">
      <Hero />
      <Rate latestExchange={latestBankRate} />
    </div>
  );
}
