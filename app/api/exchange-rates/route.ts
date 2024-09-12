import { NextRequest, NextResponse } from "next/server";
import { getLatestBankRates } from "@/lib/database/actions/exchangeRate.actions";
import { getAllApiKeys } from "@/lib/database/actions.firebase/useractions";

// Separate middleware for API key verification
async function verifyApiKeyMiddleware(req: NextRequest): Promise<NextResponse | null> {
  const apiKey = req.headers.get('apiKey');
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const isValidApiKey = await verifyApiKey(apiKey);
  if (!isValidApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  return null;
}

// Helper function to verify API key
async function verifyApiKey(apiKey: string): Promise<boolean> {
  const apiKeys = await getAllApiKeys();
  return !!apiKeys[apiKey];
}

// Main GET handler
export async function GET(req: NextRequest) {
  // API key verification
  const apiKeyError = await verifyApiKeyMiddleware(req);
  if (apiKeyError) return apiKeyError;

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
