"use client";
import { useState, useEffect } from "react";

const TestAnimation = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="p-6 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-space-grotesk font-semibold text-gray-800 mb-2">
          Demo Animation
        </h3>
        <p className="text-gray-600 font-inter text-sm">
          Interactive counter demonstrating the animation system
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold font-space-mono shadow-lg"
            style={{
              transform: `rotate(${count * 3.6}deg) scale(${
                1 + Math.sin(count * 0.1) * 0.1
              })`,
            }}
          >
            {count}
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-gray-300 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-space-grotesk font-medium text-sm"
        >
          {isAnimating ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-space-grotesk font-medium text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TestAnimation;
