"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
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

const TopicCard = ({ topic }: { topic: Topic }) => {
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

  const descText =
    getDescriptionText(description) || getDescriptionText(introduction);
  const difficultyColor = getDifficultyColor(difficulty_level);

  return (
    <Link href={`/topics/${slug || id}`}>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden cursor-pointer h-full">
        {/* Difficulty indicator bar */}
        <div className={`h-2 bg-gradient-to-r ${difficultyColor}`}></div>

        {/* Image */}
        {image && image.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={`http://localhost:1337${
                image[0].formats?.medium?.url || image[0].url
              }`}
              alt={image[0].alternativeText || title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              fill
            />
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${difficultyColor}`}
              >
                {difficulty_level || "General"}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {descText ||
              "Learn about this exciting programming topic with hands-on examples and interactive content."}
          </p>

          {/* Tags */}
          {tags && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-1">
                {tags.split(",").map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(created)}
          </div>

          {/* CTA Button */}
          <div
            className={`w-full bg-gradient-to-r ${difficultyColor} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]`}
          >
            Start Learning
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
