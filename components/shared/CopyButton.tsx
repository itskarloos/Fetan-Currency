"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

export const CopyButton = ({ apiKey }: { apiKey: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className="absolute justify-center right-0 md:right-2 text-gray-500 bg-gray-800 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      title={copied ? "Copied!" : "Copy API Key"}
    >
      <ClipboardCopy className="h-4 w-4" />
      {copied && (
        <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </Button>
  );
};
