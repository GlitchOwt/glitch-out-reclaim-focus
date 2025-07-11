import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email, verified: false });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already on our newsletter list",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been added to our newsletter",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button type="submit" className="px-6" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
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