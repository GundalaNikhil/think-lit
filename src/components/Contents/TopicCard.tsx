"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Tag, Clock, Star } from "lucide-react";
import Image from "next/image";

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

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const {
    id,
    title,
    slug,
    introduction,
    description,
    tags,
    difficulty_level,
    created,
    image,
  } = topic;

  // Extract text from description array (fallback to introduction)
  const getDescriptionText = (desc: Topic["description"]) => {
    if (!desc || !Array.isArray(desc)) return "";
    const paragraph = desc.find((item) => item.type === "paragraph");
    return paragraph?.children?.[0]?.text || "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const getEstimatedReadTime = () => {
    const descText =
      getDescriptionText(description) || getDescriptionText(introduction);
    const wordCount = descText.split(" ").length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    return readTime;
  };

  const descText =
    getDescriptionText(description) || getDescriptionText(introduction);
  const difficultyColor = getDifficultyColor(difficulty_level);
  const readTime = getEstimatedReadTime();

  return (
    <Link href={`/topics/${slug || id}`} className="block h-full">
      <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden cursor-pointer h-full transform hover:-translate-y-2">
        {/* Difficulty indicator bar */}
        <div
          className={`h-2 bg-gradient-to-r ${difficultyColor.gradient} relative`}
        >
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-500"></div>
        </div>

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {image && image.length > 0 ? (
            <>
              <Image
                src={`http://localhost:1337${
                  image[0].formats?.medium?.url || image[0].url
                }`}
                alt={image[0].alternativeText || title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500"></div>
            </>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${difficultyColor.gradient} relative`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-white/80">📚</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${difficultyColor.gradient} shadow-lg`}
            >
              {difficulty_level || "General"}
            </span>
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Clock size={12} className="text-white" />
              <span className="text-xs text-white font-bold">
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-purple-600/10 group-hover:to-purple-600/5 transition-all duration-500"></div>
        </div>

        <div className="p-8 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300 font-['Space_Grotesk'] leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-3 font-['Inter'] leading-relaxed flex-grow">
            {descText ||
              "Explore this comprehensive programming topic with hands-on examples, interactive content, and practical exercises designed to enhance your coding skills."}
          </p>

          {/* Tags */}
          {tags && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-700 font-['Space_Grotesk']">
                  Topics:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags
                  .split(",")
                  .slice(0, 3)
                  .map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className={`text-xs ${difficultyColor.bg} ${difficultyColor.text} px-3 py-1 rounded-full font-bold border ${difficultyColor.border} hover:scale-105 transition-transform duration-200`}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                {tags.split(",").length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold border border-gray-200">
                    +{tags.split(",").length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-sm text-gray-500 font-['Inter']">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(created)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-gray-300" />
              <span className="text-xs text-gray-500 ml-1 font-bold">4.0</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className={`w-full bg-gradient-to-r ${difficultyColor.gradient} text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 group-hover:translate-y-[-2px] relative overflow-hidden mt-auto`}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>
            <span className="relative z-10 font-['Space_Grotesk'] text-lg">
              Start Learning
            </span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform duration-300 relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
      </div>
    </Link>
  );
};

export default TopicCard;
