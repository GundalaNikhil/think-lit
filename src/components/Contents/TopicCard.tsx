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
          gradient: "from-gray-800 to-gray-900",
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
        };
      case "intermediate":
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
        };
      case "advanced":
        return {
          gradient: "from-gray-600 to-gray-700",
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
        };
      default:
        return {
          gradient: "from-gray-800 to-gray-900",
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-200",
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
      <div className="group relative bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer h-full">
        {/* Difficulty indicator bar */}
        <div className="h-1 bg-gray-900"></div>

        {/* Image Container */}
        <div className="relative h-40 overflow-hidden bg-gray-100">
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
            <div className="w-full h-full bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl text-gray-400">📚</div>
              </div>
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white bg-gray-900">
              {difficulty_level || "General"}
            </span>
            <div className="flex items-center gap-1 bg-gray-900 rounded px-2 py-1">
              <Clock size={10} className="text-white" />
              <span className="text-xs text-white font-medium">
                {readTime} min
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200 font-space-grotesk leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 font-inter leading-relaxed flex-grow text-sm">
            {descText ||
              "Explore this comprehensive programming topic with hands-on examples, interactive content, and practical exercises designed to enhance your coding skills."}
          </p>

          {/* Tags */}
          {tags && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tags
                  .split(",")
                  .slice(0, 3)
                  .map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium border border-gray-200"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                {tags.split(",").length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium border border-gray-200">
                    +{tags.split(",").length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-xs text-gray-500 font-inter">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(created)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gray-400 fill-current" />
              <Star className="w-3 h-3 text-gray-400 fill-current" />
              <Star className="w-3 h-3 text-gray-400 fill-current" />
              <Star className="w-3 h-3 text-gray-400 fill-current" />
              <Star className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-500 ml-1 font-medium">
                4.0
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 mt-auto text-sm">
            <span className="font-space-grotesk">Start Learning</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
