import { motion } from "framer-motion";
import { Monitor, Laptop, Network, Check } from "lucide-react";
import { speciality } from "@/data/services";

const iconMap = { Monitor, Laptop, Network };

export default function Speciality() {
  return (
    <section id="speciality" data-testid="speciality-section" className="ils-section bg-white">
      <div className="ils-container">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="ils-eyebrow mb-4">Our Speciality</div>
            <h2 className="ils-h2 text-[#071C38] max-w-2xl">
              Purpose-built maintenance for every layer of your enterprise IT.
            </h2>
          </div>
          <p className="lg:col-span-5 ils-body max-w-md">
            Whether you run 10 desktops or a nationwide fleet of 10,000 laptops, our AMC
            engagements are structured around measurable uptime, not fine-print.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {speciality.map((s, i) => {
            const Icon = [Monitor, Laptop, Network][i];
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`speciality-card-${i}`}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 hover:-translate-y-2 hover:shadow-2xl hover:border-[#00AEEF]/40 transition-all duration-500 ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${s.accent} blur-2xl opacity-70`} />
                <div className="relative">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00AEEF] mb-4 font-display">
                    {s.tag}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-[#071C38] text-white grid place-items-center mb-6 group-hover:bg-[#00AEEF] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="ils-h3 text-[#071C38] mb-3 font-display">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 mt-0.5 text-[#00AEEF] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" data-testid={`speciality-cta-${i}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#071C38] group-hover:text-[#00AEEF] transition-colors">
                    Explore plan →
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
