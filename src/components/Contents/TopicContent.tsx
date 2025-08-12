// components/Contents/TopicContent.tsx
"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../animations/LoadingSpinner";
import TopicHeader from "./TopicHeader";
import TabNavigation from "./TabNavigation";
import TopicOverview from "./TopicOverview";
import TopicQuiz from "./TopicQuiz";
import TopicAnimation from "./TopicAnimation";

interface TopicData {
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
  additional_content?: Array<{
    __component: string;
    id: string;
    code?: string;
    animation_code?: string;
    question?: string;
    options?: string[];
    correct_answer?: string;
    explanation?: string;
  }>;
}

// Generic component type for flexibility
type ComponentType = {
  __component: string;
  id: string;
  code?: string;
  animation_code?: string;
  question?: string;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
};

interface TopicContentProps {
  slug?: string;
}

const TopicContent: React.FC<TopicContentProps> = ({
  slug = "react-hooks",
}) => {
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Quiz state management
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState({
    correct: 0,
    total: 0,
    attempted: false,
  });

  // Animation state management
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchTopicContent(slug);
    }
  }, [slug]);

  const fetchTopicContent = async (topicSlug: string) => {
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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching topic content:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get difficulty colors
  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return {
          gradient: "from-green-500 to-emerald-500",
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
        };
      case "intermediate":
        return {
          gradient: "from-yellow-500 to-orange-500",
          bg: "bg-yellow-100",
          text: "text-orange-800",
          border: "border-yellow-200",
        };
      case "advanced":
        return {
          gradient: "from-red-500 to-pink-500",
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
        };
      default:
        return {
          gradient: "from-blue-500 to-purple-500",
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200",
        };
    }
  };

  // Quiz handlers
  const handleAnswerSelect = (quizId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: answer }));
  };

  const handleQuizSubmit = (quizId: string, correctAnswer: string) => {
    setShowResults((prev) => ({ ...prev, [quizId]: true }));
    const isCorrect = selectedAnswers[quizId] === correctAnswer;
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      attempted: true,
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults({});
    setQuizScore({ correct: 0, total: 0, attempted: false });
  };

  // Animation handlers
  const resetAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Tab change handler
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === "animation") {
      setAnimationKey((prev) => prev + 1);
    }

    if (tabName === "quiz") {
      resetQuiz();
    }
  };

  const getComponentsByType = (type: string) => {
    if (!topicData?.additional_content) return [];
    return topicData.additional_content.filter(
      (component) => component.__component === type
    );
  };

  // Render current tab content only
  const renderTabContent = () => {
    if (!topicData) return null;

    switch (activeTab) {
      case "overview":
        return (
          <TopicOverview
            topicData={topicData}
            getComponentsByType={getComponentsByType}
          />
        );
      case "quiz":
        return (
          <TopicQuiz
            getComponentsByType={getComponentsByType}
            selectedAnswers={selectedAnswers}
            showResults={showResults}
            quizScore={quizScore}
            onAnswerSelect={handleAnswerSelect}
            onQuizSubmit={handleQuizSubmit}
            onResetQuiz={resetQuiz}
          />
        );
      case "animation":
        return (
          <TopicAnimation
            getComponentsByType={getComponentsByType}
            animationKey={animationKey}
            onResetAnimation={resetAnimation}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50 animate-fadeInUp">
          <div className="text-8xl mb-6">😔</div>
          <p className="text-gray-600 mb-8 font-['Inter'] text-2xl">
            Error: {error}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50 animate-fadeInUp">
          <div className="text-8xl mb-6">😔</div>
          <p className="text-gray-600 mb-8 font-['Inter'] text-2xl">
            Topic not found
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const difficultyColors = getDifficultyColor(topicData.difficulty_level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Styles */}
      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
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
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          to {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.8);
          }
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.02);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Header */}
      <TopicHeader topicData={topicData} onBack={() => window.history.back()} />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        difficultyColors={difficultyColors}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          {renderTabContent()}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex justify-center gap-6 animate-fadeInUp">
          <button className="bg-white/90 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl hover:bg-white transition-all duration-300 font-['Space_Grotesk'] font-bold shadow-xl hover:scale-105 border border-gray-200">
            ← Previous Topic
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-['Space_Grotesk'] font-bold shadow-xl hover:scale-105">
            Next Topic →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicContent;
