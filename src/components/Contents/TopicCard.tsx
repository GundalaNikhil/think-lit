"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Topic } from "@/types/topic";
import { formatDate } from "@/utils/date";
import { getDifficultyConfig } from "@/utils/difficulty";

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const {
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

  const difficultyConfig = getDifficultyConfig(difficulty_level);
  const descText =
    getDescriptionText(description) || getDescriptionText(introduction);

  return (
    <Link href={`/topics/${slug || topic.id}`}>
      <Card hover className="h-full cursor-pointer overflow-hidden">
        {/* Difficulty indicator bar */}
        <div className={`h-2 bg-gradient-to-r ${difficultyConfig.gradient}`} />

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
              <Badge
                variant="primary"
                size="sm"
                className="bg-white/90 text-gray-800 backdrop-blur-sm"
              >
                {difficultyConfig.label}
              </Badge>
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
                  <Badge key={idx} variant="default" size="sm">
                    {tag.trim()}
                  </Badge>
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
          <Button
            variant="primary"
            size="lg"
            className={`w-full bg-gradient-to-r ${difficultyConfig.gradient} hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-2px]`}
          >
            Start Learning
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default TopicCard;
