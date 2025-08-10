"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Loader2, ArrowRight } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading topics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchTopics}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Learning Topics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our comprehensive collection of programming topics. Each
            topic includes detailed articles, interactive content, quizzes, and
            practical examples.
          </p>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Topics
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        {topics.length === 0 && !loading && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No topics found
            </h3>
            <p className="text-gray-500">
              Check back later for new learning content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
