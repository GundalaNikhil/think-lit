"use client";
import { BookOpen, Target, Zap } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  difficultyColors: {
    gradient: string;
  };
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  difficultyColors,
}) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: Target,
      color: "from-green-500 to-teal-500",
    },
    {
      id: "animation",
      label: "Visuals",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-2 py-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-4 rounded-2xl font-['Space_Grotesk'] font-bold text-lg transition-all duration-500 transform hover:scale-105 group ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105`
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={24}
                    className={`${
                      activeTab === tab.id
                        ? "animate-pulse"
                        : "group-hover:rotate-12"
                    } transition-transform duration-300`}
                  />
                  {tab.label}
                </div>
                {activeTab !== tab.id && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  ></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
