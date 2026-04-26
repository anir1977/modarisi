"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Loader2, RotateCcw, ChevronDown } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "اشرح لي قانون نيوتن الثاني",
  "كيف أحل معادلة من الدرجة الأولى؟",
  "ما هو الفرق بين الخلية النباتية والحيوانية؟",
  "اشرح لي الكسور بمثال",
];

const SUBJECT_CHIPS = ["الرياضيات", "الفيزياء", "علوم الحياة", "العربية", "الفرنسية"];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! 👋 أنا نور، مساعدك التعليمي الذكي 🤖\n\nيمكنك أن تسألني في أي مادة دراسية: الرياضيات، الفيزياء، علوم الحياة، العربية أو الفرنسية.\n\nاكتب سؤالك بالعربية أو الفرنسية، وسأحاول الشرح بطريقة واضحة ومبسطة. 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, subject }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setError("فشل الاتصال. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        content: "مرحباً من جديد! 👋 كيف يمكنني مساعدتك؟ 😊",
      },
    ]);
    setError("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm z-40 shrink-0">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600 text-lg">←</Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-black text-[#1E293B] text-sm leading-none">نور</p>
                <p className="text-xs text-emerald-500 font-semibold">متصل الآن</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Subject selector */}
            <div className="relative">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-xs font-bold text-slate-600 border border-slate-200 rounded-lg px-2 py-1.5 bg-white appearance-none pr-5 focus:outline-none focus:border-blue-400"
              >
                <option value="">كل المواد</option>
                {SUBJECT_CHIPS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={10} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <button
              onClick={reset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              title="محادثة جديدة"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-4 pb-6">
          {/* Suggested questions (show only at start) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pb-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex chat-bubble-enter ${msg.role === "user" ? "justify-start" : "justify-end"}`}
            >
              {msg.role === "assistant" && (
                <span className="text-xl ml-2 mt-1 shrink-0">🤖</span>
              )}
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white border border-slate-100 shadow-sm text-slate-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <span className="text-xl mr-2 mt-1 shrink-0">👤</span>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-end">
              <span className="text-xl ml-2 mt-1">🤖</span>
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
                <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
                <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
              </div>
            </div>
          )}

          {error && (
            <div className="text-center text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:pb-3">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="اسأل عن أي درس..."
              rows={1}
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all max-h-32 overflow-y-auto"
              style={{ minHeight: "44px" }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 hover:bg-blue-700 transition-all shrink-0 shadow"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-300 mt-1.5">
          اضغط Enter للإرسال • Shift+Enter لسطر جديد
        </p>
      </div>

      {/* bottom nav padding on mobile */}
      <div className="md:hidden h-16" />
      <BottomNav />
    </div>
  );
}
