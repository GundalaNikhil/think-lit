import GlassCard from "@/animations/GlassCard";
import SpaceScene from "@/animations/SpaceScene";
import { TypewriterAnimation } from "@/animations/TypewriterAnimation";
import { ArrowRight, BookOpen, Eye, HelpCircle, Play } from "lucide-react";

export const BannerSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* 3D Space Background */}
      <div className="absolute inset-0">
        <SpaceScene />
      </div>

      {/* Glass overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/20 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <GlassCard className="p-8 sm:p-12 bg-white/5 border-white/10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 drop-shadow-2xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ThinkLIT
              </h1>
              <div className="h-20 sm:h-24 md:h-32 flex items-center justify-center">
                <TypewriterAnimation />
              </div>
            </div>

            <p
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Master technology through comprehensive articles, interactive
              quizzes, tricky interview questions, and visual animations. Your
              journey to technical excellence starts here. 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <GlassCard className="bg-gradient-to-r from-orange-500/30 to-red-600/30 hover:from-orange-500/40 hover:to-red-600/40 transition-all duration-300 hover:scale-105">
                <button
                  className="group text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center gap-2 min-w-[200px] justify-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Articles
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
              </GlassCard>

              <GlassCard className="bg-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105 border-orange-500/30">
                <button
                  className="group text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center gap-2 min-w-[200px] justify-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Play size={20} />
                  See Demo
                </button>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 opacity-60">
        <GlassCard className="p-3 bg-orange-500/20">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 animate-bounce" />
        </GlassCard>
      </div>
      <div className="absolute top-32 sm:top-40 right-8 sm:right-20 opacity-60">
        <GlassCard className="p-3 bg-red-500/20">
          <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 animate-pulse" />
        </GlassCard>
      </div>
      <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 opacity-60">
        <GlassCard className="p-3 bg-pink-500/20">
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-bounce delay-1000" />
        </GlassCard>
      </div>
    </section>
  );
};
