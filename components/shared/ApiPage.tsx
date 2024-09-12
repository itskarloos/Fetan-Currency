"use server";
import React from "react";
import { HeroHighlight } from "../ui/hero-highlight";
import { SignedIn, SignedOut, SignInButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/database/actions.firebase/useractions";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./CopyButton";

const ApiPage = async () => {
  const { userId, sessionClaims } = auth();
  const userData = await getUserById(userId ?? "");
  console.log(userData);
  let firstName = "";
  if (userId && sessionClaims && typeof sessionClaims.firstName === "string") {
    firstName = sessionClaims.firstName;
  }

  return (
    <>
      <SignedOut>
        <HeroHighlight className="flex flex-col md:flex-row items-start justify-center mx-auto pt-20 md:pt-20 mb-10">
          <div className="flex m-5 mt-20 md:ml-10 w-full md:w-1/2 flex-col items-start justify-center">
            <h1 className="text-left w-[200px] md:w-full md:text-8xl text-5xl font-bold mb-1 dark:text-white">
              Developers Portal
            </h1>
            <p className="w-[300px] md:w-full text-left md:text-xl text-base mb-3 dark:text-white">
              Access our powerful API to build applications with real-time
              exchange rate data.
            </p>
            <SignedOut>
              <Button
                asChild
                className="rounded-full"
                variant="outline"
                size="lg"
              >
                <Link href="/sign-in">Get Your API KEY</Link>
              </Button>
            </SignedOut>
          </div>
          <div className="md:mt-10 flex justify-center items-end md:items-center w-full md:w-1/2 mb-10">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md w-full max-w-xl transition-all duration-300 hover:shadow-lg hover:scale-105 m-4">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400 dark:bg-red-500 cursor-pointer hover:bg-red-500 dark:hover:bg-red-600 transition-colors"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 cursor-pointer hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 dark:bg-green-500 cursor-pointer hover:bg-green-500 dark:hover:bg-green-600 transition-colors"></div>
                </div>
                <div className="text-[10px] md:text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Exchange Rates API
                </div>
              </div>
              <pre className="text-gray-800 rounded-lg dark:text-gray-200 p-2 md:p-4 lg:p-6 overflow-x-auto font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm bg-gray-50 dark:bg-gray-900">
                <code className="language-javascript">
                  {`
// Fetch exchange rates
fetch('https://fetan-currency.vercel.app/api/exchange-rates')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Response format:
// {
//   "base": "USD",
//   "date": "2023-06-01",
//   "rates": {
//     "ETB": 54.5,
//     "EUR": 0.93,
//     "GBP": 0.80,
//     // ... other currencies
//   }
// }
              `}
                </code>
              </pre>
            </div>
          </div>
        </HeroHighlight>
      </SignedOut>
      <SignedIn>
        <HeroHighlight className="flex flex-col md:flex-row items-start justify-center mx-auto pt-20 md:pt-20 mb-10">
          <div className="flex m-5 mt-20 md:ml-10 w-full md:w-1/2 flex-col items-start justify-center">
            <h1 className="text-left w-[200px] md:w-full md:text-8xl text-5xl font-bold mb-2 md:mb-4 dark:text-white">
              Hey, {firstName}
            </h1>
            <p className="w-[300px] md:w-full text-left md:text-xl text-base md:leading-relaxed mb-3 dark:text-white">
              Welcome, {firstName}! Our API docs and tutorials are here to help
              you integrate exchange rates into your app. Let&apos;s get
              started!
            </p>

            <Button
              asChild
              className="rounded-full"
              variant="outline"
              size="lg"
            >
              <Link href="#apiguide">Guide and Docs</Link>
            </Button>
          </div>
          <div className="md:mt-10 flex justify-center items-end md:items-center w-full md:w-1/2 mb-10">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md w-full max-w-xl transition-all duration-300 hover:shadow-lg hover:scale-105 m-4">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400 dark:bg-red-500 cursor-pointer hover:bg-red-500 dark:hover:bg-red-600 transition-colors"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 cursor-pointer hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 dark:bg-green-500 cursor-pointer hover:bg-green-500 dark:hover:bg-green-600 transition-colors"></div>
                </div>
                <div className="text-[10px] md:text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Exchange Rates API
                </div>
              </div>
              <pre className="text-gray-800 rounded-lg dark:text-gray-200 p-2 md:p-4 lg:p-6 overflow-x-auto font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm bg-gray-50 dark:bg-gray-900">
                <code className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
                  {`fetch('https://fetan-currency.vercel.app/api/exchange-rates', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                </code>
              </pre>
            </div>
          </div>
        </HeroHighlight>
        <section
          className="w-full max-w-4xl mx-auto mt-8 mb-10 sm:mt-12 md:mt-16 px-4 sm:px-6 lg:px-8"
          id="apiguide"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-800 dark:text-gray-200">
            How to Use the API
          </h2>

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
                Your API Key
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg relative">
                <pre className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200 overflow-x-auto">
                  <code>{userData?.apiKey || "No API key found"}</code>
                </pre>
                <CopyButton apiKey={userData?.apiKey || ""} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
                Requesting the Latest Bank Rates
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                To fetch the latest bank rates, make a GET request to our API
                endpoint. Include your API key in the request headers:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto">
                <code className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
                  {`fetch('https://fetan-currency.vercel.app/api/exchange-rates', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                </code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
                Response Format
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                The API returns an array of objects, each representing a bank's
                exchange rates. Here's an example of the structure:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto">
                <code className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
                  {`[
  {
    "bank": "amhara_bank_rates",
    "timestamp": "Wed Sep 11 2024 08:28:05 GMT+0000 (Coordinated Universal Time)",
    "rates": {
      "USD": {
        "cash_buying": 107.3274,
        "cash_selling": 119.1334
      },
      "GBP": {
        "cash_buying": 141.0282,
        "cash_selling": 156.5294
      },
      // ... other currencies
    }
  },
  // ... other banks
]`}
                </code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
                Working with the Data
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                You can iterate through the array to access rates for different
                banks. Here's an example of how to work with the data:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg overflow-x-auto">
                <code className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
                  {`data.forEach(bank => {
  console.log(\`Bank: \${bank.bank}\`);
  console.log(\`Timestamp: \${bank.timestamp}\`);
  
  Object.entries(bank.rates).forEach(([currency, rates]) => {
    console.log(\`\${currency} - Buying: \${rates.cash_buying}, Selling: \${rates.cash_selling}\`);
  });
  
  console.log('---');
});`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </SignedIn>
    </>
  );
};

export default ApiPage;
