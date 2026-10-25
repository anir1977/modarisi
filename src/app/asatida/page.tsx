import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { serverDb } from "@/lib/supabase";
import { fmtDate, sessionState, type LiveSession, type Teacher } from "@/lib/live";
import { Radio, Users, Video, CalendarClock } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "حصص مباشرة مع أساتذة مغاربة · الباكالوريا | مدرسي",
  description: "حصص دعم مباشرة (Live) مجانية مع أساتذة مغاربة في الرياضيات والفيزياء وعلوم الحياة والأرض والفلسفة وغيرها. الأساتذة يسجلون وينظمون حصصهم بسهولة.",
  alternates: { canonical: "/asatida" },
};

async function load() {
  const db = serverDb();
  const since = new Date(Date.now() - 4 * 3600_000).toISOString();
  const [s, t] = await Promise.all([
    db
      .from("live_sessions")
      .select("id,teacher_id,title,subject,level,description,starts_at,duration_min,room,teachers(slug,full_name)")
      .gte("starts_at", since)
      .order("starts_at")
      .limit(60),
    db.from("teachers").select("*").order("created_at", { ascending: false }).limit(60),
  ]);
  const sessions = ((s.data ?? []) as unknown as LiveSession[]).filter((x) => sessionState(x) !== "ended");
  return { sessions, teachers: (t.data ?? []) as Teacher[] };
}

export default async function TeachersHub() {
  const { sessions, teachers } = await load();
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white overflow-x-clip">
        <section className="bg-emerald-700 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-right space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sm font-bold">
              <Radio className="w-4 h-4" /> حصص مباشرة
            </span>
            <h1 className="text-3xl sm:text-5xl">الأساتذة والحصص المباشرة</h1>
            <p className="text-lg text-white/85 max-w-2xl">
              حصص دعم Live مع أساتذة مغاربة: فيديو، صوت، مشاركة الشاشة والدردشة، بلا ما تحتاج تطبيق. اختار الحصة وادخل فالوقت.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/asatida/lawha" className="px-5 py-3 rounded-full bg-amber-400 text-slate-950 font-bold">
                أنت أستاذ؟ سجّل وأنشئ حصتك
              </Link>
              <a href="#hisas" className="px-5 py-3 rounded-full bg-white/15 font-bold">
                الحصص القادمة
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-right space-y-14">
          <section id="hisas" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              <CalendarClock className="w-7 h-7 text-emerald-700" /> الحصص القادمة
            </h2>
            {sessions.length === 0 ? (
              <div className="p-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-600">
                ما كاين حتى حصة مبرمجة دابا. رجع قريباً، أو إلا كنت أستاذ{" "}
                <Link href="/asatida/lawha" className="font-bold text-emerald-700 underline">
                  برمج أول حصة
                </Link>
                .
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {sessions.map((s) => {
                  const st = sessionState(s);
                  return (
                    <Link key={s.id} href={`/live/${s.id}`} className="p-5 rounded-3xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-white space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                        {st === "live" ? (
                          <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white">مباشر الآن</span>
                        ) : st === "soon" ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">كتبدا قريباً</span>
                        ) : null}
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">{s.subject}</span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">{s.level}</span>
                      </div>
                      <div className="text-xl font-black text-slate-900 break-words">{s.title}</div>
                      <div className="text-sm text-slate-600">{fmtDate(s.starts_at)} · {s.duration_min} دقيقة</div>
                      {s.teachers && <div className="text-sm font-bold text-emerald-700">الأستاذ(ة): {s.teachers.full_name}</div>}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              <Users className="w-7 h-7 text-emerald-700" /> الأساتذة
            </h2>
            {teachers.length === 0 ? (
              <p className="text-slate-600">كن أول أستاذ فمدرسي.</p>
            ) : (
              <div className="grid sm:grid-cols-3 gap-4">
                {teachers.map((t) => (
                  <Link key={t.id} href={`/asatida/${t.slug}`} className="p-5 rounded-3xl border border-slate-200 hover:border-emerald-400 space-y-1 min-w-0">
                    <div className="text-lg font-black break-words">{t.full_name}</div>
                    <div className="text-sm text-slate-600 break-words">{t.subjects.join(" · ")}</div>
                    {t.city && <div className="text-xs text-slate-500">{t.city}</div>}
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="grid sm:grid-cols-3 gap-4">
            {[
              { t: "سجّل فدقيقة", d: "حساب بالإيميل، ومن بعد صفحة خاصة بك فيها المواد والمستويات." },
              { t: "برمج حصتك", d: "العنوان، المادة، الوقت والمدة. الحصة كتبان مباشرة للتلاميذ." },
              { t: "درّس Live", d: "قاعة فيديو بمشاركة الشاشة والدردشة، بلا تطبيق وبلا حدود ديال العدد." },
            ].map((x, i) => (
              <div key={x.t} className="p-5 rounded-3xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center gap-2 font-black text-lg">
                  <span className="w-8 h-8 rounded-full bg-amber-400 grid place-items-center text-slate-950">{i + 1}</span>
                  {x.t}
                </div>
                <p className="text-sm text-slate-700">{x.d}</p>
              </div>
            ))}
          </section>

          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Video className="w-4 h-4" /> القاعات كتخدم بـ Jitsi Meet (مفتوح المصدر ومجاني).
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
