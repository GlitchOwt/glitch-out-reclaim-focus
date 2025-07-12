import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Smartphone } from "lucide-react";
// import ClickSpark from "./ClickSpark"; // Remove this import

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-24">
      <div className="max-w-7xl mx-auto container-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pre-title */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-8 animate-fade-in-up">
            <Mic className="w-4 h-4" />
            Voice-First AI Studio
          </div>

          {/* Main headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up animate-delay-100">
            We're building the
            <br />
            <span className="hover-glitch cursor-pointer">
              <span className="glitch text-primary" data-text="alternative">
                alternative
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            No screens. Just conversations.
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
            Voice-first AI agents that replace apps. One voice. One movement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-400">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Apps
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="minimal" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join the Movement
            </Button>
          </div>

          {/* Visual indicator */}
          <div className="mt-16 animate-fade-in-up animate-delay-500">
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 line-through" />
                <span className="text-sm">Screen fatigue</span>
              </div>
              <div className="w-12 h-px bg-border"></div>
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                <span className="text-sm">Voice clarity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;