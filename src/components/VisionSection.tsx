import { Smartphone, Mic, Users, Zap } from "lucide-react";

const VisionSection = () => {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
            Why Voice? Why Now?
          </h2>
          
          <div className="space-y-8 text-lg leading-relaxed">
            <p className="text-xl">
              Phones are powerful, but screens are exhausting. Every tap, swipe, and scroll 
              fragments your attention and drains your mental energy.
            </p>
            
            <p>
              Voice is natural, efficient, and intimate. It's how humans have communicated 
              for thousands of years. It's time our technology caught up with our humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-background/10 rounded-full flex items-center justify-center">
                <Mic className="w-8 h-8 text-background" />
              </div>
              <h3 className="font-serif text-xl font-bold">Natural</h3>
              <p className="text-background/80">
                Speak like you would to a friend. No learning curves, no UI patterns to memorize.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-background/10 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-background" />
              </div>
              <h3 className="font-serif text-xl font-bold">Efficient</h3>
              <p className="text-background/80">
                Get things done faster than any app. Voice is bandwidth for thought.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-background/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-background" />
              </div>
              <h3 className="font-serif text-xl font-bold">Intimate</h3>
              <p className="text-background/80">
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