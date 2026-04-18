"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, BookOpen, PenLine, MessageCircle, BarChart3,
  Settings, LogOut, Sparkles, Star,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Nav config ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/dashboard",             icon: Home,          label: "Accueil",       emoji: "🏠" },
  { href: "/dashboard/cours",       icon: BookOpen,      label: "Mes cours",     emoji: "📚" },
  { href: "/tashih",                icon: PenLine,       label: "Correction",    emoji: "✏️" },
  { href: "/chat",                  icon: MessageCircle, label: "Chat Nour",     emoji: "💬" },
  { href: "/dashboard/progression", icon: BarChart3,     label: "Progression",   emoji: "📊" },
  { href: "/dashboard/parametres",  icon: Settings,      label: "Paramètres",    emoji: "⚙️" },
];

// ── Context for sharing user data across dashboard pages ───────────────────────

interface DashboardUser {
  firstName: string;
  fullName: string;
  plan: string;
  niveau: string;
  xp: number;
  level: number;
}

const DashboardContext = createContext<DashboardUser>({
  firstName: "", fullName: "", plan: "free", niveau: "1ere", xp: 0, level: 1,
});

export function useDashboard() {
  return useContext(DashboardContext);
}

// ── XP helpers ─────────────────────────────────────────────────────────────────

const XP_LEVELS = [
  { level: 1, label: "Débutant",      min: 0,    max: 200  },
  { level: 2, label: "Intermédiaire", min: 200,  max: 600  },
  { level: 3, label: "Avancé",        min: 600,  max: 1200 },
  { level: 4, label: "Expert",        min: 1200, max: 2000 },
  { level: 5, label: "Maître",        min: 2000, max: 99999 },
];

function getLevel(xp: number) {
  return XP_LEVELS.find(l => xp >= l.min && xp < l.max) ?? XP_LEVELS[XP_LEVELS.length - 1];
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";
}

// ── Layout ─────────────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<DashboardUser>({
    firstName: "", fullName: "", plan: "free", niveau: "1ere", xp: 0, level: 1,
  });

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) { router.push("/auth/login"); return; }

      const [{ data: profile }, { data: child }, { data: msgs }, { data: lessons }, { data: corrections }] =
        await Promise.all([
          supabase.from("profiles").select("full_name, plan").eq("id", authUser.id).single(),
          supabase.from("children").select("level").eq("parent_id", authUser.id).single(),
          supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", authUser.id).eq("role", "user"),
          supabase.from("user_progress").select("id", { count: "exact", head: true }).eq("user_id", authUser.id),
          supabase.from("tashih_corrections").select("id", { count: "exact", head: true }).eq("user_id", authUser.id),
        ]);

      const fullName = profile?.full_name ?? authUser.user_metadata?.full_name ?? authUser.email ?? "Élève";
      const firstName = fullName.split(" ")[0];
      const plan = profile?.plan ?? "free";
      const niveau = child?.level ?? "1ere";

      // Calculate XP from activity
      const msgCount = (msgs as unknown as { count: number } | null)?.count ?? 0;
      const lessonCount = (lessons as unknown as { count: number } | null)?.count ?? 0;
      const corrCount = (corrections as unknown as { count: number } | null)?.count ?? 0;
      const xp = msgCount * 10 + lessonCount * 50 + corrCount * 30;

      const lvl = getLevel(xp);
      setUser({ firstName, fullName, plan, niveau, xp, level: lvl.level });
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const isPro = user.plan === "pro" || user.plan === "famille";
  const lvlInfo = getLevel(user.xp);
  const xpInLevel = user.xp - lvlInfo.min;
  const xpNeeded = lvlInfo.max - lvlInfo.min;
  const xpPct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <DashboardContext.Provider value={user}>
      <div className="min-h-screen bg-[#060a14] flex">

        {/* ══ SIDEBAR (desktop) ══ */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-gray-950/80 border-r border-white/8 fixed left-0 top-0 h-full z-40">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-base">Modarisi</span>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    active
                      ? "bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-white border border-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                  {item.label}
                  {item.href === "/chat" && (
                    <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full px-1.5 py-0.5 leading-none">
                      IA
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Pro badge */}
          {!isPro && (
            <div className="mx-3 mb-3 bg-gradient-to-br from-amber-900/30 to-amber-900/10 border border-amber-500/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold">Plan Pro</span>
              </div>
              <p className="text-amber-400/70 text-xs mb-2.5">
                Corrections illimitées, cours complets
              </p>
              <Link
                href="/pricing"
                className="block text-center text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 rounded-lg py-1.5 transition-colors"
              >
                Passer au Pro →
              </Link>
            </div>
          )}

          {/* User + XP + logout */}
          <div className="border-t border-white/8 p-3">
            {/* XP bar */}
            {user.fullName && (
              <div className="mb-3 px-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{lvlInfo.label}</span>
                  <span className="text-xs text-blue-400 font-semibold">{user.xp} XP</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${xpPct}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {user.fullName ? getInitials(user.fullName) : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user.firstName || "…"}</p>
                <p className="text-gray-600 text-xs capitalize">{user.plan === "free" ? "Gratuit" : user.plan}</p>
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                aria-label="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="flex-1 lg:ml-60 min-h-screen pb-20 lg:pb-0">
          {children}
        </main>

        {/* ══ BOTTOM NAV (mobile) ══ */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-white/8 z-40 flex">
          {NAV_ITEMS.slice(0, 5).map(item => {
            const Icon = item.icon;
            const active = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-center transition-colors ${
                  active ? "text-blue-400" : "text-gray-600 hover:text-gray-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium leading-none">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </DashboardContext.Provider>
  );
}
