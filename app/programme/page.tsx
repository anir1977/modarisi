"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator, Atom, FlaskConical, BookMarked,
  BookOpen, Landmark, Globe, ChevronDown,
  ArrowRight, GraduationCap, Sparkles,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Accordion item ─────────────────────────────────────────────────────────────

function SubjectAccordion({ subject, level }: { subject: Subject; level: string }) {
  const [open, setOpen] = useState(false);
  const Icon = subject.icon;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center shrink-0 shadow-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-xl">{subject.label}</p>
          <p className="text-gray-400 text-sm mt-0.5">{subject.labelAr} · {subject.chapters.length} chapitres</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Chapters */}
      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {subject.chapters.map((ch, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-slate-700 text-base font-medium">{ch.title}</p>
                {ch.titleAr && (
                  <p className="text-gray-400 text-sm mt-0.5 text-right" dir="rtl">{ch.titleAr}</p>
                )}
              </div>
              <Link
                href={`/chat?subject=${encodeURIComponent(subject.label)}&chapter=${encodeURIComponent(ch.title)}&level=${level}`}
                className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-sm font-medium px-3.5 py-2 rounded-xl transition-all shrink-0"
              >
                Poser une question
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProgrammePage() {
  const [activeLevel, setActiveLevel] = useState<string>("1ere");
  const subjects = CURRICULUM[activeLevel] ?? [];

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-sm">Modarisi</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 text-sm">Programme collège</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-blue-600 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Programme officiel marocain
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
            Programme du{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Collège Marocain
            </span>
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Tous les chapitres de la 1ère à la 3ème année. Clique sur un chapitre et pose
            ta question directement à Nour.
          </p>
        </div>

        {/* Level tabs */}
        <div className="flex gap-2 mb-8 p-1.5 bg-gray-100 border border-gray-200 rounded-2xl w-fit mx-auto">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeLevel === level.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:text-slate-800 hover:bg-white"
              }`}
            >
              <span className="block">{level.label}</span>
              <span className="block text-xs opacity-60 font-normal">{level.labelAr}</span>
            </button>
          ))}
        </div>

        {/* Subjects accordion */}
        <div className="space-y-3">
          {subjects.map((subject) => (
            <SubjectAccordion key={subject.id} subject={subject} level={activeLevel} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center bg-blue-50 border border-blue-100 rounded-3xl p-8">
          <div className="text-3xl mb-3">🎓</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Nour est prêt à t'aider
          </h2>
          <p className="text-slate-500 text-sm mb-5 max-w-sm mx-auto">
            Une question sur un chapitre ? Pose-la en Darija ou en français — réponse instantanée.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-7 py-3 rounded-2xl shadow-lg shadow-blue-200 transition-all text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Ouvrir le chat avec Nour
          </Link>
        </div>
      </main>
    </div>
  );
}
