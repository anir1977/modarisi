"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GraduationCap, Lock, Eye, EyeOff, ShieldCheck,
  LayoutDashboard, Users, CreditCard, BarChart2,
  Settings, LogOut, RefreshCw, CheckCircle2, AlertTriangle,
  XCircle, UserCheck, Clock, Globe, Power, Activity,
  ChevronRight, Search, Ban, Unlock, TrendingUp, MessageSquare,
  WrenchIcon, ExternalLink, ChevronDown, ChevronUp,
} from "lucide-react";

const PASSWORD = "modarisi2025";
const SESSION_KEY = "mdrs_admin_dash";

/* ─────────────────────── Types ─────────────────────── */
type Section = "overview" | "users" | "payments" | "analytics" | "settings";

type Stats = {
  totalUsers: number;
  activeToday: number;
  totalQuestions: number;
  pendingVirements: number;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "famille";
  created_at: string;
  last_sign_in_at: string | null;
  question_count: number;
  blocked: boolean;
};

type VirementRequest = {
  id: string;
  user_id: string;
  email: string;
  plan: "Pro" | "Famille";
  amount: string;
  status: "pending" | "activated" | "rejected";
  created_at: string;
};

type Analytics = {
  questionsPerDay: { date: string; count: number }[];
  peakHours: { hour: number; count: number }[];
};

/* ─────────────────────── Helpers ─────────────────────── */
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-MA", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}
function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("fr-MA", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}
function shortDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-MA", { weekday: "short" }).slice(0, 3);
}

/* ─────────────────────── Toast ─────────────────────── */
function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white z-[100] ${ok ? "bg-slate-800" : "bg-red-600"}`}>
      {ok
        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        : <AlertTriangle className="w-4 h-4 shrink-0" />}
      {msg}
    </div>
  );
}

/* ─────────────────────── Bar Chart ─────────────────────── */
function BarChart({ data, labelFn, color }: {
  data: { label: string; count: number }[];
  labelFn: (l: string) => string;
  color: string;
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {data.map((d) => {
        const pct = Math.round((d.count / max) * 100);
        return (
          <div key={d.label} className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <span className="text-[9px] text-slate-400 font-mono">{d.count > 0 ? d.count : ""}</span>
            <div className="w-full rounded-t-sm relative" style={{ height: `${Math.max(pct, 4)}%`, backgroundColor: color, opacity: pct < 10 ? 0.3 : 1 }} />
            <span className="text-[9px] text-slate-500 truncate w-full text-center">{labelFn(d.label)}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────── Plan Badge ─────────────────────── */
function PlanBadge({ plan }: { plan: string }) {
  const cfg: Record<string, string> = {
    pro: "bg-blue-100 text-blue-700",
    famille: "bg-purple-100 text-purple-700",
    free: "bg-slate-100 text-slate-500",
  };
  const label: Record<string, string> = { pro: "Pro", famille: "Famille", free: "Gratuit" };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg[plan] ?? cfg.free}`}>
      {label[plan] ?? plan}
    </span>
  );
}

