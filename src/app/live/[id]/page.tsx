import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LiveJoin } from "@/components/live-join";
import { serverDb } from "@/lib/supabase";
import { fmtDate, type LiveSession } from "@/lib/live";

export const revalidate = 60;

async function load(id: string) {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const { data } = await serverDb()
    .from("live_sessions")
    .select("*,teachers(slug,full_name)")
    .eq("id", id)
    .maybeSingle();
  return (data as LiveSession | null) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const s = await load((await params).id);
  if (!s) return { title: "حصة غير موجودة | مدرسي" };
  return {
    title: `${s.title} · حصة مباشرة ${s.subject} | مدرسي`,
    description: s.description?.slice(0, 160) || `حصة مباشرة في ${s.subject} (${s.level}) على مدرسي.`,
    robots: { index: false },
  };
}

export default async function LivePage({ params }: { params: Promise<{ id: string }> }) {
  const s = await load((await params).id);
  if (!s) notFound();
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white overflow-x-clip">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-right space-y-7">
          <Link href="/asatida" className="text-sm font-bold text-emerald-700">← كل الحصص</Link>
          <header className="space-y-3">
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">{s.subject}</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">{s.level}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl break-words">{s.title}</h1>
            <div className="text-slate-600 font-semibold">{fmtDate(s.starts_at)} · {s.duration_min} دقيقة</div>
            {s.teachers && (
              <Link href={`/asatida/${s.teachers.slug}`} className="inline-block font-bold text-emerald-700 underline">
                الأستاذ(ة): {s.teachers.full_name}
              </Link>
            )}
          </header>
          {s.description && <p className="text-lg leading-loose text-slate-700 whitespace-pre-line break-words">{s.description}</p>}
          <LiveJoin session={s} />
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-sm text-slate-700 space-y-2 leading-relaxed">
            <div className="font-black text-base">كيفاش كتخدم القاعة؟</div>
            <p>القاعة كتتحل فصفحة جديدة على Jitsi Meet: كتخدم فالمتصفح ديال التيليفون ولا الحاسوب، وفالتيليفون تقدر تستعمل تطبيق Jitsi Meet المجاني.</p>
            <p>دخل باسمك الحقيقي، وطفي الميكرو ديالك حتى يعطيك الأستاذ الكلمة.</p>
            <p className="text-slate-500">للأستاذ: ملي كتدخل للقاعة اللولة، Jitsi كيطلب منك تسجل الدخول (Google ولا GitHub) باش تولي مسؤول على القاعة وتفتحها للتلاميذ.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
