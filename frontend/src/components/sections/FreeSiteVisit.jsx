import { motion } from "framer-motion";
import { PhoneCall, ArrowRight } from "lucide-react";

export default function FreeSiteVisit() {
  return (
    <section data-testid="site-visit-cta" className="py-20 md:py-24 relative overflow-hidden bg-[#071C38]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00AEEF]/15 blur-3xl" />

      <div className="ils-container relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8"
        >
          <div className="text-xs font-semibold tracking-[0.24em] uppercase text-[#00AEEF] mb-4 font-display">
            Free Site Visit · Best Quotation
          </div>
          <h2 className="ils-h2 text-white leading-tight max-w-3xl">
            An engineer at your office within one working day — with a competitive quote in hand.
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl text-base leading-relaxed">
            Call us and we will arrange a certified engineer for a full walkthrough of your IT
            estate. Zero commitment. Zero cost.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <a
            href="tel:+917042387253"
            data-testid="site-visit-call-btn"
            className="group inline-flex items-center justify-between gap-3 bg-[#00AEEF] hover:bg-[#0090C0] text-white px-7 py-5 rounded-md font-semibold text-base shadow-lg shadow-[#00AEEF]/40 transition-all"
          >
            <span className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5" />
              Call +91 7042 387 253
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            data-testid="site-visit-talk-btn"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-7 py-4 rounded-md font-semibold text-sm transition-all"
          >
            Talk to our experts
          </a>
        </motion.div>
      </div>
    </section>
  );
}
