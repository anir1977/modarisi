import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { SUBJECTS } from "@/lib/lessons-data";

const LEVELS = [
  { value: "1ere", label: "السنة الأولى", short: "1ère" },
  { value: "2eme", label: "السنة الثانية", short: "2ème" },
  { value: "3eme", label: "السنة الثالثة", short: "3ème" },
];

// Unsplash photos per subject
const SUBJECT_PHOTOS: Record<string, string> = {
  maths:    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  physique: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80",
  svt:      "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&q=80",
  arabe:    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
  francais: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
  social:   "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
};

// Gradient per subject (CSS gradient string for inline style)
const SUBJECT_GRADIENTS: Record<string, string> = {
  maths:    "from-blue-600 to-indigo-600",
  physique: "from-purple-600 to-violet-600",
  svt:      "from-emerald-600 to-teal-600",
  arabe:    "from-amber-500 to-orange-500",
  francais: "from-rose-500 to-pink-500",
  social:   "from-sky-500 to-cyan-500",
};

export default function LessonsPage() {
  const totalVideos = SUBJECTS.reduce((sum, s) =>
    sum + Object.values(s.levels).reduce((ls, lvl) =>
      ls + (lvl?.playlists.reduce((ps, p) => ps + (p.videoCount ?? 0), 0) ?? 0), 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
            alt="دروس"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/85 to-[#F8FAFC]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span>📺</span>
            <span>محتوى مجاني 100%</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            دروس بصوت
            <span className="text-amber-300"> أستاذ حقيقي</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto mb-10">
            فيديوهات من أساتذة مغاربة متمرسين — منظمة حسب المستوى والمادة
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto w-full">
            {[
              { value: `${totalVideos}+`, label: "فيديو" },
              { value: `${SUBJECTS.length}`, label: "مواد" },
              { value: "3", label: "مستويات" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-3 text-center">
                <p className="text-2xl font-black text-white ltr-num">{stat.value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subject Cards ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 -mt-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => {
            const gradient = SUBJECT_GRADIENTS[subject.slug] ?? "from-blue-600 to-indigo-600";
            const photo = SUBJECT_PHOTOS[subject.slug];
            const totalPlaylists = Object.values(subject.levels).reduce(
              (sum, lvl) => sum + (lvl?.playlists.length ?? 0), 0
            );
            const totalVids = Object.values(subject.levels).reduce(
              (sum, lvl) => sum + (lvl?.playlists.reduce((ps, p) => ps + (p.videoCount ?? 0), 0) ?? 0), 0
            );

            return (
              <div
                key={subject.slug}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                {/* Card photo banner */}
                <div className={`relative h-36 bg-gradient-to-l ${gradient} overflow-hidden`}>
                  {photo && (
                    <Image
                      src={photo}
                      alt={subject.name}
                      fill
                      className="object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-between px-5">
                    <div>
                      <p className="text-white/80 text-xs font-semibold mb-1">{totalPlaylists} قائمة تشغيل</p>
                      <h2 className="text-white font-black text-2xl">{subject.name}</h2>
                      <p className="text-white/70 text-xs mt-1">{totalVids}+ فيديو</p>
                    </div>
                    <span className="text-5xl drop-shadow-lg">{subject.emoji}</span>
                  </div>
                </div>

                {/* Level links */}
                <div className="p-4 space-y-2">
                  {LEVELS.map((level) => {
                    const levelData = subject.levels[level.value as keyof typeof subject.levels];
                    if (!levelData) return null;
                    const vids = levelData.playlists.reduce((s, p) => s + (p.videoCount ?? 0), 0);
                    return (
                      <Link
                        key={level.value}
                        href={`/lessons/${subject.slug}/${level.value}`}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all group/link"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-black shrink-0`}>
                            {level.value === "1ere" ? "1" : level.value === "2eme" ? "2" : "3"}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover/link:text-blue-700 transition-colors">
                              {level.label}
                            </p>
                            <p className="text-xs text-slate-400">{vids}+ فيديو · {levelData.playlists.length} قائمة</p>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-slate-300 group-hover/link:text-blue-500 transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="mt-10 relative overflow-hidden bg-gradient-to-l from-blue-600 to-indigo-700 rounded-3xl p-6 flex gap-5 items-center shadow-lg shadow-blue-200">
          <div className="absolute left-0 top-0 bottom-0 w-48 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=80"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="text-3xl shrink-0 z-10">💡</div>
          <div className="z-10">
            <p className="font-black text-white mb-1">فيديوهات من يوتيوب مباشرة</p>
            <p className="text-blue-200 text-sm leading-relaxed">
              جميع الفيديوهات من قنوات أساتذة مغاربة معروفين مثل{" "}
              <strong className="text-white">9ismi.ma</strong> و
              <strong className="text-white">Youssef Nejjari</strong>.
              المحتوى موافق للمنهج الرسمي المغربي للإعدادي.
            </p>
          </div>
          <Link
            href="/chat"
            className="shrink-0 z-10 bg-white text-blue-700 font-bold text-sm px-4 py-2.5 rounded-2xl hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            🤖 اسأل نور
          </Link>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}
