import { getMaintenanceMode } from "@/lib/config";
import ComingSoon from "@/components/ComingSoon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PricingSection from "@/components/landing/PricingSection";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export const dynamic = "force-dynamic"; // always read fresh config

export default function HomePage() {
  const maintenance = getMaintenanceMode();

  if (maintenance) {
    return <ComingSoon />;
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <PricingSection />
      <CTA />
      <Footer />
    </main>
  );
}
