import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div data-testid="blog-post-page" className="bg-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        keywords={`${post.category}, ${post.title}, Imped Logic Systems`}
      />
      <Navigation />

      <article className="pt-32 pb-16">
        <div className="ils-container max-w-4xl">
          <Link to="/blog" data-testid="blog-post-back" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#00AEEF] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to journal
          </Link>

          <div className="ils-eyebrow mb-4">{post.category}</div>
          <h1 className="ils-h1 text-[#071C38] leading-[1.1] mb-6">{post.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#071C38] text-white grid place-items-center text-xs font-display font-semibold">
                {post.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#071C38]">{post.author}</div>
                <div className="text-xs text-slate-500">Editorial team</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
            <button data-testid="blog-post-share" className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-[#071C38] hover:text-[#00AEEF]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        <div className="ils-container max-w-4xl mt-10">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="ils-container max-w-3xl mt-14 prose-blog">
          {post.body.map((block, i) => {
            if (block.type === "p") return <p key={i}>{block.text}</p>;
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
            if (block.type === "ul") return <ul key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
            if (block.type === "ol") return <ol key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ol>;
            return null;
          })}
        </div>

        {/* CTA */}
        <div className="ils-container max-w-3xl mt-16">
          <div className="rounded-2xl bg-[#071C38] p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10">
              <div className="ils-eyebrow mb-3">Talk to an engineer</div>
              <h3 className="font-display font-semibold text-2xl mb-3 max-w-lg">
                Ready to apply this to your fleet? Book a free consultation.
              </h3>
              <Link to="/#contact" data-testid="blog-post-cta" className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0090C0] text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors">
                Book Free Consultation →
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="ils-container mt-24">
          <h2 className="ils-h2 text-[#071C38] mb-10">Related articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} data-testid={`blog-related-${i}`} className="group block">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-xs font-semibold tracking-widest uppercase text-[#00AEEF] font-display mb-2">{p.category}</div>
                <h3 className="font-display font-semibold text-[#071C38] leading-snug group-hover:text-[#00AEEF] transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
