import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogSidebarProps {
  limit?: number;
}

const BlogSidebar = ({ limit = 5 }: BlogSidebarProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title')
        .order('date', { ascending: false })
        .limit(limit);
      setRecentPosts(data || []);
    };
    fetchRecent();
  }, [limit]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const { error } = await supabase.from('subscribers').insert({ email });
      if (error) throw error;
      setMessage("You're in! Welcome to the Glitchowt tribe.");
      setEmail("");
    } catch {
      setMessage("Already glitched in or something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0 md:pl-8 mt-12 md:mt-0 flex flex-col h-full" style={{ minHeight: '60vh' }}>
      <div>
        <h3 className="uppercase text-xs font-bold tracking-widest mb-2">Glitch In</h3>
        <div className="border-b mb-4" />
        <p className="mb-4 text-sm">Unplug from the scroll. Get voice-first, anti-screen, high-signal stories—no spam, no doomscroll, just pure focus. Join the movement.</p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <Input
            type="email"
            placeholder="Your email (no screens needed)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Glitching..." : "Glitchowt"}
          </Button>
        </form>
        {message && <div className="text-xs mt-2 text-muted-foreground">{message}</div>}
      </div>
      <div className="mt-auto pt-8 pb-2 bg-background">
        <h6 className="uppercase text-xs font-bold tracking-widest mb-2">Recent Posts</h6>
        <div className="border-b mb-4" />
        <ul className="space-y-4 mb-4">
          {recentPosts.map(post => (
            <li key={post.id} className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2 text-muted-foreground" />
              <a
                href={`/newsletters/${post.id}`}
                className="hover:underline text-sm recent-post-title"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/newsletters"
          className="block text-xs text-center bg-primary text-white py-2 rounded hover:bg-primary/90 transition recentpost-button"
        >
          View All Recent
        </a>
      </div>
    </aside>
  );
};

export default BlogSidebar; 