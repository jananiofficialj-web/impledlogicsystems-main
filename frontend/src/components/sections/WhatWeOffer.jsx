import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { whatWeOffer, officeImage } from "@/data/services";

export default function WhatWeOffer() {
  return (
    <section id="offer" data-testid="offer-section" className="ils-section bg-[#F7F9FC] relative overflow-hidden">
      <div className="ils-container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="ils-eyebrow mb-4">What We Offer</div>
            <h2 className="ils-h2 text-[#071C38] mb-6">
              Ten capabilities that keep your business online.
            </h2>
            <p className="ils-body mb-8 max-w-md">
              Every Imped Logic engagement is backed by named engineers, documented SLAs and
              executive-friendly reporting. No middlemen, no ambiguity.
            </p>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img src={officeImage} alt="Enterprise IT engineers" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#071C38]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-3xl font-display font-semibold">98.7%</div>
                <div className="text-xs uppercase tracking-widest text-white/70 font-semibold font-display">SLA adherence · FY 25</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatWeOffer.map((f, i) => {
              const Icon = Icons[f.icon] || Icons.Sparkles;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
                  data-testid={`offer-item-${i}`}
                  className="group bg-white border border-slate-100 rounded-xl p-6 hover:border-[#00AEEF] hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#071C38]/5 grid place-items-center mb-4 group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 text-[#00AEEF] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-[#071C38] text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
