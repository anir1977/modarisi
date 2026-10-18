"use client";
import { useState } from "react";
import { MINISTRY_TEXTBOOKS, MINISTRY_FRAMEWORKS, TRACKS } from "@/lib/curriculum";
import { BookOpen, FileText, CheckCircle2, Award, Download, ExternalLink, Bookmark, Sparkles, Filter, ChevronDown } from "lucide-react";

export function MinistryResources() {
  const [activeTab, setActiveTab] = useState<"textbooks" | "frameworks" | "coefficients">("textbooks");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");
  const [activeTextbookId, setActiveTextbookId] = useState<string>(MINISTRY_TEXTBOOKS[0].id);

  const subjects = ["all", "الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "الفلسفة", "اللغة الفرنسية", "التربية الإسلامية"];

  const filteredTextbooks = selectedSubjectFilter === "all"
    ? MINISTRY_TEXTBOOKS
    : MINISTRY_TEXTBOOKS.filter((tb) => tb.subject === selectedSubjectFilter);

  const currentBook = MINISTRY_TEXTBOOKS.find((b) => b.id === activeTextbookId) || MINISTRY_TEXTBOOKS[0];

  return (
    <section id="maraji3" className="py-20 lg:py-28 bg-white border-y border-slate-200 relative overflow-hidden">
      {/* Decorative background grid subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-black shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>المكتبة البيداغوجية المعتمدة رسمياً 🇲🇦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            المراجع والكتب المدرسية المقررة
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-emerald-800 via-teal-800 to-blue-900">
              مطابقة 100% لتوجيهات وزارة التربية الوطنية
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
            نوفر لتلميذات وتلاميذ الباكالوريا دليلاً شاملاً للمراجع المعتمدة، والأطر المرجعية المحينة للامتحانات الإشهادية، ومصفوفات توزيع المعاملات ونسب التنقيط الصادرة عن المفتشية العامة للشؤون التربوية.
          </p>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-black shadow-inner">
            <button
              onClick={() => setActiveTab("textbooks")}
              className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "textbooks"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "hover:text-emerald-800 hover:bg-white/50"
              }`}
            >
              <BookOpen size={18} />
              <span>الكتب المدرسية المصادق عليها</span>
            </button>

            <button
              onClick={() => setActiveTab("frameworks")}
              className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "frameworks"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "hover:text-emerald-800 hover:bg-white/50"
              }`}
            >
              <FileText size={18} />
              <span>الأطر المرجعية وسلم التنقيط</span>
            </button>

            <button
              onClick={() => setActiveTab("coefficients")}
              className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "coefficients"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "hover:text-emerald-800 hover:bg-white/50"
              }`}
            >
              <Award size={18} />
              <span>دليل المعاملات والشعب</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TEXTBOOKS */}
        {activeTab === "textbooks" && (
          <div className="space-y-8">
            {/* Subject Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs font-black text-slate-500 ml-2 flex items-center gap-1">
                <Filter size={14} /> تصفية حسب المادة :
              </span>
              {subjects.map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubjectFilter(subj)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubjectFilter === subj
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {subj === "all" ? "جميع المواد" : subj}
                </button>
              ))}
            </div>

            {/* Split View: Textbook Catalog Grid + Detailed Inspector Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Textbook Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTextbooks.map((tb) => {
                  const isActive = tb.id === activeTextbookId;
                  return (
                    <div
                      key={tb.id}
                      onClick={() => setActiveTextbookId(tb.id)}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all text-right ${
                        isActive
                          ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                          : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-black">
                          {tb.subject}
                        </span>
                        <Bookmark
                          size={16}
                          className={isActive ? "text-emerald-700 fill-emerald-700" : "text-slate-300"}
                        />
                      </div>

                      <h4 className="font-black text-base text-slate-900 mt-3 leading-snug">
                        {tb.title}
                      </h4>

                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        {tb.level}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                        <span>دار النشر: {tb.publisher}</span>
                        <span className="text-emerald-700 font-bold">عرض الفهرس ←</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Deep Pedagogical Inspector */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                      فهرس المقرر الرسمي
                    </span>
                    <span className="text-xs text-slate-400 font-sans">{currentBook.subject}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {currentBook.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold mt-1">
                      {currentBook.officialApproval}
                    </p>
                    <p className="text-xs text-slate-300 font-normal mt-2 leading-relaxed">
                      {currentBook.summary}
                    </p>
                  </div>

                  {/* Units List */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>المحاور والوحدات المعتمدة في هذا المقرر :</span>
                    </div>
                    <ul className="space-y-2">
                      {currentBook.keyUnits.map((unit, idx) => (
                        <li
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 font-medium flex items-center gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-md bg-emerald-950 text-emerald-300 font-black text-[11px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Link to Ask AI Tutor About This Book */}
                  <div className="pt-2">
                    <a
                      href="#tuteur"
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} className="text-emerald-300" />
                      <span>اطرح سؤالاً في هذا المقرر على الأستاذ</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: FRAMEWORKS */}
        {activeTab === "frameworks" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MINISTRY_FRAMEWORKS.map((mf) => (
                <div
                  key={mf.id}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all space-y-5 text-right"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black">
                      المعامل : {mf.coefficient}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      المدة : {mf.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-snug">
                      الإطار المرجعي لمادة {mf.subject}
                    </h3>
                    <p className="text-xs text-emerald-800 font-bold mt-1">
                      {mf.circularNumber}
                    </p>
                  </div>

                  {/* Domains */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-700 block">
                      المجالات الرئيسية ونسب التنقيط :
                    </span>
                    <div className="space-y-1.5">
                      {mf.domains.map((dom, dIdx) => (
                        <div key={dIdx} className="p-2 rounded-xl bg-white border border-slate-200 text-xs">
                          <div className="flex justify-between font-black text-slate-900">
                            <span>{dom.name}</span>
                            <span className="text-emerald-700 font-sans">{dom.weight}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">{dom.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skill Distribution */}
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-black text-slate-700 block mb-2">
                      توزيع المستويات المهارية :
                    </span>
                    <div className="space-y-1.5">
                      {mf.skillDistribution.map((sk, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs text-slate-600">
                          <span>{sk.skill}</span>
                          <span className="font-black text-slate-900">{sk.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COEFFICIENTS & TRACKS */}
        {activeTab === "coefficients" && (
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                <table className="min-w-full divide-y divide-slate-200 text-right">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-xs font-black">الشعبة والمسلك الدراسي</th>
                      <th scope="col" className="px-6 py-4 text-xs font-black">المستوى</th>
                      <th scope="col" className="px-6 py-4 text-xs font-black">المواد المقررة والمعاملات الرسمية</th>
                      <th scope="col" className="px-6 py-4 text-xs font-black">المجالات ذات الأولوية في الامتحان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {TRACKS.map((tr) => (
                      <tr key={tr.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-black text-slate-900 text-sm">{tr.nameAr}</div>
                          <div className="text-xs text-slate-500 font-sans">{tr.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-800">
                            {tr.level === "2bac" ? "الثانية باكالوريا" : tr.level === "1bac" ? "الأولى باكالوريا" : "السلك الإعدادي"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-700 font-semibold max-w-xs">
                          {tr.subjects.join(" · ")}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600 font-normal max-w-sm">
                          {tr.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
