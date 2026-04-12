"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "parent">("student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
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
            أهلاً بك مجدداً · Bon retour !
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-gray-900">
              Connexion · تسجيل الدخول
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
            <div className="space-y-2">
              <Label htmlFor="email">
                {role === "student"
                  ? "البريد الإلكتروني"
                  : "Email du parent"}{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (Email)
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  role === "student" ? "eleve@exemple.com" : "parent@exemple.com"
                }
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور · Mot de passe</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary-600 hover:underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full h-11 text-base" asChild>
              <Link
                href={role === "student" ? "/chat" : "/dashboard"}
              >
                Se connecter · دخول
              </Link>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">أو</span>
              </div>
            </div>

            {/* Google SSO placeholder */}
            <Button variant="outline" className="w-full h-11" disabled>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Connexion avec Google (bientôt)
            </Button>

            <p className="text-center text-sm text-gray-500">
              Pas encore de compte?{" "}
              <Link
                href="/auth/register"
                className="text-primary-600 font-medium hover:underline"
              >
                S'inscrire · إنشاء حساب
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
