import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section id="join" className="section-padding bg-secondary/50">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Mail className="w-12 h-12 text-primary mx-auto" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Join the Movement
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get updates on new apps, voice-first insights, and behind-the-scenes stories 
              from That Hyperactive Sardar.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1"
              />
              <Button type="submit" className="px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              No spam. No screens. Just good stories.
            </p>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Or follow the journey on{" "}
              <a href="#" className="text-primary hover:underline">Instagram</a>,{" "}
              <a href="#" className="text-primary hover:underline">Blog</a>, or{" "}
              <a href="#" className="text-primary hover:underline">LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;