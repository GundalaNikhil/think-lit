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
    <div className="bg-white">
      <div className="px-6">
        <div className="flex justify-start space-x-1 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveTab(tab.id);
                }}
                className={`relative px-4 py-2 rounded-md font-space-grotesk font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
