import { Suspense } from "react";
import ComingSoon from "@/components/ComingSoon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";

export default function HomePage() {
  if (process.env.MAINTENANCE_MODE === "true") {
    return <ComingSoon />;
  }

  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Suspense fallback={<div className="h-96 bg-white" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-white" />}>
        <PricingSection />
      </Suspense>
      <CTA />
      <Footer />
    </main>
  );
}
