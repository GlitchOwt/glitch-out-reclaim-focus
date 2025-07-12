import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const categories = ["All", "The Friday Five", "Frameworks & Tools", "Learning & Growth", "Mindset & Life Lessons"];
const PAGE_SIZE = 5;

const BlogListSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false });
      if (activeCategory !== "All") {
        query = query.eq('category', activeCategory);
      }
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error, count } = await query.range(from, to);
      if (error) throw error;
      setBlogs(data || []);
      setTotal(count || 0);
    } catch (e) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [activeCategory, search, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className="py-8">
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border ${activeCategory === cat ? "bg-primary text-white" : "bg-white text-black"}`}
            onClick={() => { setActiveCategory(cat); setPage(1); }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-4 py-2 w-full max-w-md"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      <div className="space-y-4 min-h-[200px]">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-8">{error}</div>
        )}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-muted-foreground text-center">No blogs yet.</div>
        )}
        {!loading && !error && blogs.map(blog => (
          <div
            key={blog.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition"
            onClick={() => navigate(`/newsletters/${blog.id}`)}
          >
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground min-w-[60px]">{blog.date}</span>
              <span className="font-semibold text-lg">{blog.title}</span>
              <span className="ml-auto text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{blog.category}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded border bg-white text-black disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm flex items-center">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 rounded border bg-white text-black disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogListSection; 