"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Suspense } from "react";

const grades = ["1ère année collège", "2ème année collège", "3ème année collège"];

function RegisterForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "free";

  const [role, setRole] = useState<"student" | "parent">("student");
  const [selectedGrade, setSelectedGrade] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Modarisi</span>
          </Link>
          <p className="text-gray-500 mt-2 text-sm">
            انضم لآلاف الطلاب المغاربة · Rejoignez des milliers d'élèves
          </p>

          {planParam !== "free" && (
            <div className="mt-3 inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-primary-700 text-xs font-medium">
                Plan {planParam === "pro" ? "Pro · 99 DH/mois" : "Famille · 149 DH/mois"}
              </span>
            </div>
          )}
        </div>

        <Card className="border-2 border-gray-100 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-gray-900">
              Créer un compte · إنشاء حساب
            </CardTitle>

            {/* Role selector */}
            <div className="flex bg-gray-100 rounded-xl p-1 mt-3">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  role === "student"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                طالب · Étudiant
              </button>
              <button
                onClick={() => setRole("parent")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  role === "parent"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ولي الأمر · Parent
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Common fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Prénom · الاسم</Label>
                <Input placeholder="Ahmed" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Nom · النسب</Label>
                <Input placeholder="Benali" className="h-10" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input type="email" placeholder="exemple@gmail.com" className="h-10" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Téléphone (WhatsApp) · الهاتف</Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-input rounded-lg px-3 text-sm text-gray-600 shrink-0">
                  🇲🇦 +212
                </div>
                <Input placeholder="06XX XXX XXX" className="h-10" />
              </div>
            </div>

            {/* Student-specific fields */}
            {role === "student" && (
              <div className="space-y-1.5">
                <Label className="text-xs">Niveau scolaire · المستوى الدراسي</Label>
                <div className="grid grid-cols-3 gap-2">
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`py-2 px-2 rounded-lg text-xs border-2 font-medium transition-all ${
                        selectedGrade === grade
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Parent-specific fields */}
            {role === "parent" && (
              <div className="space-y-1.5">
                <Label className="text-xs">Nom de l'enfant · اسم الطفل</Label>
                <Input placeholder="Prénom de votre enfant" className="h-10" />
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs">Mot de passe · كلمة المرور</Label>
              <Input type="password" placeholder="Min. 8 caractères" className="h-10" />
            </div>

            <Button className="w-full h-11 text-base" asChild>
              <Link href={role === "student" ? "/chat" : "/dashboard"}>
                Créer mon compte · إنشاء الحساب
              </Link>
            </Button>

            {/* Trust signals */}
            <div className="bg-secondary-50 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary-600 mt-0.5 shrink-0" />
              <p className="text-xs text-secondary-700 leading-relaxed">
                {planParam === "free"
                  ? "Compte gratuit · 5 questions/jour · Pas de carte bancaire requise"
                  : "7 jours d'essai gratuit · Annulation à tout moment"}
              </p>
            </div>

            <p className="text-center text-xs text-gray-500">
              En créant un compte, vous acceptez nos{" "}
              <Link href="#" className="text-primary-600 hover:underline">
                conditions d'utilisation
              </Link>
            </p>

            <p className="text-center text-sm text-gray-500">
              Déjà un compte?{" "}
              <Link
                href="/auth/login"
                className="text-primary-600 font-medium hover:underline"
              >
                Se connecter · دخول
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
