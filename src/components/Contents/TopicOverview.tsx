"use client";
import { BookOpen } from "lucide-react";
import ContentRenderer from "./ContentRenderer";
import CodeExample from "./CodeExample";

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

interface CodeExampleComponent {
  id: string;
  code?: string;
}

interface TopicOverviewProps {
  topicData: TopicData;
  getComponentsByType: (type: string) => CodeExampleComponent[];
}

const TopicOverview: React.FC<TopicOverviewProps> = ({
  topicData,
  getComponentsByType,
}) => {
  return (
    <div className="p-16">
      <div className="text-center mb-16 animate-fadeInUp">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg mb-8">
          <BookOpen size={32} />
          <h2 className="text-3xl font-black font-['Space_Grotesk']">
            Course Overview
          </h2>
        </div>
        <p className="text-xl text-gray-600 font-['Inter'] max-w-3xl mx-auto">
          Dive deep into the fundamentals and master every concept with our
          comprehensive learning materials.
        </p>
      </div>

      {/* Hero Image */}
      {topicData.image && topicData.image.length > 0 && (
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-3xl mb-16 shadow-2xl hover-lift animate-fadeInUp">
          <img
            src={`http://localhost:1337${topicData.image[0].url}`}
            alt={topicData.image[0].alternativeText || topicData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-2xl font-bold font-['Space_Grotesk'] text-shadow">
              {topicData.image[0].alternativeText ||
                "Learn with Visual Examples"}
            </p>
          </div>
        </div>
      )}

      {/* Introduction Section */}
      {topicData.introduction && (
        <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-200 hover-lift animate-fadeInUp">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-3xl font-black font-['Space_Grotesk'] text-gray-900">
              Getting Started
            </h3>
          </div>
          <ContentRenderer contentArray={topicData.introduction} />
        </div>
      )}

      {/* Main Description Section */}
      {topicData.description && (
        <div className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 border border-purple-200 hover-lift animate-fadeInUp">
          <ContentRenderer contentArray={topicData.description} />
        </div>
      )}

      {/* Code Examples Section */}
      <div className="mb-16">
        <div className="text-center mb-12 animate-fadeInUp">
          <h3 className="text-4xl font-black font-['Space_Grotesk'] text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Code Examples
          </h3>
          <p className="text-xl text-gray-600 font-['Inter']">
            Hands-on examples to reinforce your learning
          </p>
        </div>
        {getComponentsByType("shared.code-example").map(
          (component, index) =>
            component.code && <CodeExample key={index} code={component.code} />
        )}
      </div>
    </div>
  );
};

export default TopicOverview;
