"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { InteractiveTutor } from "@/components/interactive-tutor";
import { SnapSolve } from "@/components/snap-solve";
import { ExamBank } from "@/components/exam-bank";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState("2bac-pc");

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
        />
        <InteractiveTutor
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
        />
        <SnapSolve />
        <ExamBank />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
