import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionSection from "@/components/VisionSection";
import ManifestoSection from "@/components/ManifestoSection";
import RoadmapSection from "@/components/RoadmapSection";
import SocialWallSection from "@/components/SocialWallSection";
import SuggestGlitchSection from "@/components/SuggestGlitchSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ClickSpark from "@/components/ClickSpark";
import { SparklesCore } from "@/components/ui/sparkles";

const Index = () => {
  return (
    <ClickSpark sparkColor="#2d5a2d" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="relative min-h-screen bg-[#FAF9F6] scroll-smooth">
        <div className="fixed inset-0 w-full h-full z-0" aria-hidden="true">
          <SparklesCore
            id="tsparticlesfullpage"
            background="#FAF9F6"
            minSize={0.8}
            maxSize={1.5}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#2d5a2d"
          />
        </div>
        <div className="relative z-10">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <VisionSection />
            <ManifestoSection />
            <RoadmapSection />
            <SocialWallSection />
            <SuggestGlitchSection />
            <NewsletterSection />
          </main>
          <Footer />
        </div>
      </div>
    </ClickSpark>
  );
};

export default Index;
