import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { amcTiers } from "@/data/services";

export default function AMCServices() {
  return (
    <section id="amc" data-testid="amc-services-section" className="ils-section bg-[#F7F9FC]">
      <div className="ils-container">
        <div className="max-w-3xl mb-14">
          <div className="ils-eyebrow mb-4">AMC Services</div>
          <h2 className="ils-h2 text-[#071C38]">
            Annual Maintenance Contracts, engineered for every scale.
          </h2>
          <p className="ils-body mt-5">
            Predictable per-seat pricing, transparent SLAs, and named engineers — from 5-seat
            SME plans to enterprise contracts spanning 10,000+ endpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {amcTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`amc-tier-${i}`}
              className={`relative rounded-2xl p-7 transition-all duration-500 ${
                tier.highlight
                  ? "bg-[#071C38] text-white lg:scale-105 shadow-2xl border-2 border-[#00AEEF]"
                  : "bg-white border border-slate-200 hover:border-[#071C38] hover:shadow-lg"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00AEEF] text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full font-display">
                  Most Popular
                </div>
              )}
              <div className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-display ${tier.highlight ? "text-[#00AEEF]" : "text-[#00AEEF]"}`}>
                Tier {i + 1}
              </div>
              <h3 className={`font-display font-semibold text-xl mb-3 ${tier.highlight ? "text-white" : "text-[#071C38]"}`}>
                {tier.name}
              </h3>
              <div className="mb-5">
                <div className={`text-3xl font-display font-semibold ${tier.highlight ? "text-white" : "text-[#071C38]"}`}>
                  {tier.price}
                </div>
                <div className={`text-xs mt-1 ${tier.highlight ? "text-white/50" : "text-slate-500"}`}>{tier.per}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.perks.map((p) => (
                  <li key={p} className={`flex items-start gap-2 text-sm ${tier.highlight ? "text-white/80" : "text-slate-700"}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-[#00AEEF]" : "text-[#00AEEF]"}`} />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`amc-tier-cta-${i}`}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
                  tier.highlight ? "text-[#00AEEF]" : "text-[#071C38] hover:text-[#00AEEF]"
                }`}
              >
                Enquire <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
