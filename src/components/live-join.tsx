"use client";
import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { jitsiUrl, sessionState, type LiveSession } from "@/lib/live";

export function LiveJoin({ session }: { session: Pick<LiveSession, "starts_at" | "duration_min" | "room"> }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return <div className="h-14" />;
  const st = sessionState(session, now);
  if (st === "ended") return <div className="p-4 rounded-2xl bg-slate-100 text-slate-600 font-bold">هاد الحصة سالات.</div>;
  if (st === "upcoming") {
    const mins = Math.round((new Date(session.starts_at).getTime() - now) / 60_000);
    const left = mins >= 1440 ? `${Math.floor(mins / 1440)} يوم` : mins >= 60 ? `${Math.floor(mins / 60)} ساعة و${mins % 60} دقيقة` : `${mins} دقيقة`;
    return (
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 font-bold text-slate-800">
        الحصة كتبدا من بعد {left}. الزر ديال الدخول كيتفتح 15 دقيقة قبل.
      </div>
    );
  }
  return (
    <a
      href={jitsiUrl(session.room)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-rose-600 text-white text-lg font-black hover:bg-rose-700"
    >
      <Video className="w-6 h-6" /> {st === "live" ? "دخل للحصة المباشرة" : "دخل للقاعة (كتبدا قريباً)"}
    </a>
  );
}
