import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section data-testid="cta-banner" className="py-16 bg-white">
      <div className="ils-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071C38] via-[#0A2649] to-[#071C38] p-10 lg:p-16"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#00AEEF]/25 blur-3xl" />
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#00AEEF]/15 blur-2xl float-shape" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-white">
              <div className="ils-eyebrow mb-4">Enterprise Partnership</div>
              <h2 className="ils-h2 text-white mb-4 leading-tight">
                Ready to move your IT support from reactive to strategic?
              </h2>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                Book a 30-minute discovery call. We will audit your current infrastructure and
                share a shortlist of quick wins — with or without a contract.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="#contact"
                data-testid="cta-banner-primary"
                className="group inline-flex items-center justify-between gap-3 bg-[#00AEEF] hover:bg-[#0090C0] text-white px-7 py-5 rounded-md font-semibold text-base shadow-lg shadow-[#00AEEF]/40 transition-all"
              >
                Book Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+917042387253"
                data-testid="cta-banner-secondary"
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-7 py-4 rounded-md font-semibold text-sm transition-all"
              >
                Call an expert
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
