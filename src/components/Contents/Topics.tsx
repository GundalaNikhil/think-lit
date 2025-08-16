"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, Loader2, Search, Filter } from "lucide-react";
import TopicCard from "./TopicCard";

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

    if (searchQuery) {
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (topic) =>
          topic.difficulty_level?.toLowerCase() ===
          selectedDifficulty.toLowerCase()
      );
    }

    setFilteredTopics(filtered);
  }, [topics, searchQuery, selectedDifficulty]);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white rounded-md p-8 shadow-sm border border-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <p className="text-gray-600 font-inter">Loading topics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center bg-white rounded-md p-8 shadow-sm border border-gray-200">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-gray-600 mb-6 font-inter">Oops! {error}</p>
          <button
            onClick={fetchTopics}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-space-grotesk font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const difficultyStats = getDifficultyStats();

  return (
    <div className="min-h-screen bg-white">
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

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={24} className="text-gray-700" />
            <h1 className="text-3xl font-space-grotesk font-bold text-gray-900">
              Learning Topics
            </h1>
          </div>
          <h2 className="text-2xl font-space-grotesk font-semibold mb-4 text-gray-800">
            Master Programming Concepts
          </h2>
          <p className="text-gray-600 max-w-3xl font-inter leading-relaxed">
            Explore our comprehensive collection of programming topics. Each
            topic includes detailed articles, interactive content, quizzes, and
            practical examples to accelerate your learning journey.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl">
            <div className="bg-white border border-gray-200 rounded-md p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {topics.length}
              </div>
              <div className="text-xs font-space-grotesk font-medium text-gray-600">
                Total Topics
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {difficultyStats.beginner || 0}
              </div>
              <div className="text-xs font-space-grotesk font-medium text-gray-600">
                Beginner
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {difficultyStats.intermediate || 0}
              </div>
              <div className="text-xs font-space-grotesk font-medium text-gray-600">
                Intermediate
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {difficultyStats.advanced || 0}
              </div>
              <div className="text-xs font-space-grotesk font-medium text-gray-600">
                Advanced
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white border border-gray-200 rounded-md p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search topics by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 font-inter"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-600" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 font-space-grotesk font-medium bg-white text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600 font-inter text-sm">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredTopics.length}
              </span>{" "}
              of <span className="font-semibold">{topics.length}</span> topics
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTopics.map((topic) => (
              <div key={topic.id}>
                <TopicCard topic={topic} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-space-grotesk">
              No topics found
            </h3>
            <p className="text-gray-500 mb-6 font-inter">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
              }}
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-space-grotesk font-medium text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Navigation */}
        {filteredTopics.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <div className="bg-white rounded-md p-6 border border-gray-200 shadow-sm inline-block">
              <h4 className="text-lg font-semibold text-gray-900 mb-2 font-space-grotesk">
                Ready to start learning?
              </h4>
              <p className="text-gray-600 mb-4 font-inter text-sm">
                Choose any topic above and begin your programming journey!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors font-space-grotesk font-medium text-xs">
                  Start with Basics
                </button>
                <button className="bg-gray-600 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors font-space-grotesk font-medium text-xs">
                  Intermediate Level
                </button>
                <button className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-gray-500 transition-colors font-space-grotesk font-medium text-xs">
                  Advanced Topics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
