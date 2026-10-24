"use client";
import { useState, useMemo } from "react";
import { SCI_TRACKS } from "@/lib/tracks-sci";
import { bacAverage, mentionFor, nationalAverage, selectionScore } from "@/lib/calc/bac";
import { Calculator, GraduationCap, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

type SubjectGrade = {
  name: string;
  coef: number;
  grade: number;
};

export function BacCalculator() {
  const [selectedTrackId, setSelectedTrackId] = useState("pc");
  const [regionalGrade, setRegionalGrade] = useState<number>(14.5);
  const [continuousGrade, setContinuousGrade] = useState<number>(15.0);

  // Grades keyed by subject id (shared between tracks with the same subject)
  const [grades, setGrades] = useState<Record<string, number>>({});

  const trackConfig = useMemo(
    () => (SCI_TRACKS.find((t) => t.id === selectedTrackId) ?? SCI_TRACKS[0]).national,
    [selectedTrackId]
  );

  // Compute National Exam Grade (50%)
  const nationalStats = useMemo(() => {
    const subjects = trackConfig.map((sub) => ({ grade: grades[sub.id] ?? 14, coef: sub.coef }));
    const totalCoef = trackConfig.reduce((acc, sub) => acc + sub.coef, 0);
    return { avg: nationalAverage(subjects), totalCoef };
  }, [trackConfig, grades]);

  // Final Baccalaureat Grade: 25% Regional + 25% CC + 50% National
  const finalBacGrade = useMemo(
    () => bacAverage(regionalGrade, continuousGrade, nationalStats.avg),
    [regionalGrade, continuousGrade, nationalStats.avg]
  );

  // Selection score used by many post-bac schools: 75% National + 25% Regional
  const selection = useMemo(
    () => selectionScore(regionalGrade, nationalStats.avg),
    [regionalGrade, nationalStats.avg]
  );

  const mention = useMemo(() => {
    const m = mentionFor(finalBacGrade);
    const colors: Record<typeof m.key, string> = {
      tb: "text-emerald-700 bg-emerald-100 border-emerald-300",
      b: "text-blue-700 bg-blue-100 border-blue-300",
      ab: "text-amber-700 bg-amber-100 border-amber-300",
      p: "text-slate-700 bg-slate-100 border-slate-300",
      fail: "text-rose-700 bg-rose-100 border-rose-300",
    };
    return { text: m.label, badge: m.short, color: colors[m.key] };
  }, [finalBacGrade]);

  const updateGrade = (subName: string, val: number) => {
    setGrades((prev) => ({ ...prev, [subName]: Math.min(20, Math.max(0, val)) }));
  };

  return (
    <section id="calculateur" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black shadow-xs">
            <Calculator size={16} className="text-emerald-700" />
            <span>حساب معدل الباكالوريا بالمغرب 🇲🇦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            حاسبة معدل الباكالوريا والميزات
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-emerald-800 via-teal-800 to-blue-900">
              ونقطة الانتقاء للمدارس العليا
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
            احسب معدلك العام في الباكالوريا (25% جهوي + 25% مراقبة مستمرة + 50% وطني)، وتعرف على ميزتك التقديرية ونقطة الانتقاء التي تعتمدها أغلب المدارس العليا (75% وطني + 25% جهوي).
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-black">
            {SCI_TRACKS.map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrackId(tr.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                  selectedTrackId === tr.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-700 hover:text-emerald-900 hover:bg-white/60"
                }`}
              >
                {tr.shortAr}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Base Grades Card (Regional & CC) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5 text-right">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
                  المعدلات القاعدية (50% من النتيجة)
                </span>
                <span className="text-xs text-slate-500 font-bold">المترشحون الرسميون</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Regional Exam Grade */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-800">
                    <span>نقطة الامتحان الجهوي الموحد (25%) :</span>
                    <span className="text-emerald-800 font-sans text-sm font-extrabold">{regionalGrade.toFixed(2)} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.25"
                    value={regionalGrade}
                    onChange={(e) => setRegionalGrade(parseFloat(e.target.value) || 0)}
                    className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                    <span>0</span>
                    <span>10 (عتبة النجاح)</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Continuous Assessment Grade */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-800">
                    <span>المراقبة المستمرة للسنة 2 باك (25%) :</span>
                    <span className="text-emerald-800 font-sans text-sm font-extrabold">{continuousGrade.toFixed(2)} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.25"
                    value={continuousGrade}
                    onChange={(e) => setContinuousGrade(parseFloat(e.target.value) || 0)}
                    className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </div>

            {/* National Exam Expected Grades Card (50%) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5 text-right">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-lg">
                  توقعات الامتحان الوطني الموحد (50% من النتيجة)
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  مجموع المعاملات : {nationalStats.totalCoef}
                </span>
              </div>

              <div className="space-y-4">
                {trackConfig.map((sub) => {
                  const val = grades[sub.id] ?? 14;
                  return (
                    <div key={sub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900">{sub.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-sans">
                            المعامل {sub.coef}
                          </span>
                        </div>
                        <span className="font-sans text-sm font-black text-emerald-800">
                          {val.toFixed(2)} / 20
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="0.5"
                        value={val}
                        onChange={(e) => updateGrade(sub.id, parseFloat(e.target.value) || 0)}
                        className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Real-Time Results & Horizon Column (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Final Grade Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-950 text-white border-2 border-emerald-500/30 shadow-2xl space-y-6 text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                  {mention.badge}
                </span>
                <span className="text-xs text-slate-400 font-bold">المعدل العام للباكالوريا</span>
              </div>

              {/* Huge Grade Display */}
              <div className="text-center py-2 space-y-2">
                <div className="text-6xl sm:text-7xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-200 to-amber-300 tracking-tight">
                  {finalBacGrade.toFixed(2)}
                </div>
                <div className="text-xs font-bold text-slate-400">من أصل 20.00</div>
              </div>

              {/* Mention Badge */}
              <div className={`p-3.5 rounded-2xl border text-center font-black text-sm ${mention.color}`}>
                {mention.text}
              </div>

              {/* Composition Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>معدل الامتحان الوطني (50%) :</span>
                  <span className="font-sans font-black text-emerald-400">{nationalStats.avg.toFixed(2)} / 20</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>معدل الامتحان الجهوي (25%) :</span>
                  <span className="font-sans font-bold text-slate-300">{regionalGrade.toFixed(2)} / 20</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>معدل المراقبة المستمرة (25%) :</span>
                  <span className="font-sans font-bold text-slate-300">{continuousGrade.toFixed(2)} / 20</span>
                </div>
              </div>

              {/* Direct Action Link */}
              <div className="pt-2">
                <Link
                  href="/tuteur"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} className="text-emerald-200" />
                  <span>حسن نقطك مع الأستاذ الافتراضي</span>
                </Link>
              </div>
            </div>

            {/* Selection score card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                <GraduationCap size={18} className="text-blue-700" />
                <span>نقطة الانتقاء للمدارس العليا</span>
              </div>

              <div className="flex items-baseline justify-between p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-xs font-bold text-blue-900">75% وطني + 25% جهوي</span>
                <span className="font-sans text-3xl font-black text-blue-900">{selection.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p>
                  تعتمد كثير من المدارس (ENSA، ENCG، كليات الطب…) هذه الصيغة في الانتقاء الأولي، لكن بعضها يعتمد صيغة أخرى أو نقط مواد معينة.
                  تتغير العتبات كل سنة حسب عدد المترشحين، لذلك تأكد دائماً من الإعلان الرسمي لمباراة كل مدرسة.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
