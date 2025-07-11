"use client";

import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const manifestoPoints = [
  {
    text: "Technology should enhance human connection, not replace it.",
    highlight: "enhance human connection"
  },
  {
    text: "Screen-free moments create space for creativity and mindfulness.",
    highlight: "Screen-free moments"
  },
  {
    text: "Digital wellness is not about avoiding technology - it's about choosing when to engage.",
    highlight: "choosing when to engage"
  },
  {
    text: "The best user interface is sometimes no interface at all.",
    highlight: "no interface at all"
  },
  {
    text: "Presence over productivity. Being over browsing. Connection over consumption.",
    highlight: "Presence over productivity"
  }
];

const PixelDivider = ({ index }: { index: number }) => {
  return (
    <motion.div 
      className="flex justify-center my-16"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#2D5A2D]"
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.random() > 0.3 ? 1 : 0.2 }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.02,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const GlitchText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={isInView ? {
            x: [0, -2, 2, 0],
            filter: [
              "hue-rotate(0deg)",
              "hue-rotate(90deg)", 
              "hue-rotate(180deg)",
              "hue-rotate(0deg)"
            ]
          } : {}}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="manifesto" ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--color-glitch-primary-background)] overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, var(--color-glitch-accent-primary) 2px, transparent 0),
              radial-gradient(circle at 75px 75px, var(--color-glitch-accent-primary) 1px, transparent 0)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-4xl">
        {/* Main Headline */}
        <GlitchText className="text-center mb-20">
          <span className="font-pixel text-6xl md:text-8xl text-[var(--color-glitch-text-primary)] hover-glitch">
            <span className="glitch" data-text="Our Manifesto">Our Manifesto</span>
          </span>
        </GlitchText>

        {/* Manifesto Points */}
        <div className="space-y-8">
          {manifestoPoints.map((point, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -left-8 top-0 w-1 bg-[#2D5A2D] origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ height: "100%" }}
                  />
                  
                  <h3 className="font-headline text-2xl md:text-4xl font-bold text-[var(--color-glitch-text-primary)] leading-relaxed">
                    {point.text.split(point.highlight).map((part, partIndex, array) => (
                      <span key={partIndex}>
                        {part}
                        {partIndex < array.length - 1 && (
                          <motion.span
                            className="relative inline-block px-2 py-1 mx-1"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <span className="relative z-10 text-white font-bold">
                              {point.highlight}
                            </span>
                            <motion.span
                              className="absolute inset-0 bg-[#2D5A2D]"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                              viewport={{ once: true }}
                              style={{ originX: 0 }}
                            />
                          </motion.span>
                        )}
                      </span>
                    ))}
                  </h3>
                </div>
              </motion.div>
              
              {index < manifestoPoints.length - 1 && <PixelDivider index={index} />}
            </div>
          ))}
        </div>

        {/* Final Divider */}
        <PixelDivider index={manifestoPoints.length} />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-body text-xl md:text-2xl text-[var(--color-glitch-text-secondary)] mb-8 leading-relaxed">
            Ready to reclaim your digital life? Join thousands who are choosing intention over impulse.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              size="lg"
              className="font-body font-bold text-lg px-8 py-4 bg-[#00382A] hover:bg-[#00382A] text-white border-0 rounded-none relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-[var(--color-glitch-text-primary)]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 text-white transition-colors duration-300">
                Join the Movement
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}