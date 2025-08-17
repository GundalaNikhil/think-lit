"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

interface Topic {
  id: string;
  title: string;
  slug: string;
  difficulty_level?: string;
  completed?: boolean;
}

interface SidebarLayoutProps {
  currentTopicSlug: string;
  topics: Topic[];
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  currentTopicSlug, 
  topics, 
  children 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          currentTopicSlug={currentTopicSlug}
          topics={topics}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <Menu size={20} />
            <span className="font-space-grotesk font-medium">Topics</span>
          </button>
        </div>

        {/* Content */}
        <div className="min-h-screen">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Close Button */}
      {isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="fixed top-4 right-4 z-60 lg:hidden bg-white rounded-full p-2 shadow-lg"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SidebarLayout;
