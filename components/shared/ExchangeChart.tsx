"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { compareBankToNBEExchangeRates } from "@/lib/database/actions/exchangeRate.actions";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "Analysis of exchange rates between NBE and other banks.";

const chartConfig = {
  desktop: {
    label: "NBE",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Other Banks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartData {
  currencyCode: string;
  nbe: {
    bank: string;
    timestamp: any;
    cashBuying: any;
    cashSelling: any;
  };
  comparedBank: {
    bank: string;
    timestamp: any;
    cashBuying: any;
    cashSelling: any;
  };
  difference: {
    cashBuying: number;
    cashSelling: number;
  };
}

const ExchangeChart = ({
  bank,
  currency,
}: {
  bank: string;
  currency: string;
}) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const formattedBank =
    bank === "nbe_exchange_rates"
      ? "National Bank"
      : bank === "cbe_rates"
      ? "CBE"
      : bank === "amhara_bank_rates"
      ? "Amhara Bank"
      : bank === "wegagen_bank_rates"
      ? "Wegagen Bank"
      : bank === "zemen_bank_rates"
      ? "Zemen Bank"
      : bank === "bank_of_abyssinia_rates"
      ? "Bank of Abyssinia"
      : bank === "awash_bank_rates"
      ? "Awash Bank"
      : bank === "dashen_bank_rates"
      ? "Dashen Bank"
      : "N/A";
  const Data = [
    {
      month: "Buying",
      "National Bank": chartData?.nbe.cashBuying,
      [formattedBank]: chartData?.comparedBank.cashBuying,
    },
    {
      month: "Selling",
      "National Bank": chartData?.nbe.cashSelling,
      [formattedBank]: chartData?.comparedBank.cashSelling,
    },
    {
      month: "Difference",
      "National Bank": chartData?.difference.cashBuying,
      [formattedBank]: chartData?.difference.cashSelling,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (bank.trim() !== "" && currency.trim() !== "") {
        try {
          const data = await compareBankToNBEExchangeRates(currency, bank);
          setChartData(data);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      }
    };

    fetchData();
  }, [bank, currency]);

  if (!chartData) {
    return (
      <Card className="w-full md:w-[500px]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  return bank && currency !== "" ? (
    <Card className="w-full md:w-[500px]">
      <CardHeader>
        <CardTitle>
          Comparison of{" "}
          {bank === "nbe_exchange_rate"
            ? "NBE"
            : bank === "cbe_rates"
            ? "CBE"
            : bank === "wegagen_bank_rates"
            ? "Wegagen Bank"
            : bank === "zemen_bank_rates"
            ? "Zemen Bank"
            : bank === "amhara_bank_rates"
            ? "Amhara Bank"
            : bank === "abysinia_bank_rates"
            ? "Abysinia Bank"
            : bank === "dashen_bank_rates"
            ? "Dashen Bank"
            : bank === "awash_bank_rates"
            ? "Awash Bank"
            : "N/A"}{" "}
          and{" "}
          {bank === "nbe_exchange_rate"
            ? "National Bank of Ethiopia"
            : "National Bank"}
        </CardTitle>
        <CardDescription>
          {bank === "nbe_exchange_rate"
            ? "NBE"
            : bank === "cbe_rates"
            ? "CBE"
            : bank === "dashen_bank_rates"
            ? "Dashen Bank"
            : bank === "amhara_bank_rates"
            ? "Amhara Bank"
            : bank === "wegagen_bank_rates"
            ? "Wegagen Bank"
            : bank === "zemen_bank_rates"
            ? "Zemen Bank"
            : bank === "abysinia_bank_rates"
            ? "Abysinia Bank"
            : bank === "awash_bank_rates"
            ? "Awash Bank"
            : "N/A"}
          {" - "}
          {currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={Data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey={formattedBank}
              fill="var(--color-desktop)"
              radius={4}
            />
            <Bar
              dataKey="National Bank"
              fill="var(--color-mobile)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-1">
          {formattedBank} - Cash Buying Difference{" "}
          {chartData.difference.cashBuying.toFixed()}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Analysis on {chartData.comparedBank.timestamp}
        </div>
      </CardFooter>
    </Card>
  ) : (
    <div>Please select a bank and currency.</div>
  );
};

export default ExchangeChart;
