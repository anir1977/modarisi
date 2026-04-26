import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { SUBJECTS, LEVEL_LABELS } from "@/lib/lessons-data";

const LEVELS = ["1ere", "2eme", "3eme"] as const;

const SUBJECT_PHOTOS: Record<string, string> = {
  maths:    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
  physique: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&q=80",
  svt:      "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=1200&q=80",
  arabe:    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
  francais: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
  social:   "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
};

const LEVEL_ICONS: Record<string, string> = {
  "1ere": "🌱",
  "2eme": "📈",
  "3eme": "🏆",
};

interface Props {
  params: { subject: string };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) notFound();

  const photo = SUBJECT_PHOTOS[subject.slug];
  const totalVideos = Object.values(subject.levels).reduce(
    (sum, lvl) => sum + (lvl?.playlists.reduce((ps, p) => ps + (p.videoCount ?? 0), 0) ?? 0), 0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative pt-16 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          {photo && (
            <Image src={photo} alt={subject.name} fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/80 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 pt-8">
          <Link href="/lessons" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            العودة للدروس
          </Link>

          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 rounded-3xl ${subject.color} border-2 ${subject.borderColor} flex items-center justify-center text-4xl shadow-xl shrink-0`}>
              {subject.emoji}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{subject.name}</h1>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="text-white/70 text-sm">{totalVideos}+ فيديو</span>
                <span className="text-white/40 text-sm">·</span>
                <span className="text-white/70 text-sm">{Object.keys(subject.levels).length} مستوى فيه فيديوهات حالياً</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Level Cards ──────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-slate-500 text-sm mb-4 text-center">
          المستويات التي لا تتوفر فيها فيديوهات حديثة بعد ستظهر بعلامة "قريباً"
        </p>

        <div className="grid gap-4">
          {LEVELS.map((level) => {
            const levelData = subject.levels[level];
            const isAvailable = Boolean(levelData?.playlists.length);

            const vids = levelData?.playlists.reduce((s, p) => s + (p.videoCount ?? 0), 0) ?? 0;
            const cardContent = (
              <>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${subject.color} border ${subject.borderColor} flex items-center justify-center text-2xl shrink-0`}>
                    {LEVEL_ICONS[level] ?? "📺"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-black text-[#1E293B] text-lg">{LEVEL_LABELS[level]}</h2>
                      {!isAvailable && (
                        <span className="coming-soon-badge text-xs font-black text-amber-900 bg-amber-300 border border-amber-500 px-3 py-1 rounded-full shadow-sm">
                          قريباً
                        </span>
                      )}
                    </div>
                    {isAvailable ? (
                      <>
                        <p className="text-slate-400 text-sm mt-0.5">
                          {levelData!.playlists.length} مورد فيديو · {vids}+ فيديو
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {levelData!.playlists.map((p) => (
                            <span
                              key={p.id}
                              className={`text-xs px-2.5 py-0.5 rounded-full ${subject.color} ${subject.borderColor} border text-slate-600 font-medium`}
                            >
                              {p.channelName}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-slate-400 text-sm mt-0.5">
                        ننتقي موارد حديثة ومناسبة للمقرر قبل نشرها
                      </p>
                    )}
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                  isAvailable
                    ? `${subject.badgeColor} text-white group-hover:scale-110`
                    : "bg-amber-100 text-amber-700 ring-2 ring-amber-200"
                }`}>
                  {isAvailable ? (
                    <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-black">...</span>
                  )}
                </div>
              </>
            );

            return isAvailable ? (
              <Link
                key={level}
                href={`/lessons/${subject.slug}/${level}`}
                className={`group bg-white rounded-3xl border-2 ${subject.borderColor} p-5 flex items-center justify-between hover:shadow-lg transition-all hover:-translate-y-0.5`}
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={level}
                className="bg-amber-50/80 rounded-3xl border-2 border-amber-200 p-5 flex items-center justify-between"
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* AI assistant promo */}
        <div className="mt-6 relative overflow-hidden bg-gradient-to-l from-blue-600 to-indigo-700 rounded-3xl p-5 text-white flex items-center justify-between gap-4 shadow-lg shadow-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
              🤖
            </div>
            <div>
              <p className="font-black text-base">لم تفهم درساً؟</p>
              <p className="text-blue-200 text-sm">اسأل نور — يشرح بالعربية خطوة بخطوة</p>
            </div>
          </div>
          <Link
            href={`/chat?subject=${encodeURIComponent(subject.name)}`}
            className="shrink-0 bg-white text-blue-700 font-black text-sm px-4 py-2.5 rounded-2xl hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            اسأل نور ←
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
