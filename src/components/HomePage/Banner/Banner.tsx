import { ThreeScene } from "@/animations/ThreeScene";
import { TypewriterAnimation } from "@/animations/TypewriterAnimation";
import { ArrowRight, BookOpen, Eye, HelpCircle, Play } from "lucide-react";

export const BannerSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              ThinkLIT
            </h1>
            <div className="h-20 flex items-center justify-center">
              <TypewriterAnimation />
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master technology through comprehensive articles, interactive
            quizzes, tricky interview questions, and visual animations. Your
            journey to technical excellence starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              Explore Articles
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button className="group bg-white/80 backdrop-blur text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 border border-gray-200">
              <Play size={20} />
              See Demo
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-60">
        <BookOpen className="w-8 h-8 text-blue-500 animate-bounce" />
      </div>
      <div className="absolute top-40 right-20 opacity-60">
        <HelpCircle className="w-10 h-10 text-purple-500 animate-pulse" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-60">
        <Eye className="w-6 h-6 text-cyan-500 animate-bounce delay-1000" />
      </div>
    </section>
  );
};
