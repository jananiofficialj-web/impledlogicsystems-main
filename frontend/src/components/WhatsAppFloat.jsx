import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const PHONE = "917042387253";
const DEFAULT_MSG = encodeURIComponent(
  "Hi Imped Logic Systems, I would like to know more about your enterprise IT / AMC services."
);

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3"
          data-testid="whatsapp-float"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="glass-card rounded-2xl p-5 w-72 shadow-2xl border-slate-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-[#25D366] grid place-items-center flex-shrink-0 shadow">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[#071C38] text-sm leading-tight">
                      Imped Logic Support
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Typically replies in 5 mins</div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="ml-auto text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Hi there 👋 — need help with laptop repair, AMC or networking? Chat with our
                  engineer on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${PHONE}?text=${DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-chat-link"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-4 py-3 rounded-md text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Start chat on WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Chat on WhatsApp"
            data-testid="whatsapp-toggle-btn"
            className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white grid place-items-center shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            {open ? <X className="w-6 h-6 relative" /> : <MessageCircle className="w-6 h-6 relative" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
