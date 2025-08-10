"use client";

import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import TopicCard from "./TopicCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Button from "@/components/ui/Button";
import { useTopics } from "@/hooks/useTopics";

const Topics = () => {
  const { topics, loading, error, refetch } = useTopics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading topics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Failed to load topics
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>

          <Button onClick={refetch} variant="primary" className="w-full">
            Try Again
          </Button>
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
          <Link href="/topics">
            <Button size="lg" className="inline-flex items-center gap-2">
              View All Topics
              <ArrowRight size={20} />
            </Button>
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
