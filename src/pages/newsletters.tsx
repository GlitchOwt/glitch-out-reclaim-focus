import NewsletterSection from "@/components/NewsletterSection";
import BlogListSection from "@/components/BlogListSection";

const NewslettersPage = () => {
  return (
    <div>
      <NewsletterSection description="Get the latest updates, voice-first insights, and all our newsletter stories." />
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-pixel text-3xl md:text-4xl mb-8">Newsletters & Blog</h2>
        </div>
        <BlogListSection />
      </section>
    </div>
  );
};

export default NewslettersPage; 