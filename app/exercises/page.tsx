"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Level = "3eme" | "2eme" | "1ere";
type Term = "term1" | "term2";
type SubjectId = "maths" | "physique" | "svt" | "arabe" | "francais" | "social";

type Resource = {
  id: string;
  level: Level;
  subject: SubjectId;
  term: Term;
  title: string;
  phase: string;
  source: string;
  updated: string;
  url: string;
};

const LEVELS: { id: Level; label: string; status?: string }[] = [
  { id: "3eme", label: "الثالثة إعدادي" },
  { id: "2eme", label: "الثانية إعدادي", status: "قريباً" },
  { id: "1ere", label: "الأولى إعدادي", status: "قريباً" },
];

const SUBJECTS: { id: SubjectId; label: string; emoji: string }[] = [
  { id: "maths", label: "الرياضيات", emoji: "🔢" },
  { id: "physique", label: "الفيزياء والكيمياء", emoji: "⚗️" },
  { id: "svt", label: "علوم الحياة والأرض", emoji: "🌱" },
  { id: "arabe", label: "اللغة العربية", emoji: "📖" },
  { id: "francais", label: "اللغة الفرنسية", emoji: "🇫🇷" },
  { id: "social", label: "الاجتماعيات", emoji: "🌍" },
];

const TERMS: { id: Term; label: string }[] = [
  { id: "term1", label: "الدورة الأولى" },
  { id: "term2", label: "الدورة الثانية" },
];

const RESOURCES: Resource[] = [
  {
    id: "maths-3eme-t1-p1",
    level: "3eme",
    subject: "maths",
    term: "term1",
    title: "فرض الرياضيات مع التصحيح",
    phase: "الدورة الأولى · المرحلة 1 · نموذج 1",
    source: "Moutamadris.ma",
    updated: "2024-2025",
    url: "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  },
];

export default function ExercisesPage() {
  const [level, setLevel] = useState<Level>("3eme");
  const [subject, setSubject] = useState<SubjectId>("maths");
  const [term, setTerm] = useState<Term>("term1");
  const [activeId, setActiveId] = useState(RESOURCES[0]?.id ?? "");

  const filtered = useMemo(
    () => RESOURCES.filter((item) => item.level === level && item.subject === subject && item.term === term),
    [level, subject, term]
  );

  const active = filtered.find((item) => item.id === activeId) ?? filtered[0] ?? null;
  const selectedSubject = SUBJECTS.find((item) => item.id === subject);
  const selectedLevel = LEVELS.find((item) => item.id === level);
  const viewerUrl = active
    ? `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(active.url)}`
    : "";

  const selectFilters = (next: { level?: Level; subject?: SubjectId; term?: Term }) => {
    const newLevel = next.level ?? level;
    const newSubject = next.subject ?? subject;
    const newTerm = next.term ?? term;
    setLevel(newLevel);
    setSubject(newSubject);
    setTerm(newTerm);
    const first = RESOURCES.find((item) => item.level === newLevel && item.subject === newSubject && item.term === newTerm);
    setActiveId(first?.id ?? "");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      <section className="relative pt-16 pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80"
            alt="فروض وتمارين"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/90 via-orange-900/85 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span>✏️</span>
            <span>فروض داخل موديريسي</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            التمارين
            <span className="text-amber-300"> والفروض</span>
          </h1>
          <p className="text-amber-100/90 text-base max-w-2xl leading-8">
            اعرض الفرض داخل الموقع دون الخروج من موديريسي. الملفات تبقى مستضافة عند مصدرها، ونحن نعرضها هنا لتسهيل المراجعة.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-4">
        <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-5 mb-6">
          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <h2 className="text-sm font-black text-[#1E293B] mb-2">المستوى</h2>
              <div className="grid gap-2">
                {LEVELS.map((item) => {
                  const available = item.id === "3eme";
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => available && selectFilters({ level: item.id })}
                      disabled={!available}
                      className={`flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                        level === item.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : available
                            ? "bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-200"
                            : "bg-amber-50 text-slate-500 border-amber-200"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.status && (
                        <span className="coming-soon-badge text-[10px] bg-amber-300 text-amber-900 border border-amber-500 px-2 py-1 rounded-full">
                          {item.status}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black text-[#1E293B] mb-2">المادة</h2>
              <div className="grid grid-cols-2 gap-2">
                {SUBJECTS.map((item) => {
                  const hasResources = RESOURCES.some((r) => r.level === level && r.subject === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectFilters({ subject: item.id })}
                      className={`rounded-2xl border px-3 py-3 text-right transition-all ${
                        subject === item.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      <span className="block text-lg">{item.emoji}</span>
                      <span className="block text-xs font-bold mt-1">{item.label}</span>
                      {!hasResources && (
                        <span className="block text-[10px] text-amber-600 font-bold mt-1">قريباً</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black text-[#1E293B] mb-2">الدورة</h2>
              <div className="grid gap-2">
                {TERMS.map((item) => {
                  const hasResources = RESOURCES.some((r) => r.level === level && r.subject === subject && r.term === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectFilters({ term: item.id })}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                        term === item.id
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:border-emerald-200"
                      }`}
                    >
                      <span>{item.label}</span>
                      {!hasResources && (
                        <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2 py-1 rounded-full">
                          قريباً
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-[#1E293B]">الفروض المتاحة</h2>
                <span className="text-xs text-slate-400">{filtered.length} مورد</span>
              </div>

              {filtered.length > 0 ? (
                <div className="space-y-2">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`w-full text-right rounded-2xl border p-3 transition-all ${
                        active?.id === item.id
                          ? "bg-blue-50 border-blue-200"
                          : "bg-slate-50 border-slate-100 hover:border-blue-100"
                      }`}
                    >
                      <p className="font-black text-[#1E293B] text-sm leading-6">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.phase}</p>
                      <p className="text-slate-400 text-xs mt-1">المصدر: {item.source}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <p className="text-3xl mb-2">⏳</p>
                  <p className="font-black text-amber-900 text-sm">قريباً</p>
                  <p className="text-amber-700 text-xs leading-6 mt-1">
                    سنضيف فروض {selectedSubject?.label} لهذا الاختيار بعد التحقق من روابط مناسبة.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
              <h2 className="text-lg font-black text-blue-900 mb-2">تحتاج شرحاً؟</h2>
              <p className="text-blue-700 text-sm leading-7 mb-4">
                بعد قراءة الفرض، يمكنك طرح السؤال على نور لشرح طريقة الحل.
              </p>
              <Link href="/chat" className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                اسأل نور
              </Link>
            </div>
          </aside>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">{selectedLevel?.label} · {selectedSubject?.label}</p>
                <h2 className="font-black text-[#1E293B]">{active?.title ?? "اختر فرضاً للعرض"}</h2>
                {active && <p className="text-slate-500 text-xs mt-1">{active.phase} · {active.updated}</p>}
              </div>
              {active && (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  فتح الملف عند الحاجة
                </a>
              )}
            </div>

            {active ? (
              <div className="bg-slate-100">
                <iframe
                  key={active.id}
                  src={viewerUrl}
                  title={active.title}
                  className="w-full h-[72vh] min-h-[620px] border-0"
                />
              </div>
            ) : (
              <div className="h-[420px] flex items-center justify-center text-center p-6">
                <div>
                  <p className="text-5xl mb-3">📄</p>
                  <p className="font-black text-[#1E293B] mb-2">لا توجد فروض لهذا الاختيار حالياً</p>
                  <p className="text-slate-500 text-sm">سنضيف الموارد تدريجياً بعد التحقق منها.</p>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
