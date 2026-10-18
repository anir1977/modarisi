"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ExamSimulator } from "@/components/exam-simulator";
import { BacCalculator } from "@/components/bac-calculator";
import { MinistryResources } from "@/components/ministry-resources";
import { PedagogicalCharter } from "@/components/pedagogical-charter";
import { InteractiveTutor } from "@/components/interactive-tutor";
import { SnapSolve } from "@/components/snap-solve";
import { ExamBank } from "@/components/exam-bank";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState("2bac-pc");

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
        />
        <ExamSimulator />
        <BacCalculator />
        <MinistryResources />
        <PedagogicalCharter />
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
