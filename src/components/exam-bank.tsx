"use client";
import { useState } from "react";
import { SAMPLE_EXAMS, SampleExam } from "@/lib/curriculum";
import { Award, Clock, CheckCircle2, Sparkles } from "lucide-react";

export function ExamBank() {
  const [filterSubject, setFilterSubject] = useState("all");
  const [activeExam, setActiveExam] = useState<SampleExam>(SAMPLE_EXAMS[0]);

  const subjects = [
    { id: "all", label: "جميع المواد" },
    { id: "الرياضيات", label: "مادة الرياضيات" },
    { id: "الفيزياء والكيمياء", label: "مادة الفيزياء والكيمياء" },
    { id: "اللغة الفرنسية", label: "مادة اللغة الفرنسية" },
  ];

  const filtered = filterSubject === "all"
    ? SAMPLE_EXAMS
    : SAMPLE_EXAMS.filter((e) => e.subject === filterSubject);

  return (
    <section id="examens" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Large Bold Arabic */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs sm:text-sm font-black">
            <Award size={16} />
            <span>نماذج تدريبية للامتحانات الوطنية والجهوية 🇲🇦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            نماذج تدريبية على شاكلة امتحانات الباكالوريا مع تصحيح منهجي
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
            تدرب على مواضيع السنوات السابقة لجميع الشعب العلمية والأدبية، مع الشرح المفصل لضمان صياغة الإجابة المنهجية التي تمنحك النقطة الكاملة.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* List Left */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 pb-1 text-xs sm:text-sm font-black">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setFilterSubject(sub.id)}
                  className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                    filterSubject === sub.id
                      ? "bg-slate-950 text-white shadow-xs"
                      : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Exam Cards */}
            <div className="space-y-3.5">
              {filtered.map((exam) => {
                const isSelected = exam.id === activeExam.id;
                return (
                  <div
                    key={exam.id}
                    onClick={() => setActiveExam(exam)}
                    className={`p-5 rounded-2xl border text-right cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white border-blue-700 shadow-lg ring-2 ring-blue-500/30 transform scale-[1.01]"
                        : "bg-white/90 border-slate-200 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                        معامل {exam.coef} · المدة: {exam.duration}
                      </span>
                      <strong className="text-sm font-black text-slate-950">
                        {exam.subject}
                      </strong>
                    </div>
                    <div className="text-base font-black text-slate-900 line-clamp-1">
                      {exam.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-semibold">
                      {exam.featuredExercise}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Lycée Success Visual Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
                alt="تلاميذ مغاربة يحتفلون بالحصول على شهادة الباكالوريا بتفوق"
                className="w-28 h-28 rounded-2xl object-cover shrink-0 shadow-xs"
              />
              <div className="space-y-1">
                <strong className="text-sm sm:text-base font-black text-slate-950 block">
                  التدريب المنتظم هو مفتاح الامتحان 🎓
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  حل نماذج الامتحانات في ظروف حقيقية وتدبير الوقت من أهم ما يساعدك على الاستعداد للامتحان الوطني.
                </p>
              </div>
            </div>

          </div>

          {/* Exam Details Right */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-slate-300 shadow-xl space-y-7">
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs sm:text-sm font-black text-emerald-900 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300">
                  تصحيح منهجي مقترح
                </span>
                <span className="text-xs sm:text-sm text-slate-600 font-bold flex items-center gap-1.5">
                  <Clock size={16} /> مدة الإنجاز المقررة : {activeExam.duration}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 leading-snug">
                {activeExam.title}
              </h3>
            </div>

            {/* Featured Exercise Box */}
            <div className="space-y-2.5">
              <strong className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                التمرين النموذجي الأكثر تكراراً في الامتحانات :
              </strong>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-900 leading-relaxed font-mono">
                {activeExam.featuredExercise}
              </div>
            </div>

            {/* Solution and Grading Advice */}
            <div className="space-y-3.5">
              <strong className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                منهجية الحل المقترحة :
              </strong>
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-sm text-slate-900 space-y-3 font-semibold">
                <p className="leading-relaxed">{activeExam.solutionSummary}</p>
                <div className="flex items-start gap-2.5 pt-3 border-t border-blue-200 text-blue-950 text-xs sm:text-sm">
                  <CheckCircle2 size={18} className="text-blue-700 shrink-0 mt-0.5" />
                  <span>
                    الذكاء الاصطناعي في مدرسي يصحح لك الإجابة سؤالاً بسؤال، ويرشدك إلى طريقة التحرير والتعليل الرياضي المطلوبة في الامتحان.
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-slate-600 font-bold">
                متاح لجميع الشعب (علوم رياضية، فيزيائية، علوم الحياة والأرض، واقتصاد).
              </span>
              <a
                href="#tuteur"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-black text-sm shadow-md transition-all"
              >
                <Sparkles size={16} />
                <span>شرح هذا الامتحان الآن مع الأستاذ</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
