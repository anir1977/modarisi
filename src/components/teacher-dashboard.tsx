"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { browserDb } from "@/lib/supabase";
import { fmtDate, LIVE_LEVELS, LIVE_SUBJECTS, sessionState, slugify, type LiveSession, type Teacher } from "@/lib/live";
import { LogOut, Plus, Trash2, ExternalLink } from "lucide-react";

const input = "w-full min-w-0 px-4 py-3 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:border-emerald-600";
const btn = "px-5 py-3 rounded-full bg-emerald-700 text-white font-bold disabled:opacity-50";
const card = "p-6 rounded-3xl bg-white border border-slate-200 space-y-4";

function Msg({ m }: { m: { ok: boolean; t: string } | null }) {
  if (!m) return null;
  return <div className={`p-3 rounded-2xl text-sm font-bold ${m.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"}`}>{m.t}</div>;
}

const errAr = (e: string) =>
  /Invalid login/i.test(e)
    ? "الإيميل ولا كلمة السر غالطين."
    : /Email not confirmed/i.test(e)
      ? "خاصك تأكد الإيميل ديالك أولاً (شوف الرسالة اللي وصلاتك)."
      : /already registered/i.test(e)
        ? "هاد الإيميل مسجل من قبل، دخل بيه."
        : /Password should be/i.test(e)
          ? "كلمة السر خاصها تكون فيها 6 حروف على الأقل."
          : /rate limit/i.test(e)
            ? "بزاف ديال المحاولات، عاود من بعد شوية."
            : e;

function AuthForm() {
  const [mode, setMode] = useState<"in" | "up">("up");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const db = browserDb();
    if (mode === "up") {
      const { data, error } = await db.auth.signUp({
        email,
        password: pw,
        options: { emailRedirectTo: `${location.origin}/asatida/lawha` },
      });
      if (error) setMsg({ ok: false, t: errAr(error.message) });
      else if (!data.session) setMsg({ ok: true, t: "تصيفطات ليك رسالة فالإيميل. فتحها وكليكي على الرابط باش تأكد الحساب." });
    } else {
      const { error } = await db.auth.signInWithPassword({ email, password: pw });
      if (error) setMsg({ ok: false, t: errAr(error.message) });
    }
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl">فضاء الأستاذ</h1>
        <p className="text-slate-600">سجّل مجاناً، أنشئ صفحتك، وبرمج حصص مباشرة للتلاميذ.</p>
      </header>
      <form onSubmit={submit} className={card}>
        <div className="flex gap-2">
          {(["up", "in"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-full font-bold ${mode === m ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              {m === "up" ? "حساب جديد" : "عندي حساب"}
            </button>
          ))}
        </div>
        <label className="block space-y-1">
          <span className="text-sm font-bold">الإيميل</span>
          <input className={input} type="email" dir="ltr" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">كلمة السر</span>
          <input
            className={input}
            type="password"
            dir="ltr"
            required
            minLength={6}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
        </label>
        <Msg m={msg} />
        <button className={btn} disabled={busy}>
          {busy ? "..." : mode === "up" ? "إنشاء الحساب" : "الدخول"}
        </button>
      </form>
    </div>
  );
}

