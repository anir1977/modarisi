"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GraduationCap,
  MessageCircle,
  Clock,
  TrendingUp,
  BookOpen,
  Star,
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  Users,
  Award,
  BarChart3,
} from "lucide-react";

const children = [
  {
    id: 1,
    name: "Ahmed Benali",
    grade: "3ème collège",
    avatar: "AB",
    questionsToday: 4,
    questionsTotal: 127,
    studyTimeWeek: "4h 30min",
    streak: 12,
    lastActive: "Il y a 2 heures",
    subjects: [
      { name: "Mathématiques", progress: 78, color: "bg-blue-500", sessions: 32 },
      { name: "Physique-Chimie", progress: 65, color: "bg-purple-500", sessions: 28 },
      { name: "SVT", progress: 82, color: "bg-green-500", sessions: 21 },
      { name: "Français", progress: 71, color: "bg-amber-500", sessions: 18 },
      { name: "Arabe", progress: 88, color: "bg-rose-500", sessions: 16 },
      { name: "Anglais", progress: 60, color: "bg-indigo-500", sessions: 12 },
    ],
    recentActivity: [
      {
        subject: "Mathématiques",
        question: "Théorème de Pythagore",
        time: "14:30",
        day: "Aujourd'hui",
      },
      {
        subject: "Physique",
        question: "Loi de Newton F=ma",
        time: "11:15",
        day: "Aujourd'hui",
      },
      {
        subject: "SVT",
        question: "La photosynthèse",
        time: "18:00",
        day: "Hier",
      },
      {
        subject: "Français",
        question: "Le subjonctif présent",
        time: "16:45",
        day: "Hier",
      },
    ],
    weeklyActivity: [40, 65, 30, 85, 70, 90, 45],
  },
];

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function DashboardPage() {
  const [selectedChild] = useState(children[0]);
  const [profileName, setProfileName] = useState("Parent");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/auth/login"); return; }
      const name = user.user_metadata?.full_name ?? user.email ?? "Parent";
      setProfileName(name);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const initials = profileName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
              Bonjour, {profileName.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Voici le rapport de {selectedChild.name} aujourd'hui
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />
            </button>
            <Button size="sm" asChild>
              <Link href="/pricing">Gérer l'abonnement</Link>
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Child selector (for Famille plan) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <p className="text-sm font-medium text-gray-500 shrink-0">Enfant :</p>
            {children.map((child) => (
              <button
                key={child.id}
                className="flex items-center gap-2 bg-primary-50 border-2 border-primary-200 rounded-xl px-4 py-2 shrink-0"
              >
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs">{child.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-primary-700">
                  {child.name}
                </span>
                <Badge variant="outline" className="text-xs">
                  {child.grade}
                </Badge>
              </button>
            ))}
            <Button variant="outline" size="sm" className="shrink-0">
              <Users className="w-4 h-4 mr-1" />
              Ajouter un enfant
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Questions aujourd'hui",
                labelAr: "أسئلة اليوم",
                value: selectedChild.questionsToday,
                unit: "/ 5",
                icon: MessageCircle,
                color: "text-primary-600",
                bg: "bg-primary-50",
                change: "+2 vs hier",
                positive: true,
              },
              {
                label: "Temps d'étude (semaine)",
                labelAr: "وقت الدراسة",
                value: selectedChild.studyTimeWeek,
                unit: "",
                icon: Clock,
                color: "text-purple-600",
                bg: "bg-purple-50",
                change: "+45min vs sem. der.",
                positive: true,
              },
              {
                label: "Série de jours",
                labelAr: "الأيام المتتالية",
                value: selectedChild.streak,
                unit: "jours",
                icon: Star,
                color: "text-amber-600",
                bg: "bg-amber-50",
                change: "Meilleur record!",
                positive: true,
              },
              {
                label: "Total questions",
                labelAr: "مجموع الأسئلة",
                value: selectedChild.questionsTotal,
                unit: "",
                icon: TrendingUp,
                color: "text-secondary-600",
                bg: "bg-secondary-50",
                change: "Ce mois",
                positive: true,
              },
            ].map((stat) => (
              <Card key={stat.label} className="border border-gray-100 card-hover">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    <span className="text-base font-normal text-gray-400 ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-gray-400 font-arabic">{stat.labelAr}</p>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      stat.positive ? "text-secondary-600" : "text-rose-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Subject progress */}
            <Card className="lg:col-span-2 border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-600" />
                  Progression par matière · التقدم في المواد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChild.subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${subject.color}`}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {subject.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({subject.sessions} sessions)
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {subject.progress}%
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly activity */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  Activité cette semaine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-1 h-32">
                  {selectedChild.weeklyActivity.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full bg-primary-200 rounded-sm transition-all"
                        style={{
                          height: `${(value / 100) * 100}px`,
                          background:
                            i === 6
                              ? "#2563eb"
                              : value > 70
                              ? "#93c5fd"
                              : "#dbeafe",
                        }}
                      />
                      <span className="text-xs text-gray-400">{days[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary-50 rounded-xl">
                  <p className="text-xs font-medium text-primary-700">
                    🔥 Série de {selectedChild.streak} jours!
                  </p>
                  <p className="text-xs text-primary-600 mt-0.5">
                    {selectedChild.name} étudie régulièrement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent activity */}
          <Card className="border border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  Activité récente · النشاط الأخير
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  Tout voir
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedChild.recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.question}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.subject}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-gray-500">
                        {activity.time}
                      </p>
                      <p className="text-xs text-gray-400">{activity.day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
