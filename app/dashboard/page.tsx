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
} from "lucide-react";

type Profile = {
  full_name: string | null;
};

type Child = {
  child_name: string;
  level: string;
};

type RecentMessage = {
  id: string;
  content: string;
  created_at: string;
};

const LEVEL_LABELS: Record<string, string> = {
  "1ere": "1ère année collège",
  "2eme": "2ème année collège",
  "3eme": "3ème année collège",
};

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Hier";
  return `Il y a ${diffDays} jours`;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("fr-MA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const router = useRouter();

  const [profileName, setProfileName] = useState("Parent");
  const [child, setChild] = useState<Child | null>(null);
  const [questionsToday, setQuestionsToday] = useState(0);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Load profile, child, and message stats in parallel
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [profileRes, childRes, todayRes, totalRes, recentRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single(),
        supabase
          .from("children")
          .select("child_name, level")
          .eq("parent_id", user.id)
          .single(),
        supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "user")
          .gte("created_at", todayStart.toISOString()),
        supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "user"),
        supabase
          .from("messages")
          .select("id, content, created_at")
          .eq("user_id", user.id)
          .eq("role", "user")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);

      const name =
        (profileRes.data as Profile | null)?.full_name ??
        user.user_metadata?.full_name ??
        user.email ??
        "Parent";
      setProfileName(name);

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
  const initials = profileName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const childLabel = child
    ? LEVEL_LABELS[child.level] ?? child.level
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
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
          {[
            { icon: BarChart3, label: "Vue d'ensemble", active: true },
            { icon: BookOpen, label: "Matières", active: false },
            { icon: Calendar, label: "Planning", active: false },
            { icon: TrendingUp, label: "Progression", active: false },
            { icon: MessageCircle, label: "Conversations", active: false },
            { icon: Award, label: "Récompenses", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profileName}
              </p>
              <p className="text-xs text-gray-500 truncate">Plan Gratuit</p>
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
            <h1 className="text-xl font-bold text-gray-900">
              Bonjour, {firstName} 👋
            </h1>
            <p className="text-sm text-gray-500">
              {child
                ? `Rapport de ${child.child_name} — ${childLabel}`
                : "Tableau de bord parent"}
            </p>
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

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Child card */}
              {child && (
                <Card className="border border-primary-100 bg-primary-50/40">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-7 h-7 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-lg">
                        {child.child_name}
                      </p>
                      <p className="text-sm text-gray-500">{childLabel}</p>
                    </div>
                    <Button asChild>
                      <Link href="/chat" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Ouvrir le tuteur IA
                      </Link>
                    </Button>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {questionsToday}
                      <span className="text-base font-normal text-gray-400 ml-1">/ 5</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Questions aujourd'hui</p>
                    <p className="text-xs font-arabic text-gray-400">أسئلة اليوم</p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{questionsTotal}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Total questions posées</p>
                    <p className="text-xs font-arabic text-gray-400">مجموع الأسئلة</p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 col-span-2 lg:col-span-1">
                  <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {questionsToday < 5
                          ? `${5 - questionsToday} questions restantes aujourd'hui`
                          : "Limite journalière atteinte"}
                      </p>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((questionsToday / 5) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent chat history */}
              <Card className="border border-gray-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      Questions récentes · الأسئلة الأخيرة
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs" asChild>
                      <Link href="/chat">
                        Continuer
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-sm text-gray-400">
                        Aucune question posée pour l'instant.
                      </p>
                      <Button size="sm" className="mt-4" asChild>
                        <Link href="/chat">Poser une question</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <MessageCircle className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 line-clamp-2">
                              {msg.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {formatRelativeTime(msg.created_at)} · {formatTime(msg.created_at)}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            IA
                          </Badge>
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
                    <p className="font-bold text-gray-900 text-lg mb-1">
                      Tuteur IA — مدرسي
                    </p>
                    <p className="text-sm text-gray-500">
                      Pose une question en Darija ou en français
                    </p>
                  </div>
                  <Button size="lg" className="shrink-0 gap-2" asChild>
                    <Link href="/chat">
                      <Sparkles className="w-4 h-4" />
                      Démarrer
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
