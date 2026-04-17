"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator, Atom, FlaskConical, BookMarked,
  BookOpen, Landmark, Globe, ChevronDown,
  ArrowRight, GraduationCap, Sparkles, MessageCircle,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Lang = "fr" | "ar";
type Chapter = { title: string; titleAr?: string };
type Subject = {
  id: string;
  label: string;
  labelAr: string;
  icon: React.ElementType;
  gradient: string;
  chapters: Chapter[];
};
type Level = { id: string; label: string; labelAr: string };

// ── Curriculum data ───────────────────────────────────────────────────────────

const LEVELS: Level[] = [
  { id: "1ere", label: "1ère année", labelAr: "السنة الأولى" },
  { id: "2eme", label: "2ème année", labelAr: "السنة الثانية" },
  { id: "3eme", label: "3ème année", labelAr: "السنة الثالثة" },
];

const CURRICULUM: Record<string, Subject[]> = {
  "1ere": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      icon: Calculator,
      gradient: "from-blue-500 to-cyan-500",
      chapters: [
        { title: "Nombres entiers naturels et opérations", titleAr: "الأعداد الطبيعية والعمليات" },
        { title: "Fractions et nombres décimaux", titleAr: "الكسور والأعداد العشرية" },
        { title: "Proportionnalité et pourcentages", titleAr: "التناسب والنسب المئوية" },
        { title: "Angles et droites parallèles", titleAr: "الزوايا والمستقيمات المتوازية" },
        { title: "Triangles et constructions géométriques", titleAr: "المثلثات والإنشاءات الهندسية" },
        { title: "Périmètres et aires", titleAr: "المحيطات والمساحات" },
        { title: "Statistiques — tableaux et graphiques", titleAr: "الإحصاء — جداول ورسوم بيانية" },
        { title: "Problèmes de la vie courante", titleAr: "مسائل الحياة اليومية" },
      ],
    },
    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      icon: Atom,
      gradient: "from-violet-500 to-purple-500",
      chapters: [
        { title: "États de la matière — solide, liquide, gaz", titleAr: "حالات المادة" },
        { title: "Mélanges et corps purs", titleAr: "الخلائط والأجسام النقية" },
        { title: "Dissolution — solutions aqueuses", titleAr: "الإذابة والمحاليل المائية" },
        { title: "Mesure de la masse et du volume", titleAr: "قياس الكتلة والحجم" },
        { title: "Le courant électrique continu", titleAr: "التيار الكهربائي المستمر" },
        { title: "Circuits électriques en série et en dérivation", titleAr: "دوائر كهربائية — توالي وتفرع" },
        { title: "La lumière et les ombres", titleAr: "الضوء والأظلال" },
      ],
    },
    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      icon: FlaskConical,
      gradient: "from-emerald-500 to-teal-500",
      chapters: [
        { title: "La cellule — unité du vivant", titleAr: "الخلية — وحدة الكائن الحي" },
        { title: "Nutrition chez les animaux", titleAr: "التغذية عند الحيوانات" },
        { title: "Nutrition chez les plantes — photosynthèse", titleAr: "التغذية عند النباتات — التركيب الضوئي" },
        { title: "Reproduction chez les plantes à fleurs", titleAr: "التكاثر عند النباتات الزهرية" },
        { title: "Reproduction chez les animaux", titleAr: "التكاثر عند الحيوانات" },
        { title: "Les roches et minéraux", titleAr: "الصخور والمعادن" },
        { title: "Les écosystèmes — milieu et êtres vivants", titleAr: "النظم البيئية" },
      ],
    },
    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      icon: BookMarked,
      gradient: "from-amber-500 to-orange-500",
      chapters: [
        { title: "Grammaire — La phrase et ses types" },
        { title: "Conjugaison — présent, passé composé, imparfait" },
        { title: "Orthographe — accord du nom et de l'adjectif" },
        { title: "Vocabulaire — familles de mots, synonymes, antonymes" },
        { title: "Le texte narratif — raconter un événement" },
        { title: "Le texte descriptif — décrire un lieu ou un personnage" },
        { title: "Lecture et compréhension de texte" },
        { title: "Production écrite — rédiger un paragraphe" },
      ],
    },
    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      icon: BookOpen,
      gradient: "from-rose-500 to-pink-500",
      chapters: [
        { title: "النص القرائي والفهم والاستيعاب" },
        { title: "دراسة النص — الشعر والنثر" },
        { title: "النحو والصرف — الجملة الاسمية والفعلية" },
        { title: "التعبير الكتابي — الوصف والسرد" },
        { title: "الإملاء والخط العربي" },
        { title: "المعجم والمفردات" },
        { title: "الأدب المغربي والعربي" },
      ],
    },
    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      icon: Landmark,
      gradient: "from-teal-500 to-emerald-600",
      chapters: [
        { title: "أركان الإسلام وأركان الإيمان" },
        { title: "الطهارة والصلاة" },
        { title: "الزكاة والصيام والحج — مدخل" },
        { title: "تلاوة وحفظ القرآن الكريم" },
        { title: "السيرة النبوية — مرحلة المكية" },
        { title: "الأخلاق الإسلامية في الحياة اليومية" },
        { title: "القيم الإسلامية والمواطنة" },
      ],
    },
    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      icon: Globe,
      gradient: "from-indigo-500 to-blue-600",
      chapters: [
        { title: "La Préhistoire — des origines à l'écriture", titleAr: "عصر ما قبل التاريخ" },
        { title: "Les premières civilisations — Mésopotamie, Égypte", titleAr: "أولى الحضارات" },
        { title: "La Grèce antique et Rome", titleAr: "الحضارة الإغريقية والرومانية" },
        { title: "Le Maroc à travers les âges", titleAr: "المغرب عبر العصور" },
        { title: "Géographie — Le Maroc : relief et régions", titleAr: "جغرافيا المغرب" },
        { title: "Géographie — La population marocaine", titleAr: "السكان في المغرب" },
        { title: "L'Afrique — présentation générale", titleAr: "القارة الإفريقية" },
      ],
    },
  ],

  "2eme": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      icon: Calculator,
      gradient: "from-blue-500 to-cyan-500",
      chapters: [
        { title: "Nombres relatifs — addition et soustraction", titleAr: "الأعداد النسبية" },
        { title: "Nombres relatifs — multiplication et division", titleAr: "ضرب وقسمة الأعداد النسبية" },
        { title: "Puissances entières", titleAr: "القوى الصحيحة" },
        { title: "Calcul littéral et expressions algébriques", titleAr: "الحساب الحرفي" },
        { title: "Équations du premier degré à une inconnue", titleAr: "المعادلات من الدرجة الأولى" },
        { title: "Théorème de Pythagore", titleAr: "مبرهنة فيثاغورس" },
        { title: "Symétrie et transformations", titleAr: "التماثل والتحويلات" },
        { title: "Probabilités — introduction", titleAr: "الاحتمالات — مدخل" },
      ],
    },
    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      icon: Atom,
      gradient: "from-violet-500 to-purple-500",
      chapters: [
        { title: "Mouvements — vitesse et trajectoire", titleAr: "الحركة — السرعة والمسار" },
        { title: "Les forces — types et effets", titleAr: "القوى — أنواعها وتأثيراتها" },
        { title: "Pression dans les fluides", titleAr: "الضغط في الموائع" },
        { title: "Réactions chimiques — transformation de la matière", titleAr: "التفاعلات الكيميائية" },
        { title: "Équation de réaction chimique", titleAr: "معادلة التفاعل الكيميائي" },
        { title: "Énergie électrique — puissance et énergie", titleAr: "الطاقة الكهربائية" },
        { title: "La lumière — réflexion et réfraction", titleAr: "الضوء — الانعكاس والانكسار" },
      ],
    },
    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      icon: FlaskConical,
      gradient: "from-emerald-500 to-teal-500",
      chapters: [
        { title: "La digestion et l'absorption intestinale", titleAr: "الهضم والامتصاص المعوي" },
        { title: "La respiration — échanges gazeux", titleAr: "التنفس وتبادل الغازات" },
        { title: "La circulation sanguine", titleAr: "الدورة الدموية" },
        { title: "Le système nerveux — structure et fonctions", titleAr: "الجهاز العصبي" },
        { title: "Les organes des sens", titleAr: "أعضاء الحس" },
        { title: "La reproduction chez l'être humain", titleAr: "التكاثر عند الإنسان" },
        { title: "Structure interne de la Terre", titleAr: "البنية الداخلية للأرض" },
      ],
    },
    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      icon: BookMarked,
      gradient: "from-amber-500 to-orange-500",
      chapters: [
        { title: "Grammaire — les propositions subordonnées" },
        { title: "Conjugaison — futur simple, conditionnel" },
        { title: "Orthographe — accord du participe passé" },
        { title: "Le texte d'aventure et le récit historique" },
        { title: "La poésie — figures de style et versification" },
        { title: "Le texte argumentatif — thèse et arguments" },
        { title: "La lettre formelle et informelle" },
        { title: "Production écrite — développer un point de vue" },
      ],
    },
    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      icon: BookOpen,
      gradient: "from-rose-500 to-pink-500",
      chapters: [
        { title: "النصوص الأدبية — الشعر الكلاسيكي والحديث" },
        { title: "النحو — المبتدأ والخبر وأحكامهما" },
        { title: "الصرف — الأفعال وتصريفها" },
        { title: "التعبير الكتابي — المقالة والخطاب" },
        { title: "البلاغة — التشبيه والاستعارة" },
        { title: "أعلام الأدب العربي والمغربي" },
        { title: "الإملاء المتقدم والتحرير" },
      ],
    },
    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      icon: Landmark,
      gradient: "from-teal-500 to-emerald-600",
      chapters: [
        { title: "الحديث النبوي الشريف وعلومه" },
        { title: "الفقه الإسلامي — العبادات" },
        { title: "السيرة النبوية — المرحلة المدنية" },
        { title: "الأخلاق — الصدق والأمانة والتسامح" },
        { title: "التربية على المواطنة والقيم" },
        { title: "العقيدة الإسلامية — الأسماء والصفات" },
        { title: "القرآن الكريم — تلاوة وتفسير" },
      ],
    },
    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      icon: Globe,
      gradient: "from-indigo-500 to-blue-600",
      chapters: [
        { title: "L'Islam — naissance et expansion", titleAr: "الإسلام — الظهور والانتشار" },
        { title: "La civilisation islamique — sciences et arts", titleAr: "الحضارة الإسلامية" },
        { title: "Le Moyen Âge en Europe", titleAr: "العصور الوسطى في أوروبا" },
        { title: "La Renaissance et les grandes découvertes", titleAr: "عصر النهضة والاكتشافات" },
        { title: "Le Maroc au Moyen Âge — dynasties et royaumes", titleAr: "المغرب في العصور الوسطى" },
        { title: "Géographie — Ressources naturelles du Maroc", titleAr: "الموارد الطبيعية للمغرب" },
        { title: "Géographie — Le monde arabe et islamique", titleAr: "العالم العربي والإسلامي" },
      ],
    },
  ],

  "3eme": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      icon: Calculator,
      gradient: "from-blue-500 to-cyan-500",
      chapters: [
        { title: "Nombres réels et nombres irrationnels", titleAr: "الأعداد الحقيقية والصماء" },
        { title: "Calcul algébrique — factorisation et développement", titleAr: "الحساب الجبري" },
        { title: "Systèmes d'équations du premier degré", titleAr: "أنظمة المعادلات" },
        { title: "Fonctions — notion et représentation graphique", titleAr: "الدوال — المفهوم والتمثيل" },
        { title: "Trigonométrie dans le triangle rectangle", titleAr: "حساب المثلثات" },
        { title: "Statistiques — moyenne, médiane, mode", titleAr: "الإحصاء — المتوسط والوسيط والمنوال" },
        { title: "Géométrie dans l'espace — volumes", titleAr: "الهندسة في الفضاء — الحجوم" },
        { title: "Révisions et préparation aux examens", titleAr: "المراجعة والتحضير للامتحانات" },
      ],
    },
    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      icon: Atom,
      gradient: "from-violet-500 to-purple-500",
      chapters: [
        { title: "Électricité — loi d'Ohm et résistance", titleAr: "الكهرباء — قانون أوم والمقاومة" },
        { title: "Électricité — puissance et énergie électrique", titleAr: "الطاقة الكهربائية" },
        { title: "Mécanique — principe d'inertie, 2ème loi de Newton", titleAr: "الميكانيكا — قوانين نيوتن" },
        { title: "Optique — lentilles convergentes et divergentes", titleAr: "البصريات — العدسات" },
        { title: "Transformations chimiques — oxydation", titleAr: "التحولات الكيميائية" },
        { title: "Acides et bases — pH", titleAr: "الأحماض والقواعد — الرقم الهيدروجيني" },
        { title: "Énergie — formes et conversions", titleAr: "الطاقة — أشكالها وتحولاتها" },
      ],
    },
    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      icon: FlaskConical,
      gradient: "from-emerald-500 to-teal-500",
      chapters: [
        { title: "Génétique — ADN, chromosomes et hérédité", titleAr: "علم الوراثة — الحمض النووي" },
        { title: "Lois de Mendel — hérédité mono et dihybride", titleAr: "قوانين مندل" },
        { title: "Évolution des espèces — Darwin", titleAr: "تطور الأنواع" },
        { title: "L'immunité — défenses de l'organisme", titleAr: "المناعة — دفاعات الجسم" },
        { title: "Les hormones et la régulation", titleAr: "الهرمونات والتنظيم" },
        { title: "Les risques géologiques — séismes et volcans", titleAr: "المخاطر الجيولوجية" },
        { title: "Écologie et développement durable", titleAr: "علم البيئة والتنمية المستدامة" },
      ],
    },
    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      icon: BookMarked,
      gradient: "from-amber-500 to-orange-500",
      chapters: [
        { title: "Grammaire avancée — subordination et coordination" },
        { title: "Conjugaison — subjonctif présent et passé" },
        { title: "Le texte argumentatif — plan et rédaction" },
        { title: "La critique et le compte rendu" },
        { title: "Le roman — analyse narrative" },
        { title: "Le théâtre — genres et mise en scène" },
        { title: "Préparation au BREVET — méthodologie" },
        { title: "Production écrite — dissertation et commentaire" },
      ],
    },
    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      icon: BookOpen,
      gradient: "from-rose-500 to-pink-500",
      chapters: [
        { title: "الأدب العربي الحديث — القصة والرواية" },
        { title: "النحو المتقدم — الجمل وأنواعها" },
        { title: "الصرف — المشتقات والمزيد" },
        { title: "التعبير الكتابي — المقالة الأدبية" },
        { title: "البلاغة — علم البديع والمعاني" },
        { title: "النقد الأدبي — تحليل النصوص" },
        { title: "التحضير لامتحان الشهادة الإعدادية" },
      ],
    },
    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      icon: Landmark,
      gradient: "from-teal-500 to-emerald-600",
      chapters: [
        { title: "الفقه المقارن والاجتهاد" },
        { title: "القضايا الأخلاقية المعاصرة" },
        { title: "الإسلام والحضارة الإنسانية" },
        { title: "التسامح والحوار بين الأديان" },
        { title: "الاقتصاد الإسلامي — مبادئ أساسية" },
        { title: "الأسرة في الإسلام" },
        { title: "القرآن الكريم — تلاوة وتدبر" },
      ],
    },
    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      icon: Globe,
      gradient: "from-indigo-500 to-blue-600",
      chapters: [
        { title: "Le Maroc sous le Protectorat français et espagnol", titleAr: "المغرب في عهد الحماية" },
        { title: "Mouvement nationaliste et indépendance du Maroc", titleAr: "الحركة الوطنية والاستقلال" },
        { title: "La Première Guerre Mondiale", titleAr: "الحرب العالمية الأولى" },
        { title: "La Seconde Guerre Mondiale", titleAr: "الحرب العالمية الثانية" },
        { title: "Le monde après 1945 — Guerre Froide", titleAr: "العالم بعد 1945" },
        { title: "Géographie — Mondialisation et échanges", titleAr: "العولمة والتبادلات" },
        { title: "Géographie — Le Maroc dans le monde", titleAr: "المغرب في العالم" },
        { title: "Révisions — Brevet du collège", titleAr: "مراجعة الشهادة الإعدادية" },
      ],
    },
  ],
};

