import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Star, ShieldCheck, Zap } from "lucide-react";
import { heroImage } from "@/data/services";
import { useT } from "@/i18n/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Hero() {
  const { t } = useT();
  const tiltRef = useRef(null);
  const onTiltMove = (e) => {
    const el = tiltRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`;
  };
  const onTiltLeave = () => { if (tiltRef.current) tiltRef.current.style.transform = "rotateY(0) rotateX(0)"; };
  const [form, setForm] = useState({ name: "", email: "", mobile: "", computers: "", location: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...form, service: "Hero Book Service" });
      toast.success("Booking received. Our engineer will call within 30 mins.");
      setForm({ name: "", email: "", mobile: "", computers: "", location: "" });
    } catch (err) {
      toast.error(err.response?.data?.detail?.[0]?.msg || "Please check the form and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#071C38]/95 via-[#071C38]/85 to-[#071C38]/70" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Floating shapes + 3D rings + aurora */}
      <motion.div className="absolute top-32 right-[10%] w-48 h-48 rounded-full bg-[#00AEEF]/20 blur-3xl aurora-1" />
      <motion.div
        className="absolute bottom-24 left-[5%] w-72 h-72 rounded-full bg-[#00AEEF]/10 blur-3xl aurora-2"
      />
      {/* Rotating 3D rings */}
      <div className="pointer-events-none absolute -right-40 top-1/4 w-[520px] h-[520px] opacity-40">
        <div className="absolute inset-0 rounded-full border border-[#00AEEF]/30 ring-spin" />
        <div className="absolute inset-10 rounded-full border border-dashed border-white/15 ring-spin-rev" />
        <div className="absolute inset-24 rounded-full border border-[#00AEEF]/20 ring-spin" style={{ animationDuration: "25s" }} />
      </div>
      <div className="pointer-events-none absolute -left-32 -bottom-32 w-[420px] h-[420px] opacity-30">
        <div className="absolute inset-0 rounded-full border-2 border-[#00AEEF]/25 ring-spin-rev" style={{ animationDuration: "60s" }} />
        <div className="absolute inset-16 rounded-full border border-dashed border-white/10 ring-spin" />
      </div>

      <div className="relative z-10 ils-container pt-32 pb-20 grid lg:grid-cols-12 gap-10 items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 text-white"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold tracking-widest uppercase text-[#00AEEF] mb-6 font-display">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            {t("hero.badge")}
          </div>
          <h1 className="ils-h1 leading-[1.05] mb-6">
            {t("hero.title1")} <span className="text-shimmer">&</span>
            <br />
            {t("hero.title2")}
            <br />
            {t("hero.title3")}
          </h1>
          <p className="text-lg text-white/75 max-w-xl mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#contact"
              data-testid="hero-book-service-btn"
              className="group inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0090C0] text-white px-7 py-4 rounded-md font-semibold text-sm shadow-lg shadow-[#00AEEF]/30 hover:shadow-[#00AEEF]/50 transition-all"
            >
              {t("hero.bookBtn")}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#trending"
              data-testid="hero-free-inspection-btn"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white text-white px-7 py-4 rounded-md font-semibold text-sm backdrop-blur transition-all"
            >
              {t("hero.inspectBtn")}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10 max-w-xl">
            {[
              { icon: Star, label: "4.9/5", sub: "494 reviews" },
              { icon: ShieldCheck, label: "1,200+", sub: "Enterprises served" },
              { icon: Zap, label: "6 hrs", sub: "On-site SLA" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <s.icon className="w-5 h-5 text-[#00AEEF]" />
                <div>
                  <div className="font-display font-semibold text-white text-lg leading-none">{s.label}</div>
                  <div className="text-xs text-white/50 mt-1">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form with 3D mouse-tilt */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 perspective-1200"
          onMouseMove={onTiltMove}
          onMouseLeave={onTiltLeave}
        >
          <div ref={tiltRef} className="glass-dark rounded-2xl p-8 lg:p-10 shadow-2xl tilt-card float-y">
            <div className="mb-6 tilt-inner">
              <div className="text-xs font-semibold tracking-[0.24em] text-[#00AEEF] uppercase mb-2 font-display">
                Book Service · No Obligation
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">{t("hero.formTitle")}</h3>
              <p className="text-sm text-white/60 mt-2">{t("hero.formSub")}</p>
            </div>

            <form onSubmit={submit} data-testid="hero-book-form" className="space-y-4">
              {[
                { key: "name", placeholder: "Full name", type: "text", required: true },
                { key: "email", placeholder: "Work email", type: "email", required: true },
                { key: "mobile", placeholder: "Mobile number", type: "tel", required: true },
                { key: "location", placeholder: "Location / City", type: "text", required: false },
              ].map((f) => (
                <input
                  key={f.key}
                  type={f.type}
                  required={f.required}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  data-testid={`hero-form-${f.key}`}
                  className="w-full bg-white/5 border border-white/15 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00AEEF] transition-colors"
                />
              ))}
              <div className="relative">
                <select
                  value={form.computers}
                  onChange={(e) => setForm({ ...form, computers: e.target.value })}
                  data-testid="hero-form-computers"
                  className="w-full bg-white/5 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00AEEF] transition-colors appearance-none"
                >
                  <option value="" className="text-slate-900">Number of devices</option>
                  <option className="text-slate-900">1 – 5</option>
                  <option className="text-slate-900">6 – 20</option>
                  <option className="text-slate-900">21 – 50</option>
                  <option className="text-slate-900">51 – 100</option>
                  <option className="text-slate-900">100+</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-white/60 pointer-events-none" />
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid="hero-form-submit"
                className="w-full bg-[#00AEEF] hover:bg-[#0090C0] disabled:opacity-60 text-white font-semibold py-3.5 rounded-md text-sm transition-all shadow-lg shadow-[#00AEEF]/30"
              >
                {loading ? "…" : t("hero.formSubmit")}
              </button>
              <p className="text-[11px] text-white/40 text-center leading-relaxed">
                By submitting, you agree to be contacted by an Imped Logic engineer regarding your enquiry.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/50 text-[10px] font-semibold tracking-[0.3em] uppercase font-display">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#00AEEF] to-transparent"
        />
      </div>
    </section>
  );
}
