import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const MOCK_STATS = {
  lessonsThisWeek: 12,
  exercisesDone: 34,
  aiQuestions: 18,
  pointsEarned: 480,
  streak: 7,
};

const SUBJECT_PROGRESS = [
  { name: "الرياضيات", progress: 72, color: "bg-blue-500", emoji: "🔢" },
  { name: "الفيزياء", progress: 55, color: "bg-purple-500", emoji: "⚗️" },
  { name: "علوم الحياة", progress: 88, color: "bg-emerald-500", emoji: "🌱" },
  { name: "العربية", progress: 61, color: "bg-rose-500", emoji: "📖" },
];

const RECENT_ACTIVITY = [
  { icon: "✏️", text: "أنجز 5 تمارين في الرياضيات", time: "اليوم 14:30", score: "+50 نقطة" },
  { icon: "📝", text: "اجتاز امتحاناً تجريبياً في الفيزياء — 13/20", time: "أمس 20:15", score: "+130 نقطة" },
  { icon: "🤖", text: "سأل عن المعادلات التفاضلية", time: "أمس 19:40", score: "" },
  { icon: "📚", text: "أتم درس الهندسة الفضائية", time: "منذ يومين", score: "+30 نقطة" },
];

export default async function ParentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/parent-dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, child_name, child_level, phone, plan")
    .eq("id", user.id)
    .single();

  const parentName = profile?.full_name || "ولي الأمر";
  const childName = profile?.child_name || "التلميذ";
  const level = profile?.child_level || "2eme";
  const levelLabel = level === "1ere" ? "الأولى" : level === "2eme" ? "الثانية" : "الثالثة";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl text-blue-600 flex items-center gap-1.5">
            <span>📚</span> موديريسي
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">مرحباً، {parentName}</span>
            <Link href="/auth/login" className="text-xs text-slate-400 hover:text-red-500 transition-colors">
              خروج
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Child info */}
        <div className="bg-gradient-to-l from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm mb-1">تابع تقدم</p>
              <h1 className="text-3xl font-black">{childName}</h1>
              <p className="text-blue-200 text-sm mt-1">السنة {levelLabel} إعدادي</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-1">🎓</div>
              <div className="text-2xl font-black">{MOCK_STATS.pointsEarned}</div>
              <div className="text-blue-200 text-xs">نقطة هذا الأسبوع</div>
            </div>
          </div>

          {/* Streak */}
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="text-orange-400 text-xl">🔥</span>
            <span className="font-bold">
              {MOCK_STATS.streak} أيام متواصلة من الدراسة!
            </span>
          </div>
        </div>

        {/* Weekly stats */}
        <div>
          <h2 className="font-bold text-[#1E293B] mb-3">إحصائيات هذا الأسبوع</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "دروس مكتملة", value: MOCK_STATS.lessonsThisWeek, icon: "📚", color: "bg-blue-50 border-blue-100" },
              { label: "تمارين منجزة", value: MOCK_STATS.exercisesDone, icon: "✏️", color: "bg-emerald-50 border-emerald-100" },
              { label: "أسئلة للمساعد", value: MOCK_STATS.aiQuestions, icon: "🤖", color: "bg-purple-50 border-purple-100" },
              { label: "نقاط مكتسبة", value: MOCK_STATS.pointsEarned, icon: "⭐", color: "bg-amber-50 border-amber-100" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} border rounded-2xl p-4 text-center`}>
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <div className="text-2xl font-black text-[#1E293B] ltr-num">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject progress */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-[#1E293B] mb-4">التقدم في المواد</h2>
          <div className="space-y-4">
            {SUBJECT_PROGRESS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>{s.emoji}</span> {s.name}
                  </span>
                  <span className="text-sm font-black text-slate-600 ltr-num">{s.progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-[#1E293B] mb-4">آخر النشاطات</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700">{item.text}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
                {item.score && (
                  <span className="text-xs font-bold text-emerald-600 shrink-0">{item.score}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp report */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-emerald-800 mb-1">📊 تقرير أسبوعي على WhatsApp</h3>
            <p className="text-emerald-600 text-sm">
              {profile?.phone
                ? `سيصلك التقرير على ${profile.phone}`
                : "أضف رقم WhatsApp للحصول على التقارير الأسبوعية"}
            </p>
          </div>
          {profile?.phone ? (
            <span className="text-emerald-500 text-2xl">✓</span>
          ) : (
            <Link
              href="/settings"
              className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition-colors whitespace-nowrap"
            >
              أضف رقمك
            </Link>
          )}
        </div>

        {/* Upgrade if free */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-amber-800 mb-1">⚡ ترقية الخطة</h3>
            <p className="text-amber-600 text-sm">
              احصل على تقارير تفصيلية أكثر وأسئلة ذكاء اصطناعي غير محدودة — من 29 درهم/شهر
            </p>
          </div>
          <Link
            href="/pricing"
            className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors whitespace-nowrap"
          >
            الاشتراك →
          </Link>
        </div>
      </div>
    </div>
  );
}
