import { createContext, useContext, useEffect, useState } from "react";

const dict = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.services": "Services",
    "nav.amc": "AMC", "nav.industries": "Industries", "nav.blog": "Blog",
    "nav.contact": "Contact", "nav.book": "Book Service",
    "hero.badge": "Enterprise IT · India · Since 2026",
    "hero.title1": "Enterprise Laptop", "hero.title2": "IT Infrastructure", "hero.title3": "Solutions.",
    "hero.subtitle": "Professional laptop repair, desktop repair, networking, AMC, chip-level board repair and corporate IT solutions — engineered for enterprises that cannot afford downtime.",
    "hero.bookBtn": "Book Service", "hero.inspectBtn": "Free Inspection",
    "hero.formTitle": "Free Site Visit & Quote",
    "hero.formSub": "Talk to a certified engineer in the next 30 minutes.",
    "hero.formSubmit": "Book Free Consultation",
    "footer.company": "Company", "footer.services": "Services", "footer.contact": "Contact",
    "footer.newsletter": "Enterprise Newsletter",
    "footer.tagline": "Enterprise laptop, desktop and network AMC. Chip-level repair, corporate IT solutions and 24×7 managed services engineered for businesses that cannot afford downtime.",
    "blog.search": "Search articles…", "blog.allCategories": "All",
    "blog.noResults": "No articles match your filters.",
  },
  hi: {
    "nav.home": "होम", "nav.about": "हमारे बारे में", "nav.services": "सेवाएँ",
    "nav.amc": "एएमसी", "nav.industries": "उद्योग", "nav.blog": "ब्लॉग",
    "nav.contact": "संपर्क", "nav.book": "सेवा बुक करें",
    "hero.badge": "एंटरप्राइज़ आईटी · भारत · 2014 से",
    "hero.title1": "एंटरप्राइज़ लैपटॉप", "hero.title2": "आईटी इन्फ्रास्ट्रक्चर", "hero.title3": "समाधान।",
    "hero.subtitle": "पेशेवर लैपटॉप मरम्मत, डेस्कटॉप मरम्मत, नेटवर्किंग, एएमसी, चिप-लेवल बोर्ड मरम्मत और कॉर्पोरेट आईटी समाधान — उन उद्यमों के लिए जो डाउनटाइम बर्दाश्त नहीं कर सकते।",
    "hero.bookBtn": "सेवा बुक करें", "hero.inspectBtn": "मुफ़्त निरीक्षण",
    "hero.formTitle": "मुफ़्त साइट विज़िट और कोटेशन",
    "hero.formSub": "अगले 30 मिनट में एक प्रमाणित इंजीनियर से बात करें।",
    "hero.formSubmit": "मुफ़्त परामर्श बुक करें",
    "footer.company": "कंपनी", "footer.services": "सेवाएँ", "footer.contact": "संपर्क",
    "footer.newsletter": "एंटरप्राइज़ न्यूज़लेटर",
    "footer.tagline": "एंटरप्राइज़ लैपटॉप, डेस्कटॉप और नेटवर्क एएमसी। चिप-लेवल मरम्मत, कॉर्पोरेट आईटी समाधान और 24×7 प्रबंधित सेवाएँ।",
    "blog.search": "लेख खोजें…", "blog.allCategories": "सभी",
    "blog.noResults": "आपके फ़िल्टर से मेल खाते कोई लेख नहीं।",
  },
};

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("ils-lang") || "en");
  useEffect(() => { localStorage.setItem("ils-lang", lang); document.documentElement.lang = lang; }, [lang]);
  const t = (key) => (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useT = () => useContext(LanguageContext);
