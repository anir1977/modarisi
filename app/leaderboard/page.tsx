"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Filter = "national" | "city" | "level";

const MOCK_LEADERS = [
  { rank: 1, name: "سارة المنصوري", city: "الدار البيضاء", level: "3eme", points: 9840, avatar: "👧", streak: 28 },
  { rank: 2, name: "يوسف البكالي", city: "الرباط", level: "2eme", points: 8720, avatar: "👦", streak: 21 },
  { rank: 3, name: "فاطمة الزهراء", city: "مراكش", level: "3eme", points: 8450, avatar: "👧", streak: 15 },
  { rank: 4, name: "أمين العلوي", city: "فاس", level: "1ere", points: 7230, avatar: "👦", streak: 12 },
  { rank: 5, name: "خديجة بنعلي", city: "أكادير", level: "2eme", points: 6890, avatar: "👧", streak: 9 },
  { rank: 6, name: "كريم بوبكر", city: "مكناس", level: "3eme", points: 6540, avatar: "👦", streak: 7 },
  { rank: 7, name: "نور الهدى", city: "طنجة", level: "1ere", points: 5920, avatar: "👧", streak: 5 },
  { rank: 8, name: "محمد أمين", city: "وجدة", level: "2eme", points: 5600, avatar: "👦", streak: 4 },
  { rank: 9, name: "ليلى حسناوي", city: "القنيطرة", level: "3eme", points: 5200, avatar: "👧", streak: 6 },
  { rank: 10, name: "عمر الجابري", city: "سلا", level: "1ere", points: 4800, avatar: "👦", streak: 3 },
];

const MY_RANK = { rank: 47, name: "أنت", points: 1240, avatar: "⭐" };

const FILTERS: { key: Filter; label: string }[] = [
  { key: "national", label: "🇲🇦 وطني" },
  { key: "city", label: "🏙️ مدينتي" },
  { key: "level", label: "📚 مستواي" },
];

function PodiumCard({ leader, place }: { leader: typeof MOCK_LEADERS[0]; place: number }) {
  const heights = ["h-24", "h-16", "h-12"];
  const colors = [
    "bg-amber-100 border-amber-400 text-amber-700",
    "bg-slate-100 border-slate-300 text-slate-600",
    "bg-orange-100 border-orange-300 text-orange-700",
  ];
  const medals = ["🥇", "🥈", "🥉"];
  const order = place === 1 ? "order-2" : place === 2 ? "order-1" : "order-3";

  return (
    <div className={`flex flex-col items-center gap-2 ${order}`}>
      <span className="text-3xl">{leader.avatar}</span>
      <p className="text-xs font-bold text-slate-700 text-center max-w-[80px] truncate">{leader.name}</p>
      <p className="text-xs text-slate-400 ltr-num">{leader.points.toLocaleString("en-US")} نقطة</p>
      <div className={`w-full ${heights[place - 1]} rounded-t-xl border-2 ${colors[place - 1]} flex items-center justify-center text-2xl font-black`}>
        {medals[place - 1]}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<Filter>("national");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-6">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#1E293B] mb-2">🏆 المتصدرون</h1>
          <p className="text-slate-500">تنافس مع تلاميذ المغرب وتصدر الترتيب</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-xl">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === f.key ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="flex items-end justify-center gap-4 h-44">
            {MOCK_LEADERS.slice(0, 3).map((leader) => (
              <PodiumCard key={leader.rank} leader={leader} place={leader.rank} />
            ))}
          </div>
        </div>

        {/* My rank */}
        <div className="bg-blue-600 text-white rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-black text-lg">ترتيبك: #{MY_RANK.rank}</p>
              <p className="text-blue-200 text-sm ltr-num">{MY_RANK.points.toLocaleString("en-US")} نقطة</p>
            </div>
          </div>
          <Link href="/exercises" className="text-sm bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">
            تحسين الترتيب ←
          </Link>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {MOCK_LEADERS.map((leader, i) => (
            <div
              key={leader.rank}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < MOCK_LEADERS.length - 1 ? "border-b border-slate-50" : ""} ${
                leader.rank <= 3 ? "bg-amber-50/40" : ""
              }`}
            >
              <span className={`w-8 text-center font-black text-lg ${
                leader.rank === 1 ? "text-amber-500" :
                leader.rank === 2 ? "text-slate-400" :
                leader.rank === 3 ? "text-orange-500" : "text-slate-400"
              }`}>
                {leader.rank <= 3 ? ["🥇","🥈","🥉"][leader.rank - 1] : `#${leader.rank}`}
              </span>

              <span className="text-2xl">{leader.avatar}</span>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">{leader.name}</p>
                <p className="text-xs text-slate-400">{leader.city} · {leader.level.replace("ere", "ère").replace("eme", "ème")} إعدادي</p>
              </div>

              <div className="text-left shrink-0">
                <p className="font-black text-blue-600 text-sm ltr-num">{leader.points.toLocaleString("en-US")}</p>
                <p className="text-xs text-orange-500">🔥 {leader.streak} يوم</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          يُحدَّث الترتيب كل يوم في منتصف الليل
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
