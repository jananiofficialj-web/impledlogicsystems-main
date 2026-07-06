import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { trendingServices } from "@/data/services";

export default function TrendingServices() {
  return (
    <section id="trending" data-testid="trending-services-section" className="ils-section bg-white">
      <div className="ils-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="ils-eyebrow mb-4">Trending Services</div>
            <h2 className="ils-h2 text-[#071C38] max-w-2xl">
              The nine services our enterprise clients call us for the most.
            </h2>
          </div>
          <a href="#contact" data-testid="trending-view-all" className="inline-flex items-center gap-2 text-sm font-semibold text-[#071C38] hover:text-[#00AEEF] transition-colors">
            View all services
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trendingServices.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Sparkles;
            return (
              <motion.a
                key={s.title}
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                data-testid={`trending-service-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 hover:border-[#071C38] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#071C38] to-[#0A2649] text-white grid place-items-center group-hover:from-[#00AEEF] group-hover:to-[#0090C0] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#00AEEF] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display font-semibold text-[#071C38] text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold tracking-widest uppercase text-slate-400 group-hover:text-[#00AEEF] transition-colors font-display">
                  0{i + 1} · Explore
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
