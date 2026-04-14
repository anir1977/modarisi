"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GraduationCap,
  MessageCircle,
  Clock,
  TrendingUp,
  BookOpen,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
  BarChart3,
  Calendar,
  Award,
  Plus,
  X,
  FlaskConical,
  Globe,
  BookMarked,
  Landmark,
  Atom,
  Calculator,
  Lock,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Section =
  | "overview"
  | "matieres"
  | "planning"
  | "progression"
  | "conversations"
  | "recompenses";

type Profile = { full_name: string | null; plan: string | null };
type Child   = { child_name: string; level: string };
type RecentMessage = { id: string; content: string; created_at: string };

// ── Static data ───────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  "1ere": "1ère année collège",
  "2eme": "2ème année collège",
  "3eme": "3ème année collège",
};

const SUBJECTS = [
  { label: "Mathématiques",        icon: Calculator,  color: "bg-blue-100 text-blue-600" },
  { label: "Physique-Chimie",      icon: Atom,        color: "bg-purple-100 text-purple-600" },
  { label: "SVT",                  icon: FlaskConical,color: "bg-green-100 text-green-600" },
  { label: "Français",             icon: BookMarked,  color: "bg-amber-100 text-amber-600" },
  { label: "Arabe",                icon: BookOpen,    color: "bg-rose-100 text-rose-600" },
  { label: "Éducation Islamique",  icon: Landmark,    color: "bg-teal-100 text-teal-600" },
  { label: "Histoire-Géographie",  icon: Globe,       color: "bg-indigo-100 text-indigo-600" },
];

const NAV_ITEMS: { id: Section; icon: React.ElementType; label: string }[] = [
  { id: "overview",       icon: BarChart3,      label: "Vue d'ensemble" },
  { id: "matieres",       icon: BookOpen,       label: "Matières" },
  { id: "planning",       icon: Calendar,       label: "Planning" },
  { id: "progression",    icon: TrendingUp,     label: "Progression" },
  { id: "conversations",  icon: MessageCircle,  label: "Conversations" },
  { id: "recompenses",    icon: Award,          label: "Récompenses" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRelativeTime(iso: string) {
  const diffMins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMins < 1)   return "À l'instant";
  if (diffMins < 60)  return `Il y a ${diffMins} min`;
  const h = Math.floor(diffMins / 60);
  if (h < 24)         return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Hier" : `Il y a ${d} jours`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" });
}

// ── Placeholder card for coming-soon sections ────────────────────────────────

