"use client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatDate, getDifficultyColor } from "../helpers/strapiHelper";

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
    <div
      className={`bg-gradient-to-r ${difficultyColors.gradient} text-white relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button
          onClick={onBack}
          className="flex items-center gap-3 mb-10 text-white/90 hover:text-white transition-all duration-500 group hover:scale-105 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 hover:bg-white/20"
        >
          <ArrowLeft
            size={24}
            className="group-hover:-translate-x-2 transition-transform duration-300"
          />
          <span className="font-['Space_Grotesk'] font-semibold text-lg">
            Back to Topics
          </span>
        </button>

        <div className="max-w-5xl animate-fadeInUp">
          <h1 className="text-6xl md:text-7xl font-black mb-8 font-['Space_Grotesk'] leading-tight tracking-tight">
            {topicData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/95 mb-8">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-6 py-3 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Calendar size={22} className="text-white/80" />
              <span className="font-['Inter'] font-semibold">
                {formatDate(topicData.created)}
              </span>
            </div>

            {topicData.tags && (
              <div className="flex items-center gap-4">
                <Tag size={22} className="text-white/80" />
                <div className="flex flex-wrap gap-3">
                  {topicData.tags.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-['Space_Grotesk'] font-semibold hover:bg-white/25 transition-all duration-300 hover:scale-105"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <span
              className={`bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl font-['Space_Grotesk'] font-bold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105`}
            >
              {topicData.difficulty_level || "General"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicHeader;
