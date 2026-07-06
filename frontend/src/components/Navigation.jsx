import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/LanguageContext";

const linkKeys = [
  { key: "nav.home", to: "/", anchor: "hero" },
  { key: "nav.about", to: "/", anchor: "speciality" },
  { key: "nav.services", to: "/", anchor: "trending" },
  { key: "nav.amc", to: "/", anchor: "amc" },
  { key: "nav.industries", to: "/industries" },
  { key: "nav.blog", to: "/blog" },
  { key: "nav.contact", to: "/", anchor: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, lang, setLang } = useT();
  const links = linkKeys.map((l) => ({ ...l, label: t(l.key) }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (link) => {
    setOpen(false);
    if (link.anchor && pathname === "/") {
      document.getElementById(link.anchor)?.scrollIntoView({ behavior: "smooth" });
    } else if (link.anchor) {
      navigate(`/#${link.anchor}`);
      setTimeout(() => document.getElementById(link.anchor)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      navigate(link.to);
    }
  };

  const bookService = () => {
    setOpen(false);
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid="nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#071C38]/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="ils-container flex items-center justify-between h-20">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00AEEF] to-[#0090C0] grid place-items-center shadow-lg shadow-[#00AEEF]/30">
            <span className="text-white font-display font-bold text-sm">IL</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-white text-base tracking-tight">IMPED LOGIC</div>
            <div className="text-[10px] tracking-[0.3em] text-white/60 font-medium">SYSTEMS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleClick(l)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-white/80 hover:text-white transition-colors font-medium relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00AEEF] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            data-testid="nav-lang-toggle"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/15 text-white/80 hover:text-white hover:border-white/40 text-xs font-semibold transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            onClick={bookService}
            data-testid="nav-book-service-btn"
            className="group inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0090C0] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all shadow-lg shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/40"
          >
            {t("nav.book")}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#071C38]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="ils-container py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleClick(l)}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="text-left text-white/85 text-base font-medium py-2"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={bookService}
                data-testid="nav-mobile-book-btn"
                className="mt-2 bg-[#00AEEF] text-white font-semibold px-5 py-3 rounded-md"
              >
                {t("nav.book")}
              </button>
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                data-testid="nav-mobile-lang-toggle"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-semibold px-5 py-3 rounded-md text-sm"
              >
                <Globe className="w-4 h-4" /> {lang === "en" ? "हिंदी" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
