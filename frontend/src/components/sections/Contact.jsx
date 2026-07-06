import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. We will reply within one business hour.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="ils-section bg-[#F7F9FC]">
      <div className="ils-container">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="ils-eyebrow mb-4">Get In Touch</div>
            <h2 className="ils-h2 text-[#071C38] mb-5">
              Let&apos;s talk about your IT infrastructure.
            </h2>
            <p className="ils-body mb-10">
              Fill out the form or reach us through any of the channels below. A named engineer
              will respond within one business hour.
            </p>

            <div className="space-y-5">
              {[
                { Icon: Phone, label: "Phone", value: "+91 7042 387 253", href: "tel:+917042387253" },
                { Icon: Mail, label: "Email", value: "hello@impedlogic.com", href: "mailto:hello@impedlogic.com" },
                { Icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/917042387253" },
                { Icon: MapPin, label: "Offices", value: "Mysuru", href: null },
                { Icon: Clock, label: "Business Hours", value: "Mon–Sat · 09:00 – 21:00 IST", href: null },
              ].map((item, i) => (
                <div key={i} data-testid={`contact-info-${i}`} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 grid place-items-center flex-shrink-0">
                    <item.Icon className="w-5 h-5 text-[#00AEEF]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1 font-display">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[#071C38] font-medium hover:text-[#00AEEF] transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-[#071C38] font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div data-testid="contact-map" className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="bg-white px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 font-display">Head Office</div>
                  <div className="text-sm font-semibold text-[#071C38] mt-0.5">Mysuru, Karnataka</div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mysuru+Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-map-directions"
                  className="text-xs font-semibold text-[#00AEEF] hover:text-[#0090C0]"
                >
                  Get directions →
                </a>
              </div>
              <iframe
                title="Imped Logic Systems Office Location"
                src="https://www.google.com/maps?q=Mysuru,Karnataka&z=13&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={submit}
            data-testid="contact-form"
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2 block font-display">Full name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="contact-name"
                  className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#00AEEF] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2 block font-display">Work email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="contact-email"
                  className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#00AEEF] transition-colors" />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2 block font-display">Subject</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                data-testid="contact-subject"
                placeholder="AMC enquiry / Data recovery / Networking / Other"
                className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#00AEEF] transition-colors" />
            </div>
            <div className="mb-6">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2 block font-display">Message</label>
              <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                data-testid="contact-message"
                placeholder="Tell us about your fleet size, current setup and requirements…"
                className="w-full border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#00AEEF] transition-colors resize-none" />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="inline-flex items-center gap-2 bg-[#071C38] hover:bg-[#00AEEF] disabled:opacity-60 text-white font-semibold px-7 py-3.5 rounded-md text-sm transition-all"
            >
              {loading ? "Sending…" : (<>Send Message <Send className="w-4 h-4" /></>)}
            </button>
            <p className="text-xs text-slate-400 mt-5">
              We respect your privacy. Your information is never shared with third parties.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
