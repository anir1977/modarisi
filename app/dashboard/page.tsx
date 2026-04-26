import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/BottomNav";

const QUICK_ACTIONS = [
  { href: "/chat", icon: "🤖", label: "اسأل المساعد", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { href: "/exercises", icon: "✏️", label: "تمارين اليوم", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { href: "/exam-simulator", icon: "📝", label: "الامتحانات", color: "bg-amber-50 border-amber-100 text-amber-700" },
  { href: "/leaderboard", icon: "🏆", label: "المتصدرون", color: "bg-purple-50 border-purple-100 text-purple-700" },
];

const SUBJECTS = [
  { name: "الرياضيات", emoji: "🔢", progress: 65, color: "bg-blue-500" },
  { name: "الفيزياء", emoji: "⚗️", progress: 40, color: "bg-purple-500" },
  { name: "علوم الحياة", emoji: "🌱", progress: 80, color: "bg-emerald-500" },
  { name: "العربية", emoji: "📖", progress: 55, color: "bg-rose-500" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, child_name, child_level, plan, points")
    .eq("id", user.id)
    .single();

  const name = profile?.child_name || profile?.full_name || "التلميذ";
  const plan = profile?.plan || "free";
  const points = profile?.points || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-xl text-blue-600 flex items-center gap-1.5">
            <span>📚</span> موديريسي
          </Link>
          <div className="flex items-center gap-3">
            {plan !== "free" && (
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                {plan === "premium" ? "⭐ بريميوم" : "💎 بلوس"}
              </span>
            )}
            <Link href="/dashboard/profile" className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {name.charAt(0)}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-l from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <p className="text-blue-100 text-sm mb-1">مرحباً 👋</p>
          <h1 className="text-2xl font-black mb-1">{name}</h1>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⭐</span>
              <span className="font-bold ltr-num">{points.toLocaleString()}</span>
              <span className="text-blue-200 text-sm">نقطة</span>
            </div>
            <div className="w-px h-5 bg-blue-500" />
            <Link href="/leaderboard" className="text-sm text-blue-200 hover:text-white transition-colors">
              الترتيب الوطني ←
            </Link>
          </div>
        </div>

        {/* Free plan AI limit warning */}
        {plan === "free" && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-amber-800 text-sm">
              <span>⚡</span>
              <span>لديك <strong>5 أسئلة</strong> مجانية اليوم</span>
            </div>
            <Link href="/pricing" className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-lg hover:bg-amber-200 transition-colors">
              ترقية الخطة
            </Link>
          </div>
        )}

        {/* Quick actions */}
        <div>
          <h2 className="font-bold text-[#1E293B] mb-3">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${action.color} font-semibold text-sm transition-all hover:scale-105 text-center`}
              >
                <span className="text-2xl">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Subject progress */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1E293B]">تقدمك في المواد</h2>
            <Link href="/lessons" className="text-xs text-blue-600 hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-4">
            {SUBJECTS.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>{s.emoji}</span> {s.name}
                  </span>
                  <span className="text-xs font-bold text-slate-500 ltr-num">{s.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full transition-all`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="font-bold text-[#1E293B] mb-4">آخر النشاطات</h2>
          <div className="space-y-3">
            {[
              { icon: "✏️", text: "أنجزت 5 تمارين في الرياضيات", time: "منذ ساعتين", color: "bg-emerald-50" },
              { icon: "🤖", text: "سألت عن تبسيط الكسور", time: "أمس", color: "bg-blue-50" },
              { icon: "📝", text: "راجعت امتحاناً موحداً مع التصحيح", time: "أمس", color: "bg-amber-50" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 ${item.color} rounded-xl px-3 py-2.5`}>
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{item.text}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
