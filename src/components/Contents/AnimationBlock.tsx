import { Play } from "lucide-react";
import { useState } from "react";

const AnimationBlock = ({ animationCode }: { animationCode: string }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Play size={20} className="text-purple-600" />
          Interactive Visualization
        </h3>
        <button
          onClick={() => setShowAnimation(!showAnimation)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {showAnimation ? "Hide" : "Show"} Animation
        </button>
      </div>

      {showAnimation && (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: animationCode }}
            className="w-full"
            style={{ minHeight: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimationBlock;
