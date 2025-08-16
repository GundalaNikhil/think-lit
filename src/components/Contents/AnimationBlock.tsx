"use client";
import { useState, useCallback } from "react";
import { Play, RotateCcw, Eye, EyeOff } from "lucide-react";

interface AnimationBlockProps {
  animationCode: string;
}

const AnimationBlock: React.FC<AnimationBlockProps> = ({ animationCode }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const resetAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  const toggleAnimation = useCallback(() => {
    setShowAnimation((prev) => !prev);
    if (!showAnimation) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [showAnimation]);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-10 shadow-2xl mb-12 hover:shadow-3xl transition-all duration-500 animate-fadeInUp hover:scale-[1.01]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg">
          <Play size={28} />
          <h3 className="text-2xl font-black font-['Space_Grotesk']">
            Interactive Visualization
          </h3>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {showAnimation && (
          <button
            onClick={resetAnimation}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-['Space_Grotesk'] font-bold flex items-center gap-3 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw size={20} />
            Reset Animation
          </button>
        )}
        <button
          onClick={toggleAnimation}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-500 font-['Space_Grotesk'] font-black text-lg transform hover:scale-110 shadow-2xl flex items-center gap-3"
        >
          {showAnimation ? (
            <>
              <EyeOff size={24} />
              Hide Visualization
            </>
          ) : (
            <>
              <Eye size={24} />
              Show Visualization ✨
            </>
          )}
        </button>
      </div>

      {showAnimation && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-purple-200 overflow-hidden shadow-2xl animate-fadeInUp">
          <div
            key={animationKey}
            dangerouslySetInnerHTML={{ __html: animationCode }}
            className="w-full"
            style={{ minHeight: "400px" }}
          />

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 border-t border-purple-200">
            <div className="flex items-center justify-center gap-4 text-sm text-purple-700 font-['Inter']">
              <span>🎬 Animation is running</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <button
                onClick={resetAnimation}
                className="text-purple-600 hover:text-purple-800 transition-colors duration-200 underline"
              >
                Click to restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationBlock;
