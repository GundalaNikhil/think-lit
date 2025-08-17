"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "./Navbar";
import TopicsSidebar from "./TopicsSidebar";

interface TopicsLayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedDifficulty?: string;
  onDifficultyChange?: (difficulty: string) => void;
  onClearFilters?: () => void;
}

const TopicsLayout: React.FC<TopicsLayoutProps> = ({
  children,
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  onClearFilters,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        showSearch={true}
      />

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
          transition-transform duration-300 ease-in-out
          top-16 lg:top-0
        `}
        >
          <TopicsSidebar
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={onDifficultyChange}
            onClearFilters={onClearFilters}
            showFilters={true}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50 p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <Menu size={20} />
              <span className="font-space-grotesk font-medium">
                Browse Topics
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="min-h-screen">{children}</div>
        </div>

        {/* Mobile Sidebar Close Button */}
        {isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="fixed top-20 right-4 z-60 lg:hidden bg-gray-700 rounded-full p-2 shadow-lg border border-gray-600/50"
          >
            <X size={20} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopicsLayout;
