"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, User, Bell, Shield, LogOut, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ParametresPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles").select("full_name, plan").eq("id", user.id).single();
      setFullName(profile?.full_name ?? user.user_metadata?.full_name ?? "");
      setPlan(profile?.plan ?? "free");
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return <div className="p-6 space-y-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" rounded="2xl" />)}</div>;
  }

  const sections = [
    {
      icon: User, title: "Profil", items: [
        { label: "Nom complet", value: fullName || "Non renseigné" },
        { label: "Adresse e-mail", value: email },
        { label: "Plan", value: plan === "free" ? "Gratuit" : plan.charAt(0).toUpperCase() + plan.slice(1) },
      ]
    },
    {
      icon: Bell, title: "Notifications", items: [
        { label: "Rappels d'étude", value: "Activés" },
        { label: "Nouveaux cours", value: "Activés" },
      ]
    },
    {
      icon: Shield, title: "Sécurité", items: [
        { label: "Mot de passe", value: "••••••••" },
      ]
    },
  ];

  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-400" />
          Paramètres
        </h1>
        <p className="text-gray-500 text-sm mt-1">Gérer ton compte Modarisi</p>
      </div>

      {sections.map(section => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
              <Icon className="w-4 h-4 text-gray-400" />
              <h2 className="text-white font-semibold text-sm">{section.title}</h2>
            </div>
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors cursor-pointer">
                <span className="text-gray-400 text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-red-400 font-semibold text-sm transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Se déconnecter
      </button>
    </div>
  );
}
