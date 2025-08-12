"use client";

import { useState, useEffect } from "react";
import { BookOpen, Loader2, ArrowRight, Search, Filter } from "lucide-react";
import TopicCard from "./TopicCard";
import Link from "next/link";

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

  useEffect(() => {
    filterTopics();
  }, [topics, searchQuery, selectedDifficulty]);

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

  const filterTopics = () => {
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
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
          <p className="text-gray-600 text-xl font-['Inter']">
            Loading amazing topics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50">
          <div className="text-8xl mb-6">😕</div>
          <p className="text-red-600 mb-6 text-xl font-['Inter']">
            Oops! {error}
          </p>
          <button
            onClick={fetchTopics}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-['Space_Grotesk'] font-bold transform hover:scale-105 shadow-xl"
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    );
  }

  const difficultyStats = getDifficultyStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg mb-8 animate-bounce-gentle">
            <BookOpen size={32} />
            <h1 className="text-3xl font-black font-['Space_Grotesk']">
              Learning Topics
            </h1>
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6 font-['Space_Grotesk'] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Master Programming Concepts
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 font-['Inter'] leading-relaxed">
            Explore our comprehensive collection of programming topics. Each
            topic includes detailed articles, interactive content, quizzes, and
            practical examples to accelerate your learning journey.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">
                {topics.length}
              </div>
              <div className="text-sm font-['Space_Grotesk'] font-bold text-gray-700">
                Total Topics
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-green-600 mb-2">
                {difficultyStats.beginner || 0}
              </div>
              <div className="text-sm font-['Space_Grotesk'] font-bold text-gray-700">
                Beginner
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-yellow-600 mb-2">
                {difficultyStats.intermediate || 0}
              </div>
              <div className="text-sm font-['Space_Grotesk'] font-bold text-gray-700">
                Intermediate
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-red-600 mb-2">
                {difficultyStats.advanced || 0}
              </div>
              <div className="text-sm font-['Space_Grotesk'] font-bold text-gray-700">
                Advanced
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 glass-effect rounded-3xl p-8 shadow-xl animate-slideInLeft">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search topics by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-['Inter'] text-lg"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-6 py-4 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-['Space_Grotesk'] font-bold bg-white"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-['Inter']">
              Showing{" "}
              <span className="font-bold text-blue-600">
                {filteredTopics.length}
              </span>{" "}
              of <span className="font-bold">{topics.length}</span> topics
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TopicCard topic={topic} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fadeInUp">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4 font-['Space_Grotesk']">
              No topics found
            </h3>
            <p className="text-gray-500 mb-8 font-['Inter'] text-lg">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-['Space_Grotesk'] font-bold transform hover:scale-105 shadow-xl"
            >
              Clear Filters 🔄
            </button>
          </div>
        )}

        {/* Quick Navigation */}
        {filteredTopics.length > 0 && (
          <div className="text-center mt-16 animate-fadeInUp">
            <div className="glass-effect rounded-3xl p-8 inline-block">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
                Ready to start learning?
              </h4>
              <p className="text-gray-600 mb-6 font-['Inter']">
                Choose any topic above and begin your programming journey!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-['Space_Grotesk'] font-bold">
                  Start with Basics
                </button>
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-['Space_Grotesk'] font-bold">
                  Intermediate Level
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-['Space_Grotesk'] font-bold">
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
