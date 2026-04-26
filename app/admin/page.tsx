import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ayouz202@gmail.com";

const MOCK_STATS = {
  totalUsers: 1247,
  activeToday: 89,
  freeUsers: 1102,
  plusUsers: 118,
  premiumUsers: 27,
  totalRevenue: 4379,
  aiQuestionsToday: 342,
  examsToday: 67,
};

const MOCK_USERS = [
  { id: "1", name: "فاطمة بنعلي", email: "fatima@example.com", plan: "plus", created: "2025-01-15", childLevel: "3eme", active: true },
  { id: "2", name: "محمد العلوي", email: "mohammed@example.com", plan: "free", created: "2025-02-03", childLevel: "2eme", active: true },
  { id: "3", name: "أمينة الحسني", email: "amina@example.com", plan: "premium", created: "2024-12-20", childLevel: "1ere", active: false },
  { id: "4", name: "يوسف البكالي", email: "youssef@example.com", plan: "plus", created: "2025-01-28", childLevel: "3eme", active: true },
  { id: "5", name: "خديجة المنصوري", email: "khadija@example.com", plan: "free", created: "2025-03-10", childLevel: "2eme", active: true },
];

const PLAN_COLORS: Record<string, string> = {
  free: "bg-slate-100 text-slate-600",
  plus: "bg-blue-100 text-blue-700",
  premium: "bg-amber-100 text-amber-700",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h1 className="font-black text-white text-lg">لوحة الإدارة</h1>
            <p className="text-slate-400 text-xs">موديريسي — Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded-full">● نشط</span>
          <span className="text-sm text-slate-400">{user.email}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats grid */}
        <div>
          <h2 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">الإحصائيات الإجمالية</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "إجمالي المستخدمين", value: MOCK_STATS.totalUsers.toLocaleString(), icon: "👥", color: "text-blue-400" },
              { label: "نشطون اليوم", value: MOCK_STATS.activeToday, icon: "🟢", color: "text-emerald-400" },
              { label: "أسئلة AI اليوم", value: MOCK_STATS.aiQuestionsToday, icon: "🤖", color: "text-purple-400" },
              { label: "إيرادات (درهم)", value: `${MOCK_STATS.totalRevenue.toLocaleString()}`, icon: "💰", color: "text-amber-400" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-2xl block mb-2">{s.icon}</span>
                <div className={`text-3xl font-black ${s.color} ltr-num`}>{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-5">توزيع الخطط</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { plan: "مجاني", count: MOCK_STATS.freeUsers, color: "bg-slate-600", pct: Math.round((MOCK_STATS.freeUsers / MOCK_STATS.totalUsers) * 100) },
              { plan: "بلوس", count: MOCK_STATS.plusUsers, color: "bg-blue-600", pct: Math.round((MOCK_STATS.plusUsers / MOCK_STATS.totalUsers) * 100) },
              { plan: "بريميوم", count: MOCK_STATS.premiumUsers, color: "bg-amber-600", pct: Math.round((MOCK_STATS.premiumUsers / MOCK_STATS.totalUsers) * 100) },
            ].map((p) => (
              <div key={p.plan} className="text-center">
                <div className="text-2xl font-black text-white ltr-num">{p.count}</div>
                <div className="text-slate-400 text-sm">{p.plan}</div>
                <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                </div>
                <div className="text-xs text-slate-500 mt-1 ltr-num">{p.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Users table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-white">المستخدمون الأخيرون</h2>
            <span className="text-xs text-slate-400">آخر {MOCK_USERS.length} تسجيل</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs">
                  <th className="px-4 py-3 text-right font-semibold">المستخدم</th>
                  <th className="px-4 py-3 text-right font-semibold">المستوى</th>
                  <th className="px-4 py-3 text-right font-semibold">الخطة</th>
                  <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-4 py-3 text-right font-semibold">تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((u, i) => (
                  <tr key={u.id} className={`border-b border-slate-800/50 ${i % 2 === 0 ? "" : "bg-slate-800/20"}`}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-slate-400 text-xs ltr-num">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {u.childLevel.replace("ere", "ère").replace("eme", "ème")} إعدادي
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PLAN_COLORS[u.plan]}`}>
                        {u.plan === "free" ? "مجاني" : u.plan === "plus" ? "بلوس" : "بريميوم"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${u.active ? "text-emerald-400" : "text-slate-500"}`}>
                        {u.active ? "● نشط" : "○ غير نشط"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs ltr-num">{u.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "تصدير المستخدمين CSV", icon: "📥", color: "bg-slate-800 hover:bg-slate-700" },
            { label: "إرسال إشعار عام", icon: "📢", color: "bg-blue-900/50 hover:bg-blue-800/50" },
            { label: "صيانة قاعدة البيانات", icon: "🔧", color: "bg-slate-800 hover:bg-slate-700" },
            { label: "عرض السجلات", icon: "📋", color: "bg-slate-800 hover:bg-slate-700" },
          ].map((action) => (
            <button
              key={action.label}
              className={`${action.color} border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 text-right flex items-center gap-2 transition-colors`}
            >
              <span className="text-xl">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
