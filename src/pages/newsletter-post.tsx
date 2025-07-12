import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BlogSidebar from "@/components/BlogSidebar";
import Footer from "@/components/Footer";

const NewsletterPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!post) return <div className="text-center py-20">Post not found.</div>;

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex flex-col">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 flex-1">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
          <Link to="/newsletters" className="text-primary hover:underline">&larr; Back to Newsletters</Link>
          <h1 className="font-pixel text-3xl md:text-5xl mb-2 mt-4">{post.title}</h1>
          <div className="text-xs text-muted-foreground mb-4">{post.date} &middot; {post.category}</div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html_content }} />
        </div>
        <BlogSidebar limit={5} />
      </div>
      <Footer />
    </div>
  );
};

export default NewsletterPost; 