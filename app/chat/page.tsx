"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, Send, ArrowLeft, LogOut, Zap, Lightbulb } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// ── Static data ───────────────────────────────────────────────────────────────

const SUBJECT_PILLS = [
  { id: null,                    label: "Toutes" },
  { id: "Mathématiques",         label: "Maths" },
  { id: "Physique-Chimie",       label: "Physique" },
  { id: "SVT",                   label: "SVT" },
  { id: "Français",              label: "Français" },
  { id: "Arabe",                 label: "Arabe" },
  { id: "Éducation Islamique",   label: "Islam" },
  { id: "Histoire-Géographie",   label: "Histoire" },
];

const EXAMPLE_PROMPTS = [
  "Explique le théorème de Pythagore",
  "كيفاش نحل: 2x + 5 = 13",
  "C'est quoi la photosynthèse?",
  "شنو هي قوانين نيوتن؟",
  "Comment analyser un texte en français?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `Bonjour ! Je suis Nour, ton tuteur IA pour le collège 👋

Pose-moi tes questions en Darija ou en français — je suis là pour t'aider dans toutes tes matières.

📐 Maths · ⚗️ Physique · 🔬 SVT · 📖 Français & Arabe · 🕌 Islam · 🌍 Histoire

Disponible pour la 1ère, 2ème et 3ème année collège. À toi de jouer !`,
  timestamp: new Date(),
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" });
}

// ── Nour avatar ───────────────────────────────────────────────────────────────

function NourAvatar({ size = "md", isThinking = false }: { size?: "sm" | "md"; isThinking?: boolean }) {
  const dim = size === "sm" ? 28 : 36;
  const iconSize = size === "sm" ? 13 : 17;
  const dotOffset = dim * 0.28;

  return (
    <div
      className="relative shrink-0 rounded-full flex items-center justify-center"
      style={{
        width: dim,
        height: dim,
        background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
        boxShadow: isThinking
          ? "0 4px 14px rgba(16,185,129,0.45)"
          : "0 3px 10px rgba(16,185,129,0.3)",
        animation: isThinking ? "nour-think-ring 1s ease-in-out infinite" : "nour-float 3.5s ease-in-out infinite",
      }}
    >
      {isThinking ? (
        /* Spinning orbit of 3 dots */
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            animation: "nour-orbit 1.3s linear infinite",
          }}
        >
          {([0, 120, 240] as const).map((deg, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: i === 0 ? 4 : i === 1 ? 3.5 : 3,
                height: i === 0 ? 4 : i === 1 ? 3.5 : 3,
                borderRadius: "50%",
                background: "white",
                top: "50%",
                left: "50%",
                opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.35,
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${dotOffset}px)`,
              }}
            />
          ))}
        </div>
      ) : (
        /* Graduation cap with gentle wobble */
        <GraduationCap
          style={{
            width: iconSize,
            height: iconSize,
            color: "white",
            animation: "nour-cap 4s ease-in-out infinite",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
          }}
        />
      )}
    </div>
  );
}

