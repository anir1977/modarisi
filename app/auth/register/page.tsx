"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  User,
  Lock,
  BookOpen,
} from "lucide-react";

const LEVELS = [
  { value: "1ere", label: "1ère année" },
  { value: "2eme", label: "2ème année" },
  { value: "3eme", label: "3ème année" },
];

function RegisterForm() {
  const t = useTranslations("auth.register");
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
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // 1. Create the account (no sign-in yet — prevents Supabase from
    //    triggering an auth-state change that would wipe component state)
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
          ? "Cet email est déjà utilisé. Connectez-vous plutôt."
          : signUpError.message
      );
      setLoading(false);
      return;
    }

    // 2. Fire welcome email in background — don't await
    fetch("/api/auth/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: fullName }),
    }).catch(() => {});

    // 3. Show success screen (no router.push here — auth state untouched)
    setLoading(false);
    setRegistered(true);
  };

  // Called only when the user clicks "Commencer maintenant"
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
          {/* Icon */}
          <div className="relative inline-flex mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-blue-200">
              <span className="text-5xl">🎓</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center border-4 border-white text-white text-sm font-bold">✓</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {firstName} ! 🎉
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Votre compte a été créé avec succès
          </p>

          {/* Info card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email de bienvenue envoyé</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">5 questions gratuites par jour</p>
                <p className="text-xs text-gray-400">Maths, Physique, SVT, Français, Arabe…</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleGoToDashboard}
            disabled={redirecting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-70 text-white font-semibold text-base rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 py-4"
          >
            {redirecting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</>
            ) : (
              "Commencer maintenant →"
            )}
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Tuteur IA disponible 24h/7j en Darija & Français
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 py-12">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("back_home")}
      </Link>

      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Modarisi</span>
          </Link>
          <p className="text-gray-500 mt-2 text-sm">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* ── Parent info ── */}
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-primary-600" />
                Vos informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullname")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Mohammed Benali"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="parent@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone WhatsApp{" "}
                  <span className="text-gray-400 font-normal text-xs">(optionnel)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+212 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 pl-10"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Minimum 8 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Child info ── */}
          <Card className="border-2 border-blue-100 shadow-lg bg-blue-50/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                <BookOpen className="w-4 h-4 text-primary-600" />
                Votre enfant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Prénom de l'enfant</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="childName"
                    type="text"
                    required
                    placeholder="Prénom de votre enfant"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="h-11 pl-10 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Niveau — Collège</Label>
                <div className="grid grid-cols-3 gap-2">
                  {LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setChildLevel(level.value)}
                      className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all text-center ${
                        childLevel === level.value
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary-200"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-base shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("submit")
            )}
          </Button>

          <p className="text-center text-sm text-gray-500">
            {t("has_account")}{" "}
            <Link
              href="/auth/login"
              className="text-primary-600 font-medium hover:underline"
            >
              {t("login_link")}
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
