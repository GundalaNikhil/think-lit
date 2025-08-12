"use client";

import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

interface CodeExampleProps {
  code: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const cleanCode = code?.replace(/```/g, "").trim() || "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-12 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fadeInUp">
      <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <Code size={24} className="text-blue-400" />
          <span className="text-sm text-gray-300 font-['Space_Grotesk'] font-semibold">
            Code Example
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-['Space_Grotesk'] font-bold transform hover:scale-105 ${
            copied
              ? "bg-green-600 text-white"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <pre className="p-8 text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
        <code className="language-javascript">{cleanCode}</code>
      </pre>
    </div>
  );
};

export default CodeExample;
