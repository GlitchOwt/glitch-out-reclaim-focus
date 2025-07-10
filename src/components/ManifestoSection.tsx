import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

// Glitch Text Component with custom animations
const GlitchText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`glitch-text ${isVisible ? 'animate-in' : ''} ${className}`}
      style={{
        '--animation-delay': `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// Highlighted Keywords Component
const HighlightedKeyword = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: '-100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span 
      ref={ref}
      className={`highlighted-keyword ${isVisible ? 'animate-in' : ''}`}
    >
      {children}
    </span>
  );
};

// Pixel Art Divider Component
const PixelDivider = () => {
  const pixels = Array.from({ length: 64 }, (_, i) => i);

  return (
    <div className="pixel-divider">
      {pixels.map((pixel) => (
        <div
          key={pixel}
          className="pixel"
          style={{
            animationDelay: `${pixel * 0.02}s`
          }}
        />
      ))}
    </div>
  );
};

// Parallax Background Component
const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div 
      className="parallax-background"
      style={{
        transform: `translateY(${parallaxOffset}px)`
      }}
    >
      <div className="dot-pattern-layer-1" />
      <div className="dot-pattern-layer-2" />
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ delay = 0 }: { delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`progress-bar ${isVisible ? 'animate-in' : ''}`}
    />
  );
};

const ManifestoSection = () => {
  const manifestoPoints = [
    "Technology should <highlight>enhance human connection</highlight>, not replace it",
    "Screen-free moments create space for <highlight>creativity</highlight> and deep thinking",
    "Digital wellness is about <highlight>choosing when to engage</highlight>, not constant availability",
    "The best UI is sometimes <highlight>no interface</highlight> at all",
    "<trinity>Presence over productivity</trinity>"
  ];

  const renderManifestoText = (text: string, index: number) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>|<trinity>.*?<\/trinity>)/);
    
    return (
      <GlitchText key={index} delay={index * 200} className="manifesto-point">
        {parts.map((part, partIndex) => {
          if (part.startsWith('<highlight>')) {
            const content = part.replace(/<\/?highlight>/g, '');
            return <HighlightedKeyword key={partIndex}>{content}</HighlightedKeyword>;
          } else if (part.startsWith('<trinity>')) {
            const content = part.replace(/<\/?trinity>/g, '');
            return <span key={partIndex} className="trinity-text">{content}</span>;
          }
          return part;
        })}
      </GlitchText>
    );
  };

  return (
    <section id="manifesto" className="manifesto-section">
      <ParallaxBackground />
      
      <div className="manifesto-container">
        <ProgressBar delay={0} />
        
        <div className="manifesto-content">
          <GlitchText className="manifesto-headline">
            <h2>Our Manifesto</h2>
          </GlitchText>

          <PixelDivider />

          <div className="manifesto-points">
            {manifestoPoints.map((point, index) => (
              <div key={index} className="manifesto-point-wrapper">
                {renderManifestoText(point, index)}
                {index < manifestoPoints.length - 1 && <PixelDivider />}
              </div>
            ))}
          </div>

          <GlitchText delay={1000} className="manifesto-cta">
            <div className="cta-content">
              <p className="cta-text">
                Join us in building a future where technology serves humanity's highest potential.
              </p>
              <Button 
                className="cta-button"
                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the Movement
              </Button>
            </div>
          </GlitchText>
        </div>
      </div>

      <style jsx>{`
        .manifesto-section {
          position: relative;
          min-height: 100vh;
          background: var(--color-glitch-primary-background, #ffffff);
          overflow: hidden;
          padding: 4rem 0;
        }

        .parallax-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          pointer-events: none;
        }

        .dot-pattern-layer-1,
        .dot-pattern-layer-2 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
        }

        .dot-pattern-layer-1 {
          background-image: radial-gradient(circle at 25% 25%, var(--color-glitch-accent-primary, #1a5f3f) 2px, transparent 2px);
          background-size: 40px 40px;
        }

        .dot-pattern-layer-2 {
          background-image: radial-gradient(circle at 75% 75%, var(--color-glitch-accent-primary, #1a5f3f) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .manifesto-container {
          position: relative;
          z-index: 10;
          max-width: 896px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .progress-bar {
          position: absolute;
          left: -32px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--color-glitch-accent-primary, #1a5f3f);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 1s ease-out;
        }

        .progress-bar.animate-in {
          transform: scaleY(1);
        }

        .manifesto-content {
          position: relative;
        }

        .manifesto-headline h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: bold;
          font-size: 6rem;
          line-height: 1.1;
          color: var(--color-glitch-text-primary, #0a0a0a);
          margin-bottom: 3rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .manifesto-headline h2 {
            font-size: 8rem;
          }
        }

        .glitch-text {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .glitch-text.animate-in {
          opacity: 1;
          transform: translateY(0);
          animation: glitch-entrance 0.6s ease-out forwards,
                     subtle-shake 3s ease-in-out infinite,
                     hue-rotation 4s ease-in-out infinite;
        }

        @keyframes glitch-entrance {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes subtle-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        @keyframes hue-rotation {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(10deg); }
        }

        .pixel-divider {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 1px;
          width: 64px;
          height: 64px;
          margin: 2rem auto;
        }

        .pixel {
          width: 2px;
          height: 2px;
          background: var(--color-glitch-accent-primary, #1a5f3f);
          opacity: 0.2;
          animation: pixel-flicker 2s ease-in-out infinite alternate;
        }

        @keyframes pixel-flicker {
          0% { opacity: 0.2; }
          100% { opacity: 1.0; }
        }

        .manifesto-points {
          margin: 4rem 0;
        }

        .manifesto-point-wrapper {
          margin: 3rem 0;
        }

        .manifesto-point {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-weight: bold;
          font-size: 2rem;
          line-height: 1.6;
          color: var(--color-glitch-text-primary, #0a0a0a);
          text-align: center;
          margin: 2rem 0;
        }

        @media (min-width: 768px) {
          .manifesto-point {
            font-size: 3.5rem;
          }
        }

        .highlighted-keyword {
          position: relative;
          background: var(--color-glitch-accent-primary, #1a5f3f);
          color: white;
          padding: 0.2em 0.4em;
          transform: scale(0);
          display: inline-block;
          transition: all 0.4s ease-out;
        }

        .highlighted-keyword.animate-in {
          transform: scale(1);
          animation: highlight-entrance 0.6s ease-out forwards;
        }

        .highlighted-keyword:hover {
          transform: scale(1.05);
        }

        @keyframes highlight-entrance {
          0% { transform: scale(0); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .trinity-text {
          background: linear-gradient(45deg, var(--color-glitch-accent-primary, #1a5f3f), #2a7f5f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          position: relative;
        }

        .trinity-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-glitch-accent-primary, #1a5f3f);
          animation: underline-grow 1s ease-out 0.5s forwards;
          transform: scaleX(0);
        }

        @keyframes underline-grow {
          to { transform: scaleX(1); }
        }

        .manifesto-cta {
          margin-top: 4rem;
          text-align: center;
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .cta-text {
          font-size: 1.25rem;
          color: var(--color-glitch-text-secondary, #666666);
          max-width: 600px;
          line-height: 1.6;
        }

        @media (min-width: 768px) {
          .cta-text {
            font-size: 1.5rem;
          }
        }

        .cta-button {
          background: var(--color-glitch-accent-primary, #1a5f3f);
          color: white;
          border: none;
          border-radius: 0;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(26, 95, 63, 0.3);
        }

        .cta-button:hover::before {
          left: 100%;
        }

        @media (max-width: 767px) {
          .manifesto-container {
            padding: 0 1rem;
          }
          
          .progress-bar {
            left: -16px;
          }
          
          .manifesto-headline h2 {
            font-size: 4rem;
          }
          
          .manifesto-point {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ManifestoSection;