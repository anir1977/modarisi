"use client";
import { useEffect, useState } from "react";
import { MarkdownMessage } from "@/components/markdown-message";
import { TRACKS } from "@/lib/curriculum";
import { Sparkles, Send, Bot, User, Lightbulb, RefreshCw } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  "2bac-pc": [
    "كيف أثبت المعادلة التفاضلية للدارة الكهربائية RLC المتذبذبة بالتفصيل ؟",
    "ما هي المراحل المنهجية لحساب نهاية الدالة المركبة باستخدام مبرهنة الاستمرار والاشتقاق ؟",
    "اشرح لي مراحل انحلال الغليكوز في الجبلة الشفافة ومردوديتها الطاقية في مادة علوم الحياة والأرض.",
    "كيف أحدد ثابتة النشاط الإشعاعي بيانيا وحساب عمر النصف من منحنى التناقص الإشعاعي ؟",
  ],
  "2bac-sm": [
    "كيف أبرهن أن بنية جبرية معينة تشكل زمرة جزئية أو حقلاً تبادلياً ؟",
    "ما هي شروط واستعمالات مبرهنة بيزو (Bézout) ومبرهنة غوص (Gauss) في الحسابيات ؟",
    "حل المعادلة التفاضلية من الرتبة الثانية ذات المعاملات الثابتة في الميكانيكا الكلاسيكية.",
    "طريقة تأطير وحساب النهايات بالاعتماد على مجموع ريمان (Sommes de Riemann).",
  ],
  "2bac-svt": [
    "ما هو الفرق الدقيق بين الانقسام الاختزالي والانقسام غير المباشر من حيث الصبغيات ؟",
    "كيف أفسر نتائج التزاوج الاختباري (Test-cross) في حالة مورثتين مرتبطتين أو مستقلتين ؟",
    "شرح الاستجابة المناعتية ذات الوسيط الخلطي وذات الوسيط الخلوي بالخطاطات التوضيحية.",
  ],
  "1bac-reg": [
    "ما هو التلخيص الشامل والخطاطة السردية لرواية 'صندوق العجائب' (La Boîte à Merveilles) ؟",
    "كيف أحرر موضوع إنشاء تحليلي متكامل وفق التصميم الجدلي (Plan dialectique) ؟",
    "ما هي القيم والأحكام الشرعية المستنبطة من الشطر القرآني لسورة يوسف ؟",
    "كيف أستخرج الصور البيانية (الاستعارة، الكناية، الطباق، والمقابلة) في نصوص الامتحان الجهوي ؟",
  ],
  "2bac-eco": [
    "كيف أحسب الناتج الداخلي الإجمالي (PIB) والدخل الوطني المتاح بدقة من المعطيات الإحصائية ؟",
    "ما هي آليات السياسة النقدية التي يعتمدها بنك المغرب للتحكم في التضخم ؟",
    "طريقة إعداد جدول استهلاك القروض وجدول الإهتلاك الخطي والمتناقص في المحاسبة.",
  ],
  "college-3ac": [
    "كيف أطبق مبرهنة فيتاغورس ومبرهنة طاليس المباشرة والعكسية في التمارين الهندسية ؟",
    "طريقة حل نظمة معادلتين من الدرجة الأولى بمجهولين بالتعويض وبالتأليفية الخطية.",
    "كيف أوازن معادلة كيميائية لاحتراق مادة عضوية في الهواء مع تحديد النواتج ؟",
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

  // Prefill the question from ?q= (used by "اسأل الأستاذ" links on exam pages)
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) setInput(q.slice(0, 1500));
    } catch {
      /* ignore */
    }
  }, []);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `السلام عليكم ورحمة الله وبركاته، مرحباً بك في **منصة مدرسي (Modarisi.ma)** 🎓\n\nأنا أستاذك الافتراضي المتخصص في **${currentTrack.nameAr}** وفق المقرر الدراسي المغربي.\n\nيسعدني مرافقتك لشرح أي درس أو تفكيك أي تمرين مستعص في مواد شعبتك. يمكنك طرح أي سؤال باللغة العربية الفصحى أو الفرنسية العلمية، وسأقدم لك شرحاً منهجياً خطوة بخطوة بالبرهان والتعليل المعتمد في الامتحانات الوطنية والجهوية.`,
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
          subject: "",
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
            content: typeof data.error === "string" ? data.error : "عذراً، حدث خطأ مؤقت. يرجى إعادة المحاولة.",
            time: "الآن",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.",
          time: "الآن",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="tuteur" className="py-20 bg-slate-100/80 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Large Clear Arabic Text */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-black">
            <Sparkles size={16} />
            <span>الأستاذ الخصوصي الذكي · شرح بيداغوجي تفاعلي على مدار الساعة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            اطرح سؤالك في أي درس أو تمرين، وتلقى الشرح والبرهان فوراً
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
            منهجية بيداغوجية رصينة تقسم الحل إلى ثلاث مراحل واضحة: التذكير بالقاعدة، البرهنة التفصيلية خطوة بخطوة، ونصائح منهجية للامتحان الوطني.
          </p>
        </div>

        {/* Studio Box */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden max-w-5xl mx-auto flex flex-col h-[740px]">
          
          {/* Header Bar */}
          <div className="bg-slate-950 text-white p-5 sm:px-8 flex items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md">
                <Bot size={26} />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg flex items-center gap-2.5">
                  <span>أستاذ مدرسي الافتراضي (Modarisi AI)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
                  الشعبة الحالية : <strong className="text-emerald-300 font-bold">{currentTrack.nameAr}</strong>
                </div>
              </div>
            </div>

            <select
              value={selectedTrack}
              onChange={(e) => onSelectTrack(e.target.value)}
              className="bg-slate-800 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 chat-container bg-slate-50/60 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 max-w-[90%] sm:max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black shadow-xs ${
                    m.role === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-emerald-900 text-white"
                  }`}
                >
                  {m.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>

                <div
                  className={`p-5 rounded-3xl text-sm sm:text-base leading-relaxed shadow-sm font-semibold ${
                    m.role === "user"
                      ? "bg-blue-700 text-white rounded-tr-xs"
                      : "bg-white text-slate-900 border border-slate-200 rounded-tl-xs font-medium"
                  }`}
                >
                  {m.role === "assistant" ? <MarkdownMessage content={m.content} /> : m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3.5 mr-auto max-w-lg bg-white p-4 rounded-3xl border border-slate-200 text-sm text-emerald-900 font-bold shadow-xs">
                <RefreshCw size={18} className="animate-spin text-emerald-700" />
                <span>يقوم الأستاذ الآن بصياغة الحل المنهجي والبرهان العلمي…</span>
              </div>
            )}
          </div>

          {/* Sample Questions Chips */}
          <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex gap-2.5 overflow-x-auto text-xs sm:text-sm font-bold no-scrollbar">
            <span className="shrink-0 text-slate-500 self-center px-2 flex items-center gap-1.5 font-black">
              <Lightbulb size={16} className="text-amber-600" /> نماذج أسئلة شائعة :
            </span>
            {suggestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => void handleSend(q)}
                disabled={loading}
                className="shrink-0 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 border border-slate-300 hover:border-emerald-400 font-bold transition-all shadow-2xs truncate max-w-[340px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar with Large Font */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
            className="p-4 sm:p-5 bg-white border-t border-slate-200 flex gap-3 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
              aria-label="سؤالك للأستاذ الافتراضي"
              placeholder="اكتب سؤالك بوضوح (مثال: اشرح لي مبرهنة القيم الوسيطية وكيف نطبقها في دراسة إشارة الدالة ؟)..."
              disabled={loading}
              className="flex-1 bg-slate-100 border border-slate-300 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-7 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-black text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <span>إرسال</span>
              <Send size={18} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
