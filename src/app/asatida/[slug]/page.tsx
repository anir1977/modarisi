import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { serverDb } from "@/lib/supabase";
import { fmtDate, sessionState, type LiveSession, type Teacher } from "@/lib/live";

export const revalidate = 60;

async function load(slug: string) {
  const db = serverDb();
  const { data: t } = await db.from("teachers").select("*").eq("slug", slug).maybeSingle();
  if (!t) return null;
  const { data: s } = await db
    .from("live_sessions")
    .select("*")
    .eq("teacher_id", t.id)
    .gte("starts_at", new Date(Date.now() - 4 * 3600_000).toISOString())
    .order("starts_at");
  return { teacher: t as Teacher, sessions: ((s ?? []) as LiveSession[]).filter((x) => sessionState(x) !== "ended") };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return { title: "أستاذ غير موجود | مدرسي" };
  const { teacher } = data;
  return {
    title: `${teacher.full_name} · أستاذ ${teacher.subjects.join("، ")} | مدرسي`,
    description: teacher.bio?.slice(0, 160) || `حصص مباشرة مع ${teacher.full_name} على مدرسي.`,
    alternates: { canonical: `/asatida/${teacher.slug}` },
  };
}

export default async function TeacherPage({ params }: { params: Promise<{ slug: string }> }) {
  const data = await load((await params).slug);
  if (!data) notFound();
  const { teacher, sessions } = data;
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white overflow-x-clip">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-right space-y-8">
          <Link href="/asatida" className="text-sm font-bold text-emerald-700">← كل الأساتذة</Link>
          <header className="space-y-3">
            <h1 className="text-3xl sm:text-5xl break-words">{teacher.full_name}</h1>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">{s}</span>
              ))}
              {teacher.levels.map((l) => (
                <span key={l} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-bold">{l}</span>
              ))}
            </div>
            {teacher.city && <div className="text-slate-500">{teacher.city}</div>}
          </header>
          {teacher.bio && <p className="text-lg leading-loose text-slate-700 whitespace-pre-line break-words">{teacher.bio}</p>}

          <section className="space-y-4">
            <h2 className="text-2xl font-black">الحصص القادمة</h2>
            {sessions.length === 0 ? (
              <p className="text-slate-600">ما كاين حتى حصة مبرمجة دابا.</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <Link key={s.id} href={`/live/${s.id}`} className="block p-5 rounded-3xl border border-slate-200 bg-slate-50 hover:border-emerald-400 space-y-1">
                    <div className="text-xl font-black break-words">{s.title}</div>
                    <div className="text-sm text-slate-600">{s.subject} · {s.level} · {fmtDate(s.starts_at)} · {s.duration_min} دقيقة</div>
                    {sessionState(s) === "live" && <span className="inline-block px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">مباشر الآن</span>}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
