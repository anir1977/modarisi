"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, AlertCircle, Mail } from "lucide-react";

const LEVELS = [
  { value: "1ere", label: "السنة الأولى" },
  { value: "2eme", label: "السنة الثانية" },
  { value: "3eme", label: "السنة الثالثة" },
];

function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [childName, setChildName] = useState("");
  const [childLevel, setChildLevel] = useState("1ere");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role: "parent",
          child_name: childName,
          child_level: childLevel,
        },
      },
    });

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "هذا البريد الإلكتروني مستخدم بالفعل. حاول تسجيل الدخول."
          : signUpError.message
      );
      setLoading(false);
      return;
    }

    setLoading(false);
    setRegistered(true);
  };

  const handleGoToDashboard = async () => {
    setRedirecting(true);
    const supabase = createClient();
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/dashboard");
    router.refresh();
  };

  if (registered) {
    const firstName = fullName.split(" ")[0];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="relative inline-flex mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-blue-200">
              <span className="text-5xl">🎓</span>
            </div>
            <span className="absolute -bottom-1 -left-1 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center border-4 border-white text-white text-sm font-bold">✓</span>
          </div>

          <h1 className="text-3xl font-black text-[#1E293B] mb-2">
            مرحباً، {firstName}! 🎉
          </h1>
          <p className="text-lg text-slate-500 mb-6">تم إنشاء حسابك بنجاح</p>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6 text-right space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1E293B]">تم إرسال بريد الترحيب</p>
                <p className="text-xs text-slate-400 ltr-num">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <span>📚</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1E293B]">5 أسئلة ذكاء اصطناعي يومياً مجاناً</p>
                <p className="text-xs text-slate-400">رياضيات، فيزياء، علوم، عربية...</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGoToDashboard}
            disabled={redirecting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 py-4"
          >
            {redirecting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> جاري التحميل...</>
            ) : (
              "ابدأ التعلم الآن ←"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-blue-600">
            <span className="text-3xl">📚</span>
            <span>موديريسي</span>
          </Link>
          <p className="text-slate-500 mt-2 text-sm">أنشئ حسابك مجاناً</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Parent info */}
          <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-[#1E293B] flex items-center gap-2">
              <span>👨‍👩‍👧</span> معلومات ولي الأمر
            </h2>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">الاسم الكامل</label>
              <input
                type="text" required placeholder="محمد بنعلي"
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">البريد الإلكتروني</label>
              <input
                type="email" required placeholder="example@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                رقم WhatsApp{" "}
                <span className="text-slate-400 font-normal text-xs">(اختياري — للتقارير الأسبوعية)</span>
              </label>
              <input
                type="tel" placeholder="+212 6 00 00 00 00"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} required
                  placeholder="8 أحرف على الأقل"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full h-11 px-4 pe-11 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  style={{ direction: "ltr", textAlign: "left" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Child info */}
          <div className="bg-blue-50/60 rounded-2xl border-2 border-blue-100 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-[#1E293B] flex items-center gap-2">
              <span>👦</span> معلومات التلميذ
            </h2>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">اسم التلميذ</label>
              <input
                type="text" required placeholder="اسم ابنك أو ابنتك"
                value={childName} onChange={(e) => setChildName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-blue-200 bg-white text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">المستوى الدراسي</label>
              <div className="grid grid-cols-3 gap-2">
                {LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setChildLevel(level.value)}
                    className={`py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                      childLevel === level.value
                        ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                        : "border-blue-200 bg-white text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-blue-600 text-white font-black text-base hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> جاري إنشاء الحساب...</>
            ) : (
              "إنشاء الحساب مجاناً 🚀"
            )}
          </button>

          <p className="text-center text-sm text-slate-500">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
              سجل دخولك
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
