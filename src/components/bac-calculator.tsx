"use client";
import { useState, useMemo } from "react";
import { TRACKS } from "@/lib/curriculum";
import { Calculator, Award, GraduationCap, CheckCircle2, Sparkles, TrendingUp, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type SubjectGrade = {
  name: string;
  coef: number;
  grade: number;
};

export function BacCalculator() {
  const [selectedTrackId, setSelectedTrackId] = useState("2bac-pc");
  const [regionalGrade, setRegionalGrade] = useState<number>(14.5);
  const [continuousGrade, setContinuousGrade] = useState<number>(15.0);

  // Subject default grades by track
  const [grades, setGrades] = useState<Record<string, number>>({
    "الرياضيات": 15,
    "الفيزياء والكيمياء": 14.5,
    "علوم الحياة والأرض": 14,
    "الفلسفة": 12,
    "اللغة الإنجليزية": 15,
    "الاقتصاد العام والإحصاء": 14,
    "المحاسبة والرياضيات المالية": 15,
    "تنظيم المقاولات": 13,
  });

  const trackConfig = useMemo(() => {
    if (selectedTrackId === "2bac-sm") {
      return [
        { name: "الرياضيات", coef: 9 },
        { name: "الفيزياء والكيمياء", coef: 7 },
        { name: "علوم الحياة والأرض", coef: 3 },
        { name: "الفلسفة", coef: 2 },
        { name: "اللغة الإنجليزية", coef: 2 },
      ];
    }
    if (selectedTrackId === "2bac-svt") {
      return [
        { name: "علوم الحياة والأرض", coef: 7 },
        { name: "الرياضيات", coef: 7 },
        { name: "الفيزياء والكيمياء", coef: 5 },
        { name: "الفلسفة", coef: 2 },
        { name: "اللغة الإنجليزية", coef: 2 },
      ];
    }
    if (selectedTrackId === "2bac-eco") {
      return [
        { name: "الاقتصاد العام والإحصاء", coef: 6 },
        { name: "المحاسبة والرياضيات المالية", coef: 4 },
        { name: "الرياضيات", coef: 4 },
        { name: "تنظيم المقاولات", coef: 3 },
        { name: "الفلسفة", coef: 2 },
      ];
    }
    // Default: 2bac-pc
    return [
      { name: "الفيزياء والكيمياء", coef: 7 },
      { name: "الرياضيات", coef: 7 },
      { name: "علوم الحياة والأرض", coef: 5 },
      { name: "الفلسفة", coef: 2 },
      { name: "اللغة الإنجليزية", coef: 2 },
    ];
  }, [selectedTrackId]);

  // Compute National Exam Grade (50%)
  const nationalStats = useMemo(() => {
    let totalPoints = 0;
    let totalCoef = 0;
    trackConfig.forEach((sub) => {
      const g = grades[sub.name] ?? 14;
      totalPoints += g * sub.coef;
      totalCoef += sub.coef;
    });
    const avg = totalCoef > 0 ? totalPoints / totalCoef : 0;
    return { avg, totalCoef };
  }, [trackConfig, grades]);

  // Final Baccalaureat Grade: 25% Regional + 25% CC + 50% National
  const finalBacGrade = useMemo(() => {
    const r = Math.min(20, Math.max(0, regionalGrade || 0));
    const cc = Math.min(20, Math.max(0, continuousGrade || 0));
    const nat = nationalStats.avg;
    return (r * 0.25) + (cc * 0.25) + (nat * 0.5);
  }, [regionalGrade, continuousGrade, nationalStats.avg]);

  const mention = useMemo(() => {
    if (finalBacGrade >= 16) return { text: "ميزة حسن جداً (Très Bien)", color: "text-emerald-700 bg-emerald-100 border-emerald-300", badge: "ممتاز 🏆" };
    if (finalBacGrade >= 14) return { text: "ميزة حسن (Bien)", color: "text-blue-700 bg-blue-100 border-blue-300", badge: "جيد جداً 🌟" };
    if (finalBacGrade >= 12) return { text: "ميزة مستحسن (Assez Bien)", color: "text-amber-700 bg-amber-100 border-amber-300", badge: "مستحسن 👍" };
    if (finalBacGrade >= 10) return { text: "ميزة مقبول (Passable)", color: "text-slate-700 bg-slate-100 border-slate-300", badge: "ناجح 🎓" };
    return { text: "مستدرك (Session de Rattrapage)", color: "text-rose-700 bg-rose-100 border-rose-300", badge: "استدراكية ⚠️" };
  }, [finalBacGrade]);

  // Eligible Schools
  const eligibleSchools = useMemo(() => {
    const list: { name: string; threshold: string; status: "accessible" | "borderline" | "unlikely" }[] = [];

    if (finalBacGrade >= 15.5) {
      list.push({ name: "كليات الطب والصيدلة وطب الأسنان (FMP / FMD)", threshold: "عتبة ~15.20", status: "accessible" });
      list.push({ name: "الأقسام التحضيرية للمدارس العليا (CPGE)", threshold: "انتقاء ملف", status: "accessible" });
      list.push({ name: "المدارس الوطنية للعلوم التطبيقية (ENSA)", threshold: "عتبة ~13.50", status: "accessible" });
      list.push({ name: "المدرسة الوطنية للهندسة المعمارية (ENA)", threshold: "عتبة ~14.80", status: "accessible" });
    } else if (finalBacGrade >= 13.5) {
      list.push({ name: "المدارس الوطنية للعلوم التطبيقية (ENSA)", threshold: "عتبة ~13.50", status: "accessible" });
      list.push({ name: "المدارس الوطنية للفنون والمهن (ENSAM)", threshold: "عتبة ~13.80", status: "accessible" });
      list.push({ name: "المدارس الوطنية للتجارة والتسيير (ENCG)", threshold: "عتبة ~12.50", status: "accessible" });
      list.push({ name: "كليات الطب (FMP)", threshold: "عتبة ~15.20", status: "borderline" });
    } else if (finalBacGrade >= 12.0) {
      list.push({ name: "المدارس الوطنية للتجارة والتسيير (ENCG)", threshold: "عتبة ~12.50", status: "accessible" });
      list.push({ name: "المدارس العليا للتكنولوجيا (EST)", threshold: "عتبة ~11.50", status: "accessible" });
      list.push({ name: "كليات العلوم والتقنيات (FST)", threshold: "انتقاء ملف", status: "accessible" });
      list.push({ name: "المعاهد العليا للمهن التمريضية (ISPITS)", threshold: "عتبة ~13.00", status: "borderline" });
    } else if (finalBacGrade >= 10.0) {
      list.push({ name: "المدارس العليا للتكنولوجيا (EST)", threshold: "عتبة ~11.50", status: "borderline" });
      list.push({ name: "كليات العلوم والتقنيات (FST)", threshold: "انتقاء ملف", status: "accessible" });
      list.push({ name: "الكليات الجامعية ذات الولوج المفتوح (FS / FSJES / FLSH)", threshold: "ولوج مباشر", status: "accessible" });
      list.push({ name: "شهادة التقني العالي (BTS)", threshold: "انتقاء ملف", status: "accessible" });
    }

    return list;
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
            <span>خوارزمية حساب معدل الباكالوريا الرسمية بالمملكة المغربية 🇲🇦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            حاسبة معدل الباكالوريا والميزات
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-l from-emerald-800 via-teal-800 to-blue-900">
              واستشراف عتبات المدارس العليا
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
            احسب معدلك النهائي بدقة وفق صيغة وزارة التربية الوطنية (25% جهوي + 25% مراقبة مستمرة + 50% وطني)، وتعرف فوراً على ميزتك التقديرية والمدارس العليا المفتوحة أمامك.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-black">
            {TRACKS.filter((t) => t.level === "2bac").map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrackId(tr.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                  selectedTrackId === tr.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-700 hover:text-emerald-900 hover:bg-white/60"
                }`}
              >
                {tr.nameAr.split(":")[1]?.trim() || tr.nameAr}
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
                <span className="text-xs text-slate-500 font-bold">صيغة القانون الإطار</span>
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
                  const val = grades[sub.name] ?? 14;
                  return (
                    <div key={sub.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
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
                        onChange={(e) => updateGrade(sub.name, parseFloat(e.target.value) || 0)}
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

            {/* Post-Bac Horizon Forecast Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                <GraduationCap size={18} className="text-blue-700" />
                <span>المدارس والمعاهد المتاحة بهذا المعدل :</span>
              </div>

              <div className="space-y-2">
                {eligibleSchools.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-black text-slate-900 leading-snug">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.threshold}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 ${
                      item.status === "accessible"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.status === "accessible" ? "حظوظ قوية ✓" : "فرصة متاحة"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 font-medium leading-relaxed pt-1">
                * العتبات تقريبية ومستخلصة من إحصائيات مباريات السنوات الماضية (Preselection Seuil).
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
