const ComingSoonSection = () => {
  return (
    <section className="section-padding bg-muted/20">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              That Hyperactive Sardar
            </h2>
            <p className="text-xl text-muted-foreground">
              Behind-the-scenes stories, founder vlogs, and the occasional sketch comedy reel.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg"></div>
            <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-lg p-12">
              <div className="space-y-4">
                <div className="font-pixel text-6xl text-primary opacity-50">
                  COMING SOON
                </div>
                <p className="text-muted-foreground">
                  Building in public means sharing the real journey—the wins, the fails, 
                  and everything in between.
                </p>
                <div className="text-sm text-muted-foreground">
                  Blog • Vlogs • Reels • Raw Founder Stories
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
              Client Projects
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Showcase of brands we've helped with voice-first transformations.
            </p>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/10 to-secondary/20 rounded-lg"></div>
              <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-lg p-8">
                <div className="font-pixel text-4xl text-primary opacity-50 mb-2">
                  COMING SOON
                </div>
                <p className="text-sm text-muted-foreground">
                  Portfolio of voice-first client transformations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;