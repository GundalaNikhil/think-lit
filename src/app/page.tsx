import { BannerSection } from "@/components/HomePage/Banner/Banner";
import { ContentFeaturesSection } from "@/components/HomePage/ContentFeaturesSection/ContentFeaturesSection";
import { Footer } from "@/components/HomePage/Footer/Footer";
import Navbar from "@/components/HomePage/Navbar/Navbar";
import { StatsSection } from "@/components/HomePage/StatsSection/StatsSection";
import { LearningTopicsSection } from "@/components/HomePage/TopicSection/TopicSection";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <BannerSection />
      <LearningTopicsSection />
      <ContentFeaturesSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
