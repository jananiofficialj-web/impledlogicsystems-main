import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Hero from "@/components/sections/Hero";
import Speciality from "@/components/sections/Speciality";
import WhatWeOffer from "@/components/sections/WhatWeOffer";
import FreeSiteVisit from "@/components/sections/FreeSiteVisit";
import TrendingServices from "@/components/sections/TrendingServices";
import AMCServices from "@/components/sections/AMCServices";
import Testimonials from "@/components/sections/Testimonials";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import CTABanner from "@/components/sections/CTABanner";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div data-testid="home-page" className="bg-white">
      <SEO
        title=""
        description="Enterprise laptop, desktop and network AMC. Chip-level repair, data recovery and 24×7 managed IT for businesses that cannot afford downtime."
        path="/"
      />
      <Navigation />
      <Hero />
      <Speciality />
      <WhatWeOffer />
      <FreeSiteVisit />
      <TrendingServices />
      <AMCServices />
      <Testimonials />
      <IndustriesPreview />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}
