"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, GraduationCap, MessageSquare, BookOpen, Pencil } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Chat مع نور", titleFr: "Chat avec Nour", desc: "5 أسئلة يومياً مجاناً — تتجدد كل يوم", descFr: "5 questions par jour gratuitement, renouvelées chaque jour" },
  { icon: BookOpen, title: "الدروس", titleFr: "Les cours", desc: "جميع الدروس مجانية بدون حد", descFr: "Tous les cours gratuits, sans limite" },
  { icon: Pencil, title: "تصحيح التمارين", titleFr: "Correction d'exercices", desc: "3 تصحيحات يومياً مجاناً", descFr: "3 corrections par jour gratuitement" },
  { icon: GraduationCap, title: "جميع المواد", titleFr: "Toutes les matières", desc: "رياضيات، فيزياء، علوم، فرنسية، عربية، تاريخ", descFr: "Maths, Physique, SVT, Français, Arabe, Histoire" },
];

const faqs = [
  {
    q: "لماذا الموقع مجاني؟",
    qFr: "Pourquoi le site est-il gratuit ?",
    a: "موداريسي ممول بالإعلانات. هدفنا هو جعل التعليم المساعد بالذكاء الاصطناعي متاحاً لجميع التلاميذ المغاربة بدون استثناء.",
    aFr: "Modarisi est financé par la publicité. Notre objectif est de rendre l'aide aux devoirs par IA accessible à tous les élèves marocains.",
  },
  {
    q: "هل ستبقى مجانياً للأبد؟",
    qFr: "Restera-t-il gratuit pour toujours ?",
    a: "نعم. نسعى إلى الإبقاء على الخدمة الأساسية مجانية دائماً لجميع التلاميذ.",
    aFr: "Oui. Nous nous engageons à maintenir le service de base gratuit pour tous les élèves.",
  },
  {
    q: "لماذا يوجد حد يومي؟",
    qFr: "Pourquoi y a-t-il une limite journalière ?",
    a: "الحد اليومي (5 أسئلة للشات، 3 للتصحيح) يتيح لنا الإبقاء على الخدمة مجانية وسريعة للجميع.",
    aFr: "La limite journalière (5 questions pour le chat, 3 pour la correction) nous permet de maintenir le service gratuit et rapide pour tous.",
  },
  {
    q: "ما هي الإعلانات التي ستظهر؟",
    qFr: "Quel type de publicités apparaîtra ?",
    a: "إعلانات Google AdSense فقط — مناسبة للأعمار، غير تدخلية، ولا تؤثر على تجربة التعلم.",
    aFr: "Uniquement des publicités Google AdSense — adaptées à l'âge, non intrusives et sans impact sur l'expérience d'apprentissage.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-b from-emerald-50 to-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 mb-4 text-base px-4 py-1">
              🎉 100% مجاني · 100% Gratuit
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              موداريسي مجاني للجميع
            </h1>
            <p className="text-2xl text-gray-600 mb-3">
              Modarisi est gratuit pour tous les élèves
            </p>
            <p className="text-gray-500 text-lg">
              بدون اشتراك · بدون بطاقة بنكية · بدون إخفاء
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Sans abonnement · Sans carte bancaire · Pas de frais cachés
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 items-start hover:border-emerald-200 transition-colors">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <p className="font-bold text-gray-900">{f.title} · <span className="font-normal text-gray-500 text-sm">{f.titleFr}</span></p>
                    </div>
                    <p className="text-sm text-gray-700">{f.desc}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{f.descFr}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              ابدأ مجاناً الآن · Commencer gratuitement
            </Link>
            <p className="text-sm text-gray-400 mt-3">بدون بطاقة بنكية · Sans carte bancaire</p>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">كيف يعمل النموذج المجاني؟</h2>
            <p className="text-gray-500">Comment fonctionne le modèle gratuit ?</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
            <p className="text-emerald-800 text-base leading-relaxed">
              موداريسي ممول بالإعلانات المحترمة (Google AdSense). هذا يتيح لنا تقديم خدمة عالية الجودة لجميع التلاميذ المغاربة بدون تحصيل أي رسوم.
            </p>
            <p className="text-emerald-600 text-sm mt-3">
              Modarisi est financé par des publicités respectueuses (Google AdSense), ce qui nous permet d&apos;offrir un service de qualité à tous les élèves marocains sans frais.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">الأسئلة الشائعة</h2>
            <p className="text-xl text-gray-500">Foire aux questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-200 transition-colors"
              >
                <p className="font-bold text-gray-900 mb-0.5">{faq.q}</p>
                <p className="text-xs text-gray-400 mb-3">{faq.qFr}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{faq.aFr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
