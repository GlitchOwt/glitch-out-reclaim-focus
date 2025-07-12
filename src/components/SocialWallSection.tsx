import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Star, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import type { InstagramReel } from "@/hooks/useInstagramReels";

const SocialWallSection = () => {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const { data, error } = await supabase
          .from("instagram_reels")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;
        setReels(data || []);
      } catch (error) {
        console.error("Error fetching Instagram reels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-4xl md:text-6xl text-[#2d5a2d] mb-4">
              Social Wall
            </h2>
            <p className="text-lg text-muted-foreground">Loading our latest content...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reels.length === 0) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-4xl md:text-6xl text-[#2d5a2d] mb-4">
              Social Wall
            </h2>
            <p className="text-lg text-muted-foreground">Check back soon for our latest Instagram content!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-4xl md:text-6xl text-[#2d5a2d] mb-4">
            <span className="glitch" data-text="Social Wall">
              Social Wall
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Check out our top-performing Instagram reels showcasing the latest in digital art and glitch effects
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-600 text-white text-xs">Embedded</Badge>
              <span>Watch directly on our site</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2d5a2d] rounded-full"></div>
              <span>Opens Instagram in new tab</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reels.map((reel) => (
                <CarouselItem key={reel.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/60 border border-[#e9e7e1] shadow-2xl shadow-[#14473B]/30 rounded-none backdrop-blur-[6px] overflow-hidden group hover:shadow-3xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      {reel.embed_code ? (
                        <div
                          className="aspect-[9/16] w-full relative group"
                          dangerouslySetInnerHTML={{ __html: reel.embed_code }}
                          role="region"
                          aria-label={`Instagram reel: ${reel.title}`}
                        />
                      ) : (
                        <div 
                          className="aspect-[9/16] bg-gradient-to-br from-[#2d5a2d] to-[#14473B] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:from-[#14473B] hover:to-[#2d5a2d] transition-all duration-300"
                          onClick={() => window.open(reel.instagram_url, '_blank')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.open(reel.instagram_url, '_blank');
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`View ${reel.title} on Instagram`}
                        >
                          <div className="absolute inset-0 opacity-10 bg-white/5"></div>
                          <Instagram className="h-16 w-16 text-white/80 mb-4" />
                          <p className="text-white/70 text-sm text-center px-4">
                            Tap to view on Instagram
                          </p>
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            External Link
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-[#2d5a2d] group-hover:text-[#14473B] transition-colors">
                            {reel.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {reel.embed_code && (
                              <Badge variant="default" className="bg-green-600 text-white text-xs">
                                Embedded
                              </Badge>
                            )}
                            {reel.is_featured && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => window.open(reel.instagram_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Instagram
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => window.open('https://instagram.com', '_blank')}
            className="mx-auto"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Follow us on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialWallSection;