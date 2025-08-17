// components/Contents/TopicContent.tsx
"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../animations/LoadingSpinner";
import TopicHeader from "./TopicHeader";
import TabNavigation from "./TabNavigation";
import TopicOverview from "./TopicOverview";
import TopicQuiz from "./TopicQuiz";
import TopicAnimation from "./TopicAnimation";
import SidebarLayout from "./SidebarLayout";
import Navbar from "../Navigation/Navbar";

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

  // Mock topics data for sidebar (in real app, this would come from API)
  const mockTopics = [
    {
      id: "1",
      title: "Introduction to Arrays",
      slug: "introduction-to-arrays",
      difficulty_level: "beginner",
      completed: true,
    },
    {
      id: "2",
      title: "Array Methods",
      slug: "array-methods",
      difficulty_level: "beginner",
      completed: true,
    },
    {
      id: "3",
      title: "React Hooks",
      slug: "react-hooks",
      difficulty_level: "intermediate",
      completed: false,
    },
    {
      id: "4",
      title: "State Management",
      slug: "state-management",
      difficulty_level: "intermediate",
      completed: false,
    },
    {
      id: "5",
      title: "Advanced Patterns",
      slug: "advanced-patterns",
      difficulty_level: "advanced",
      completed: false,
    },
    {
      id: "6",
      title: "Performance Optimization",
      slug: "performance-optimization",
      difficulty_level: "advanced",
      completed: false,
    },
  ];

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

  // Tab change handler with proper cleanup
  const handleTabChange = (tabName: string) => {
    // Prevent unnecessary re-renders
    if (activeTab === tabName) {
      return;
    }

    try {
      // Force a small delay to ensure clean state transition
      setTimeout(() => {
        setActiveTab(tabName);

        if (tabName === "animation") {
          setAnimationKey((prev) => prev + 1);
        }

        if (tabName === "quiz") {
          resetQuiz();
        }
      }, 50);
    } catch (error) {
      console.error("Error during tab switch:", error);
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
    if (!topicData) {
      return null;
    }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <Navbar showSearch={false} />
      <SidebarLayout currentTopicSlug={slug || ""} topics={mockTopics}>
        <div className="min-h-screen bg-transparent">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white">
            <div className="max-w-5xl mx-auto">
              <TopicHeader topicData={topicData} />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto">
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                difficultyColors={difficultyColors}
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white">
            <div className="max-w-5xl mx-auto">
              <div
                key={`tab-${activeTab}-${animationKey}`}
                className="min-h-[600px] tab-content tab-transition"
              >
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default TopicContent;
