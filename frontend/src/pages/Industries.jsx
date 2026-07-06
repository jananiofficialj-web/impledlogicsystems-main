import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { industries } from "@/data/industries";

export default function Industries() {
  return (
    <div data-testid="industries-page" className="bg-white">
      <SEO
        title="Industries We Serve"
        description="Enterprise IT tailored to healthcare, manufacturing, banking, retail, education, government and eight more sectors."
        path="/industries"
      />
      <Navigation />

      <section className="pt-40 pb-16 bg-[#071C38] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#00AEEF]/15 blur-3xl" />
        <div className="ils-container relative z-10">
          <div className="ils-eyebrow mb-4">Industries We Serve</div>
          <h1 className="ils-h1 text-white leading-tight max-w-3xl">
            Enterprise IT tailored to the reality of your sector.
          </h1>
          <p className="text-white/60 mt-6 max-w-2xl text-base leading-relaxed">
            Ten industries. One promise — measurable uptime backed by named engineers, documented
            SLAs and executive-friendly reporting.
          </p>
        </div>
      </section>

      <section className="ils-section bg-white">
        <div className="ils-container space-y-24">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              data-testid={`industry-detail-${i}`}
              className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg group">
                  <img src={ind.image} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071C38]/50 to-transparent" />
                  <div className="absolute top-4 left-4 text-white text-xs font-semibold tracking-widest uppercase font-display px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20">
                    Industry {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="ils-eyebrow mb-3">{ind.tagline}</div>
                <h2 className="ils-h2 text-[#071C38] mb-5">{ind.name}</h2>
                <p className="ils-body mb-7 text-lg">{ind.summary}</p>
                <ul className="space-y-3 mb-8">
                  {ind.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#00AEEF]/10 grid place-items-center mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#00AEEF]" />
                      </div>
                      <span className="text-slate-700 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  data-testid={`industry-cta-${i}`}
                  className="inline-flex items-center gap-2 bg-[#071C38] hover:bg-[#00AEEF] text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors"
                >
                  Discuss {ind.name} solutions →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
