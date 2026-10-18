"use client";
import { useState } from "react";
import { TRACKS } from "@/lib/curriculum";
import { Sparkles, Send, Bot, User, BookOpen, Lightbulb, CheckCircle, RefreshCw, MessageSquare } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  "2bac-pc": [
    "Kifach n-démontrer l'équation différentielle dyal le circuit RLC en série ?",
    "Kifach n-calculer la limite dyal (e^x - 1)/x ملي x كيمشي لـ 0 ؟",
    "شنو هما المراحل ديال انحلال الكليكوز فـ الجبلة الشفافة فـ SVT ؟",
    "Kifach n-calculer la constante radioactive lambda mn la courbe ?",
  ],
  "2bac-sm": [
    "Kifach n-montrer bi-annaha structure (G, *) est un sous-groupe ?",
    "Comment utiliser le théorème de Bézout et de Gauss f l'Arithmétique ?",
    "Résolution dyal l'équation différentielle y'' + w²y = 0 f la mécanique.",
    "Astuce pour encadrer une intégrale avec les sommes de Riemann.",
  ],
  "2bac-svt": [
    "شنو هو الفرق بين الانقسام الاختزالي والانقسام غير المباشر ؟",
    "Comment interpréter les résultats d'un croisement test (test-cross) ?",
    "Kifach n-fasser les anomalies chromosomiques فـ الوراثة البشرية ؟",
    "Les étapes de la réponse immunitaire à médiation humorale et cellulaire.",
  ],
  "1bac-reg": [
    "Quel est le schéma narratif complet de 'La Boîte à Merveilles' d'Ahmed Sefrioui ?",
    "Kifach n-rédiger un plan dialectique (Thèse, Antithèse, Synthèse) f la production écrite ?",
    "شنو هما القيم المستفادة من سورة يوسف فـ التربية الإسلامية ؟",
    "Comment reconnaître l'Antithèse, l'Oxymore et l'Hyperbole f le texte d'Antigone ?",
  ],
  "2bac-eco": [
    "Comment calculer le PIB, le PNB et le RNB à partir des agrégats économiques ?",
    "Quelles sont les actions de Bank Al-Maghrib dans la politique monétaire marocaine ?",
    "Calcul de l'amortissement dégressif et constant en Comptabilité.",
  ],
  "college-3ac": [
    "Comment appliquer le théorème de Pythagore direct et réciproque ?",
    "Résolution d'un système de deux équations à deux inconnues par substitution.",
    "Comment équilibrer une équation chimique de combustion ?",
  ],
};

export function InteractiveTutor({
  selectedTrack,
  onSelectTrack,
}: {
  selectedTrack: string;
  onSelectTrack: (trackId: string) => void;
}) {
  const currentTrack = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];
  const suggestions = SUGGESTED_QUESTIONS[selectedTrack] || SUGGESTED_QUESTIONS["2bac-pc"];

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Salam ! Marhba bik a btl/btla فـ **مدرسي (Modarisi.ma)** 🎓\n\nأنا أستاذك الخصوصي فـ شعبة **${currentTrack.nameAr}**.\n\nواش عندك شي تمرين واحل فيه فـ ${currentTrack.subjects.slice(0, 3).join("، ")}، ولا باغي نفهمو شي درس صعيب فـ المقرر ؟ سولني بالدارجة أو الفرنسية أو العربية وغادي نشرح ليك خطوة بخطوة بالتعليل العلمي الرسمي!`,
      time: "الآن",
    },
  ]);

  async function handleSend(textToSend?: string) {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = { role: "user", content: q, time: "الآن" };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          track: currentTrack.name,
          subject: currentTrack.subjects[0],
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply, time: "الآن" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "عذراً، وقع خطأ في معالجة السؤال. يرجى إعادة المحاولة.",
            time: "الآن",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "تعذر الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت.",
          time: "الآن",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="tuteur" className="py-16 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
            <Sparkles size={14} />
            <span>الأستاذ الخصوصي الذكي · Tuteur Pédagogique 24/7</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            سول فـ أي تمرين أو مفهوم، وافهم بالدارجة والفرنسية
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            ما كاينش الحفظ الأعمى: الأستاذ كيقسم ليك الحل لـ 3 خطوات (تذكير بالقاعدة، البرهنة خطوة بخطوة، ونصائح الامتحان الوطني).
          </p>
        </div>

        {/* Studio Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto flex flex-col h-[700px]">
          
          {/* Top Bar with Selected Track */}
          <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Bot size={20} />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>أستاذ مدرسي (Modarisi AI)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-xs text-slate-400">
                  مستوى: <strong className="text-emerald-300">{currentTrack.nameAr}</strong>
                </div>
              </div>
            </div>

            {/* Quick Track Switcher Dropdown */}
            <select
              value={selectedTrack}
              onChange={(e) => onSelectTrack(e.target.value)}
              className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 outline-none focus:border-emerald-500"
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 chat-container bg-slate-50/50 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-emerald-800 text-white shadow-xs"
                  }`}
                >
                  {m.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs whitespace-pre-wrap"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 mr-auto max-w-md bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-emerald-800 shadow-xs">
                <RefreshCw size={16} className="animate-spin text-emerald-700" />
                <span className="font-bold">الأستاذ يقوم بصياغة الشرح والبرهنة بالخطوات…</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="shrink-0 text-slate-400 font-bold self-center px-2 flex items-center gap-1">
              <Lightbulb size={13} className="text-amber-500" /> أسئلة نموذجية:
            </span>
            {suggestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => void handleSend(q)}
                disabled={loading}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 font-semibold transition-colors truncate max-w-[280px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-200 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك بالدارجة، الفرنسية أو العربية (مثال: كيفاش نبين أن الدالة تزايدية قطعا ؟)..."
              disabled={loading}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <span>إرسال</span>
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
