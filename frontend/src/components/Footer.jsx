import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUpRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const clientLogos = [
  "Cognizant", "Infosys", "Wipro", "TCS", "HCL", "Tech Mahindra", "Capgemini", "Accenture",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Subscribed. Welcome aboard.");
      setEmail("");
    } catch (err) {
      const detail = err.response?.data?.detail || "Something went wrong";
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="footer" className="bg-[#071C38] text-white/80 relative overflow-hidden">
      {/* Client marquee */}
      <div className="border-y border-white/10 py-8 overflow-hidden">
        <div className="text-xs tracking-[0.3em] text-white/40 uppercase text-center mb-6 font-semibold font-display">
          Trusted by teams at
        </div>
        <div className="marquee-track">
          {[...clientLogos, ...clientLogos].map((n, i) => (
            <div key={i} className="text-2xl font-display font-semibold text-white/40 whitespace-nowrap tracking-tight">
              {n}
            </div>
          ))}
        </div>
      </div>

      <div className="ils-container py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand + newsletter */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00AEEF] to-[#0090C0] grid place-items-center">
              <span className="text-white font-display font-bold text-sm">IL</span>
            </div>
            <div>
              <div className="font-display font-semibold text-white text-lg tracking-tight">IMPED LOGIC SYSTEMS</div>
              <div className="text-[10px] tracking-[0.3em] text-white/50 font-medium">ENTERPRISE IT PARTNER</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 mb-6 max-w-md">
            Enterprise laptop, desktop and network AMC. Chip-level repair, corporate IT solutions
            and 24×7 managed services engineered for businesses that cannot afford downtime.
          </p>

          <form onSubmit={subscribe} data-testid="footer-newsletter-form" className="max-w-md">
            <label className="text-xs font-semibold tracking-[0.24em] text-[#00AEEF] uppercase mb-3 block font-display">
              Enterprise Newsletter
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                data-testid="footer-newsletter-email"
                className="flex-1 bg-white/5 border border-white/15 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00AEEF] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="footer-newsletter-submit"
                className="bg-[#00AEEF] hover:bg-[#0090C0] disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-md text-sm transition-colors inline-flex items-center gap-2"
              >
                {loading ? "..." : "Subscribe"}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-[0.24em] text-white uppercase mb-5 font-display">Company</div>
          <ul className="space-y-3 text-sm">
            <li><a href="/#speciality" className="hover:text-[#00AEEF] transition-colors">About Us</a></li>
            <li><Link to="/industries" className="hover:text-[#00AEEF] transition-colors">Industries</Link></li>
            <li><Link to="/blog" className="hover:text-[#00AEEF] transition-colors">Blog</Link></li>
            <li><a href="/#contact" className="hover:text-[#00AEEF] transition-colors">Careers</a></li>
            <li><a href="/#contact" className="hover:text-[#00AEEF] transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-[0.24em] text-white uppercase mb-5 font-display">Services</div>
          <ul className="space-y-3 text-sm">
            <li><a href="/#amc" className="hover:text-[#00AEEF] transition-colors">Computer AMC</a></li>
            <li><a href="/#trending" className="hover:text-[#00AEEF] transition-colors">Laptop Repair</a></li>
            <li><a href="/#trending" className="hover:text-[#00AEEF] transition-colors">Networking</a></li>
            <li><a href="/#trending" className="hover:text-[#00AEEF] transition-colors">Data Recovery</a></li>
            <li><a href="/#trending" className="hover:text-[#00AEEF] transition-colors">Chip-Level Repair</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-[0.24em] text-white uppercase mb-5 font-display">Contact</div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-[#00AEEF]" />
              <a href="tel:+917042387253" className="hover:text-[#00AEEF]">+91 7042 387 253</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-[#00AEEF]" />
              <a href="mailto:hello@impedlogic.com" className="hover:text-[#00AEEF]">hello@impedlogic.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-[#00AEEF]" />
              <span>Mysuru </span>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-6">
            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" data-testid={`footer-social-${i}`} className="w-9 h-9 grid place-items-center rounded-md bg-white/5 border border-white/10 hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="ils-container py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-2">
          <div>© {new Date().getFullYear()} Imped Logic Systems. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#00AEEF]">Privacy Policy</a>
            <a href="#" className="hover:text-[#00AEEF]">Terms of Service</a>
            <a href="#" className="hover:text-[#00AEEF]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
