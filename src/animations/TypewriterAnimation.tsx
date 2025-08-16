"use client";
import React, { useEffect, useState } from "react";
import { words } from "../components/constants/AnimationConstants";

export const TypewriterAnimation: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          setCurrentText(currentWord.substring(0, currentText.length + 1));

          if (currentText === currentWord) {
            setIsPaused(true);
          }
        }
      },
      isPaused ? 2000 : isDeleting ? 100 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex]);

  return (
    <div className="flex items-center justify-center min-h-[120px]">
      <span
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
        style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
      >
        {currentText}
        <span className="animate-pulse text-orange-400">|</span>
      </span>
    </div>
  );
};
