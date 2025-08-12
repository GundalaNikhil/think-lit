import { BannerSection } from "@/components/HomePage/Banner/Banner";
import { ContentFeaturesSection } from "@/components/HomePage/ContentFeaturesSection/ContentFeaturesSection";
import { Footer } from "@/components/HomePage/Footer/Footer";
import Navbar from "@/components/HomePage/Navbar/Navbar";
import { StatsSection } from "@/components/HomePage/StatsSection/StatsSection";
import { LearningTopicsSection } from "@/components/HomePage/TopicSection/TopicSection";

export default function HomePage() {
  return (
    <div className="font-sans">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <BannerSection />
      <LearningTopicsSection />
      <ContentFeaturesSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
