import { cookies } from "next/headers";
import ComingSoon from "@/components/ComingSoon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PricingSection from "@/components/landing/PricingSection";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "modarisi_maintenance";

export default function HomePage() {
  const val = cookies().get(COOKIE_NAME)?.value;
  // Default to maintenance ON when no cookie has been set yet
  const maintenance = val === undefined ? true : val === "1";

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
