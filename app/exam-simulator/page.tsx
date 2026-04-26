"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Phase = "setup" | "loading" | "exam" | "results";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SUBJECTS = ["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "اللغة العربية", "اللغة الفرنسية", "الاجتماعيات"];
const LEVELS = [
  { value: "1ere", label: "السنة الأولى إعدادي" },
  { value: "2eme", label: "السنة الثانية إعدادي" },
  { value: "3eme", label: "السنة الثالثة إعدادي" },
];
const DURATIONS = [
  { value: 5, label: "5 دقائق — مراجعة سريعة" },
  { value: 10, label: "10 دقائق — تدريب مركز" },
  { value: 15, label: "15 دقيقة — جلسة كاملة" },
];

export default function ExamSimulatorPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [level, setLevel] = useState("3eme");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState("");

  // Timer
  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setPhase("results");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const startExam = async () => {
    setPhase("loading");
    setError("");
    try {
      const res = await fetch("/api/exam/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, level, count: 10 }),
      });
      if (!res.ok) throw new Error("فشل تحضير الأسئلة");
      const data = await res.json();
      setQuestions(data.questions || []);
      setAnswers(new Array((data.questions || []).length).fill(-1));
      setCurrent(0);
      setTimeLeft(duration * 60);
      setPhase("exam");
    } catch {
      setError("تعذر تحضير الاختبار الآن. يمكنك الرجوع إلى التمارين والفروض ثم المحاولة لاحقاً.");
      setPhase("setup");
    }
  };

  const answer = useCallback((idx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setPhase("results");
      }
    }, 600);
  }, [current, questions.length]);

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 20) : 0;

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ── Setup ───────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
        <Navbar />

        {/* Hero with background photo */}
        <div className="relative pt-16 pb-12 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80"
              alt="اختبار سريع"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/90 via-red-900/85 to-[#F8FAFC]" />
          </div>
          <div className="relative max-w-2xl mx-auto px-4 pt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <span>📝</span>
              <span>تدريب قصير بعد المراجعة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              اختبار
              <span className="text-amber-300"> سريع</span>
            </h1>
            <p className="text-rose-100/90 text-base leading-7">
              أسئلة تدريبية قصيرة مع تصحيح فوري. استعملها بعد مراجعة الدروس والفروض لقياس الفهم.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-2 pb-8">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <h2 className="font-black text-[#1E293B] mb-2">طريقة الاستعمال</h2>
              <p className="text-slate-600 text-sm leading-7">
                اختر المادة والمستوى، أجب عن الأسئلة، ثم راجع التصحيح. هذه أسئلة تدريبية وليست امتحاناً رسمياً.
              </p>
            </div>

            {/* Subject */}
            <div>
              <label className="font-bold text-[#1E293B] block mb-3">المادة الدراسية</label>
              <div className="grid grid-cols-2 gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      subject === s ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <label className="font-bold text-[#1E293B] block mb-3">المستوى الدراسي</label>
              <div className="flex flex-col gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`py-2.5 px-4 rounded-xl border-2 text-sm font-semibold text-right transition-all ${
                      level === l.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-200"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="font-bold text-[#1E293B] block mb-3">مدة الامتحان</label>
              <div className="flex gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                      duration === d.value ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-500 hover:border-amber-200"
                    }`}
                  >
                    {d.label.split(" — ")[0]}
                    <span className="block text-xs font-normal text-slate-400">{d.label.split(" — ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startExam}
              className="w-full h-12 rounded-xl bg-blue-600 text-white font-black text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              ابدأ الاختبار
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ── Loading ─────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-600 animate-pulse" />
          <p className="text-slate-600 font-bold text-lg">يتم تحضير الاختبار...</p>
          <p className="text-slate-400 text-sm mt-1">لحظات من فضلك</p>
        </div>
      </div>
    );
  }

  // ── Exam ────────────────────────────────────────────────────────
  if (phase === "exam" && questions.length > 0) {
    const q = questions[current];
    const chosen = answers[current];
    const urgent = timeLeft < 120;

    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
        {/* Exam header */}
        <div className={`sticky top-0 z-40 ${urgent ? "bg-red-600" : "bg-blue-600"} text-white px-4 py-3 flex items-center justify-between transition-colors`}>
          <div className="flex items-center gap-3">
            <span className="font-black text-sm">اختبار سريع · {subject}</span>
            <span className="text-blue-200 text-xs">{current + 1}/{questions.length}</span>
          </div>
          <div className="flex items-center gap-2 font-black text-lg ltr-num">
            ⏱ {fmtTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-200">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Question nav */}
          <div className="flex flex-wrap gap-2 mb-6">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                  i === current ? "bg-blue-600 text-white" :
                  answers[i] !== -1 ? "bg-emerald-100 text-emerald-700" :
                  "bg-slate-100 text-slate-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
            <p className="font-bold text-[#1E293B] text-lg leading-relaxed">{q.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => chosen === -1 && answer(i)}
                disabled={chosen !== -1}
                className={`w-full text-right px-5 py-4 rounded-2xl border-2 font-medium text-sm transition-all ${
                  chosen === -1
                    ? "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                    : chosen === i
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-100 bg-slate-50 text-slate-400"
                }`}
              >
                <span className="font-bold text-slate-400 ml-2 ltr-num">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 disabled:opacity-40"
            >
              ← السابق
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
              >
                التالي →
              </button>
            ) : (
              <button
                onClick={() => setPhase("results")}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
              >
                إنهاء الاختبار
              </button>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ── Results ─────────────────────────────────────────────────────
  if (phase === "results") {
    const grade = pct >= 16 ? "ممتاز" : pct >= 12 ? "جيد" : pct >= 10 ? "مقبول" : "تحتاج مراجعة";
    const gradeColor = pct >= 16 ? "text-emerald-600" : pct >= 12 ? "text-blue-600" : pct >= 10 ? "text-amber-600" : "text-red-600";

    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
          {/* Score card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center mb-6">
            <p className="text-slate-500 mb-2">{subject}</p>
            <div className={`text-7xl font-black ${gradeColor} ltr-num`}>{pct}/20</div>
            <p className={`text-lg font-bold mt-2 ${gradeColor}`}>{grade}</p>
            <p className="text-slate-400 text-sm mt-1">
              {score} صحيحة من {questions.length}
            </p>
          </div>

          {/* Correction */}
          <div className="space-y-4 mb-6">
            <h2 className="font-black text-[#1E293B] text-lg">التصحيح التفصيلي</h2>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = q.correct;
              const isCorrect = userAnswer === correct;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border-2 p-5 ${
                    isCorrect ? "border-emerald-200" : "border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <span className={`text-lg ${isCorrect ? "text-emerald-500" : "text-red-500"}`}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    <p className="font-semibold text-slate-800 text-sm leading-relaxed">{q.question}</p>
                  </div>
                  {!isCorrect && (
                    <div className="mb-2 text-sm">
                      <span className="text-red-500 font-semibold">جوابك: </span>
                      <span className="text-red-600">{userAnswer >= 0 ? q.options[userAnswer] : "لم تجب"}</span>
                    </div>
                  )}
                  <div className="text-sm mb-2">
                    <span className="text-emerald-600 font-semibold">الجواب الصحيح: </span>
                    <span className="text-emerald-700">{q.options[correct]}</span>
                  </div>
                  {q.explanation && (
                    <div className="bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-700 leading-relaxed">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setPhase("setup"); setQuestions([]); setAnswers([]); }}
              className="flex-1 py-3 rounded-xl border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              اختبار جديد
            </button>
            <Link
              href="/exercises"
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm text-center hover:bg-blue-700 transition-colors"
            >
              مراجعة الفروض
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return null;
}
