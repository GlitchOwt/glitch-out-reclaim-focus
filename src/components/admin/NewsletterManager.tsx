import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categories = ["The Friday Five", "Frameworks & Tools", "Learning & Growth", "Mindset & Life Lessons"];

const NewsletterManager = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [html, setHtml] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    if (!error) setPosts(data || []);
    setIsLoadingPosts(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setTitle(""); setDate(""); setCategory(categories[0]); setHtml(""); setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('blog_posts').update({
          title, date, category, html_content: html
        }).eq('id', editingId);
        if (error) throw error;
        toast({ title: "Success!", description: "Newsletter updated.", variant: "default" });
      } else {
        const { error } = await supabase.from('blog_posts').insert({
          title, date, category, html_content: html
        });
        if (error) throw error;
        toast({ title: "Success!", description: "Newsletter uploaded.", variant: "default" });
      }
      resetForm();
      fetchPosts();
    } catch (err) {
      toast({ title: "Error", description: "Failed to save newsletter.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setDate(post.date);
    setCategory(post.category);
    setHtml(post.html_content);
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast({ title: "Deleted", description: "Newsletter deleted.", variant: "default" });
      fetchPosts();
      if (editingId === id) resetForm();
    } else {
      toast({ title: "Error", description: "Failed to delete newsletter.", variant: "destructive" });
    }
  };

  const handleSendNewsletter = async (id) => {
    setSendingId(id);
    try {
      // Placeholder: original fetch call (update as needed for new integration)
      const res = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      toast({ title: "Sent!", description: "Newsletter sent to all subscribers.", variant: "default" });
    } catch (err) {
      toast({ title: "Error", description: err.message || "Failed to send newsletter.", variant: "destructive" });
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2 w-full"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <Textarea
          placeholder="Paste HTML content here..."
          value={html}
          onChange={e => setHtml(e.target.value)}
          rows={10}
          required
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (editingId ? "Updating..." : "Uploading...") : (editingId ? "Update" : "Upload & Send Newsletter")}
          </Button>
          {editingId && (
            <Button type="button" variant="secondary" onClick={resetForm} className="w-full">Cancel</Button>
          )}
        </div>
      </form>
      <div>
        <h4 className="font-bold mb-2">Existing Newsletters</h4>
        {isLoadingPosts ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-muted-foreground">No newsletters yet.</div>
        ) : (
          <ul className="space-y-2">
            {posts.map(post => (
              <li key={post.id} className="border rounded p-3 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold">{post.title}</div>
                  <div className="text-xs text-muted-foreground">{post.date} &middot; {post.category}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
                <Button size="sm" variant="default" onClick={() => handleSendNewsletter(post.id)} disabled={sendingId === post.id}>
                  {sendingId === post.id ? "Sending..." : "Send Newsletter"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewsletterManager; 