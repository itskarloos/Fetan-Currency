import { NextRequest, NextResponse } from "next/server";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";

export async function GET(req: NextRequest) {
  try {
    const latestExchangeRates = await getLatestBankRates();
    return NextResponse.json(latestExchangeRates);
  } catch (error) {
    console.error("Error fetching latest exchange rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}
