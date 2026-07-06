import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";

export default function IndustriesPreview() {
  const featured = industries.slice(0, 6);
  return (
    <section id="industries" data-testid="industries-section" className="ils-section bg-white">
      <div className="ils-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="ils-eyebrow mb-4">Industries We Serve</div>
            <h2 className="ils-h2 text-[#071C38] max-w-2xl">
              Enterprise IT tailored to the reality of your sector.
            </h2>
          </div>
          <Link
            to="/industries"
            data-testid="industries-view-all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#071C38] hover:text-[#00AEEF] transition-colors"
          >
            View all 10 industries
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-testid={`industry-card-${i}`}
              className="group relative overflow-hidden rounded-2xl h-72 shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C38] via-[#071C38]/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00AEEF] mb-2 font-display">
                  {ind.tagline}
                </div>
                <h3 className="font-display font-semibold text-2xl mb-2">{ind.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{ind.summary}</p>
                <Link
                  to="/industries"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#00AEEF] hover:text-white transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