// ── Subject Accordion ─────────────────────────────────────────────────────────

function SubjectAccordion({
  subject,
  level,
  lang,
}: {
  subject: Subject;
  level: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const Icon = subject.icon;
  const isAr = lang === "ar";
  const name = isAr ? subject.labelAr : subject.label;

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
        open
          ? "shadow-lg shadow-gray-200/80 border-gray-200"
          : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
          <p className="font-bold text-slate-800 text-lg leading-snug">{name}</p>
          <p className="text-gray-400 text-sm mt-0.5">
            {isAr
              ? `${subject.chapters.length} فصل`
              : `${subject.chapters.length} chapitres`}
          </p>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            open ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400"
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Animated chapters */}
      <div
        style={{
          maxHeight: open ? `${subject.chapters.length * 90}px` : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div className="border-t border-gray-100">
          {subject.chapters.map((ch, i) => {
            const chTitle = isAr && ch.titleAr ? ch.titleAr : ch.title;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-3.5 transition-all duration-200 group/ch
                  hover:bg-blue-50/60
                  ${isAr ? "flex-row-reverse border-r-4 border-transparent hover:border-r-blue-400" : "border-l-4 border-transparent hover:border-l-blue-400"}
                `}
              >
                {/* Chapter number */}
                <span className="text-blue-400/60 font-bold text-xs tabular-nums shrink-0 w-6 text-center">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <p
                  className={`flex-1 text-slate-700 text-sm font-medium leading-snug group-hover/ch:text-slate-900 transition-colors ${
                    isAr ? "text-right" : ""
                  }`}
                  dir={isAr ? "rtl" : "ltr"}
                >
                  {chTitle}
                </p>

                {/* CTA */}
                <Link
                  href={`/chat?subject=${encodeURIComponent(subject.label)}&chapter=${encodeURIComponent(ch.title)}&level=${level}`}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-blue-600 border border-gray-200 hover:border-blue-600 text-gray-600 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0 shadow-sm"
                >
                  {isAr ? "اسأل نور" : "Poser une question"}
                  <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProgrammePage() {
  const [activeLevel, setActiveLevel] = useState<string>("1ere");
  const [lang, setLang] = useState<Lang>("fr");
  const subjects = CURRICULUM[activeLevel] ?? [];
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2.5 min-w-0 ${isAr ? "flex-row-reverse" : ""}`}>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-sm hidden sm:block">Modarisi</span>
            </Link>
            <span className="text-gray-300 text-sm">/</span>
            <span className="text-gray-500 text-sm truncate">
              {isAr ? "برنامج الإعداديات" : "Programme collège"}
            </span>
          </div>

          {/* Language toggle */}
          <button
            onClick={() => setLang(isAr ? "fr" : "ar")}
            aria-label="Changer la langue"
            className="flex items-center gap-0 bg-gray-100 border border-gray-200 rounded-full overflow-hidden shrink-0 text-xs font-bold transition-all hover:border-blue-300"
          >
            <span
              className={`px-3 py-1.5 transition-colors ${
                !isAr ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              FR
            </span>
            <span
              className={`px-3 py-1.5 transition-colors ${
                isAr ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              AR
            </span>
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800">
        {/* Overlay photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80')",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/50 to-transparent" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.5) 39px,rgba(255,255,255,0.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.5) 39px,rgba(255,255,255,0.5) 40px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <div className="grid lg:grid-cols-5 gap-10 items-center">

            {/* Left: text */}
            <div className={`lg:col-span-3 ${isAr ? "text-right" : ""}`}>
              <div
                className={`inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-xs font-semibold mb-5`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAr ? "البرنامج الرسمي المغربي" : "Programme officiel marocain 🇲🇦"}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
                dir={isAr ? "rtl" : "ltr"}
              >
                {isAr ? (
                  <>
                    برنامج{" "}
                    <span className="text-emerald-300">إعداديات المغرب</span>
                  </>
                ) : (
                  <>
                    Programme du{" "}
                    <span className="text-emerald-300">Collège Marocain</span>
                  </>
                )}
              </h1>

              <p
                className="text-blue-100 text-base mb-7 max-w-md leading-relaxed"
                dir={isAr ? "rtl" : "ltr"}
              >
                {isAr
                  ? "جميع فصول السنة الأولى إلى الثالثة إعدادي. انقر على أي فصل واسأل نور مباشرة بالدارجة أو الفرنسية."
                  : "Tous les chapitres de la 1ère à la 3ème année. Clique sur un chapitre et pose ta question directement à Nour — en Darija ou en français."}
              </p>

              {/* Stats */}
              <div className={`flex gap-8 ${isAr ? "flex-row-reverse" : ""}`}>
                {[
                  { num: "3", label: isAr ? "مستويات" : "Niveaux" },
                  { num: "7", label: isAr ? "مواد" : "Matières" },
                  { num: "50+", label: isAr ? "فصلاً" : "Chapitres" },
                ].map((s) => (
                  <div key={s.label} className={isAr ? "text-right" : ""}>
                    <p className="text-3xl font-extrabold text-white leading-none">{s.num}</p>
                    <p className="text-blue-200/80 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: student photo */}
            <div className="lg:col-span-2 hidden lg:flex justify-end">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-emerald-400/30 to-blue-300/20 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=560&q=80"
                  alt="Élèves marocains en classe"
                  className="relative w-72 h-52 object-cover rounded-3xl shadow-2xl border-2 border-white/20"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-3 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
                  <span className="text-lg">🎓</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">Nour IA</p>
                    <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {isAr ? "متاح 24/7" : "Disponible 24h/7j"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Level tabs */}
        <div className={`flex ${isAr ? "flex-row-reverse" : ""} border-b border-gray-200 mb-8`}>
          {LEVELS.map((level) => {
            const isActive = activeLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`relative px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-slate-700 hover:bg-gray-50"
                }`}
              >
                <span className="block">{isAr ? level.labelAr : level.label}</span>
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                  style={{ transformOrigin: "center" }}
                />
              </button>
            );
          })}
        </div>

        {/* Subjects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          {subjects.map((subject) => (
            <SubjectAccordion
              key={subject.id}
              subject={subject}
              level={activeLevel}
              lang={lang}
            />
          ))}
        </div>

        {/* ── Student photos row ── */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {[
            {
              src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
              alt: "Étudiant qui révise",
            },
            {
              src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
              alt: "Étudiants en groupe",
            },
            {
              src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
              alt: "Élève concentrée",
            },
          ].map((photo) => (
            <div key={photo.src} className="relative rounded-2xl overflow-hidden aspect-video group">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700" />
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80')",
            }}
          />

          <div className="relative px-8 py-10 text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
              dir={isAr ? "rtl" : "ltr"}
            >
              {isAr ? "نور مستعد لمساعدتك" : "Nour est prêt à t'aider"}
            </h2>
            <p
              className="text-blue-100 text-sm mb-7 max-w-sm mx-auto"
              dir={isAr ? "rtl" : "ltr"}
            >
              {isAr
                ? "سؤال عن أي فصل؟ اسأل بالدارجة أو الفرنسية — إجابة فورية."
                : "Une question sur un chapitre ? Pose-la en Darija ou en français — réponse instantanée."}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 justify-center ${isAr ? "sm:flex-row-reverse" : ""}`}>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-7 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {isAr ? "فتح المحادثة مع نور" : "Ouvrir le chat avec Nour"}
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all text-sm"
              >
                {isAr ? "إنشاء حساب مجاني" : "Créer un compte gratuit"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
