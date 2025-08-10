"use client";

import React, { useState } from "react";
import { Code } from "lucide-react";

const CodeExample = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  // Clean up the code string - remove markdown and extra formatting
  const cleanCode = code?.replace(/```/g, "").replace(/Drag/g, "").trim() || "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code : " + err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center gap-2">
          <Code size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">Code Example</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{cleanCode}</code>
      </pre>
    </div>
  );
};

export default CodeExample;
