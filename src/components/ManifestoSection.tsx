const ManifestoSection = () => {
  return (
    <section id="manifesto" className="section-padding">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12">
          Manifesto
        </h2>
        
        <div className="space-y-8 text-left">
          <div className="prose prose-lg max-w-none">
            <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-muted-foreground">
              "Screens were made to serve us. Not swallow us."
            </blockquote>
          </div>
          
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              We live in an age where our most powerful tools have become our greatest distractions. 
              Where checking a simple message leads to an hour-long scroll through digital noise. 
              Where the very devices designed to connect us leave us feeling more isolated than ever.
            </p>
            
            <p>
              <strong className="text-foreground">This is not progress. This is addiction by design.</strong>
            </p>
            
            <p>
              At GlitchOwt, we believe in a different path. We believe technology should amplify human 
              potential, not hijack human attention. We believe in interfaces that understand context, 
              conversations that create clarity, and tools that respect your time.
            </p>
            
            <p>
              <strong className="text-foreground">We believe in the power of voice.</strong>
            </p>
            
            <p>
              Voice is intimate. Voice is efficient. Voice is human. When you speak, you engage with 
              ideas directly—no visual clutter, no endless options, no algorithmic manipulation. 
              Just pure, focused interaction.
            </p>
            
            <p className="text-foreground font-medium">
              The future isn't about better screens. It's about transcending them entirely.
            </p>
            
            <p>
              Join us. Help us build a world where technology serves humanity's highest potential. 
              Where every interaction is intentional. Where every moment of attention is sacred.
            </p>
            
            <p className="font-pixel text-primary text-center text-xl">
              GLITCH OUT. TUNE IN.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;