import { NextRequest, NextResponse } from "next/server";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";


export async function Validator(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");
  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }
}
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
