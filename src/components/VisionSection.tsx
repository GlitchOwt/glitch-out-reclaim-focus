import { Smartphone, Mic, Users, Zap } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const VisionSection = () => {
  return (
    <section id="vision" className="relative section-padding bg-gradient-to-br from-[#FAF9F6] via-[#e9e7e1] to-[#FAF9F6]">
      {/* Sparkles background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true">
        <SparklesCore
          id="vision-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#2d5a2d"
          speed={0.5}
        />
      </div>
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-pixel text-2xl md:text-5xl text-foreground hover-glitch">
            <span className="glitch" data-text="Why Voice? Why Now?">Why Voice? Why Now?</span>
          </span>
          <div className="space-y-8 text-lg leading-relaxed">
            <p className="text-xl text-[#2d5a2d]">
              Phones are powerful, but screens are exhausting. Every tap, swipe, and scroll 
              fragments your attention and drains your mental energy.
            </p>
            
            <p className="text-[#2d5a2d]">
              Voice is natural, efficient, and intimate. It's how humans have communicated 
              for thousands of years. It's time our technology caught up with our humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#2d5a2d]/10 rounded-none flex items-center justify-center">
                <Mic className="w-8 h-8 text-[#2d5a2d]" />
              </div>
              <h3 className="font-pixel text-xl text-[#2d5a2d]">Natural</h3>
              <p className="text-[#2d5a2d]/80">
                Speak like you would to a friend. No learning curves, no UI patterns to memorize.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#2d5a2d]/10 rounded-none flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#2d5a2d]" />
              </div>
              <h3 className="font-pixel text-xl text-[#2d5a2d]">Efficient</h3>
              <p className="text-[#2d5a2d]/80">
                Get things done faster than any app. Voice is bandwidth for thought.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#2d5a2d]/10 rounded-none flex items-center justify-center">
                <Users className="w-8 h-8 text-[#2d5a2d]" />
              </div>
              <h3 className="font-pixel text-xl text-[#2d5a2d]">Intimate</h3>
              <p className="text-[#2d5a2d]/80">
                Personal, contextual, and empathetic. Technology that actually understands you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;