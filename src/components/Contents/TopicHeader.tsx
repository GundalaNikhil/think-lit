"use client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
// import { formatDate, getDifficultyColor } from "../helpers/strapiHelper"; // Commented out unused imports

interface TopicData {
  title: string;
  difficulty_level: string;
  created: string;
  tags?: string;
}

interface TopicHeaderProps {
  topicData: TopicData;
  onBack: () => void;
}

const TopicHeader: React.FC<TopicHeaderProps> = ({ topicData, onBack }) => {
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
        return { gradient: "from-green-500 to-emerald-500" };
      case "intermediate":
        return { gradient: "from-yellow-500 to-orange-500" };
      case "advanced":
        return { gradient: "from-red-500 to-pink-500" };
      default:
        return { gradient: "from-blue-500 to-purple-500" };
    }
  };

  const difficultyColors = getDifficultyColor(topicData.difficulty_level);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk text-gray-900 leading-tight">
            {topicData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-inter">
                {formatDate(topicData.created)}
              </span>
            </div>

            {topicData.tags && (
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <div className="flex flex-wrap gap-2">
                  {topicData.tags.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-2 py-1 rounded text-xs font-space-grotesk font-medium text-gray-700"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <span className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-space-grotesk font-medium">
              {topicData.difficulty_level || "General"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicHeader;
