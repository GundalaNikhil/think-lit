"use client";
import React from "react";
import Link from "next/link";
import {
  Users,
  Code,
  Layers,
  Monitor,
  Server,
  Database,
  Brain,
  BookOpen,
  ChevronRight,
  Star,
  Filter,
  X,
} from "lucide-react";

interface SidebarSection {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: {
    name: string;
    href: string;
    count?: number;
    difficulty?: "beginner" | "intermediate" | "advanced";
    popular?: boolean;
  }[];
}

interface TopicsSidebarProps {
  selectedDifficulty?: string;
  onDifficultyChange?: (difficulty: string) => void;
  onClearFilters?: () => void;
  showFilters?: boolean;
}

const TopicsSidebar: React.FC<TopicsSidebarProps> = ({
  selectedDifficulty = "all",
  onDifficultyChange,
  onClearFilters,
  showFilters = false,
}) => {
  const sidebarSections: SidebarSection[] = [
    {
      title: "Interview Preparation",
      icon: Users,
      items: [
        {
          name: "Coding Interviews",
          href: "/topics/coding-interviews",
          count: 45,
          difficulty: "intermediate",
          popular: true,
        },
        {
          name: "System Design Interviews",
          href: "/topics/system-design-interviews",
          count: 25,
          difficulty: "advanced",
        },
        {
          name: "Behavioral Questions",
          href: "/topics/behavioral-questions",
          count: 30,
          difficulty: "beginner",
        },
        {
          name: "Mock Interviews",
          href: "/topics/mock-interviews",
          count: 15,
          difficulty: "intermediate",
        },
      ],
    },
    {
      title: "Data Structures & Algorithms",
      icon: Code,
      items: [
        {
          name: "DSA 100 Problems",
          href: "/topics/dsa-100",
          count: 100,
          difficulty: "intermediate",
          popular: true,
        },
        {
          name: "DSA 150 Problems",
          href: "/topics/dsa-150",
          count: 150,
          difficulty: "advanced",
          popular: true,
        },
        {
          name: "Array & Strings",
          href: "/topics/arrays-strings",
          count: 35,
          difficulty: "beginner",
        },
        {
          name: "Trees & Graphs",
          href: "/topics/trees-graphs",
          count: 40,
          difficulty: "intermediate",
        },
        {
          name: "Dynamic Programming",
          href: "/topics/dynamic-programming",
          count: 25,
          difficulty: "advanced",
        },
      ],
    },
    {
      title: "Algorithm Patterns",
      icon: Brain,
      items: [
        {
          name: "Two Pointers",
          href: "/topics/two-pointers",
          count: 20,
          difficulty: "beginner",
        },
        {
          name: "Sliding Window",
          href: "/topics/sliding-window",
          count: 18,
          difficulty: "intermediate",
        },
        {
          name: "Binary Search",
          href: "/topics/binary-search",
          count: 22,
          difficulty: "intermediate",
        },
        {
          name: "Backtracking",
          href: "/topics/backtracking",
          count: 15,
          difficulty: "advanced",
        },
      ],
    },
    {
      title: "System Design",
      icon: Layers,
      items: [
        {
          name: "Scalability Concepts",
          href: "/topics/scalability",
          count: 12,
          difficulty: "intermediate",
        },
        {
          name: "Load Balancing",
          href: "/topics/load-balancing",
          count: 8,
          difficulty: "intermediate",
        },
        {
          name: "Microservices",
          href: "/topics/microservices",
          count: 15,
          difficulty: "advanced",
        },
        {
          name: "Caching Strategies",
          href: "/topics/caching",
          count: 10,
          difficulty: "intermediate",
        },
      ],
    },
    {
      title: "Frontend Development",
      icon: Monitor,
      items: [
        {
          name: "React Fundamentals",
          href: "/topics/react-fundamentals",
          count: 28,
          difficulty: "beginner",
          popular: true,
        },
        {
          name: "JavaScript ES6+",
          href: "/topics/javascript-es6",
          count: 32,
          difficulty: "intermediate",
        },
        {
          name: "CSS & Styling",
          href: "/topics/css-styling",
          count: 25,
          difficulty: "beginner",
        },
        {
          name: "State Management",
          href: "/topics/state-management",
          count: 18,
          difficulty: "intermediate",
        },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      items: [
        {
          name: "Node.js & Express",
          href: "/topics/nodejs-express",
          count: 22,
          difficulty: "intermediate",
        },
        {
          name: "API Design",
          href: "/topics/api-design",
          count: 16,
          difficulty: "intermediate",
        },
        {
          name: "Authentication",
          href: "/topics/authentication",
          count: 14,
          difficulty: "intermediate",
        },
        {
          name: "Server Architecture",
          href: "/topics/server-architecture",
          count: 12,
          difficulty: "advanced",
        },
      ],
    },
    {
      title: "Database Concepts",
      icon: Database,
      items: [
        {
          name: "SQL Fundamentals",
          href: "/topics/sql-fundamentals",
          count: 30,
          difficulty: "beginner",
          popular: true,
        },
        {
          name: "Database Design",
          href: "/topics/database-design",
          count: 18,
          difficulty: "intermediate",
        },
        {
          name: "NoSQL Databases",
          href: "/topics/nosql-databases",
          count: 15,
          difficulty: "intermediate",
        },
        {
          name: "Query Optimization",
          href: "/topics/query-optimization",
          count: 12,
          difficulty: "advanced",
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400";
      case "intermediate":
        return "text-orange-400";
      case "advanced":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="w-80 bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50 h-screen sticky top-16 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-orange-400" />
          <h2 className="text-lg font-space-grotesk font-semibold text-white">
            Learning Paths
          </h2>
        </div>
        <p className="text-sm text-gray-400 font-inter">
          Comprehensive programming curriculum
        </p>

        {/* Filter Section */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={16} className="text-orange-400" />
              <h3 className="text-sm font-space-grotesk font-semibold text-white">
                Difficulty Filter
              </h3>
            </div>
            <div className="space-y-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange?.(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-600/50 bg-gray-700/30 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-200 font-space-grotesk font-medium text-sm focus:outline-none"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {selectedDifficulty !== "all" && (
                <button
                  onClick={onClearFilters}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <X size={12} />
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="p-4 space-y-6">
        {sidebarSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <div key={sectionIndex}>
              <div className="flex items-center gap-2 mb-3">
                <SectionIcon size={16} className="text-orange-400" />
                <h3 className="text-sm font-space-grotesk font-semibold text-white uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
              <div className="space-y-1 ml-6">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="group flex items-center justify-between p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-sm font-inter truncate">
                        {item.name}
                      </span>
                      {item.popular && (
                        <Star
                          size={12}
                          className="text-orange-400 fill-current flex-shrink-0"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.count && (
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <div
                        className={`w-2 h-2 rounded-full ${getDifficultyColor(
                          item.difficulty
                        )}`}
                      />
                      <ChevronRight
                        size={12}
                        className="text-gray-500 group-hover:text-gray-300 transition-colors"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-orange-400/20 mt-auto">
        <div className="text-xs text-gray-400 font-inter space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Beginner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span>Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span>Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsSidebar;
