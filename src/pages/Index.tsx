import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AppsSection from "@/components/AppsSection";
import VisionSection from "@/components/VisionSection";
import ManifestoSection from "@/components/ManifestoSection";
import RoadmapSection from "@/components/RoadmapSection";
import SuggestGlitchSection from "@/components/SuggestGlitchSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AppsSection />
        <VisionSection />
        <ManifestoSection />
        <RoadmapSection />
        <SuggestGlitchSection />
        <ComingSoonSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
