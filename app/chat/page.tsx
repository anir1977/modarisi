"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Send,
  Sparkles,
  BookOpen,
  Plus,
  ArrowLeft,
  Lightbulb,
  LogOut,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "SVT",
  "Français",
  "Arabe",
  "Éducation Islamique",
  "Histoire-Géographie",
];

const EXAMPLE_PROMPTS = [
  "شنو هي المعادلة ديال النيوتن الثانية؟",
  "Explique-moi le théorème de Pythagore",
  "كيفاش نحل هذه المعادلة: 2x + 5 = 13",
  "C'est quoi la photosynthèse?",
  "شرح ليا مفهوم الحرارة في الفيزياء",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `Bonjour ! Je suis Modarisi, ton tuteur IA pour le collège. 👋

Pose-moi tes questions en Darija ou en français — je suis là pour t'aider dans toutes tes matières.

**Je couvre toutes les matières du collège :**
- 📐 Mathématiques
- ⚗️ Physique-Chimie
- 🔬 Sciences de la Vie et de la Terre (SVT)
- 📖 Français & Arabe
- 🕌 Éducation Islamique
- 🌍 Histoire-Géographie

Disponible pour la 1ère, 2ème et 3ème année collège. À toi de jouer !`,
  timestamp: new Date(),
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questionsLeft, setQuestionsLeft] = useState(5);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get user ID and load today's question count
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);

      // Count user questions sent today
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("role", "user")
        .gte("created_at", todayStart.toISOString());

      const used = count ?? 0;
      setQuestionsLeft(Math.max(0, 5 - used));
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

    // Client-side guard: show modal before even calling the API
    if (questionsLeft <= 0) {
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
    setQuestionsLeft((q) => Math.max(0, q - 1));

    // Create a placeholder assistant message for streaming
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsg: Message = {
      id: aiMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);

    let finalAssistantContent = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.status === 429) {
        // Server confirmed limit reached — remove placeholder and show modal
        setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
        setQuestionsLeft(0);
        setShowLimitModal(true);
        return;
      }

      if (!res.ok || !res.body) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId ? { ...m, content: accumulated } : m
          )
        );
      }

      finalAssistantContent = accumulated;
    } catch (err) {
      console.error("[sendMessage error]", err);
      const errorMsg = "Désolé, une erreur s'est produite. Réessaie dans un moment. 😅";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId ? { ...m, content: errorMsg } : m
        )
      );
    } finally {
      setIsTyping(false);
      if (finalAssistantContent) {
        saveMessages(content, finalAssistantContent);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Limit reached modal ─────────────────────────────────────────────── */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⏳</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Limite journalière atteinte
            </h2>
            <p className="text-gray-500 text-sm mb-1">
              Vous avez atteint votre limite de <strong>5 questions</strong> aujourd'hui.
            </p>
            <p className="text-gray-400 text-xs mb-6">
              الحد اليومي الخاص بك هو 5 أسئلة — وصلته اليوم
            </p>
            <Link
              href="/pricing"
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors mb-3"
              onClick={() => setShowLimitModal(false)}
            >
              Passer au Pro — 99 DH/mois
            </Link>
            <button
              onClick={() => setShowLimitModal(false)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Revenir demain (limite gratuite)
            </button>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Modarisi</span>
          </Link>
        </div>

        {/* New chat */}
        <div className="p-3">
          <Button variant="outline" className="w-full gap-2 text-sm" size="sm">
            <Plus className="w-4 h-4" />
            Nouvelle conversation
          </Button>
        </div>

        {/* Subject filter */}
        <div className="px-3 pb-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">
            المواد · Matières
          </p>
          <div className="space-y-1">
            {SUBJECTS.map((subject) => (
              <button
                key={subject}
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject === subject ? null : subject
                  )
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedSubject === subject
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Usage indicator */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="bg-primary-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-primary-700">
                Plan Gratuit
              </span>
              <span className="text-xs text-primary-600">
                {questionsLeft}/5 restantes
              </span>
            </div>
            <div className="w-full bg-primary-100 rounded-full h-1.5">
              <div
                className="bg-primary-600 h-1.5 rounded-full transition-all"
                style={{ width: `${(questionsLeft / 5) * 100}%` }}
              />
            </div>
            <Button size="sm" className="w-full mt-3 text-xs h-8" asChild>
              <Link href="/pricing">Passer à Pro · ترقية</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">مدرسي AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <p className="text-xs text-gray-500">
                  En ligne · {selectedSubject || "Toutes les matières"}
                </p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs hidden sm:flex">
              {questionsLeft} questions restantes
            </Badge>
            <Button size="sm" variant="outline" asChild className="text-xs hidden sm:flex">
              <Link href="/pricing">Upgrade Pro</Link>
            </Button>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 chat-bubble-enter ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary-600 text-white rounded-tr-sm"
                    : "bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm"
                }`}
              >
                <div
                  className={`text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
                <p
                  className={`text-xs mt-1.5 ${
                    msg.role === "user"
                      ? "text-primary-200"
                      : "text-gray-400"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-gray-600">
                  A
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary-600" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary-400 rounded-full typing-dot"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Example prompts (show when only welcome message) */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              أمثلة على الأسئلة · Exemples de questions
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-full px-3 py-1.5 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="bg-white border-t border-gray-200 p-4">
          {questionsLeft === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-amber-800 font-medium text-sm mb-2">
                وصلت للحد اليومي · Limite journalière atteinte
              </p>
              <p className="text-amber-600 text-xs mb-3">
                Passez à Pro pour des questions illimitées · ترقية للحصول على أسئلة غير محدودة
              </p>
              <Button size="sm" asChild>
                <Link href="/pricing">Passer à Pro · 99 DH/mois</Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب سؤالك هنا... / Écris ta question ici..."
                  rows={1}
                  className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none resize-none max-h-32 overflow-y-auto"
                  style={{ minHeight: "44px" }}
                />
              </div>
              <Button
                size="icon"
                className="h-11 w-11 rounded-xl shrink-0"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
          <p className="text-xs text-gray-400 text-center mt-2">
            Shift+Enter pour nouvelle ligne · Enter pour envoyer
          </p>
        </div>
      </div>
    </div>
  );
}
