"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Level = "3eme" | "2eme" | "1ere";
type SubjectId = "maths" | "physique" | "svt" | "arabe" | "francais" | "social";

type ExamResource = {
  id: string;
  level: Level;
  subject: SubjectId;
  title: string;
  meta: string;
  source: string;
  updated: string;
};

const LEVELS: { id: Level; label: string; status?: string }[] = [
  { id: "3eme", label: "الثالثة إعدادي" },
  { id: "2eme", label: "الثانية إعدادي", status: "قريباً" },
  { id: "1ere", label: "الأولى إعدادي", status: "قريباً" },
];

const SUBJECTS: { id: SubjectId; label: string }[] = [
  { id: "maths", label: "الرياضيات" },
  { id: "physique", label: "الفيزياء والكيمياء" },
  { id: "svt", label: "علوم الحياة والأرض" },
  { id: "arabe", label: "اللغة العربية" },
  { id: "francais", label: "اللغة الفرنسية" },
  { id: "social", label: "الاجتماعيات" },
];

const EXAMS: ExamResource[] = [
  {
    id: "exam-arabe-3eme-local-zagora-2013",
    level: "3eme",
    subject: "arabe",
    title: "امتحان محلي في اللغة العربية",
    meta: "زاكورة · دورة يناير 2013 · مع التصحيح",
    source: "Moutamadris.ma",
    updated: "2025",
  },
  {
    id: "exam-francais-3eme-local-inezgane-2010",
    level: "3eme",
    subject: "francais",
    title: "امتحان محلي في اللغة الفرنسية",
    meta: "إنزكان آيت ملول · دورة يناير 2010 · مع التصحيح",
    source: "Moutamadris.ma",
    updated: "2025",
  },
  {
    id: "exam-social-3eme-local-khemisset-2012",
    level: "3eme",
    subject: "social",
    title: "امتحان محلي في الاجتماعيات",
    meta: "الخميسات · دورة يناير 2012 · مع التصحيح",
    source: "Moutamadris.ma",
    updated: "2025",
  },
];

export default function ExamsPage() {
  const [level, setLevel] = useState<Level>("3eme");
  const [subject, setSubject] = useState<SubjectId>("arabe");
  const [activeId, setActiveId] = useState(EXAMS[0]?.id ?? "");

  const filtered = useMemo(
    () => EXAMS.filter((item) => item.level === level && item.subject === subject),
    [level, subject]
  );

  const active = filtered.find((item) => item.id === activeId) ?? filtered[0] ?? null;
  const viewerUrl = active ? `/api/pdf?id=${encodeURIComponent(active.id)}` : "";
  const selectedSubject = SUBJECTS.find((item) => item.id === subject);
  const selectedLevel = LEVELS.find((item) => item.id === level);

  const selectFilters = (next: { level?: Level; subject?: SubjectId }) => {
    const newLevel = next.level ?? level;
    const newSubject = next.subject ?? subject;
    setLevel(newLevel);
    setSubject(newSubject);

    const first = EXAMS.find((item) => item.level === newLevel && item.subject === newSubject);
    setActiveId(first?.id ?? "");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      <section className="relative pt-16 pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
            alt="امتحانات موثوقة"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-blue-950/85 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-10">
          <div className="inline-flex items-center bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            امتحانات حقيقية مع التصحيح
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            الامتحانات
            <span className="text-amber-300"> الموحدة</span>
          </h1>
          <p className="text-blue-100/90 text-base max-w-2xl leading-8">
            نماذج امتحانات محلية وجهوية موثوقة للتدرب على صيغة الامتحان الحقيقي. لا نستعمل أسئلة مولدة بالذكاء الاصطناعي في هذه الصفحة.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-4">
        <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-5 mb-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
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
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {SUBJECTS.map((item) => {
                  const count = EXAMS.filter((exam) => exam.level === level && exam.subject === item.id).length;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectFilters({ subject: item.id })}
                      className={`rounded-2xl border px-4 py-3 text-right transition-all ${
                        subject === item.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      <span className="block text-sm font-black">{item.label}</span>
                      <span className={`block text-[11px] mt-1 ${subject === item.id ? "text-slate-200" : "text-slate-400"}`}>
                        {count > 0 ? `${count} امتحان` : "قريباً"}
                      </span>
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
                <h2 className="font-black text-[#1E293B]">النماذج المتاحة</h2>
                <span className="text-xs text-slate-400">{filtered.length} مورد</span>
              </div>

              {filtered.length > 0 ? (
                <div className="space-y-2">
                  {filtered.map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setActiveId(exam.id)}
                      className={`w-full text-right rounded-2xl border p-3 transition-all ${
                        active?.id === exam.id
                          ? "bg-blue-50 border-blue-200"
                          : "bg-slate-50 border-slate-100 hover:border-blue-100"
                      }`}
                    >
                      <p className="font-black text-[#1E293B] text-sm leading-6">{exam.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{exam.meta}</p>
                      <p className="text-slate-400 text-xs mt-1">المصدر: {exam.source}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <p className="font-black text-amber-900 text-sm">قريباً</p>
                  <p className="text-amber-700 text-xs leading-6 mt-1">
                    سنضيف امتحانات {selectedSubject?.label} بعد التحقق من ملفات مناسبة.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 rounded-3xl p-5 text-white">
              <h2 className="text-lg font-black mb-2">قبل الامتحان</h2>
              <p className="text-slate-300 text-sm leading-7 mb-4">
                راجع الفروض أولاً، ثم استعمل الامتحانات للتدرب على طريقة الأسئلة والتنقيط.
              </p>
              <Link href="/exercises" className="inline-flex items-center justify-center w-full bg-amber-400 text-slate-950 font-black px-4 py-3 rounded-xl hover:bg-amber-300 transition-colors">
                فتح الفروض والتمارين
              </Link>
            </div>
          </aside>

          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">{selectedLevel?.label} · {selectedSubject?.label}</p>
                <h2 className="font-black text-[#1E293B]">{active?.title ?? "اختر امتحاناً للعرض"}</h2>
                {active && (
                  <p className="text-slate-500 text-xs mt-1">
                    {active.meta} · المصدر: {active.source}
                  </p>
                )}
              </div>
              {active && (
                <a
                  href={viewerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  فتح PDF في صفحة مستقلة
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
                  <p className="font-black text-[#1E293B] mb-2">لا توجد امتحانات لهذا الاختيار حالياً</p>
                  <p className="text-slate-500 text-sm">سنضيف نماذج موثوقة تدريجياً بعد التحقق منها.</p>
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
