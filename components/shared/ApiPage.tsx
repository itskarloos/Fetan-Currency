import React from "react";
import { HeroHighlight } from "../ui/hero-highlight";
import { Button } from "../ui/button";

const ApiPage = () => {
  return (
    <HeroHighlight className="flex flex-col md:flex-row items-start justify-center mx-auto min-h-screen pt-10 md:pt-20 mb-10">
      <div className="flex m-5 mt-16 md:ml-10 w-full md:w-1/2 flex-col items-start justify-center">
        <h1 className="text-left w-[200px] md:w-full md:text-8xl text-5xl font-bold mb-1 dark:text-white">
          Developers Portal
        </h1>
        <p className="w-[350px] md:w-full text-left md:text-xl text-base mb-3 dark:text-white">
          Get access to our API to build your own applications.
        </p>
        <Button>Explore Guide</Button>
      </div>
      <div className="flex justify-center items-end md:items-center w-full md:w-1/2 mb-10">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md w-full max-w-xl transition-all duration-300 hover:shadow-lg hover:scale-105 m-4">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500 cursor-pointer hover:bg-red-500 dark:hover:bg-red-600 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 cursor-pointer hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 cursor-pointer hover:bg-green-500 dark:hover:bg-green-600 transition-colors"></div>
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Exchange Rates API
            </div>
          </div>
          <pre className="text-gray-800 rounded-lg dark:text-gray-200 p-4 md:p-6 overflow-x-auto font-mono text-xs md:text-sm bg-gray-50 dark:bg-gray-900">
            <code className="language-javascript">
              {`
// Install the package
npm install @ethiorates/api

// Import the API client
import { EthioRatesAPI } from '@ethiorates/api';

// Initialize the client
const api = new EthioRatesAPI('YOUR_API_KEY');

// Fetch latest exchange rates
const rates = await api.getLatestRates();

console.log(rates);
              `}
            </code>
          </pre>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default ApiPage;
