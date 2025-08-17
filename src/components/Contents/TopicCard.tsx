"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, Star } from "lucide-react";
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
          gradient: "from-green-600 to-green-700",
          bg: "bg-green-500/10",
          text: "text-green-400",
          border: "border-green-500/20",
        };
      case "intermediate":
        return {
          gradient: "from-orange-600 to-orange-700",
          bg: "bg-orange-500/10",
          text: "text-orange-400",
          border: "border-orange-500/20",
        };
      case "advanced":
        return {
          gradient: "from-red-600 to-red-700",
          bg: "bg-red-500/10",
          text: "text-red-400",
          border: "border-red-500/20",
        };
      default:
        return {
          gradient: "from-slate-600 to-slate-700",
          bg: "bg-slate-500/10",
          text: "text-slate-400",
          border: "border-slate-500/20",
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
      <div className="group relative bg-gray-800/40 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-700/30 overflow-hidden cursor-pointer hover:border-gray-600/50 flex flex-col aspect-[2.5/3.5] min-h-[280px]">
        {/* Difficulty indicator bar */}
        <div
          className={`h-1 bg-gradient-to-r ${difficultyColor.gradient}`}
        ></div>

        {/* Image Container - Reduced height for playing card proportions */}
        <div className="relative h-32 overflow-hidden bg-gray-700/20">
          {image && image.length > 0 ? (
            <>
              <Image
                src={`http://localhost:1337${
                  image[0].formats?.medium?.url || image[0].url
                }`}
                alt={image[0].alternativeText || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gray-600/10 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl text-gray-400">📚</div>
              </div>
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${
                difficultyColor.gradient
                  .replace("from-", "bg-")
                  .replace(" to-", "")
                  .split(" ")[0]
              }`}
            >
              {difficulty_level || "General"}
            </span>
            <div className="flex items-center gap-1 bg-gray-900/80 rounded px-2 py-1">
              <Clock size={10} className="text-gray-300" />
              <span className="text-xs text-white font-medium">
                {readTime} min
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-200 font-space-grotesk leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-3 line-clamp-2 font-inter leading-snug flex-grow text-xs">
            {descText ||
              "Explore this comprehensive programming topic with hands-on examples, interactive content, and practical exercises designed to enhance your coding skills."}
          </p>

          {/* Tags */}
          {tags && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {tags
                  .split(",")
                  .slice(0, 2)
                  .map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className={`text-xs ${difficultyColor.bg} ${difficultyColor.text} px-1.5 py-0.5 rounded font-medium border ${difficultyColor.border}`}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                {tags.split(",").length > 2 && (
                  <span className="text-xs bg-gray-600/20 text-gray-400 px-1.5 py-0.5 rounded font-medium border border-gray-600/20">
                    +{tags.split(",").length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs text-gray-400 font-inter">
              <Calendar className="w-2.5 h-2.5 mr-1" />
              <span className="text-xs">{formatDate(created)}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-orange-400 fill-current" />
              <Star className="w-2.5 h-2.5 text-orange-400 fill-current" />
              <Star className="w-2.5 h-2.5 text-orange-400 fill-current" />
              <Star className="w-2.5 h-2.5 text-orange-400 fill-current" />
              <Star className="w-2.5 h-2.5 text-gray-500" />
              <span className="text-xs text-gray-400 ml-1 font-medium">
                4.0
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-orange-600 text-white py-2 rounded font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-1 mt-auto text-xs shadow-lg">
            <span className="font-space-grotesk">Start Learning</span>
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