/* ─────────────────────── Overview Section ─────────────────────── */
function OverviewSection({ password }: { password: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [maintLoading, setMaintLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch("/api/admin/stats", { headers: { "x-admin-password": password } })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

    fetch("/api/maintenance")
      .then((r) => r.json())
      .then((d) => setMaintenance(d.maintenanceMode))
      .catch(() => setMaintenance(false));
  }, [password]);

  const toggleMaintenance = async (val: boolean) => {
    setMaintLoading(true);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: val, password: PASSWORD }),
      });
      const data = await res.json();
      if (res.ok) {
        setMaintenance(data.maintenanceMode);
        showToast(data.maintenanceMode ? "Mode maintenance activé." : "Site en ligne.", true);
      } else {
        showToast("Erreur lors de la mise à jour.", false);
      }
    } catch {
      showToast("Erreur réseau.", false);
    } finally {
      setMaintLoading(false);
    }
  };

  const cards = [
    { label: "Utilisateurs inscrits", value: stats?.totalUsers ?? "—", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Actifs aujourd'hui", value: stats?.activeToday ?? "—", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Questions posées", value: stats?.totalQuestions ?? "—", icon: MessageSquare, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
    { label: "Virements en attente", value: stats?.pendingVirements ?? "—", icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Vue d'ensemble</h1>
        <p className="text-slate-400 text-sm mt-1">Statistiques en temps réel de Modarisi</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
            <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-3`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-slate-400 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Maintenance toggle */}
      <div className={`rounded-2xl border p-5 ${maintenance ? "bg-amber-500/10 border-amber-500/30" : "bg-emerald-500/10 border-emerald-500/30"}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${maintenance ? "bg-amber-500/20" : "bg-emerald-500/20"}`}>
              {maintenance ? <WrenchIcon className="w-5 h-5 text-amber-400" /> : <Globe className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Mode Maintenance</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${maintenance ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                <p className={`text-xs ${maintenance ? "text-amber-300" : "text-emerald-300"}`}>
                  {maintenance === null ? "Chargement…" : maintenance ? "Actif — Page Coming Soon visible" : "Inactif — Landing page complète"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => maintenance !== null && toggleMaintenance(!maintenance)}
            disabled={maintLoading || maintenance === null}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 disabled:opacity-50 ${maintenance ? "bg-amber-500" : "bg-emerald-500"}`}
          >
            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transform transition-transform duration-300 ${maintenance ? "translate-x-6" : "translate-x-1"}`}>
              {maintLoading && <RefreshCw className="w-2.5 h-2.5 text-slate-400 animate-spin" />}
            </span>
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/", icon: Globe, label: "Voir le site", sub: "Vue visiteur", color: "text-blue-400" },
          { href: "/chat", icon: Power, label: "Tester le Chat IA", sub: "Interface élève", color: "text-emerald-400" },
          { href: "/dashboard", icon: Users, label: "Dashboard parent", sub: "Vue parent", color: "text-violet-400" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-slate-600 hover:bg-slate-750 transition-all group"
          >
            <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="text-xs text-slate-400">{item.sub}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}

/* ─────────────────────── Users Section ─────────────────────── */
function UsersSection({ password }: { password: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { headers: { "x-admin-password": password } });
      const { data } = await res.json();
      setUsers(data ?? []);
    } catch {
      showToast("Erreur de chargement.", false);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => { load(); }, [load]);

  const act = async (userId: string, action: string, extra?: Record<string, string>) => {
    setActionLoading(`${userId}-${action}`);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id: userId, action, ...extra }),
      });
      if (res.ok) {
        showToast(
          action === "block" ? "Utilisateur bloqué." :
          action === "unblock" ? "Utilisateur débloqué." :
          `Plan mis à jour.`, true
        );
        load();
      } else {
        showToast("Erreur lors de l'action.", false);
      }
    } catch {
      showToast("Erreur réseau.", false);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-white">Utilisateurs</h1>
          <p className="text-slate-400 text-sm mt-1">{users.length} inscrits au total</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white border border-slate-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Rechercher par email ou nom…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider px-5 py-3">Utilisateur</th>
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider px-3 py-3">Plan</th>
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider px-3 py-3">Questions</th>
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider px-3 py-3">Inscrit</th>
                  <th className="text-left text-xs text-slate-500 font-semibold uppercase tracking-wider px-3 py-3">Dernière connexion</th>
                  <th className="text-right text-xs text-slate-500 font-semibold uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className={`border-b border-slate-700/50 last:border-0 hover:bg-slate-750 transition-colors ${u.blocked ? "opacity-60" : ""}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {(u.name || u.email || "?")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium text-xs truncate">{u.name || "—"}</p>
                          <p className="text-slate-400 text-xs truncate">{u.email || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <PlanBadge plan={u.plan} />
                      {u.blocked && <span className="ml-1 text-[9px] bg-red-900/40 text-red-400 px-1.5 py-0.5 rounded-full">Bloqué</span>}
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="text-white font-mono text-xs">{u.question_count}</span>
                    </td>
                    <td className="px-3 py-3.5 text-slate-400 text-xs whitespace-nowrap">{fmtDate(u.created_at)}</td>
                    <td className="px-3 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                      {u.last_sign_in_at ? fmtDate(u.last_sign_in_at) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 justify-end flex-wrap">
                        {u.plan !== "pro" && (
                          <button
                            onClick={() => act(u.id, "upgrade", { plan: "pro" })}
                            disabled={actionLoading === `${u.id}-upgrade`}
                            className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                          >
                            {actionLoading === `${u.id}-upgrade` ? <RefreshCw className="w-3 h-3 animate-spin" /> : <TrendingUp className="w-3 h-3" />}
                            Pro
                          </button>
                        )}
                        {u.blocked ? (
                          <button
                            onClick={() => act(u.id, "unblock")}
                            disabled={actionLoading === `${u.id}-unblock`}
                            className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {actionLoading === `${u.id}-unblock` ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Unlock className="w-3 h-3" />}
                            Débloquer
                          </button>
                        ) : (
                          <button
                            onClick={() => act(u.id, "block")}
                            disabled={actionLoading === `${u.id}-block`}
                            className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {actionLoading === `${u.id}-block` ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Ban className="w-3 h-3" />}
                            Bloquer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}

/* ─────────────────────── Payments Section ─────────────────────── */
function PaymentsSection({ password }: { password: string }) {
  const [requests, setRequests] = useState<VirementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "activated" | "rejected" | "all">("pending");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/virements", { headers: { "x-admin-password": password } });
      const { data } = await res.json();
      setRequests(data ?? []);
    } catch {
      showToast("Erreur de chargement.", false);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => { load(); }, [load]);

  const act = async (req: VirementRequest, action: "activate" | "reject") => {
    setActionLoading(req.id);
    try {
      const res = await fetch("/api/admin/virements", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id: req.id, action, user_id: req.user_id, plan: req.plan }),
      });
      if (res.ok) {
        showToast(action === "activate" ? `✓ ${req.email} activé Plan ${req.plan}` : `✗ ${req.email} rejeté`, action === "activate");
        load();
      } else {
        showToast("Erreur lors de l'action.", false);
      }
    } catch {
      showToast("Erreur réseau.", false);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const statusCfg: Record<string, { label: string; cls: string }> = {
    pending:   { label: "En attente", cls: "bg-amber-500/20 text-amber-400" },
    activated: { label: "Activé",     cls: "bg-emerald-500/20 text-emerald-400" },
    rejected:  { label: "Rejeté",     cls: "bg-red-500/20 text-red-400" },
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-white">Paiements</h1>
          <p className="text-slate-400 text-sm mt-1">
            Virements bancaires à traiter
            {pendingCount > 0 && (
              <span className="ml-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount} en attente</span>
            )}
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white border border-slate-700 rounded-lg px-3 py-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["pending", "activated", "rejected", "all"] as const).map((f) => {
          const labels = { pending: "En attente", activated: "Activés", rejected: "Rejetés", all: "Tous" };
          const cnt = f === "all" ? requests.length : requests.filter((r) => r.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === f ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              }`}
            >
              {labels[f]}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f ? "bg-blue-500/40" : "bg-slate-700"}`}>{cnt}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16 bg-slate-800 rounded-2xl border border-slate-700">
            <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">
              {filter === "pending" ? "Aucun virement en attente 🎉" : "Aucun enregistrement"}
            </p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className={`rounded-2xl border p-5 ${
                req.status === "pending"
                  ? "border-amber-500/30 bg-amber-500/5"
                  : req.status === "activated"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/20 bg-red-500/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-white text-sm">{req.email}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusCfg[req.status]?.cls}`}>
                      {statusCfg[req.status]?.label}
                    </span>
                    <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                      Plan {req.plan}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{req.amount} · {fmtDateTime(req.created_at)}</p>
                  <p className="text-[10px] text-slate-600 font-mono mt-1 truncate">uid: {req.user_id}</p>
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => act(req, "activate")}
                      disabled={actionLoading === req.id}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                    >
                      {actionLoading === req.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                      Activer
                    </button>
                    <button
                      onClick={() => act(req, "reject")}
                      disabled={actionLoading === req.id}
                      className="flex items-center gap-1.5 border border-red-500/40 hover:bg-red-500/10 disabled:opacity-60 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Rejeter
                    </button>
                  </div>
                )}
                {req.status === "activated" && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Activé
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}

/* ─────────────────────── Analytics Section ─────────────────────── */
function AnalyticsSection({ password }: { password: string }) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics", { headers: { "x-admin-password": password } })
      .then((r) => r.json())
      .then(setAnalytics)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [password]);

  const dayData = (analytics?.questionsPerDay ?? []).map((d) => ({
    label: d.date,
    count: d.count,
  }));

  // Top 8 peak hours
  const peakData = (analytics?.peakHours ?? [])
    .filter((h) => h.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .sort((a, b) => a.hour - b.hour)
    .map((h) => ({ label: String(h.hour).padStart(2, "0") + "h", count: h.count }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Données d'utilisation de la plateforme</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Questions per day */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-4 h-4 text-blue-400" />
              <p className="text-sm font-semibold text-white">Questions posées — 7 derniers jours</p>
            </div>
            {dayData.every((d) => d.count === 0) ? (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm">Aucune donnée pour cette période.</p>
              </div>
            ) : (
              <BarChart
                data={dayData}
                labelFn={(d) => shortDay(d)}
                color="#3b82f6"
              />
            )}
          </div>

          {/* Peak hours */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-emerald-400" />
              <p className="text-sm font-semibold text-white">Heures de pointe (top 8)</p>
            </div>
            {peakData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm">Aucune donnée disponible.</p>
              </div>
            ) : (
              <BarChart
                data={peakData}
                labelFn={(l) => l}
                color="#10b981"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────── Settings Section ─────────────────────── */
function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Paramètres</h1>
        <p className="text-slate-400 text-sm mt-1">Configuration de la plateforme</p>
      </div>

      <div className="space-y-4">
        {[
          { label: "Site web", value: "modarisi.ma", icon: Globe },
          { label: "Support WhatsApp", value: "+212663275760", icon: MessageSquare },
          { label: "Email contact", value: "contact@modarisi.ma", icon: Activity },
          { label: "Banque partenaire", value: "Attijariwafa Bank · RIB: 007780001251100030066193", icon: CreditCard },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-sm text-white font-mono truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 border border-amber-500/20 rounded-xl p-5">
        <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">Sécurité</p>
        <p className="text-slate-400 text-sm">Le mot de passe admin est défini dans le code source. Pour le changer, modifiez la constante <code className="text-blue-400 bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">PASSWORD</code> dans <code className="text-blue-400 bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">app/admin-dashboard/page.tsx</code>.</p>
      </div>
    </div>
  );
}

/* ─────────────────────── Password Gate ─────────────────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className={`relative z-10 w-full max-w-sm ${shake ? "animate-[shake_0.4s_ease]" : ""}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50 mb-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold text-xl">Modarisi<span className="text-blue-400">.</span></p>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">Admin Dashboard</p>
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
              <Lock className="w-5 h-5 text-slate-300" />
            </div>
          </div>
          <p className="text-center text-slate-400 text-sm mb-6">Accès réservé à l'équipe Modarisi.</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                type={show ? "text" : "password"}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Mot de passe"
                className={`w-full h-12 bg-slate-800 border rounded-xl px-4 pr-11 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                  error ? "border-red-500 focus:ring-red-500/30" : "border-slate-600 focus:ring-blue-500/30 focus:border-blue-500"
                }`}
              />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200" tabIndex={-1}>
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Mot de passe incorrect.
              </p>
            )}
            <button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-900/40 transition-all">
              Accéder au Dashboard
            </button>
          </form>
        </div>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}`}</style>
    </div>
  );
}

/* ─────────────────────── Main Dashboard ─────────────────────── */
function Dashboard({ onLock, password }: { onLock: () => void; password: string }) {
  const [section, setSection] = useState<Section>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "overview",  label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "users",     label: "Utilisateurs",   icon: Users },
    { id: "payments",  label: "Paiements",      icon: CreditCard },
    { id: "analytics", label: "Analytics",      icon: BarChart2 },
    { id: "settings",  label: "Paramètres",     icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 fixed top-0 bottom-0 left-0 z-30">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">Modarisi<span className="text-blue-400">.</span></p>
              <p className="text-slate-500 text-[10px] mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Session active</span>
          </div>
          <button
            onClick={onLock}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">Modarisi<span className="text-blue-400">.</span></span>
        </div>
        <button onClick={() => setMobileOpen((v) => !v)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
          {mobileOpen ? <XCircle className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setSection(item.id); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
            <button onClick={onLock} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-slate-800 transition-all">
              <LogOut className="w-4 h-4 shrink-0" /> Déconnexion
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {section === "overview"  && <OverviewSection password={password} />}
          {section === "users"     && <UsersSection password={password} />}
          {section === "payments"  && <PaymentsSection password={password} />}
          {section === "analytics" && <AnalyticsSection password={password} />}
          {section === "settings"  && <SettingsSection />}
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────── Root ─────────────────────── */
export default function AdminDashboardPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
  }, []);

  const lock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  return unlocked ? (
    <Dashboard onLock={lock} password={PASSWORD} />
  ) : (
    <PasswordGate onUnlock={() => setUnlocked(true)} />
  );
}
