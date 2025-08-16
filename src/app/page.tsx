import { BannerSection } from "@/components/HomePage/Banner/Banner";
import { ContentFeaturesSection } from "@/components/HomePage/ContentFeaturesSection/ContentFeaturesSection";
import { Footer } from "@/components/HomePage/Footer/Footer";
import Navbar from "@/components/HomePage/Navbar/Navbar";
import { StatsSection } from "@/components/HomePage/StatsSection/StatsSection";
import { LearningTopicsSection } from "@/components/HomePage/TopicSection/TopicSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Immersive Dark Space Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900 z-0" />

      {/* Animated Cosmic Dust */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,107,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.06),transparent_50%)]" />
      </div>

      {/* Floating Particles Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <BannerSection />
        <LearningTopicsSection />
        <ContentFeaturesSection />
        <StatsSection />
        <Footer />
      </div>
    </div>
  );
}
