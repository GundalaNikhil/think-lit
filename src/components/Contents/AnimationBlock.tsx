"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { Play, RotateCcw, AlertTriangle } from "lucide-react";

interface AnimationBlockProps {
  animationCode: string;
}

const AnimationBlock: React.FC<AnimationBlockProps> = ({ animationCode }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const animationRef = useRef<HTMLDivElement>(null);

  const resetAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
    setHasError(false);
    setErrorMessage("");
  }, []);

  // Auto-render animation with proper isolation
  useEffect(() => {
    if (!animationRef.current) {
      return;
    }

    try {
      const container = animationRef.current;

      // Clear previous content safely
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      if (animationCode) {
        // Create isolated iframe for animation rendering
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "1200px";
        iframe.style.border = "none";
        iframe.style.borderRadius = "8px";
        iframe.sandbox = "allow-scripts allow-same-origin";

        // Set up iframe content
        iframe.onload = () => {
          try {
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              iframeDoc.open();
              iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    body {
                      margin: 0;
                      padding: 32px;
                      font-family: 'Inter', system-ui, -apple-system, sans-serif;
                      background: #ffffff;
                      min-height: 100vh;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    .animation-container {
                      background: #ffffff;
                      border-radius: 12px;
                      padding: 40px;
                      box-shadow:
                        0 1px 3px rgba(0, 0, 0, 0.1),
                        0 1px 2px rgba(0, 0, 0, 0.06);
                      max-width: 100%;
                      overflow: hidden;
                      border: 1px solid #e5e7eb;
                      position: relative;
                    }
                  </style>
                </head>
                <body>
                  <div class="animation-container">
                    ${animationCode}
                  </div>
                </body>
                </html>
              `);
              iframeDoc.close();
            }
          } catch (iframeError) {
            console.error("Iframe rendering error:", iframeError);
            setHasError(true);
            setErrorMessage("Failed to render animation in secure container");
          }
        };

        container.appendChild(iframe);
      }
    } catch (error) {
      console.error("Animation rendering error:", error);
      setHasError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }, [animationCode, animationKey]);

  return (
    <div className="animation-block bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-8 hover:shadow-md transition-all duration-300 relative">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-md shadow-sm">
          <Play size={20} />
          <h3 className="text-lg font-semibold font-space-grotesk">
            Interactive Visualization
          </h3>
        </div>
      </div>

      {/* Always visible reset button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={resetAnimation}
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 font-space-grotesk font-medium flex items-center gap-2 text-sm"
        >
          <RotateCcw size={16} />
          Reset Animation
        </button>
      </div>

      {/* Error Display */}
      {hasError && (
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mb-6">
          <div className="flex items-center gap-2 text-gray-800 mb-2">
            <AlertTriangle size={20} />
            <h4 className="font-space-grotesk font-semibold">
              Animation Error
            </h4>
          </div>
          <p className="text-gray-600 font-inter text-sm">{errorMessage}</p>
          <button
            onClick={resetAnimation}
            className="mt-3 bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors font-space-grotesk font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Animation Container - Always visible when animationCode exists */}
      {!hasError && animationCode && (
        <div className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm mb-6">
          <div
            ref={animationRef}
            key={animationKey}
            className="w-full min-h-[1200px] bg-white"
          />

          <div className="bg-gray-50 p-3 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 font-inter">
              <span>Animation running in secure container</span>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback for no animation code */}
      {!hasError && !animationCode && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h4 className="text-lg font-space-grotesk font-semibold text-gray-800 mb-2">
            Demo Animation Preview
          </h4>
          <p className="text-gray-600 font-inter mb-4 text-sm">
            This topic doesn't have custom animations yet, but here's a preview
            of the animation system:
          </p>
          <div className="bg-white rounded-md p-4 border border-gray-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <p className="text-gray-500 text-xs mt-3 font-inter">
              Interactive animations appear here automatically when available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationBlock;
