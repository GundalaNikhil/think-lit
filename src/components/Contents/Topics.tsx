"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Loader2, Code, Zap, Trophy, Grid3x3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopicCard from "./TopicCard";
import TopicsLayout from "../Navigation/TopicsLayout";

interface Topic {
  id: number;
  title: string;
  slug: string;
  introduction: Array<{
    type: string;
    children?: Array<{ text?: string }>;
  }>;
  description: Array<{
    type: string;
    children?: Array<{ text?: string }>;
    level?: number;
  }>;
  tags: string;
  difficulty_level: string;
  created: string;
  image: Array<{
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  }>;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{
  value: number;
  delay?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}> = ({ value, delay = 0, icon: Icon, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      setHasAnimated(true);
      return;
    }

    const timer = setTimeout(() => {
      setHasAnimated(true);
      const duration = 1500; // 1.5 seconds
      const steps = 30;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-center shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="flex items-center justify-center mb-1">
        <Icon size={18} className="text-orange-400 mr-2" />
        <div className="text-xl font-bold text-orange-400">{count}</div>
      </div>
      <div className="text-xs font-space-grotesk font-medium text-gray-300">
        {label}
      </div>
    </motion.div>
  );
};

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:1337/api/topics?populate=*"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      const data = await response.json();
      setTopics(data.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterTopics = useCallback(() => {
    let filtered = topics;

    // Case-insensitive search in title and tags
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(query) ||
          topic.tags?.toLowerCase().includes(query)
      );
    }

    // Filter by difficulty level
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (topic) =>
          topic.difficulty_level?.toLowerCase() ===
          selectedDifficulty.toLowerCase()
      );
    }

    setFilteredTopics(filtered);
  }, [topics, searchQuery, selectedDifficulty]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
  };

  useEffect(() => {
    filterTopics();
  }, [filterTopics]);

  const getDifficultyStats = () => {
    const stats = topics.reduce((acc, topic) => {
      const level = topic.difficulty_level?.toLowerCase() || "general";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-amber-300 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-orange-500 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-amber-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-4 bg-slate-700/60 backdrop-blur-sm rounded-lg p-8 border border-orange-400/20 shadow-xl">
          <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
          <p className="text-slate-200 font-inter">Loading topics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-amber-300 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-orange-500 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="text-center bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 border border-orange-400/20 shadow-xl">
          <div className="text-4xl mb-4">👻</div>
          <p className="text-gray-200 mb-6 font-inter">Oops! {error}</p>
          <button
            onClick={fetchTopics}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors font-space-grotesk font-medium text-sm shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const difficultyStats = getDifficultyStats();

  return (
    <TopicsLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedDifficulty={selectedDifficulty}
      onDifficultyChange={setSelectedDifficulty}
      onClearFilters={clearFilters}
    >
      <div className="relative overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-20 right-20 w-0.5 h-0.5 bg-amber-300 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-40 left-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-60 right-1/3 w-0.5 h-0.5 bg-amber-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/3 w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-0.5 h-0.5 bg-amber-500 rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
        <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounceGentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

        <div className="max-w-6xl mx-auto px-4 lg:px-8 lg:ml-8 py-4 lg:py-6 relative z-10">
          {/* Header Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BookOpen size={24} className="text-orange-400" />
              </motion.div>
              <h1 className="text-3xl font-space-grotesk font-bold text-white">
                Learning Topics
              </h1>
            </div>
            <h2 className="text-2xl font-space-grotesk font-semibold mb-4 text-orange-300">
              Master Programming Concepts
            </h2>
            <p className="text-gray-300 max-w-3xl font-inter leading-relaxed">
              Explore our comprehensive collection of programming topics. Each
              topic includes detailed articles, interactive content, quizzes,
              and practical examples to accelerate your learning journey.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6 max-w-3xl lg:max-w-4xl">
            <AnimatedCounter
              value={topics.length}
              delay={0}
              icon={Grid3x3}
              label="Total Topics"
            />
            <AnimatedCounter
              value={difficultyStats.beginner || 0}
              delay={200}
              icon={Zap}
              label="Beginner"
            />
            <AnimatedCounter
              value={difficultyStats.intermediate || 0}
              delay={400}
              icon={Code}
              label="Intermediate"
            />
            <AnimatedCounter
              value={difficultyStats.advanced || 0}
              delay={600}
              icon={Trophy}
              label="Advanced"
            />
          </div>
        </div>

        {/* Results Summary */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-400 font-inter text-sm">
            Showing{" "}
            <span className="font-semibold text-orange-400">
              {filteredTopics.length}
            </span>{" "}
            of <span className="font-semibold text-white">{topics.length}</span>{" "}
            topics
          </p>
        </motion.div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="h-full"
                >
                  <TopicCard topic={topic} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👻</div>
            <h3 className="text-xl font-semibold text-white mb-2 font-space-grotesk">
              No topics found
            </h3>
            <p className="text-gray-400 mb-6 font-inter">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors font-space-grotesk font-medium text-sm shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Navigation */}
        {filteredTopics.length > 0 && (
          <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 shadow-lg inline-block">
              <h4 className="text-lg font-semibold text-white mb-2 font-space-grotesk">
                Ready to start learning?
              </h4>
              <p className="text-gray-300 mb-4 font-inter text-sm">
                Choose any topic above and begin your programming journey!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-orange-600 text-white px-3 py-1.5 rounded-md hover:bg-orange-700 transition-colors font-space-grotesk font-medium text-xs shadow-lg">
                  Start with Basics
                </button>
                <button className="bg-amber-600 text-white px-3 py-1.5 rounded-md hover:bg-amber-700 transition-colors font-space-grotesk font-medium text-xs shadow-lg">
                  Intermediate Level
                </button>
                <button className="bg-gray-600 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors font-space-grotesk font-medium text-xs shadow-lg">
                  Advanced Topics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TopicsLayout>
  );
};

export default Topics;
