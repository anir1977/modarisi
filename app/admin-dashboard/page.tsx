"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GraduationCap, Lock, Eye, EyeOff, ShieldCheck,
  Power, Globe, WrenchIcon, ExternalLink, RefreshCw,
  CheckCircle2, AlertTriangle, Activity,
  CreditCard, UserCheck, XCircle, Clock, ChevronDown, ChevronUp,
} from "lucide-react";

const PASSWORD = "modarisi2025";
const SESSION_KEY = "mdrs_admin_dash";

type VirementRequest = {
  id: string;
  user_id: string;
  email: string;
  plan: "Pro" | "Famille";
  amount: string;
  status: "pending" | "activated" | "rejected";
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-MA", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ── Paiements en attente section ── */
function PaiementsSection({ password }: { password: string }) {
  const [requests, setRequests] = useState<VirementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "activated" | "rejected" | "all">("pending");
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/virements", {
        headers: { "x-admin-password": password },
      });
      const { data } = await res.json();
      setRequests(data ?? []);
    } catch {
      showToast("Erreur de chargement des paiements.", false);
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
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: req.id,
          action,
          user_id: req.user_id,
          plan: req.plan,
        }),
      });
      if (res.ok) {
        showToast(
          action === "activate"
            ? `✓ ${req.email} activé Plan ${req.plan}`
            : `✗ ${req.email} rejeté`,
          action === "activate"
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

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const statusColors: Record<string, string> = {
    pending:   "bg-amber-100 text-amber-700",
    activated: "bg-emerald-100 text-emerald-700",
    rejected:  "bg-red-100 text-red-600",
  };
  const statusLabels: Record<string, string> = {
    pending:   "En attente",
    activated: "Activé",
    rejected:  "Rejeté",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer select-none hover:bg-slate-50 transition-colors"
        onClick={() => setCollapsed((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Paiements en attente</p>
            <p className="text-xs text-slate-500">Virements reçus à activer manuellement</p>
          </div>
          {pendingCount > 0 && (
            <span className="ml-1 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); load(); }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            title="Actualiser"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {collapsed ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {!collapsed && (
        <div className="border-t border-slate-100">
          {/* Filter tabs */}
          <div className="flex gap-1 px-5 pt-4 pb-2">
            {(["pending", "activated", "rejected", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-slate-800 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {f === "all" ? "Tous" : statusLabels[f]}
                <span className="ml-1 opacity-60">
                  ({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})
                </span>
              </button>
            ))}
          </div>

          {/* List */}
          <div className="px-5 pb-5">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10">
                <Clock className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  {filter === "pending" ? "Aucun virement en attente 🎉" : "Aucun enregistrement"}
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                {filtered.map((req) => (
                  <div
                    key={req.id}
                    className={`rounded-xl border p-4 ${
                      req.status === "pending"
                        ? "border-amber-200 bg-amber-50/40"
                        : req.status === "activated"
                        ? "border-emerald-200 bg-emerald-50/40"
                        : "border-red-200 bg-red-50/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900 text-sm">{req.email}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[req.status]}`}>
                            {statusLabels[req.status]}
                          </span>
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Plan {req.plan}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {req.amount} · {formatDate(req.created_at)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                          uid: {req.user_id}
                        </p>
                      </div>

                      {req.status === "pending" && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => act(req, "activate")}
                            disabled={actionLoading === req.id}
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {actionLoading === req.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                            Activer
                          </button>
                          <button
                            onClick={() => act(req, "reject")}
                            disabled={actionLoading === req.id}
                            className="flex items-center gap-1.5 border border-red-200 hover:bg-red-50 disabled:opacity-60 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Rejeter
                          </button>
                        </div>
                      )}

                      {req.status === "activated" && (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> Activé
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white z-50 ${
          toast.ok ? "bg-slate-800" : "bg-red-600"
        }`}>
          {toast.ok
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            : <AlertTriangle className="w-4 h-4 shrink-0" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ── Password Gate ── */
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className={`relative z-10 w-full max-w-sm ${shake ? "animate-[shake_0.4s_ease]" : ""}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50 mb-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold text-xl tracking-tight">
              Modarisi<span className="text-blue-400">.</span>
            </p>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">
              Admin Dashboard
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-slate-700/60 rounded-full flex items-center justify-center border border-slate-600">
              <Lock className="w-5 h-5 text-slate-300" />
            </div>
          </div>

          <p className="text-center text-slate-300 text-sm mb-6">
            Accès réservé à l'équipe Modarisi.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                type={show ? "text" : "password"}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Mot de passe"
                className={`w-full h-12 bg-slate-800 border rounded-xl px-4 pr-11 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-slate-600 focus:ring-blue-500/30 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Mot de passe incorrect. Réessayez.
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-900/40 transition-all"
            >
              Accéder au Dashboard
            </button>
          </form>
        </div>
        <p className="text-center text-slate-600 text-xs mt-6">
          Accès réservé à l'équipe Modarisi
        </p>
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}

/* ── Toggle Switch ── */
function Toggle({ checked, onChange, loading }: { checked: boolean; onChange: (v: boolean) => void; loading: boolean }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); !loading && onChange(!checked); }}
      disabled={loading}
      aria-checked={checked}
      role="switch"
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-60 ${
        checked ? "bg-amber-500 focus:ring-amber-400" : "bg-emerald-500 focus:ring-emerald-400"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {loading && (
          <RefreshCw className="w-3 h-3 text-slate-400 animate-spin" />
        )}
      </span>
    </button>
  );
}

/* ── Main Dashboard ── */
function Dashboard({ onLock, password }: { onLock: () => void; password: string }) {
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch current state
  useEffect(() => {
    fetch("/api/maintenance")
      .then((r) => r.json())
      .then((d) => setMaintenance(d.maintenanceMode))
      .catch(() => setMaintenance(true));
  }, []);

  const toggle = async (value: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: value, password: PASSWORD }),
      });
      const data = await res.json();
      if (res.ok) {
        setMaintenance(data.maintenanceMode);
        showToast(
          data.maintenanceMode
            ? "Mode maintenance activé — les visiteurs voient la page Coming Soon."
            : "Site en ligne — les visiteurs voient la landing page complète.",
          true
        );
      } else {
        showToast("Erreur lors de la mise à jour.", false);
      }
    } catch {
      showToast("Erreur réseau. Réessayez.", false);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = maintenance === null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none">Modarisi</p>
            <p className="text-xs text-slate-500">Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Session active
          </div>
          <button
            onClick={onLock}
            className="text-xs text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-50"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panneau de contrôle</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez la visibilité de votre site modarisi.ma
          </p>
        </div>

        {/* ── MAIN TOGGLE CARD ── */}
        <div className={`rounded-2xl border-2 p-6 shadow-sm transition-all duration-300 ${
          isLoading
            ? "bg-white border-slate-200"
            : maintenance
            ? "bg-amber-50 border-amber-200"
            : "bg-emerald-50 border-emerald-200"
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isLoading ? "bg-slate-100" : maintenance ? "bg-amber-100" : "bg-emerald-100"
              }`}>
                {isLoading ? (
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                ) : maintenance ? (
                  <WrenchIcon className="w-6 h-6 text-amber-600" />
                ) : (
                  <Globe className="w-6 h-6 text-emerald-600" />
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Mode Maintenance</p>
                {!isLoading && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${
                      maintenance ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                    }`} />
                    <p className={`text-sm font-medium ${
                      maintenance ? "text-amber-700" : "text-emerald-700"
                    }`}>
                      {maintenance
                        ? "Actif — Page \"Coming Soon\" visible"
                        : "Inactif — Landing page complète visible"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!isLoading && (
              <Toggle checked={!!maintenance} onChange={toggle} loading={loading} />
            )}
          </div>

          {!isLoading && (
            <div className={`mt-4 rounded-xl p-4 text-sm ${
              maintenance
                ? "bg-amber-100/60 text-amber-800"
                : "bg-emerald-100/60 text-emerald-800"
            }`}>
              {maintenance ? (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Les visiteurs voient la page <strong>Coming Soon</strong> avec le
                    compte à rebours et le formulaire d'inscription email.
                    Désactivez pour mettre le site en ligne.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Les visiteurs voient la <strong>landing page complète</strong> de
                    Modarisi avec toutes les sections : Hero, Fonctionnalités,
                    Témoignages, Tarifs et CTA.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Quick links ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              href: "/",
              icon: Globe,
              label: "Voir le site",
              sub: "Vue visiteur",
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              href: "/admin-preview",
              icon: Activity,
              label: "Aperçu landing",
              sub: "Admin preview",
              color: "text-purple-600",
              bg: "bg-purple-50",
              border: "border-purple-100",
            },
            {
              href: "/chat",
              icon: Power,
              label: "Tester le Chat IA",
              sub: "Interface élève",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className={`flex items-center gap-3 p-4 bg-white rounded-xl border ${item.border} hover:shadow-md transition-all group`}
            >
              <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        {/* ── Status summary ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
            État des pages
          </h2>
          <div className="space-y-3">
            {[
              {
                route: "/",
                label: "Page d'accueil",
                status: isLoading ? "..." : maintenance ? "Coming Soon" : "Landing Page",
                ok: !maintenance,
              },
              { route: "/admin-dashboard", label: "Admin Dashboard", status: "Protégé", ok: true },
              { route: "/admin-preview", label: "Admin Preview", status: "Protégé", ok: true },
              { route: "/auth/login", label: "Connexion", status: "Accessible", ok: true },
              { route: "/chat", label: "Chat IA", status: "Accessible", ok: true },
              { route: "/pricing", label: "Tarifs", status: "Accessible", ok: true },
              { route: "/dashboard", label: "Dashboard Parent", status: "Accessible", ok: true },
            ].map((p) => (
              <div key={p.route} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <code className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                    {p.route}
                  </code>
                  <span className="text-sm text-slate-600 hidden sm:block">{p.label}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  p.ok
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PAIEMENTS EN ATTENTE ── */}
        <PaiementsSection password={password} />

        <p className="text-center text-xs text-slate-400">
          Modarisi Admin · État sauvegardé dans{" "}
          <code className="font-mono">data/maintenance.json</code>
        </p>
      </main>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all z-50 ${
          toast.ok ? "bg-slate-800" : "bg-red-600"
        }`}>
          {toast.ok ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ── Root ── */
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
