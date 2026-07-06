import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, Clock, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { useT } from "@/i18n/LanguageContext";

export default function Blog() {
  const { t } = useT();
  const [featured, ...rest] = blogPosts;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))], []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((p) => {
      const okCat = category === "All" || p.category === category;
      const okQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [query, category, rest]);
  return (
    <div data-testid="blog-page" className="bg-white">
      <SEO
        title="Blog · Enterprise IT Insights"
        description="Practical guides on laptop maintenance, AMC ROI, data recovery, business networking and IT strategy — written by our engineers."
        path="/blog"
      />
      <Navigation />

      {/* Header */}
      <section className="pt-40 pb-16 bg-[#071C38] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00AEEF]/15 blur-3xl" />
        <div className="ils-container relative z-10">
          <div className="ils-eyebrow mb-4">Imped Logic Journal</div>
          <h1 className="ils-h1 text-white max-w-3xl leading-tight">
            Insights, playbooks and field notes from enterprise IT.
          </h1>
          <p className="text-white/60 mt-6 max-w-xl text-base leading-relaxed">
            Practical guides written by the engineers who service thousands of enterprise
            endpoints every quarter — no fluff, no marketing filler.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="ils-section bg-white">
        <div className="ils-container">
          <Link
            to={`/blog/${featured.slug}`}
            data-testid="blog-featured"
            className="group grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[16/11]">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-[#00AEEF] text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full font-display">
                Featured · {featured.category}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
              </div>
              <h2 className="ils-h2 text-[#071C38] mb-5 group-hover:text-[#00AEEF] transition-colors">
                {featured.title}
              </h2>
              <p className="ils-body mb-6 text-lg">{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#071C38] text-white grid place-items-center text-xs font-display font-semibold">
                  {featured.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#071C38]">{featured.author}</div>
                  <div className="text-xs text-slate-500">Editorial team</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#071C38] group-hover:text-[#00AEEF] transition-colors">
                Read the full article <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 bg-white">
        <div className="ils-container">
          <div className="border-t border-slate-200 pt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <h2 className="ils-h2 text-[#071C38]">All articles</h2>
              <span className="text-sm text-slate-500">{filtered.length} of {rest.length} articles</span>
            </div>

            {/* Search + Category filter */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("blog.search")}
                  data-testid="blog-search-input"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#00AEEF] transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    data-testid={`blog-tag-${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all font-display ${
                      category === c
                        ? "bg-[#071C38] text-white border border-[#071C38]"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-[#00AEEF] hover:text-[#00AEEF]"
                    }`}
                  >
                    {c === "All" ? t("blog.allCategories") : c}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div data-testid="blog-empty-state" className="text-center py-20 text-slate-500">{t("blog.noResults")}</div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  data-testid={`blog-card-${i}`}
                  className="group flex flex-col"
                >
                  <Link to={`/blog/${p.slug}`} className="block">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-5">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#071C38] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded font-display">
                        {p.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span>{p.date}</span>
                      <span>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-[#071C38] mb-3 group-hover:text-[#00AEEF] transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{p.excerpt}</p>
                    <div className="mt-4 text-sm font-semibold text-[#071C38] inline-flex items-center gap-1 group-hover:text-[#00AEEF] transition-colors">
                      Read more →
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
