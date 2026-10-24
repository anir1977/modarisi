"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InteractiveTutor } from "@/components/interactive-tutor";
import { SnapSolve } from "@/components/snap-solve";
import { TRACKS } from "@/lib/curriculum";
import { Sparkles, Camera, BookOpen, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function TuteurPage() {
  const [selectedTrack, setSelectedTrack] = useState("2bac-pc");
  const [activeTab, setActiveTab] = useState<"chat" | "snap">("chat");

  const current = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#2b2fb3] text-white py-12 lg:py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <Sparkles size={16} />
              <span>فضاء المصاحبة البيداغوجية المباشرة 24/7 🇲🇦</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  أستاذك الافتراضي المتخصص
                  <span className="block mt-1 text-[#f2b233]">
                    في المنهاج المغربي للباكالوريا
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                  اختر شعبتك ومادتك، واكتب سؤالك أو نص التمرين للحصول على شرح مفصل خطوة بخطوة. الأستاذ يعتمد على الذكاء الاصطناعي وقد يخطئ، فتحقق دائماً من الجواب. (10 أسئلة في الساعة كحد أقصى)
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-black shrink-0">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === "chat"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Sparkles size={16} />
                  <span>الشرح المباشر (Chat)</span>
                </button>
                <button
                  onClick={() => setActiveTab("snap")}
                  className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === "snap"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Camera size={16} />
                  <span>مختبر حل التمارين بالصور</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Track Customizer Strip */}
        <section className="bg-slate-100 border-b border-slate-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-black text-slate-700">
                <BookOpen size={16} className="text-emerald-700" />
                <span>الشعبة المحددة حالياً :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrack(t.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      t.id === selectedTrack
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    {t.nameAr.split(":")[1]?.trim() || t.nameAr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workspace Display */}
        <section className="py-10 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === "chat" ? (
              <InteractiveTutor
                selectedTrack={selectedTrack}
                onSelectTrack={setSelectedTrack}
              />
            ) : (
              <SnapSolve />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
