import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Imped Logic replaced our patchwork IT vendors with a single accountable partner. Our helpdesk backlog dropped 62% in the first quarter.",
    author: "Anjali Ramanathan",
    role: "Head of IT · MedixHealth Hospitals",
    logo: "MedixHealth",
    stat: "62%",
    statLabel: "backlog reduction",
  },
  {
    quote:
      "Enterprise-grade SLAs at SME-friendly pricing. Their engineers know our systems better than we do — and the executive reporting is exactly what our board wants.",
    author: "Rohit Sharma",
    role: "COO · NorthPoint Manufacturing",
    logo: "NorthPoint",
    stat: "99.4%",
    statLabel: "uptime · FY 25",
  },
  {
    quote:
      "Chip-level board repair, data recovery, POS uptime — one team, one contract. We onboarded 42 retail stores in 90 days without a single escalation.",
    author: "Priya Bhattacharya",
    role: "VP Operations · UrbanCart Retail",
    logo: "UrbanCart",
    stat: "42 stores",
    statLabel: "onboarded in 90 days",
  },
];

const caseLogos = [
  "MedixHealth", "NorthPoint", "UrbanCart", "Aegis Bank", "PolyForge",
  "Vidyaan Edu", "Skyline Hotels", "GreenAxis", "Meridian IT", "CoreLogix",
  "Nova Retail", "Bharat Systems",
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="ils-section bg-white relative overflow-hidden"
    >
      <div className="ils-container">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="ils-eyebrow mb-4">Case Studies · Testimonials</div>
            <h2 className="ils-h2 text-[#071C38] max-w-2xl">
              Trusted by IT leaders across healthcare, manufacturing and retail.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-center gap-8">
            <div>
              <div className="text-4xl font-display font-semibold text-[#071C38]">1,200+</div>
              <div className="text-xs text-slate-500 tracking-widest uppercase mt-1 font-display font-semibold">Enterprises served</div>
            </div>
            <div className="w-px h-14 bg-slate-200" />
            <div>
              <div className="text-4xl font-display font-semibold text-[#071C38]">98.7%</div>
              <div className="text-xs text-slate-500 tracking-widest uppercase mt-1 font-display font-semibold">SLA adherence</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-testid={`testimonial-card-${i}`}
              className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                i === 1
                  ? "bg-[#071C38] text-white border-[#00AEEF]/40 lg:-translate-y-4 shadow-2xl"
                  : "bg-white border-slate-200 hover:border-[#00AEEF] hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              <Quote className={`w-8 h-8 mb-6 ${i === 1 ? "text-[#00AEEF]" : "text-[#00AEEF]/60"}`} />
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 fill-current ${i === 1 ? "text-[#00AEEF]" : "text-[#00AEEF]"}`} />
                ))}
              </div>
              <p className={`text-base leading-relaxed mb-8 ${i === 1 ? "text-white/90" : "text-slate-700"}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className={`flex items-center justify-between pt-6 border-t ${i === 1 ? "border-white/15" : "border-slate-100"}`}>
                <div>
                  <div className={`font-display font-semibold text-sm ${i === 1 ? "text-white" : "text-[#071C38]"}`}>
                    {t.author}
                  </div>
                  <div className={`text-xs mt-0.5 ${i === 1 ? "text-white/60" : "text-slate-500"}`}>{t.role}</div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-display font-semibold ${i === 1 ? "text-[#00AEEF]" : "text-[#071C38]"}`}>
                    {t.stat}
                  </div>
                  <div className={`text-[10px] uppercase tracking-widest font-semibold font-display ${i === 1 ? "text-white/40" : "text-slate-400"}`}>
                    {t.statLabel}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Animated logo grid */}
        <div className="mt-20 border-t border-slate-200 pt-14">
          <div className="text-center mb-8">
            <div className="ils-eyebrow">Selected Clients</div>
          </div>
          <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <div className="marquee-track py-4">
              {[...caseLogos, ...caseLogos].map((name, i) => (
                <div
                  key={i}
                  data-testid={`case-logo-${i}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-lg bg-slate-50 border border-slate-100 whitespace-nowrap hover:border-[#00AEEF] hover:bg-white transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-[#071C38] text-white grid place-items-center text-[10px] font-display font-bold">
                    {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <span className="text-sm font-semibold text-[#071C38] font-display tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
