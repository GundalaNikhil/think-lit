"use client";
// import GlassCard from "@/animations/GlassCard"; // Commented out for future glassmorphism usage
// import GlassmorphismCard from "@/components/ui/GlassmorphismCard"; // Reusable glassmorphism component
import EnhancedSpaceScene from "@/animations/EnhancedSpaceScene";
import { TypewriterAnimation } from "@/animations/TypewriterAnimation";
import { ArrowRight, BookOpen, Play, Code } from "lucide-react";

export const BannerSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced 3D Space Background */}
      <div className="absolute inset-0">
        <EnhancedSpaceScene />
      </div>

      {/* Immersive Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30 z-[1]" />

      {/* Enhanced Content with SEO Keywords */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl shadow-2xl transition-all duration-500">
          <div className="space-y-10">
            <div className="space-y-10">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ThinkLIT
              </h1>

              <div className="h-20 sm:h-24 md:h-28 flex items-center justify-center">
                <TypewriterAnimation />
              </div>

              {/* Simple, Peaceful Description */}
              <div className="space-y-6">
                <p
                  className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  A thoughtful space for learning programming concepts,
                  practicing problem-solving, and growing as a developer.
                </p>

                <p
                  className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Learn at your own pace through clear explanations, interactive
                  examples, and supportive guidance.
                </p>
              </div>
            </div>

            {/* Simple Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-semibold flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Start Learning
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  size={18}
                />
              </button>

              <button
                className="group text-white border-2 border-white/30 hover:border-white/50 px-8 py-3 text-base font-semibold flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Play size={18} />
                Explore Topics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute top-32 left-8 opacity-60 animate-float">
        <div className="p-3 bg-blue-500/60 rounded-xl shadow-lg transition-all duration-500 hover:opacity-80">
          <Code className="w-6 h-6 text-white/90" />
        </div>
      </div>

      <div
        className="absolute bottom-32 right-8 opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="p-3 bg-purple-500/60 rounded-xl shadow-lg transition-all duration-500 hover:opacity-80">
          <BookOpen className="w-6 h-6 text-white/90" />
        </div>
      </div>

      {/* CSS Animation for floating effect */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
