import {
  ArrowRight,
  Brain,
  Code,
  Database,
  Globe,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";
import { topics } from "../../constants/Topics";

export const LearningTopicsSection = () => {
  return (
    <section id="topics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive collection of topics, each with
            articles, quizzes, interview questions, and visual content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${topic.color}`}></div>

              <div className="p-8">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${topic.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {topic.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {topic.title}
                </h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {topic.articleCount} Articles
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-gray-700">
                    What you'll get:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full bg-gradient-to-r ${topic.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]`}
                >
                  {topic.id === "more" ? "Stay Tuned" : "Start Learning"}
                  {topic.id !== "more" && <ArrowRight size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to start your learning journey?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse All Topics
          </button>
        </div>
      </div>
    </section>
  );
};