function ProfileForm({ userId, teacher, onSaved }: { userId: string; teacher: Teacher | null; onSaved: (t: Teacher) => void }) {
  const [name, setName] = useState(teacher?.full_name ?? "");
  const [subjects, setSubjects] = useState<string[]>(teacher?.subjects ?? []);
  const [levels, setLevels] = useState<string[]>(teacher?.levels ?? []);
  const [city, setCity] = useState(teacher?.city ?? "");
  const [bio, setBio] = useState(teacher?.bio ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (subjects.length === 0) return setMsg({ ok: false, t: "اختار على الأقل مادة وحدة." });
    setBusy(true);
    setMsg(null);
    const row = { id: userId, full_name: name.trim(), subjects, levels, city: city.trim() || null, bio: bio.trim() || null };
    const db = browserDb();
    const res = teacher
      ? await db.from("teachers").update(row).eq("id", userId).select().single()
      : await db.from("teachers").insert({ ...row, slug: slugify(name) }).select().single();
    setBusy(false);
    if (res.error) setMsg({ ok: false, t: res.error.message });
    else {
      setMsg({ ok: true, t: "تسجلات المعلومات." });
      onSaved(res.data as Teacher);
    }
  }

  const chip = (on: boolean) => `px-3 py-1.5 rounded-full text-sm font-bold border ${on ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-slate-700 border-slate-300"}`;

  return (
    <form onSubmit={save} className={card}>
      <h2 className="text-2xl font-black">{teacher ? "الصفحة ديالي" : "كمّل المعلومات ديالك"}</h2>
      <label className="block space-y-1">
        <span className="text-sm font-bold">الاسم الكامل (كيبان للتلاميذ)</span>
        <input className={input} required minLength={3} maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div className="space-y-2">
        <span className="text-sm font-bold">المواد</span>
        <div className="flex flex-wrap gap-2">
          {LIVE_SUBJECTS.map((s) => (
            <button key={s} type="button" className={chip(subjects.includes(s))} onClick={() => toggle(subjects, setSubjects, s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-bold">المستويات</span>
        <div className="flex flex-wrap gap-2">
          {LIVE_LEVELS.map((l) => (
            <button key={l} type="button" className={chip(levels.includes(l))} onClick={() => toggle(levels, setLevels, l)}>{l}</button>
          ))}
        </div>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-bold">المدينة (اختياري)</span>
        <input className={input} maxLength={60} value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-bold">تعريف قصير (التجربة، الطريقة ديالك...)</span>
        <textarea className={input} rows={4} maxLength={1500} value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <Msg m={msg} />
      <div className="flex flex-wrap items-center gap-3">
        <button className={btn} disabled={busy}>{busy ? "..." : "تسجيل"}</button>
        {teacher && (
          <Link href={`/asatida/${teacher.slug}`} className="inline-flex items-center gap-1 font-bold text-emerald-700" target="_blank">
            شوف الصفحة العمومية <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>
    </form>
  );
}

function NewSession({ teacher, onCreated }: { teacher: Teacher; onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(teacher.subjects[0] ?? LIVE_SUBJECTS[0]);
  const [level, setLevel] = useState(teacher.levels[0] ?? LIVE_LEVELS[0]);
  const [when, setWhen] = useState("");
  const [duration, setDuration] = useState(60);
  const [desc, setDesc] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const start = new Date(when);
    if (isNaN(start.getTime()) || start.getTime() < Date.now() - 5 * 60_000) return setMsg({ ok: false, t: "اختار وقت فالمستقبل." });
    setBusy(true);
    setMsg(null);
    const { error } = await browserDb().from("live_sessions").insert({
      teacher_id: teacher.id,
      title: title.trim(),
      subject,
      level,
      description: desc.trim() || null,
      starts_at: start.toISOString(),
      duration_min: duration,
    });
    setBusy(false);
    if (error) return setMsg({ ok: false, t: error.message });
    setTitle("");
    setDesc("");
    setWhen("");
    setMsg({ ok: true, t: "تبرمجات الحصة وولات كتبان للتلاميذ." });
    onCreated();
  }

  return (
    <form onSubmit={create} className={card}>
      <h2 className="text-2xl font-black flex items-center gap-2"><Plus className="w-6 h-6" /> برمج حصة جديدة</h2>
      <label className="block space-y-1">
        <span className="text-sm font-bold">عنوان الحصة</span>
        <input className={input} required minLength={3} maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً: تمارين الأعداد العقدية - تحضير الوطني" />
      </label>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block space-y-1 min-w-0">
          <span className="text-sm font-bold">المادة</span>
          <select className={input} value={subject} onChange={(e) => setSubject(e.target.value)}>
            {LIVE_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block space-y-1 min-w-0">
          <span className="text-sm font-bold">المستوى</span>
          <select className={input} value={level} onChange={(e) => setLevel(e.target.value)}>
            {LIVE_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        <label className="block space-y-1 min-w-0">
          <span className="text-sm font-bold">النهار والساعة</span>
          <input className={input} type="datetime-local" required value={when} onChange={(e) => setWhen(e.target.value)} />
        </label>
        <label className="block space-y-1 min-w-0">
          <span className="text-sm font-bold">المدة</span>
          <select className={input} value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            {[30, 45, 60, 90, 120, 180].map((d) => <option key={d} value={d}>{d} دقيقة</option>)}
          </select>
        </label>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-bold">وصف (اختياري)</span>
        <textarea className={input} rows={3} maxLength={1000} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="شنو غادي تشرح، وشنو خاص التلميذ يوجد قبل..." />
      </label>
      <Msg m={msg} />
      <button className={btn} disabled={busy}>{busy ? "..." : "برمج الحصة"}</button>
    </form>
  );
}

export function TeacherDashboard() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [teacher, setTeacher] = useState<Teacher | null | undefined>(undefined);
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    const db = browserDb();
    db.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = db.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const uid = session?.user.id;
  const loadAll = useCallback(async () => {
    if (!uid) return;
    const db = browserDb();
    const { data: t } = await db.from("teachers").select("*").eq("id", uid).maybeSingle();
    setTeacher((t as Teacher) ?? null);
    const { data: s } = await db.from("live_sessions").select("*").eq("teacher_id", uid).order("starts_at", { ascending: false }).limit(50);
    setSessions((s ?? []) as LiveSession[]);
  }, [uid]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function remove(id: string) {
    if (!window.confirm("نحيدو هاد الحصة؟")) return;
    await browserDb().from("live_sessions").delete().eq("id", id);
    loadAll();
  }

  if (session === undefined) return <div className="h-64" />;
  if (!session) return <AuthForm />;
  if (teacher === undefined) return <div className="h-64" />;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl break-words">{teacher ? `مرحبا، ${teacher.full_name}` : "مرحبا بك"}</h1>
          <div className="text-sm text-slate-500 break-all" dir="ltr">{session.user.email}</div>
        </div>
        <button onClick={() => browserDb().auth.signOut()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 font-bold text-sm">
          <LogOut className="w-4 h-4" /> خروج
        </button>
      </header>

      {teacher && <NewSession teacher={teacher} onCreated={loadAll} />}

      {teacher && (
        <section className={card}>
          <h2 className="text-2xl font-black">الحصص ديالي</h2>
          {sessions.length === 0 ? (
            <p className="text-slate-600">مازال ما برمجتي حتى حصة.</p>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s) => {
                const st = sessionState(s);
                return (
                  <li key={s.id} className={`p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-3 justify-between ${st === "ended" ? "opacity-60" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <Link href={`/live/${s.id}`} className="font-black break-words hover:underline">{s.title}</Link>
                      <div className="text-sm text-slate-600">{s.subject} · {fmtDate(s.starts_at)} · {s.duration_min} د</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {st !== "ended" && (
                        <Link href={`/live/${s.id}`} className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">رابط الحصة</Link>
                      )}
                      <button onClick={() => remove(s.id)} aria-label="حذف الحصة" className="p-2 rounded-full text-rose-600 hover:bg-rose-50">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="text-xs text-slate-500">نصيحة: صيفط رابط الحصة للتلاميذ ديالك فالواتساب، والصفحة العمومية ديالك كتجمع كاع الحصص.</p>
        </section>
      )}

      <ProfileForm userId={session.user.id} teacher={teacher} onSaved={(t) => setTeacher(t)} />
    </div>
  );
}