function ComingSoon({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-400 max-w-xs">{description}</p>
      <Badge variant="outline" className="mt-4 text-xs">Bientôt disponible · قريباً</Badge>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  const [section, setSection] = useState<Section>("overview");
  const [showAddChild, setShowAddChild] = useState(false);

  const [profileName, setProfileName]     = useState("Parent");
  const [plan, setPlan]                   = useState<string>("free");
  const [child, setChild]                 = useState<Child | null>(null);
  const [questionsToday, setQuestionsToday] = useState(0);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [profileRes, childRes, todayRes, totalRes, recentRes] = await Promise.all([
        supabase.from("profiles").select("full_name, plan").eq("id", user.id).single(),
        supabase.from("children").select("child_name, level").eq("parent_id", user.id).single(),
        supabase.from("messages").select("id", { count: "exact", head: true })
          .eq("user_id", user.id).eq("role", "user").gte("created_at", todayStart.toISOString()),
        supabase.from("messages").select("id", { count: "exact", head: true })
          .eq("user_id", user.id).eq("role", "user"),
        supabase.from("messages").select("id, content, created_at")
          .eq("user_id", user.id).eq("role", "user")
          .order("created_at", { ascending: false }).limit(20),
      ]);

      const profileData = profileRes.data as Profile | null;
      const name =
        profileData?.full_name ??
        user.user_metadata?.full_name ?? user.email ?? "Parent";

      console.log("[dashboard] profile plan:", profileData?.plan);
      setProfileName(name);
      setPlan(profileData?.plan ?? "free");
      if (childRes.data) setChild(childRes.data as Child);
      setQuestionsToday(todayRes.count ?? 0);
      setQuestionsTotal(totalRes.count ?? 0);
      setRecentMessages((recentRes.data as RecentMessage[]) ?? []);
      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const firstName = profileName.split(" ")[0];
  const initials  = profileName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const childLabel = child ? (LEVEL_LABELS[child.level] ?? child.level) : null;

  // ── Section titles ──────────────────────────────────────────────────────────

  const sectionTitle: Record<Section, string> = {
    overview:      `Bonjour, ${firstName} 👋`,
    matieres:      "Matières · المواد",
    planning:      "Planning · الجدول الزمني",
    progression:   "Progression · التقدم",
    conversations: "Conversations · المحادثات",
    recompenses:   "Récompenses · المكافآت",
  };

  const sectionSub: Record<Section, string> = {
    overview:      child ? `Rapport de ${child.child_name} — ${childLabel}` : "Tableau de bord parent",
    matieres:      "Toutes les matières du collège",
    planning:      "Planifiez les sessions d'étude",
    progression:   "Suivez les progrès par matière",
    conversations: "Historique des questions posées",
    recompenses:   "Badges et accomplissements",
  };

  // ── Section content ─────────────────────────────────────────────────────────

  function renderContent() {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      );
    }

    switch (section) {

      // ── Overview ────────────────────────────────────────────────────────────
      case "overview":
        return (
          <div className="space-y-6">
            {/* Child card */}
            {child && (
              <Card className="border border-primary-100 bg-primary-50/40">
                <CardContent className="p-5 flex flex-wrap items-center gap-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-lg">{child.child_name}</p>
                    <p className="text-sm text-gray-500">{childLabel}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setShowAddChild(true)} className="gap-1">
                      <Plus className="w-3.5 h-3.5" /> Ajouter un enfant
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/chat" className="gap-2">
                        <Sparkles className="w-4 h-4" /> Ouvrir le tuteur IA
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border border-gray-100">
                <CardContent className="p-5">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  {plan === "pro" || plan === "famille" ? (
                    <>
                      <p className="text-2xl font-bold text-gray-900">{questionsToday}</p>
                      <p className="text-xs text-emerald-600 font-semibold mt-0.5">Questions illimitées ∞</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-900">
                        {questionsToday}<span className="text-base font-normal text-gray-400 ml-1">/ 5</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Questions aujourd'hui</p>
                    </>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">أسئلة اليوم</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100">
                <CardContent className="p-5">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{questionsTotal}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Total questions posées</p>
                  <p className="text-xs text-gray-400">مجموع الأسئلة</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 col-span-2 lg:col-span-1">
                <CardContent className="p-5">
                  {plan === "pro" || plan === "famille" ? (
                    <>
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-sm font-semibold text-emerald-700 mb-1">
                        {plan === "pro" ? "Plan Pro actif" : "Plan Famille actif"}
                      </p>
                      <p className="text-xs text-gray-400">Questions illimitées chaque jour</p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {questionsToday < 5
                          ? `${5 - questionsToday} questions restantes`
                          : "Limite atteinte aujourd'hui"}
                      </p>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((questionsToday / 5) * 100, 100)}%` }}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent questions preview */}
            <Card className="border border-gray-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    Questions récentes · الأسئلة الأخيرة
                  </CardTitle>
                  <Button
                    variant="ghost" size="sm" className="text-xs"
                    onClick={() => setSection("conversations")}
                  >
                    Tout voir <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Sparkles className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">Aucune question posée pour l'instant.</p>
                    <Button size="sm" className="mt-4" asChild>
                      <Link href="/chat">Poser une question</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentMessages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                          <MessageCircle className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 line-clamp-1">{msg.content}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatRelativeTime(msg.created_at)} · {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick link to chat */}
            <Card className="border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">Tuteur IA — مدرسي</p>
                  <p className="text-sm text-gray-500">Pose une question en Darija ou en français</p>
                </div>
                <Button size="lg" className="shrink-0 gap-2" asChild>
                  <Link href="/chat">
                    <Sparkles className="w-4 h-4" /> Démarrer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      // ── Matières ─────────────────────────────────────────────────────────────
      case "matieres":
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Clique sur une matière pour poser une question directement au tuteur IA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUBJECTS.map(({ label, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={`/chat?subject=${encodeURIComponent(label)}`}
                  className="group"
                >
                  <Card className="border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Poser une question →</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );

      // ── Conversations ────────────────────────────────────────────────────────
      case "conversations":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {questionsTotal} question{questionsTotal !== 1 ? "s" : ""} posée{questionsTotal !== 1 ? "s" : ""} au total
              </p>
              <Button size="sm" asChild>
                <Link href="/chat" className="gap-1">
                  <Plus className="w-3.5 h-3.5" /> Nouvelle question
                </Link>
              </Button>
            </div>

            {recentMessages.length === 0 ? (
              <div className="text-center py-16">
                <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-sm text-gray-400">Aucune conversation pour l'instant.</p>
                <Button size="sm" className="mt-4" asChild>
                  <Link href="/chat">Commencer</Link>
                </Button>
              </div>
            ) : (
              <Card className="border border-gray-100">
                <CardContent className="p-2">
                  <div className="divide-y divide-gray-50">
                    {recentMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                          <MessageCircle className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800">{msg.content}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatRelativeTime(msg.created_at)} · {formatTime(msg.created_at)}
                          </p>
                        </div>
                        <Link href="/chat">
                          <ChevronRight className="w-4 h-4 text-gray-300 hover:text-primary-500 mt-1 transition-colors" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      // ── Planning ─────────────────────────────────────────────────────────────
      case "planning":
        return <ComingSoon icon={Calendar} title="Planning d'étude" description="Planifiez des sessions d'étude quotidiennes pour votre enfant. Cette fonctionnalité sera disponible prochainement." />;

      // ── Progression ──────────────────────────────────────────────────────────
      case "progression":
        return <ComingSoon icon={TrendingUp} title="Suivi de progression" description="Visualisez la progression de votre enfant par matière et suivez son évolution dans le temps." />;

      // ── Récompenses ──────────────────────────────────────────────────────────
      case "recompenses":
        return <ComingSoon icon={Award} title="Récompenses et badges" description="Votre enfant gagnera des badges en étudiant régulièrement. Les récompenses arrivent bientôt !" />;
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Add-child modal */}
      {showAddChild && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Ajouter un enfant</CardTitle>
                <button onClick={() => setShowAddChild(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center py-4 text-center gap-3">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <Lock className="w-7 h-7 text-amber-600" />
                </div>
                <p className="font-semibold text-gray-900">Fonctionnalité Plan Famille</p>
                <p className="text-sm text-gray-500">
                  Ajoutez jusqu'à 3 enfants avec le Plan Famille. Chacun dispose de son propre espace et de ses conversations personnalisées.
                </p>
              </div>
              <Button className="w-full" asChild>
                <Link href="/pricing">Passer au Plan Famille · 149 DH/mois</Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setShowAddChild(false)}>
                Annuler
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-10 hidden lg:flex">
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm">Modarisi</span>
              <p className="text-xs text-gray-400">Dashboard Parent</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                section === id
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profileName}</p>
              <p className="text-xs text-gray-500 truncate">
                {plan === "pro" ? "Plan Pro ✓" : plan === "famille" ? "Plan Famille ✓" : "Plan Gratuit"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{sectionTitle[section]}</h1>
            <p className="text-sm text-gray-500">{sectionSub[section]}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <Button size="sm" asChild>
              <Link href="/pricing">Gérer l'abonnement</Link>
            </Button>
          </div>
        </div>

        {/* Mobile nav (tab bar) */}
        <div className="lg:hidden flex overflow-x-auto bg-white border-b border-gray-100 px-4 gap-1 py-2">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                section === id
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