// ── Typing dots ───────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-bounce"
          style={{ animationDelay: `${i * 160}ms`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

// ── RTL detection ─────────────────────────────────────────────────────────────

function detectDir(text: string): "rtl" | "ltr" {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text) ? "rtl" : "ltr";
}

// ── Inline markdown parser: **bold**, *italic*, `code` ────────────────────────

function parseInline(text: string, key: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] != null)
      parts.push(<strong key={`${key}-b${m.index}`} className="font-semibold">{m[1]}</strong>);
    else if (m[2] != null)
      parts.push(<em key={`${key}-i${m.index}`} className="italic">{m[2]}</em>);
    else if (m[3] != null)
      parts.push(
        <code key={`${key}-c${m.index}`} className="bg-emerald-50 text-emerald-800 rounded px-1.5 py-0.5 text-sm font-mono">
          {m[3]}
        </code>
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ── Block markdown renderer ───────────────────────────────────────────────────

function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = (i: number) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`ul${i}`} className="list-disc list-inside space-y-0.5 my-1.5 pl-1">
        {listItems}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, i) => {
    const k = String(i);

    if (/^#{1,3} /.test(line)) {
      flushList(i);
      const text = line.replace(/^#{1,3} /, "");
      blocks.push(
        <p key={k} className="font-bold text-gray-900 mt-2 mb-0.5 leading-snug">
          {parseInline(text, k)}
        </p>
      );
    } else if (/^[-*] /.test(line)) {
      listItems.push(
        <li key={k} className="leading-relaxed">
          {parseInline(line.slice(2), k)}
        </li>
      );
    } else if (line.trim() === "") {
      flushList(i);
    } else {
      flushList(i);
      blocks.push(
        <p key={k} className="leading-relaxed">
          {parseInline(line, k)}
        </p>
      );
    }
  });

  flushList(lines.length);

  return <div className="space-y-1">{blocks}</div>;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChatPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState("?");
  const [plan, setPlan] = useState<string>("free");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questionsLeft, setQuestionsLeft] = useState(5);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // ── Load user + plan + today's question count ────────────────────────────────
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);

      const name: string =
        user.user_metadata?.full_name ?? user.email ?? "?";
      setUserInitial(name.charAt(0).toUpperCase());

      // Fetch plan from profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, plan_end_date")
        .eq("id", user.id)
        .single();

      const userPlan = profile?.plan ?? "free";

      // Check expiry client-side too
      let effectivePlan = userPlan;
      if (userPlan !== "free" && profile?.plan_end_date) {
        if (new Date(profile.plan_end_date) < new Date()) {
          effectivePlan = "free";
        }
      }

      setPlan(effectivePlan);

      // Only count questions for free users
      if (effectivePlan === "free" || effectivePlan === "gratuit") {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "user")
          .gte("created_at", todayStart.toISOString());

        setQuestionsLeft(Math.max(0, 5 - (count ?? 0)));
      } else {
        // Paid users: unlimited
        setQuestionsLeft(Infinity);
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Scroll active pill into view ─────────────────────────────────────────────
  useEffect(() => {
    if (!pillsRef.current) return;
    const active = pillsRef.current.querySelector("[data-active=true]") as HTMLElement | null;
    active?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [selectedSubject]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const saveMessages = async (userContent: string, assistantContent: string) => {
    if (!userId || !assistantContent) return;
    const supabase = createClient();
    await supabase.from("messages").insert([
      { user_id: userId, role: "user", content: userContent },
      { user_id: userId, role: "assistant", content: assistantContent },
    ]);
  };

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isTyping) return;

    const isPaid = plan === "pro" || plan === "famille";
    if (!isPaid && questionsLeft <= 0) {
      setShowLimitModal(true);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    if (plan !== "pro" && plan !== "famille") {
      setQuestionsLeft((q) => Math.max(0, q - 1));
    }

    const aiMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: aiMsgId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    let finalAssistantContent = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 429) {
        setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
        setQuestionsLeft(0);
        setShowLimitModal(true);
        return;
      }

      if (!res.ok || !res.body) throw new Error(`API error: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMsgId ? { ...m, content: accumulated } : m))
        );
      }

      finalAssistantContent = accumulated;
    } catch (err) {
      console.error("[sendMessage]", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? { ...m, content: "Désolé, une erreur s'est produite. Réessaie 😅" }
            : m
        )
      );
    } finally {
      setIsTyping(false);
      if (finalAssistantContent) saveMessages(content, finalAssistantContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Progress colour (only for free users) ────────────────────────────────────
  const isPaid = plan === "pro" || plan === "famille";
  const planLabel = plan === "pro" ? "Plan Pro" : plan === "famille" ? "Plan Famille" : "Plan Gratuit";
  const qPct = isPaid ? 100 : (questionsLeft / 5) * 100;
  const qColor = isPaid ? "bg-emerald-500" : questionsLeft >= 3 ? "bg-emerald-500" : questionsLeft >= 1 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-b from-slate-50 to-white overflow-hidden">

      {/* ── Animations ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bubble-in { animation: bubbleIn 0.25s ease-out both; }

        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
        }
        .pulse-green { animation: pulseGreen 2s infinite; }

        /* Nour avatar – idle float */
        @keyframes nour-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-2px) scale(1.03); }
        }
        /* Nour avatar – graduation cap gentle wobble */
        @keyframes nour-cap {
          0%, 100% { transform: rotate(-6deg) translateY(0px); }
          25%       { transform: rotate(0deg)  translateY(-1.5px); }
          50%       { transform: rotate(6deg)  translateY(0px); }
          75%       { transform: rotate(0deg)  translateY(1px); }
        }
        /* Nour avatar – thinking ring glow pulse */
        @keyframes nour-think-ring {
          0%, 100% { box-shadow: 0 4px 14px rgba(16,185,129,0.45), 0 0 0 0 rgba(52,211,153,0.5); transform: scale(1); }
          50%       { box-shadow: 0 4px 18px rgba(16,185,129,0.6), 0 0 0 5px rgba(52,211,153,0.15); transform: scale(1.07); }
        }
        /* Nour avatar – thinking orbit spin */
        @keyframes nour-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Limit modal ──────────────────────────────────────────────────────── */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl rounded-b-3xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-200">
              <span className="text-3xl">⏳</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Limite atteinte !</h2>
            <p className="text-gray-500 text-sm mb-1">
              Tu as utilisé tes <strong>5 questions</strong> d'aujourd'hui.
            </p>
            <p className="text-gray-400 text-xs mb-6">وصلت للحد اليومي · الأسئلة تتجدد كل يوم</p>
            <Link
              href="/pricing"
              onClick={() => setShowLimitModal(false)}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all mb-3"
            >
              <Zap className="w-4 h-4" />
              Passer au Pro — 99 DH/mois
            </Link>
            <button
              onClick={() => setShowLimitModal(false)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Revenir demain (plan gratuit)
            </button>
          </div>
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 pt-safe-top shadow-sm z-10">
        <div className="flex items-center gap-3 py-3 max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/dashboard"
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Nour avatar with online dot */}
          <div className="relative shrink-0">
            <NourAvatar />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white pulse-green" />
          </div>

          {/* Name + status */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-base leading-none">Nour</p>
            <p className="text-xs text-gray-400 mt-0.5">
              En ligne · {selectedSubject ?? "Toutes les matières"}
            </p>
          </div>

          {/* Questions counter / plan badge */}
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            {isPaid ? (
              <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-xl px-2.5 py-1">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-700">Illimité ∞</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1">
                  <Zap className={`w-3 h-3 ${questionsLeft > 0 ? "text-emerald-500" : "text-red-400"}`} />
                  <span className={`text-xs font-bold ${questionsLeft > 0 ? "text-gray-700" : "text-red-500"}`}>
                    {questionsLeft}/5
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${qColor}`}
                    style={{ width: `${qPct}%` }}
                  />
                </div>
              </>
            )}
            <span className="text-[9px] text-gray-400">{planLabel}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Subject pills */}
        <div
          ref={pillsRef}
          className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide max-w-2xl mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SUBJECT_PILLS.map((s) => {
            const active = selectedSubject === s.id;
            return (
              <button
                key={s.label}
                data-active={active}
                onClick={() => setSelectedSubject(s.id)}
                className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Messages ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-2">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 bubble-in ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI avatar */}
              {msg.role === "assistant" && <NourAvatar size="sm" isThinking={msg.content === ""} />}

              <div className={`flex flex-col max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-sm shadow-lg shadow-blue-200/60"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Empty assistant message = stream starting */}
                  {msg.role === "assistant" && msg.content === "" ? (
                    <TypingDots />
                  ) : msg.role === "assistant" ? (
                    <div
                      className="text-base text-gray-800"
                      dir={detectDir(msg.content)}
                    >
                      {renderMarkdown(msg.content)}
                    </div>
                  ) : (
                    <p
                      className="text-base leading-relaxed whitespace-pre-line text-white"
                      dir={detectDir(msg.content)}
                    >
                      {msg.content}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>

              {/* User avatar */}
              {msg.role === "user" && (
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold text-white shadow-sm">
                  {userInitial}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator (only before stream starts) */}
          {isTyping && messages[messages.length - 1]?.content !== "" && (
            <div className="flex items-end gap-2.5 bubble-in">
              <NourAvatar size="sm" isThinking={true} />
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Example prompts (first load only) ─────────────────────────────────── */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 max-w-2xl mx-auto w-full">
          <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-2 ml-1">
            <Lightbulb className="w-3 h-3" />
            Exemples de questions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-xs bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/60 text-gray-600 hover:text-emerald-700 rounded-full px-3 py-1.5 transition-all shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 pb-safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto">
          {!isPaid && questionsLeft === 0 ? (
            /* Limit reached bar — free users only */
            <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <div>
                <p className="text-amber-800 font-semibold text-sm">Limite journalière atteinte</p>
                <p className="text-amber-600 text-xs mt-0.5">وصلت للحد اليومي — الأسئلة تتجدد غداً</p>
              </div>
              <Link
                href="/pricing"
                className="shrink-0 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all"
              >
                Pro → 99 DH
              </Link>
            </div>
          ) : (
            <div className="flex items-end gap-2.5">
              {/* Textarea */}
              <div className="flex-1 bg-gray-50 rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50 transition-all shadow-sm">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-resize
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Pose ta question en Darija ou en français…"
                  rows={1}
                  className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none resize-none leading-relaxed"
                  style={{ minHeight: "44px", maxHeight: "128px" }}
                />
              </div>

              {/* Send button */}
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:shadow-none disabled:scale-100 shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          <p className="text-[10px] text-gray-400 text-center mt-2">
            Enter pour envoyer · Shift+Enter pour nouvelle ligne
          </p>
        </div>
      </div>
    </div>
  );
}
