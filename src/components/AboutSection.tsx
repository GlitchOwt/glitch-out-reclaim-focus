const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
            About GlitchOwt
          </h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-xl leading-relaxed">
              GlitchOwt is not just a tech studio—it's a cultural shift. We exist to introduce 
              a new class of voice-first apps that let users "glitch out" of screen addiction 
              and reclaim focus, safety, and emotional clarity.
            </p>
            
            <p className="text-lg leading-relaxed">
              Our philosophy is simple: <strong className="text-foreground">Build with taste. 
              Lead with story. Talk, don't tap.</strong> Every interaction should feel natural, 
              efficient, and intimate—the way human communication was meant to be.
            </p>
            
            <p className="text-lg leading-relaxed">
              We're building in public, sharing our journey through stories, insights, and 
              the occasional sketch comedy reel. Because the future of human-computer 
              interaction shouldn't be boring.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="font-pixel text-2xl text-primary">04</div>
              <div className="text-sm text-muted-foreground">Voice-First Apps</div>
            </div>
            <div className="space-y-2">
              <div className="font-pixel text-2xl text-primary">01</div>
              <div className="text-sm text-muted-foreground">Movement</div>
            </div>
            <div className="space-y-2">
              <div className="font-pixel text-2xl text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;