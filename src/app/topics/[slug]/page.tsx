"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Calendar, Tag, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CodeExample from "../../../components/Contents/CodeExample";
import Quiz from "../../../components/Contents/Quiz";
import AnimationBlock from "../../../components/Contents/AnimationBlock";

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
    children?: Array<{
      text?: string;
      type?: string;
      children?: Array<{ text?: string }>;
    }>;
    level?: number;
  }>;
  additional_content: Array<{
    __component: string;
    id: number;
    code?: string;
    animation_code?: string;
    question?: string;
    correct_answer?: string;
    explanation?: string;
    options?: string[];
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

const TopicPage = () => {
  const params = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchTopic(params.slug as string);
    }
  }, [params.slug]);

  const fetchTopic = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:1337/api/topics?filters[slug][$eq]=${slug}&populate=*`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topic");
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setTopic(data.data[0]);
      } else {
        setError("Topic not found");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching topic:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const getIntroductionText = (intro: Topic["introduction"]) => {
    if (!intro || !Array.isArray(intro)) return "";
    const paragraph = intro.find((item) => item.type === "paragraph");
    return paragraph?.children?.[0]?.text || "";
  };

  const getDescriptionText = (desc: Topic["description"]) => {
    if (!desc || !Array.isArray(desc)) return "";
    const paragraph = desc.find((item) => item.type === "paragraph");
    return paragraph?.children?.[0]?.text || "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "from-green-500 to-emerald-500";
      case "intermediate":
        return "from-yellow-500 to-orange-500";
      case "advanced":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Error: {error || "Topic not found"}
          </p>
          <Link
            href="/topics"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  const introText = getIntroductionText(topic.introduction);
  const descriptionText = getDescriptionText(topic.description);
  const difficultyColor = getDifficultyColor(topic.difficulty_level);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/topics"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Topics
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Difficulty indicator bar */}
          <div className={`h-2 bg-gradient-to-r ${difficultyColor}`}></div>

          {/* Image */}
          {topic.image && topic.image.length > 0 && (
            <div className="relative h-64 overflow-hidden">
              <Image
                src={`http://localhost:1337${
                  topic.image[0].formats?.large?.url || topic.image[0].url
                }`}
                alt={topic.image[0].alternativeText || topic.title}
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${difficultyColor}`}
                >
                  {topic.difficulty_level || "General"}
                </span>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {topic.title}
            </h1>

            {/* Introduction */}
            <p className="text-xl text-gray-600 mb-6">
              {introText ||
                "Learn about this exciting programming topic with hands-on examples and interactive content."}
            </p>

            {/* Meta Information */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(topic.created)}
              </div>
              {topic.tags && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{topic.tags}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Description content */}
          {topic.description?.map((section, index) => {
            if (section.type === "paragraph" && section.children) {
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {section.children[0]?.text}
                  </p>
                </div>
              );
            }

            if (section.type === "heading" && section.children) {
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h2
                    className={`text-${
                      section.level === 3 ? "2xl" : "xl"
                    } font-bold text-gray-900 mb-3`}
                  >
                    {section.children[0]?.text}
                  </h2>
                </div>
              );
            }

            if (section.type === "list" && section.children) {
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <ol className="list-decimal list-inside space-y-2">
                    {section.children.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item.children?.[0]?.text}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            }

            return null;
          })}

          {/* Additional content (code examples, animations, quizzes) */}
          {topic.additional_content?.map((section, index) => {
            if (section.__component === "shared.code-example" && section.code) {
              return (
                <div key={index}>
                  <CodeExample code={section.code} />
                </div>
              );
            }

            if (
              section.__component === "shared.animation-block" &&
              section.animation_code
            ) {
              return (
                <div key={index}>
                  <AnimationBlock animationCode={section.animation_code} />
                </div>
              );
            }

            if (section.__component === "shared.quiz" && section.question) {
              const quizData = {
                id: section.id.toString(),
                question: section.question,
                options: section.options || [],
                correct_answer: section.correct_answer || "",
                explanation: section.explanation,
              };

              return (
                <div key={index}>
                  <Quiz
                    quiz={quizData}
                    selectedAnswer={selectedAnswer}
                    showResult={showResult}
                    onAnswerSelect={handleAnswerSelect}
                    onSubmit={handleSubmit}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Topics
            </Link>
            <div className="text-sm text-gray-500">
              Ready to learn more? Explore other topics!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
