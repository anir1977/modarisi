import ComingSoon from "@/components/ComingSoon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";

export const dynamic = "force-dynamic";

export default function HomePage() {
  if (process.env.MAINTENANCE_MODE === "true") {
    return <ComingSoon />;
  }

  return (
    <main className="bg-gray-950">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <PricingSection />
      <CTA />
      <Footer />
    </main>
  );
}
