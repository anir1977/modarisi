"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Difficulty = "easy" | "medium" | "hard";

const SUBJECTS = ["الكل", "الرياضيات", "الفيزياء", "علوم الحياة", "العربية", "الفرنسية"];

const MOCK_EXERCISES = [
  {
    id: 1,
    subject: "الرياضيات",
    title: "حل المعادلة من الدرجة الأولى",
    difficulty: "easy" as Difficulty,
    points: 10,
    time: "5 دقائق",
    completed: true,
    score: 10,
  },
  {
    id: 2,
    subject: "الرياضيات",
    title: "المثلثات والزوايا",
    difficulty: "medium" as Difficulty,
    points: 20,
    time: "10 دقائق",
    completed: false,
    score: 0,
  },
  {
    id: 3,
    subject: "الفيزياء",
    title: "قوانين نيوتن",
    difficulty: "hard" as Difficulty,
    points: 30,
    time: "15 دقيقة",
    completed: false,
    score: 0,
  },
  {
    id: 4,
    subject: "علوم الحياة",
    title: "الخلية النباتية والحيوانية",
    difficulty: "easy" as Difficulty,
    points: 10,
    time: "5 دقائق",
    completed: true,
    score: 8,
  },
  {
    id: 5,
    subject: "الرياضيات",
    title: "الكسور والنسب المئوية",
    difficulty: "easy" as Difficulty,
    points: 15,
    time: "8 دقائق",
    completed: false,
    score: 0,
  },
  {
    id: 6,
    subject: "الفيزياء",
    title: "الدارة الكهربائية البسيطة",
    difficulty: "medium" as Difficulty,
    points: 20,
    time: "10 دقائق",
    completed: true,
    score: 18,
  },
];

const DIFF_CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
  easy: { label: "سهل", color: "text-emerald-700", bg: "bg-emerald-100" },
  medium: { label: "متوسط", color: "text-amber-700", bg: "bg-amber-100" },
  hard: { label: "صعب", color: "text-red-700", bg: "bg-red-100" },
};

export default function ExercisesPage() {
  const [activeSubject, setActiveSubject] = useState("الكل");
  const [activeDiff, setActiveDiff] = useState<Difficulty | "all">("all");

  const filtered = MOCK_EXERCISES.filter((ex) => {
    const matchSubject = activeSubject === "الكل" || ex.subject === activeSubject;
    const matchDiff = activeDiff === "all" || ex.difficulty === activeDiff;
    return matchSubject && matchDiff;
  });

  const completed = MOCK_EXERCISES.filter((e) => e.completed).length;
  const totalPoints = MOCK_EXERCISES.filter((e) => e.completed).reduce((sum, e) => sum + e.score, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      {/* ── Hero with photo ──────────────────────────── */}
      <div className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80"
            alt="تمارين"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/85 via-orange-900/80 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span>✏️</span>
            <span>تدرب وثبت معلوماتك</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            التمارين
            <span className="text-amber-300"> التفاعلية</span>
          </h1>
          <p className="text-amber-100/90 text-base mb-6 max-w-xl">
            اختبر فهمك بتمارين قصيرة، اكسب نقاط واصعد في الترتيب الوطني
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 max-w-md">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-3 text-center">
              <p className="text-2xl font-black text-white ltr-num">{completed}</p>
              <p className="text-amber-100 text-xs mt-0.5">منجزة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-3 text-center">
              <p className="text-2xl font-black text-white ltr-num">{totalPoints}</p>
              <p className="text-amber-100 text-xs mt-0.5">نقطة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-3 text-center">
              <p className="text-2xl font-black text-white ltr-num">{MOCK_EXERCISES.length}</p>
              <p className="text-amber-100 text-xs mt-0.5">تمرين</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subject pills + exam CTA ──────────────────── */}
      <div className="max-w-4xl mx-auto px-4 -mt-2">
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-slate-700">اختر المادة</h2>
            <Link
              href="/exam-simulator"
              className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl hover:bg-amber-100 transition-colors"
            >
              امتحان تجريبي ←
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSubject(s)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeSubject === s ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Difficulty filter */}
        <div className="flex gap-2 mb-5">
          {([["all", "الكل"], ["easy", "سهل"], ["medium", "متوسط"], ["hard", "صعب"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setActiveDiff(val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeDiff === val ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-slate-700">التقدم اليومي</span>
            <span className="text-blue-600 font-bold ltr-num">{completed}/10 تمارين</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-blue-600 to-blue-400 rounded-full transition-all"
              style={{ width: `${(completed / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercises list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">📭</p>
              <p>لا توجد تمارين بهذه الفلاتر</p>
            </div>
          ) : (
            filtered.map((ex) => (
              <div
                key={ex.id}
                className={`bg-white rounded-2xl border shadow-sm p-4 flex items-center gap-4 ${
                  ex.completed ? "border-emerald-100" : "border-slate-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                  ex.completed ? "bg-emerald-50" : "bg-slate-50"
                }`}>
                  {ex.completed ? "✅" : "📝"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-blue-600">{ex.subject}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${DIFF_CONFIG[ex.difficulty].bg} ${DIFF_CONFIG[ex.difficulty].color}`}>
                      {DIFF_CONFIG[ex.difficulty].label}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">{ex.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>⏱ {ex.time}</span>
                    <span>⭐ {ex.points} نقطة</span>
                    {ex.completed && <span className="text-emerald-600 font-bold">✓ {ex.score}/{ex.points}</span>}
                  </div>
                </div>

                <button
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    ex.completed
                      ? "border border-slate-200 text-slate-500 hover:bg-slate-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {ex.completed ? "إعادة" : "ابدأ"}
                </button>
              </div>
            ))
          )}
        </div>

        {/* AI help */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div className="flex-1">
            <p className="font-bold text-blue-800 text-sm">تعثرت في تمرين؟</p>
            <p className="text-blue-600 text-xs">المساعد الذكي يحل معك خطوة بخطوة</p>
          </div>
          <Link href="/chat" className="text-sm font-bold text-blue-600 hover:underline">
            اسأل →
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
