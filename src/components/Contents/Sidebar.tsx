"use client";
import React from "react";
import {
  ChevronRight,
  CheckCircle,
  Circle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  slug: string;
  difficulty_level?: string;
  completed?: boolean;
}

interface SidebarProps {
  currentTopicSlug: string;
  topics: Topic[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentTopicSlug, topics = [] }) => {
  const currentIndex = topics.findIndex(
    (topic) => topic.slug === currentTopicSlug
  );
  const previousTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-gray-700" />
          <h2 className="text-lg font-space-grotesk font-semibold text-gray-900">
            Course Topics
          </h2>
        </div>
        <p className="text-sm text-gray-600 font-inter">
          {topics.length} topics in this series
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 border-b border-gray-200 space-y-2">
        {previousTopic && (
          <Link
            href={`/topics/${previousTopic.slug}`}
            className="flex items-center gap-2 w-full p-2 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="truncate">Previous: {previousTopic.title}</span>
          </Link>
        )}
        {nextTopic && (
          <Link
            href={`/topics/${nextTopic.slug}`}
            className="flex items-center gap-2 w-full p-2 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <span className="truncate">Next: {nextTopic.title}</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Topics List */}
      <div className="p-4">
        <h3 className="text-sm font-space-grotesk font-medium text-gray-700 mb-3 uppercase tracking-wide">
          All Topics
        </h3>
        <div className="space-y-1">
          {topics.map((topic, index) => {
            const isActive = topic.slug === currentTopicSlug;
            const isCompleted = topic.completed;

            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className={`block p-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle
                        size={16}
                        className={
                          isActive ? "text-green-300" : "text-green-500"
                        }
                      />
                    ) : (
                      <Circle
                        size={16}
                        className={isActive ? "text-gray-400" : "text-gray-400"}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-space-mono font-medium opacity-70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {topic.difficulty_level && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            isActive
                              ? "bg-white/20 text-white"
                              : getDifficultyColor(topic.difficulty_level)
                          }`}
                        >
                          {topic.difficulty_level}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-space-grotesk font-medium leading-tight">
                      {topic.title}
                    </h4>
                  </div>

                  {/* Arrow for active item */}
                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="flex-shrink-0 text-gray-400"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500 font-inter">
          Progress: {topics.filter((t) => t.completed).length} of{" "}
          {topics.length} completed
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-900 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                topics.length > 0
                  ? (topics.filter((t) => t.completed).length / topics.length) *
                    100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
