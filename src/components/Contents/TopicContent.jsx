"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";

const TopicContent = ({ slug }) => {
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [showResults, setShowResults] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      fetchTopicContent(slug);
    }
  }, [slug]);

  const fetchTopicContent = async (topicSlug) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:1337/api/topics?filters[slug][$eq]=${topicSlug}&populate=*`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topic content");
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setTopicData(data.data[0]);
      } else {
        throw new Error("Topic not found");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching topic content:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDifficultyColor = (level) => {
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

  const renderContent = (contentArray) => {
    if (!Array.isArray(contentArray)) return null;

    return contentArray.map((item, index) => {
      switch (item.type) {
        case "heading":
          const HeadingTag = `h${item.level}`;
          return (
            <HeadingTag
              key={index}
              className={`font-bold text-gray-900 mb-4 ${
                item.level === 1
                  ? "text-3xl"
                  : item.level === 2
                  ? "text-2xl"
                  : item.level === 3
                  ? "text-xl"
                  : "text-lg"
              }`}
            >
              {item.children?.[0]?.text || ""}
            </HeadingTag>
          );

        case "paragraph":
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {item.children?.[0]?.text || ""}
            </p>
          );

        case "list":
          const ListTag = item.format === "ordered" ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`mb-4 ml-6 ${
                item.format === "ordered" ? "list-decimal" : "list-disc"
              }`}
            >
              {item.children?.map((listItem, listIndex) => (
                <li key={listIndex} className="text-gray-700 mb-2">
                  {listItem.children?.[0]?.text || ""}
                </li>
              ))}
            </ListTag>
          );

        default:
          return null;
      }
    });
  };

  const handleAnswerSelect = (quizId, answer) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [quizId]: answer,
    }));
  };

  const handleQuizSubmit = (quizId, correctAnswer) => {
    setShowResults((prev) => ({
      ...prev,
      [quizId]: true,
    }));
  };

  const renderAdditionalContent = (additionalContent) => {
    if (!Array.isArray(additionalContent)) return null;

    return additionalContent.map((component, index) => {
      switch (component.__component) {
        case "shared.code-example":
          return <CodeExample key={index} code={component.code} />;

        case "shared.quiz":
          return (
            <Quiz
              key={index}
              quiz={component}
              selectedAnswer={selectedAnswer[component.id]}
              showResult={showResults[component.id]}
              onAnswerSelect={(answer) =>
                handleAnswerSelect(component.id, answer)
              }
              onSubmit={() =>
                handleQuizSubmit(component.id, component.correct_answer)
              }
            />
          );

        case "shared.animation-block":
          return (
            <AnimationBlock
              key={index}
              animationCode={component.animation_code}
            />
          );

        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading topic content...</p>
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
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Topic not found</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const difficultyColor = getDifficultyColor(topicData.difficulty_level);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${difficultyColor} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Topics
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {topicData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(topicData.created)}
            </div>

            {topicData.tags && (
              <div className="flex items-center gap-2">
                <Tag size={16} />
                {topicData.tags.split(",").map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 px-2 py-1 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {topicData.difficulty_level || "General"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          {topicData.image && topicData.image.length > 0 && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={`http://localhost:1337${topicData.image[0].url}`}
                alt={topicData.image[0].alternativeText || topicData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Introduction */}
            {topicData.introduction && (
              <div className="mb-8">
                {renderContent(topicData.introduction)}
              </div>
            )}

            {/* Main Description */}
            {topicData.description && (
              <div className="mb-8">{renderContent(topicData.description)}</div>
            )}

            {/* Additional Content */}
            {topicData.additional_content && (
              <div className="space-y-8">
                {renderAdditionalContent(topicData.additional_content)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicContent;
