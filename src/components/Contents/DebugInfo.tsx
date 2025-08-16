"use client";
import { useState } from "react";
import { Bug, ChevronDown, ChevronUp } from "lucide-react";

interface DebugInfoProps {
  activeTab: string;
  animationKey: number;
  topicData: any;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ activeTab, animationKey, topicData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white rounded-lg shadow-2xl max-w-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 p-3 w-full text-left hover:bg-white/10 transition-colors"
      >
        <Bug size={16} />
        <span className="font-space-mono text-sm">Debug Info</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-white/20 font-space-mono text-xs">
          <div className="space-y-2">
            <div>
              <span className="text-blue-300">Active Tab:</span>
              <span className="ml-2 text-green-300">{activeTab}</span>
            </div>
            <div>
              <span className="text-blue-300">Animation Key:</span>
              <span className="ml-2 text-green-300">{animationKey}</span>
            </div>
            <div>
              <span className="text-blue-300">Topic Data:</span>
              <span className="ml-2 text-green-300">
                {topicData ? '✅ Loaded' : '❌ Missing'}
              </span>
            </div>
            {topicData?.additional_content && (
              <div>
                <span className="text-blue-300">Additional Content:</span>
                <span className="ml-2 text-green-300">
                  {topicData.additional_content.length} items
                </span>
              </div>
            )}
            <div>
              <span className="text-blue-300">Timestamp:</span>
              <span className="ml-2 text-green-300">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugInfo;
