"use client";
import { useState } from "react";
import { SAMPLE_EXAMS, SampleExam } from "@/lib/curriculum";
import { Award, BookOpen, Clock, FileCheck, CheckCircle2, Download, Search, Sparkles } from "lucide-react";

export function ExamBank() {
  const [filterSubject, setFilterSubject] = useState("all");
  const [activeExam, setActiveExam] = useState<SampleExam>(SAMPLE_EXAMS[0]);

  const subjects = ["all", "Mathématiques", "Physique-Chimie", "Français"];

  const filtered = filterSubject === "all"
    ? SAMPLE_EXAMS
    : SAMPLE_EXAMS.filter((e) => e.subject === filterSubject);

  return (
    <section id="examens" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold">
            <Award size={14} />
            <span>بنك الامتحانات الوطنية والجهوية المصححة 🇲🇦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            امتحانات الباكالوريا الرسمية مع عناصر الإجابة وسلم التنقيط
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            تدرب على مواضيع السنوات السابقة لجميع الشعب العلمية والأدبية، مع الشرح المفصل لتفادي أخطاء المصححين.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Exam List Left */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setFilterSubject(sub)}
                  className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
                    filterSubject === sub
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {sub === "all" ? "جميع المواد" : sub}
                </button>
              ))}
            </div>

            {/* Exams Cards */}
            <div className="space-y-3">
              {filtered.map((exam) => {
                const isSelected = exam.id === activeExam.id;
                return (
                  <div
                    key={exam.id}
                    onClick={() => setActiveExam(exam)}
                    className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20"
                        : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        معامل {exam.coef} · {exam.duration}
                      </span>
                      <strong className="text-xs font-extrabold text-slate-900">
                        {exam.subject}
                      </strong>
                    </div>
                    <div className="text-sm font-bold text-slate-800 line-clamp-1">
                      {exam.title}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {exam.featuredExercise}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Lycée Success Visual Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center gap-4">
              <img
                src="watermarked_img_1480409542960200520.jpg"
                alt="تلاميذ مغاربة يحتفلون بالحصول على الباكالوريا بتفوق"
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div>
                <strong className="text-xs font-extrabold text-slate-900 block">
                  طريقك نحو ميزة حسن جداً 🎓
                </strong>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  أكثر من 92% من التلاميذ لي خدمو الامتحانات الوطنية مع مدرسي جابو الباك بميزة.
                </p>
              </div>
            </div>

          </div>

          {/* Detailed Exam Solution Right */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  تصحيح رسمي معتمد 2024
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Clock size={13} /> مدة الإنجاز: {activeExam.duration}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {activeExam.title}
              </h3>
            </div>

            {/* Featured Exercise Box */}
            <div className="space-y-2">
              <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                التمرين النموذجي الأكثر تكراراً :
              </strong>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-mono">
                {activeExam.featuredExercise}
              </div>
            </div>

            {/* Solution and Grading Advice */}
            <div className="space-y-3">
              <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                منهجية الحل وعناصر الإجابة :
              </strong>
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-800 space-y-2">
                <p className="font-semibold">{activeExam.solutionSummary}</p>
                <div className="flex items-start gap-2 pt-2 border-t border-blue-200/60 text-blue-900 text-xs">
                  <CheckCircle2 size={16} className="text-blue-700 shrink-0 mt-0.5" />
                  <span>
                    الذكاء الاصطناعي ديال مدرسي كيعطيك التصحيح التفاعلي سؤال بسؤال، وكيدربك على طريقة صياغة الجواب لي كيرتاح ليها المصحح الوطني.
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                متاح لجميع شعب الباكالوريا المغربية (SM, PC, SVT, Eco, Lettres).
              </span>
              <a
                href="#tuteur"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all"
              >
                <Sparkles size={14} />
                <span>شرح هذا الامتحان الآن مع الأستاذ</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
