"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";

const ApiGuide = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      title: "Get API Key",
      content:
        "Sign up for an account and obtain your API key from the dashboard.",
      code: "const API_KEY = 'your_api_key_here';",
    },
    {
      title: "Make API Request",
      content: "Use the fetch API to make a request to our endpoint.",
      code: `
fetch('https://api.fetan.com/v1/currency', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
      `,
    },
    {
      title: "Handle Response",
      content: "Process the API response in your application.",
      code: `
function handleCurrencyData(data) {
  // Update your UI with the currency information
  updateCurrencyDisplay(data);
}
      `,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
        API Connection Guide
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Button
                className={`w-full mb-4 ${
                  activeStep === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveStep(index + 1)}
              >
                Step {index + 1}: {step.title}
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="md:w-2/3">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              {steps[activeStep - 1].title}
            </h2>
            <p className="mb-4 dark:text-gray-300">
              {steps[activeStep - 1].content}
            </p>
            <CodeBlock
              code={steps[activeStep - 1].code}
              language="javascript"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApiGuide;
