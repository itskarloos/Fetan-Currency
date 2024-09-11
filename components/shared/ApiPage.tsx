import React from "react";
import { HeroHighlight } from "../ui/hero-highlight";
import { Button } from "../ui/button";

const ApiPage = () => {
  return (
    <>
      <HeroHighlight className="flex flex-col md:flex-row items-start justify-center mx-auto pt-20 md:pt-20 mb-10">
        <div className="flex m-5 mt-20 md:ml-10 w-full md:w-1/2 flex-col items-start justify-center">
          <h1 className="text-left w-[200px] md:w-full md:text-8xl text-5xl font-bold mb-1 dark:text-white">
            Developers Portal
          </h1>
          <p className="w-[300px] md:w-full text-left md:text-xl text-base mb-3 dark:text-white">
            Get access to our powerful API to build your own applications and
            integrate real-time exchange rate data seamlessly.
          </p>
          <Button>Explore Guide</Button>
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
fetch('https://fetan.co/api/exchange-rate')
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
      <div className="w-full mt-10 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center dark:text-white">
          Free API for Developers
        </h2>
        <p className="text-base md:text-lg text-center mb-6 max-w-2xl mx-auto dark:text-gray-300">
          We believe in empowering developers. That&apos;s why we&apos;ve made our API
          completely free to use. Our goal is to make your life a bit easier by
          providing reliable, up-to-date exchange rate data without any cost
          barriers.
        </p>
        <div className="flex justify-center">
          <Button variant="outline" className="mr-4">
            Get API Key
          </Button>
          <Button>View Documentation</Button>
        </div>
      </div>
    </>
  );
};

export default ApiPage;
