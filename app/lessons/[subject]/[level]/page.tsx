"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { SUBJECTS, LEVEL_LABELS, type Playlist } from "@/lib/lessons-data";

export default function LevelPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const level = params.level as string;

  const subject = SUBJECTS.find((s) => s.slug === subjectSlug);
  const levelData = subject?.levels[level as keyof typeof subject.levels];

  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(
    levelData?.playlists[0] ?? null
  );

  if (!subject || !levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-500">هذا المستوى غير متاح حالياً</p>
          <Link href="/lessons" className="text-blue-600 text-sm mt-3 block hover:underline">
            ← العودة للدروس
          </Link>
        </div>
      </div>
    );
  }

  const levelLabel = LEVEL_LABELS[level as keyof typeof LEVEL_LABELS] ?? level;
  const getYouTubeEmbedUrl = (item: Playlist) =>
    item.type === "video"
      ? `https://www.youtube.com/embed/${item.id}?hl=ar&rel=0&modestbranding=1`
      : `https://www.youtube.com/embed/videoseries?list=${item.id}&hl=ar&rel=0&modestbranding=1`;
  const getYouTubeUrl = (item: Playlist) =>
    item.type === "video"
      ? `https://www.youtube.com/watch?v=${item.id}`
      : `https://www.youtube.com/playlist?list=${item.id}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      {/* Breadcrumb header */}
      <div className="pt-16 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link href="/lessons" className="text-slate-400 hover:text-blue-600 transition-colors">
            الدروس
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">{subject.name}</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-[#1E293B]">{levelLabel}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar: playlist list ──────────────────────────────── */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className={`${subject.color} px-4 py-3 border-b ${subject.borderColor}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{subject.emoji}</span>
                  <div>
                    <p className="font-black text-[#1E293B] text-sm">{subject.name}</p>
                    <p className="text-slate-500 text-xs">{levelLabel}</p>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                {levelData.playlists.map((playlist, idx) => (
                  <button
                    key={playlist.id}
                    onClick={() => setActivePlaylist(playlist)}
                    className={`w-full text-right px-3 py-3 rounded-xl transition-all flex items-start gap-3 ${
                      activePlaylist?.id === playlist.id
                        ? `${subject.color} border-2 ${subject.borderColor}`
                        : "hover:bg-slate-50 border-2 border-transparent"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 text-white ${subject.badgeColor}`}>
                      {idx + 1}
                    </span>
                    <div className="text-right min-w-0">
                      <p className="text-xs font-bold text-[#1E293B] leading-snug line-clamp-2">
                        {playlist.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{playlist.channelName}</p>
                      {playlist.videoCount && (
                        <p className="text-xs text-slate-400">
                          <span className="text-red-500">▶</span> {playlist.videoCount} فيديو
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* AI chat link */}
              <div className="px-3 pb-3">
                <Link
                  href={`/chat?subject=${encodeURIComponent(subject.name)}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-colors"
                >
                  <span>🤖</span>
                  <span>اسأل نور عن {subject.name}</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Main: video player ──────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {activePlaylist ? (
              <div className="space-y-4">
                {/* Video info */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h1 className="font-black text-[#1E293B] text-lg leading-snug">
                        {activePlaylist.title}
                      </h1>
                      <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5">
                        <span>📺</span>
                        {activePlaylist.channelName}
                        {activePlaylist.videoCount && (
                          <span className="text-slate-300">·</span>
                        )}
                        {activePlaylist.videoCount && (
                          <span>{activePlaylist.videoCount} فيديو</span>
                        )}
                      </p>
                    </div>
                    <a
                      href={getYouTubeUrl(activePlaylist)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-red-600 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <ExternalLink size={12} />
                      YouTube
                    </a>
                  </div>
                </div>

                {/* YouTube embed */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
                  <iframe
                    key={activePlaylist.id}
                    src={getYouTubeEmbedUrl(activePlaylist)}
                    title={activePlaylist.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Tips */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: "⏸️", text: "اضغط مساحة لإيقاف/تشغيل الفيديو" },
                    { icon: "📝", text: "خذ ملاحظات أثناء المشاهدة" },
                    { icon: "🤖", text: "لم تفهم؟ اسأل نور مباشرة" },
                  ].map((tip) => (
                    <div key={tip.text} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-500">
                      <span>{tip.icon}</span>
                      <span>{tip.text}</span>
                    </div>
                  ))}
                </div>

                {/* Practice CTA */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✏️</span>
                    <div>
                      <p className="font-bold text-emerald-800 text-sm">هل انتهيت من الدرس؟</p>
                      <p className="text-emerald-600 text-xs">جرب تمارين في {subject.name} لتثبيت المعلومات</p>
                    </div>
                  </div>
                  <Link
                    href="/exercises"
                    className="shrink-0 text-xs font-bold bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    تمارين →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm h-96 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <p className="text-4xl mb-3">📺</p>
                  <p>اختر قائمة تشغيل من اليسار لتبدأ المشاهدة</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
