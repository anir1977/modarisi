"use client";
import { useMemo, useState } from "react";
import { AlertCircle, Calculator, GraduationCap } from "lucide-react";
import { LIBRE_EPS, LSH_REGIONAL, LSH_TRACKS, type ExamSubject, type LshTrack } from "@/lib/tracks-lsh";
import { bacAverage, clampGrade, libreAverage, mentionFor, nationalAverage, selectionScore } from "@/lib/calc/bac";

type Mode = "regular" | "libre";

const MENTION_COLORS = {
  tb: "text-emerald-800 bg-emerald-100 border-emerald-300",
  b: "text-blue-800 bg-blue-100 border-blue-300",
  ab: "text-amber-800 bg-amber-100 border-amber-300",
  p: "text-slate-800 bg-slate-100 border-slate-300",
  fail: "text-rose-800 bg-rose-100 border-rose-300",
} as const;

function GradeInput({
  subject,
  value,
  onChange,
}: {
  subject: ExamSubject;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `g-${subject.id}`;
  return (
    <label htmlFor={id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
      <span className="text-sm font-bold text-slate-900">
        {subject.name}
        <span className="mr-2 text-[11px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-sans">المعامل {subject.coef}</span>
      </span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        max={20}
        step={0.25}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        className="w-24 shrink-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-center font-sans text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </label>
  );
}

const toGrade = (v: string | undefined) => (v === undefined || v.trim() === "" ? null : clampGrade(parseFloat(v.replace(",", "."))));

export function LshCalculator({ mode }: { mode: Mode }) {
  const [trackId, setTrackId] = useState<LshTrack["id"]>("sciences-humaines");
  const [values, setValues] = useState<Record<string, string>>({});
  const [continuous, setContinuous] = useState("");
  const [withEps, setWithEps] = useState(false);

  const track = LSH_TRACKS.find((t) => t.id === trackId) ?? LSH_TRACKS[0];
  const set = (key: string) => (v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const result = useMemo(() => {
    const pick = (prefix: string, list: ExamSubject[]) =>
      list.map((s) => ({ coef: s.coef, grade: toGrade(values[`${prefix}-${s.id}`]) }));

    const regional = pick("r", LSH_REGIONAL);
    const national = pick(`n-${track.id}`, track.national);
    const eps = { coef: LIBRE_EPS.coef, grade: toGrade(values["eps"]) };

    const all = [...regional, ...national, ...(mode === "libre" && withEps ? [eps] : [])];
    const missing = all.filter((s) => s.grade === null).length + (mode === "regular" && toGrade(continuous) === null ? 1 : 0);
    if (missing > 0) return { missing };

    const filled = (l: { coef: number; grade: number | null }[]) => l.map((s) => ({ coef: s.coef, grade: s.grade ?? 0 }));
    const regAvg = nationalAverage(filled(regional));
    const natAvg = nationalAverage(filled(national));
    const avg =
      mode === "libre" ? libreAverage(filled(all)) : bacAverage(regAvg, toGrade(continuous) ?? 0, natAvg);

    return { missing: 0, regAvg, natAvg, avg, selection: selectionScore(regAvg, natAvg), mention: mentionFor(avg) };
  }, [values, continuous, withEps, track, mode]);

  return (
    <section className="py-14 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black">
            <Calculator size={16} className="text-emerald-700" />
            <span>{mode === "libre" ? "المترشحون الأحرار" : "المترشحون الرسميون"} · الآداب والعلوم الإنسانية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            {mode === "libre" ? "حساب معدل الباك الحر (الأحرار)" : "حساب معدل الباكالوريا: الآداب والعلوم الإنسانية"}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
            {mode === "libre"
              ? "أدخل نقطك في الامتحان الجهوي والامتحان الوطني. لا تُحتسب المراقبة المستمرة للأحرار، والمعدل هو مجموع (النقطة × المعامل) مقسوماً على مجموع المعاملات."
              : "أدخل نقط الامتحان الجهوي والمراقبة المستمرة والامتحان الوطني: المعدل = 25% جهوي + 25% مراقبة مستمرة + 50% وطني."}
          </p>
        </header>

        <div className="flex justify-center">
          <div role="tablist" className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-sm font-black">
            {LSH_TRACKS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={trackId === t.id}
                onClick={() => setTrackId(t.id)}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  trackId === t.id ? "bg-slate-900 text-white shadow-md" : "text-slate-700 hover:bg-white/70"
                }`}
              >
                {t.nameAr}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="font-black text-slate-900">الامتحان الجهوي (الأولى باكالوريا)</h2>
              {LSH_REGIONAL.map((s) => (
                <GradeInput key={s.id} subject={s} value={values[`r-${s.id}`] ?? ""} onChange={set(`r-${s.id}`)} />
              ))}
            </div>

            {mode === "regular" && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h2 className="font-black text-slate-900">المراقبة المستمرة (الثانية باكالوريا)</h2>
                <GradeInput
                  subject={{ id: "cc", name: "معدل المراقبة المستمرة", coef: 1 }}
                  value={continuous}
                  onChange={setContinuous}
                />
                <p className="text-xs text-slate-500">تجده في مسار (Massar) ضمن نتائج الدورتين.</p>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="font-black text-slate-900">الامتحان الوطني · {track.nameAr}</h2>
              {track.national.map((s) => (
                <GradeInput
                  key={`${track.id}-${s.id}`}
                  subject={s}
                  value={values[`n-${track.id}-${s.id}`] ?? ""}
                  onChange={set(`n-${track.id}-${s.id}`)}
                />
              ))}
            </div>

            {mode === "libre" && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <label className="flex items-center gap-3 font-bold text-slate-900">
                  <input
                    type="checkbox"
                    checked={withEps}
                    onChange={(e) => setWithEps(e.target.checked)}
                    className="w-5 h-5 accent-emerald-700"
                  />
                  اجتزت اختبار التربية البدنية (معامل 1)
                </label>
                {withEps && <GradeInput subject={LIBRE_EPS} value={values["eps"] ?? ""} onChange={set("eps")} />}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="p-7 rounded-3xl bg-slate-950 text-white shadow-2xl space-y-5" aria-live="polite">
              <div className="text-xs text-slate-400 font-bold">المعدل العام التقديري</div>
              {result.missing ? (
                <p className="text-slate-300 font-semibold leading-relaxed">
                  أدخل جميع النقط لحساب المعدل ({result.missing} {result.missing === 1 ? "خانة متبقية" : "خانات متبقية"}).
                </p>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl font-black font-sans text-emerald-300">{result.avg!.toFixed(2)}</div>
                    <div className="text-xs font-bold text-slate-400 mt-1">من أصل 20</div>
                  </div>
                  <div className={`p-3 rounded-2xl border text-center font-black text-sm ${MENTION_COLORS[result.mention!.key]}`}>
                    {result.mention!.label}
                  </div>
                  <dl className="space-y-2 pt-3 border-t border-slate-800 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-slate-300">معدل الجهوي</dt>
                      <dd className="font-sans font-bold">{result.regAvg!.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-300">معدل الوطني</dt>
                      <dd className="font-sans font-bold">{result.natAvg!.toFixed(2)}</dd>
                    </div>
                  </dl>
                </>
              )}
            </div>

            {!result.missing && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <GraduationCap size={18} className="text-blue-700" />
                  نقطة الانتقاء (75% وطني + 25% جهوي)
                </div>
                <div className="font-sans text-3xl font-black text-blue-900">{result.selection!.toFixed(2)}</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  تعتمدها كثير من المدارس في الانتقاء الأولي، لكن ليس كلها. تأكد من إعلان المباراة.
                </p>
              </div>
            )}

            <div className="flex gap-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>
                النتيجة تقديرية. المعاملات المعتمدة هنا هي المعمول بها حسب آخر مصادر اطلعنا عليها، وقد تتغير. تأكد دائماً من
                المذكرة الرسمية لوزارة التربية الوطنية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
