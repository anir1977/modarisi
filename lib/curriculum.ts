// ── Types ─────────────────────────────────────────────────────────────────────

export type Lesson = {
  id: string;
  title: string;
  titleAr?: string;
  duration: string;
  isFree: boolean;
};

export type Chapter = {
  id: string;
  title: string;
  titleAr?: string;
  lessons: Lesson[];
};

export type Subject = {
  id: string;
  label: string;
  labelAr: string;
  gradient: string;
  colorKey: string;
  chapters: Chapter[];
};

export type Level = {
  id: string;
  label: string;
  labelAr: string;
};

// ── Levels ────────────────────────────────────────────────────────────────────

export const LEVELS: Level[] = [
  { id: "1ere", label: "1ère année", labelAr: "السنة الأولى" },
  { id: "2eme", label: "2ème année", labelAr: "السنة الثانية" },
  { id: "3eme", label: "3ème année", labelAr: "السنة الثالثة" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function ls(lessons: Omit<Lesson, "id">[]): Lesson[] {
  return lessons.map((l, i) => ({ ...l, id: String(i + 1) }));
}

function chs(chapters: Omit<Chapter, "id">[]): Chapter[] {
  return chapters.map((c, i) => ({ ...c, id: String(i + 1) }));
}

// ── Curriculum ────────────────────────────────────────────────────────────────

export const CURRICULUM: Record<string, Subject[]> = {

  // ══════════════════════════════════════════════════════════════════════════════
  // 1ÈRE ANNÉE
  // ══════════════════════════════════════════════════════════════════════════════
  "1ere": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      gradient: "from-blue-500 to-cyan-500",
      colorKey: "blue",
      chapters: chs([
        {
          title: "Nombres entiers naturels et opérations",
          titleAr: "الأعداد الطبيعية والعمليات",
          lessons: ls([
            { title: "Lire et écrire les grands nombres", duration: "12 min", isFree: true },
            { title: "Addition et soustraction des entiers naturels", duration: "15 min", isFree: false },
            { title: "Multiplication et division euclidienne", duration: "15 min", isFree: false },
            { title: "Priorité des opérations — exercices", duration: "10 min", isFree: false },
          ]),
        },
        {
          title: "Fractions et nombres décimaux",
          titleAr: "الكسور والأعداد العشرية",
          lessons: ls([
            { title: "Notion de fraction — numérateur et dénominateur", duration: "12 min", isFree: true },
            { title: "Fractions équivalentes et simplification", duration: "14 min", isFree: false },
            { title: "Addition et soustraction de fractions", duration: "15 min", isFree: false },
            { title: "Nombres décimaux et opérations", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Proportionnalité et pourcentages",
          titleAr: "التناسب والنسب المئوية",
          lessons: ls([
            { title: "Tableaux de proportionnalité", duration: "14 min", isFree: true },
            { title: "Règle de trois — résolution de problèmes", duration: "15 min", isFree: false },
            { title: "Calcul de pourcentages", duration: "12 min", isFree: false },
            { title: "Applications : remises, prix, taux", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Angles et droites parallèles",
          titleAr: "الزوايا والمستقيمات المتوازية",
          lessons: ls([
            { title: "Mesurer et construire un angle", duration: "12 min", isFree: true },
            { title: "Angles complémentaires et supplémentaires", duration: "12 min", isFree: false },
            { title: "Droites parallèles — propriétés", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Triangles et constructions géométriques",
          titleAr: "المثلثات والإنشاءات الهندسية",
          lessons: ls([
            { title: "Types de triangles — classification", duration: "12 min", isFree: true },
            { title: "Inégalité triangulaire", duration: "10 min", isFree: false },
            { title: "Construction d'un triangle au compas", duration: "15 min", isFree: false },
            { title: "Médiatrice et bissectrice", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Périmètres et aires",
          titleAr: "المحيطات والمساحات",
          lessons: ls([
            { title: "Périmètre des polygones", duration: "10 min", isFree: true },
            { title: "Aire du rectangle, carré et triangle", duration: "15 min", isFree: false },
            { title: "Aire du disque et périmètre du cercle", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Statistiques — tableaux et graphiques",
          titleAr: "الإحصاء — جداول ورسوم بيانية",
          lessons: ls([
            { title: "Lire et compléter un tableau de données", duration: "10 min", isFree: true },
            { title: "Diagrammes en barres et circulaires", duration: "14 min", isFree: false },
            { title: "Calculer la moyenne d'une série", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Problèmes de la vie courante",
          titleAr: "مسائل الحياة اليومية",
          lessons: ls([
            { title: "Problèmes de prix et de monnaie", duration: "12 min", isFree: true },
            { title: "Problèmes de distances et de vitesses", duration: "15 min", isFree: false },
            { title: "Révisions — problèmes mixtes", duration: "20 min", isFree: false },
          ]),
        },
      ]),
    },

    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      gradient: "from-violet-500 to-purple-500",
      colorKey: "violet",
      chapters: chs([
        {
          title: "États de la matière — solide, liquide, gaz",
          titleAr: "حالات المادة",
          lessons: ls([
            { title: "Les trois états de la matière", duration: "12 min", isFree: true },
            { title: "Changements d'état — fusion, vaporisation", duration: "15 min", isFree: false },
            { title: "Température de changement d'état", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Mélanges et corps purs",
          titleAr: "الخلائط والأجسام النقية",
          lessons: ls([
            { title: "Corps purs et mélanges — définitions", duration: "10 min", isFree: true },
            { title: "Mélanges homogènes et hétérogènes", duration: "12 min", isFree: false },
            { title: "Techniques de séparation des mélanges", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Dissolution — solutions aqueuses",
          titleAr: "الإذابة والمحاليل المائية",
          lessons: ls([
            { title: "Solvant, soluté et solution", duration: "10 min", isFree: true },
            { title: "Solubilité et saturation", duration: "12 min", isFree: false },
            { title: "Concentration d'une solution", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Mesure de la masse et du volume",
          titleAr: "قياس الكتلة والحجم",
          lessons: ls([
            { title: "La masse — unités et instruments", duration: "10 min", isFree: true },
            { title: "Le volume — unités et instruments", duration: "12 min", isFree: false },
            { title: "Masse volumique et densité", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Le courant électrique continu",
          titleAr: "التيار الكهربائي المستمر",
          lessons: ls([
            { title: "Sources et effets du courant électrique", duration: "12 min", isFree: true },
            { title: "Intensité du courant — l'ampèremètre", duration: "14 min", isFree: false },
            { title: "Tension électrique — le voltmètre", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Circuits électriques en série et en dérivation",
          titleAr: "دوائر كهربائية — توالي وتفرع",
          lessons: ls([
            { title: "Circuit en série — lois de l'intensité", duration: "14 min", isFree: true },
            { title: "Circuit en dérivation — lois de la tension", duration: "14 min", isFree: false },
            { title: "Résolution de circuits mixtes", duration: "18 min", isFree: false },
          ]),
        },
        {
          title: "La lumière et les ombres",
          titleAr: "الضوء والأظلال",
          lessons: ls([
            { title: "Sources lumineuses et propagation rectiligne", duration: "10 min", isFree: true },
            { title: "Ombres et pénombres", duration: "12 min", isFree: false },
            { title: "Éclipses — Soleil, Terre, Lune", duration: "14 min", isFree: false },
          ]),
        },
      ]),
    },

    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      gradient: "from-emerald-500 to-teal-500",
      colorKey: "emerald",
      chapters: chs([
        {
          title: "La cellule — unité du vivant",
          titleAr: "الخلية — وحدة الكائن الحي",
          lessons: ls([
            { title: "La cellule — structure et composants", duration: "14 min", isFree: true },
            { title: "Cellule animale vs cellule végétale", duration: "12 min", isFree: false },
            { title: "La division cellulaire — mitose", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Nutrition chez les animaux",
          titleAr: "التغذية عند الحيوانات",
          lessons: ls([
            { title: "Les types de nutrition — herbivore, carnivore", duration: "12 min", isFree: true },
            { title: "Digestion mécanique et chimique", duration: "15 min", isFree: false },
            { title: "Absorption des nutriments", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Nutrition chez les plantes — photosynthèse",
          titleAr: "التغذية عند النباتات — التركيب الضوئي",
          lessons: ls([
            { title: "La photosynthèse — équation générale", duration: "14 min", isFree: true },
            { title: "Conditions nécessaires à la photosynthèse", duration: "12 min", isFree: false },
            { title: "Importance de la photosynthèse pour la vie", duration: "10 min", isFree: false },
          ]),
        },
        {
          title: "Reproduction chez les plantes à fleurs",
          titleAr: "التكاثر عند النباتات الزهرية",
          lessons: ls([
            { title: "Structure d'une fleur — pistil et étamines", duration: "12 min", isFree: true },
            { title: "Pollinisation et fécondation", duration: "14 min", isFree: false },
            { title: "Formation des fruits et graines", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Reproduction chez les animaux",
          titleAr: "التكاثر عند الحيوانات",
          lessons: ls([
            { title: "Reproduction sexuée et asexuée", duration: "12 min", isFree: true },
            { title: "Fécondation interne et externe", duration: "14 min", isFree: false },
            { title: "Développement de l'embryon", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Les roches et minéraux",
          titleAr: "الصخور والمعادن",
          lessons: ls([
            { title: "Types de roches — sédimentaires, magmatiques", duration: "12 min", isFree: true },
            { title: "Le cycle des roches", duration: "14 min", isFree: false },
            { title: "Minéraux et leur utilisation", duration: "10 min", isFree: false },
          ]),
        },
        {
          title: "Les écosystèmes — milieu et êtres vivants",
          titleAr: "النظم البيئية",
          lessons: ls([
            { title: "Définition d'un écosystème — biocénose et biotope", duration: "12 min", isFree: true },
            { title: "Chaînes et réseaux alimentaires", duration: "15 min", isFree: false },
            { title: "Perturbations des écosystèmes", duration: "12 min", isFree: false },
          ]),
        },
      ]),
    },

    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      gradient: "from-amber-500 to-orange-500",
      colorKey: "amber",
      chapters: chs([
        {
          title: "Grammaire — La phrase et ses types",
          lessons: ls([
            { title: "La phrase déclarative et interrogative", duration: "12 min", isFree: true },
            { title: "La phrase impérative et exclamative", duration: "10 min", isFree: false },
            { title: "Sujet, verbe et compléments", duration: "15 min", isFree: false },
          ]),
        },
        {
          title: "Conjugaison — présent, passé composé, imparfait",
          lessons: ls([
            { title: "Le présent de l'indicatif — groupes 1, 2, 3", duration: "15 min", isFree: true },
            { title: "Le passé composé — auxiliaires et participes", duration: "15 min", isFree: false },
            { title: "L'imparfait — formation et emploi", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Orthographe — accord du nom et de l'adjectif",
          lessons: ls([
            { title: "Le pluriel des noms", duration: "12 min", isFree: true },
            { title: "L'accord de l'adjectif qualificatif", duration: "14 min", isFree: false },
            { title: "Cas particuliers d'orthographe", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Vocabulaire — familles de mots, synonymes, antonymes",
          lessons: ls([
            { title: "Familles de mots — préfixes et suffixes", duration: "12 min", isFree: true },
            { title: "Synonymes et antonymes", duration: "10 min", isFree: false },
            { title: "Le champ lexical", duration: "10 min", isFree: false },
          ]),
        },
        {
          title: "Le texte narratif — raconter un événement",
          lessons: ls([
            { title: "Caractéristiques du texte narratif", duration: "12 min", isFree: true },
            { title: "Le schéma narratif — 5 étapes", duration: "15 min", isFree: false },
            { title: "Les connecteurs temporels et logiques", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Le texte descriptif — décrire un lieu ou un personnage",
          lessons: ls([
            { title: "Outils de description — adjectifs et comparaisons", duration: "12 min", isFree: true },
            { title: "Décrire un lieu — plan et organisation", duration: "14 min", isFree: false },
            { title: "Décrire un personnage — portrait physique et moral", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Lecture et compréhension de texte",
          lessons: ls([
            { title: "Identifier le thème et les idées principales", duration: "12 min", isFree: true },
            { title: "Méthode pour répondre aux questions de compréhension", duration: "15 min", isFree: false },
            { title: "Inférence et implicite dans le texte", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Production écrite — rédiger un paragraphe",
          lessons: ls([
            { title: "Structure d'un paragraphe — idée principale + développement", duration: "14 min", isFree: true },
            { title: "Cohérence et cohésion textuelle", duration: "12 min", isFree: false },
            { title: "Exercice : rédiger un paragraphe complet", duration: "20 min", isFree: false },
          ]),
        },
      ]),
    },

    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      gradient: "from-rose-500 to-pink-500",
      colorKey: "rose",
      chapters: chs([
        { title: "النص القرائي والفهم والاستيعاب", lessons: ls([
          { title: "كيفية قراءة النص وفهمه", duration: "12 min", isFree: true, titleAr: "كيفية قراءة النص" },
          { title: "استخراج الأفكار الرئيسية", duration: "14 min", isFree: false },
          { title: "الإجابة عن أسئلة الفهم", duration: "12 min", isFree: false },
        ])},
        { title: "دراسة النص — الشعر والنثر", lessons: ls([
          { title: "الفرق بين الشعر والنثر", duration: "12 min", isFree: true },
          { title: "تحليل نص شعري", duration: "15 min", isFree: false },
          { title: "تحليل نص نثري", duration: "14 min", isFree: false },
        ])},
        { title: "النحو والصرف — الجملة الاسمية والفعلية", lessons: ls([
          { title: "الجملة الاسمية — المبتدأ والخبر", duration: "15 min", isFree: true },
          { title: "الجملة الفعلية — الفعل والفاعل والمفعول", duration: "15 min", isFree: false },
          { title: "تمييز الجملتين وتحويلهما", duration: "12 min", isFree: false },
        ])},
        { title: "التعبير الكتابي — الوصف والسرد", lessons: ls([
          { title: "أسلوب الوصف في الكتابة العربية", duration: "12 min", isFree: true },
          { title: "أسلوب السرد وعناصر القصة", duration: "14 min", isFree: false },
          { title: "كتابة فقرة وصفية أو سردية", duration: "18 min", isFree: false },
        ])},
        { title: "الإملاء والخط العربي", lessons: ls([
          { title: "قواعد الإملاء الأساسية", duration: "12 min", isFree: true },
          { title: "الهمزات وأنواعها", duration: "15 min", isFree: false },
          { title: "التنوين والتشكيل", duration: "12 min", isFree: false },
        ])},
        { title: "المعجم والمفردات", lessons: ls([
          { title: "استخدام المعجم العربي", duration: "10 min", isFree: true },
          { title: "المترادفات والأضداد", duration: "12 min", isFree: false },
          { title: "السياق وفهم المفردات الجديدة", duration: "12 min", isFree: false },
        ])},
        { title: "الأدب المغربي والعربي", lessons: ls([
          { title: "مدخل إلى الأدب العربي", duration: "12 min", isFree: true },
          { title: "نماذج من الأدب المغربي", duration: "14 min", isFree: false },
          { title: "أشعار وأمثال مغربية", duration: "12 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      gradient: "from-teal-500 to-emerald-600",
      colorKey: "teal",
      chapters: chs([
        { title: "أركان الإسلام وأركان الإيمان", lessons: ls([
          { title: "أركان الإسلام الخمسة", duration: "14 min", isFree: true },
          { title: "أركان الإيمان الستة", duration: "14 min", isFree: false },
          { title: "الفرق بين الإسلام والإيمان", duration: "12 min", isFree: false },
        ])},
        { title: "الطهارة والصلاة", lessons: ls([
          { title: "أنواع الطهارة ومراتبها", duration: "14 min", isFree: true },
          { title: "شروط الصلاة وأركانها", duration: "15 min", isFree: false },
          { title: "أوقات الصلاة والأذان", duration: "12 min", isFree: false },
        ])},
        { title: "الزكاة والصيام والحج — مدخل", lessons: ls([
          { title: "الزكاة — المفهوم والحكمة", duration: "12 min", isFree: true },
          { title: "فضل الصيام وآدابه", duration: "12 min", isFree: false },
          { title: "الحج — أركانه وفوائده", duration: "14 min", isFree: false },
        ])},
        { title: "تلاوة وحفظ القرآن الكريم", lessons: ls([
          { title: "آداب تلاوة القرآن الكريم", duration: "10 min", isFree: true },
          { title: "أحكام التجويد الأساسية", duration: "15 min", isFree: false },
          { title: "سور مختارة للحفظ", duration: "20 min", isFree: false },
        ])},
        { title: "السيرة النبوية — مرحلة المكية", lessons: ls([
          { title: "مولد النبي ﷺ ونشأته", duration: "12 min", isFree: true },
          { title: "بداية الوحي والدعوة السرية", duration: "14 min", isFree: false },
          { title: "الهجرة إلى الحبشة والإسراء والمعراج", duration: "15 min", isFree: false },
        ])},
        { title: "الأخلاق الإسلامية في الحياة اليومية", lessons: ls([
          { title: "الصدق والأمانة", duration: "12 min", isFree: true },
          { title: "بر الوالدين واحترام الكبار", duration: "12 min", isFree: false },
          { title: "التعاون والتسامح", duration: "12 min", isFree: false },
        ])},
        { title: "القيم الإسلامية والمواطنة", lessons: ls([
          { title: "الإسلام والمواطنة المسؤولة", duration: "12 min", isFree: true },
          { title: "العدل والمساواة في الإسلام", duration: "12 min", isFree: false },
          { title: "المسلم والمجتمع المدني", duration: "12 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      gradient: "from-indigo-500 to-blue-600",
      colorKey: "indigo",
      chapters: chs([
        {
          title: "La Préhistoire — des origines à l'écriture",
          titleAr: "عصر ما قبل التاريخ",
          lessons: ls([
            { title: "L'apparition de l'Homme — Homo sapiens", duration: "12 min", isFree: true },
            { title: "Les outils préhistoriques — Paléolithique et Néolithique", duration: "14 min", isFree: false },
            { title: "Les premières formes d'art et de sédentarisation", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Les premières civilisations — Mésopotamie, Égypte",
          titleAr: "أولى الحضارات",
          lessons: ls([
            { title: "La Mésopotamie — Tigre, Euphrate et cunéiformes", duration: "12 min", isFree: true },
            { title: "L'Égypte antique — pharaons et hiéroglyphes", duration: "14 min", isFree: false },
            { title: "Comparaison des deux civilisations", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "La Grèce antique et Rome",
          titleAr: "الحضارة الإغريقية والرومانية",
          lessons: ls([
            { title: "La démocratie athénienne et les cités grecques", duration: "14 min", isFree: true },
            { title: "La République romaine et l'Empire", duration: "14 min", isFree: false },
            { title: "L'héritage grec et romain", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "Le Maroc à travers les âges",
          titleAr: "المغرب عبر العصور",
          lessons: ls([
            { title: "Le Maroc préislamique — Berbères et Phéniciens", duration: "12 min", isFree: true },
            { title: "Les premières dynasties marocaines", duration: "14 min", isFree: false },
            { title: "L'islamisation du Maroc", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Géographie — Le Maroc : relief et régions",
          titleAr: "جغرافيا المغرب",
          lessons: ls([
            { title: "Les grandes unités du relief marocain", duration: "14 min", isFree: true },
            { title: "Les régions du Maroc — découpage administratif", duration: "12 min", isFree: false },
            { title: "Les ressources naturelles et le climat", duration: "14 min", isFree: false },
          ]),
        },
        {
          title: "Géographie — La population marocaine",
          titleAr: "السكان في المغرب",
          lessons: ls([
            { title: "La croissance démographique du Maroc", duration: "12 min", isFree: true },
            { title: "Exode rural et urbanisation", duration: "14 min", isFree: false },
            { title: "Diversité culturelle et linguistique", duration: "12 min", isFree: false },
          ]),
        },
        {
          title: "L'Afrique — présentation générale",
          titleAr: "القارة الإفريقية",
          lessons: ls([
            { title: "Relief, fleuves et climat de l'Afrique", duration: "14 min", isFree: true },
            { title: "Les grandes civilisations africaines anciennes", duration: "14 min", isFree: false },
            { title: "L'Afrique aujourd'hui — défis et atouts", duration: "12 min", isFree: false },
          ]),
        },
      ]),
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════════
  // 2ÈME ANNÉE
  // ══════════════════════════════════════════════════════════════════════════════
  "2eme": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      gradient: "from-blue-500 to-cyan-500",
      colorKey: "blue",
      chapters: chs([
        { title: "Nombres relatifs — addition et soustraction", titleAr: "الأعداد النسبية", lessons: ls([
          { title: "Définition des nombres relatifs — positifs et négatifs", duration: "12 min", isFree: true },
          { title: "Addition des nombres relatifs", duration: "15 min", isFree: false },
          { title: "Soustraction des nombres relatifs", duration: "14 min", isFree: false },
        ])},
        { title: "Nombres relatifs — multiplication et division", titleAr: "ضرب وقسمة الأعداد النسبية", lessons: ls([
          { title: "Règle des signes — multiplication", duration: "12 min", isFree: true },
          { title: "Division des nombres relatifs", duration: "12 min", isFree: false },
          { title: "Expressions numériques avec les relatifs", duration: "15 min", isFree: false },
        ])},
        { title: "Puissances entières", titleAr: "القوى الصحيحة", lessons: ls([
          { title: "Définition et notation de la puissance", duration: "12 min", isFree: true },
          { title: "Propriétés des puissances", duration: "14 min", isFree: false },
          { title: "Puissances de 10 et écriture scientifique", duration: "14 min", isFree: false },
        ])},
        { title: "Calcul littéral et expressions algébriques", titleAr: "الحساب الحرفي", lessons: ls([
          { title: "Introduction au calcul littéral", duration: "14 min", isFree: true },
          { title: "Développer et réduire une expression", duration: "15 min", isFree: false },
          { title: "Factoriser une expression algébrique", duration: "15 min", isFree: false },
        ])},
        { title: "Équations du premier degré à une inconnue", titleAr: "المعادلات من الدرجة الأولى", lessons: ls([
          { title: "Définition d'une équation et résolution simple", duration: "14 min", isFree: true },
          { title: "Équations avec parenthèses", duration: "15 min", isFree: false },
          { title: "Problèmes menant à une équation", duration: "18 min", isFree: false },
        ])},
        { title: "Théorème de Pythagore", titleAr: "مبرهنة فيثاغورس", lessons: ls([
          { title: "Énoncé et démonstration du théorème", duration: "14 min", isFree: true },
          { title: "Calculer un côté d'un triangle rectangle", duration: "15 min", isFree: false },
          { title: "Réciproque du théorème de Pythagore", duration: "14 min", isFree: false },
        ])},
        { title: "Symétrie et transformations", titleAr: "التماثل والتحويلات", lessons: ls([
          { title: "Symétrie axiale — axe et image", duration: "12 min", isFree: true },
          { title: "Symétrie centrale — centre et image", duration: "12 min", isFree: false },
          { title: "Translation et rotation", duration: "15 min", isFree: false },
        ])},
        { title: "Probabilités — introduction", titleAr: "الاحتمالات — مدخل", lessons: ls([
          { title: "Expérience aléatoire et espace des possibles", duration: "12 min", isFree: true },
          { title: "Probabilité d'un événement", duration: "14 min", isFree: false },
          { title: "Exercices de probabilité", duration: "15 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      gradient: "from-violet-500 to-purple-500",
      colorKey: "violet",
      chapters: chs([
        { title: "Mouvements — vitesse et trajectoire", titleAr: "الحركة — السرعة والمسار", lessons: ls([
          { title: "Types de mouvements — rectiligne, circulaire", duration: "12 min", isFree: true },
          { title: "Vitesse moyenne — calcul et unités", duration: "15 min", isFree: false },
          { title: "Vitesse instantanée et accélération", duration: "14 min", isFree: false },
        ])},
        { title: "Les forces — types et effets", titleAr: "القوى — أنواعها وتأثيراتها", lessons: ls([
          { title: "Définition et représentation d'une force", duration: "12 min", isFree: true },
          { title: "Poids et masse — la gravitation", duration: "14 min", isFree: false },
          { title: "Équilibre d'un solide soumis à deux forces", duration: "14 min", isFree: false },
        ])},
        { title: "Pression dans les fluides", titleAr: "الضغط في الموائع", lessons: ls([
          { title: "Définition de la pression — unités", duration: "12 min", isFree: true },
          { title: "Pression dans un liquide — loi de Pascal", duration: "15 min", isFree: false },
          { title: "Applications — presses hydrauliques", duration: "14 min", isFree: false },
        ])},
        { title: "Réactions chimiques — transformation de la matière", titleAr: "التفاعلات الكيميائية", lessons: ls([
          { title: "Qu'est-ce qu'une réaction chimique ?", duration: "12 min", isFree: true },
          { title: "Réactifs et produits — observation expérimentale", duration: "14 min", isFree: false },
          { title: "Conservation de la masse — loi de Lavoisier", duration: "14 min", isFree: false },
        ])},
        { title: "Équation de réaction chimique", titleAr: "معادلة التفاعل الكيميائي", lessons: ls([
          { title: "Écrire et équilibrer une équation chimique", duration: "15 min", isFree: true },
          { title: "Calculs stœchiométriques simples", duration: "18 min", isFree: false },
          { title: "Applications — combustion et oxydation", duration: "15 min", isFree: false },
        ])},
        { title: "Énergie électrique — puissance et énergie", titleAr: "الطاقة الكهربائية", lessons: ls([
          { title: "La puissance électrique — formule P = U × I", duration: "14 min", isFree: true },
          { title: "L'énergie électrique — E = P × t", duration: "15 min", isFree: false },
          { title: "Facture d'électricité et kWh", duration: "12 min", isFree: false },
        ])},
        { title: "La lumière — réflexion et réfraction", titleAr: "الضوء — الانعكاس والانكسار", lessons: ls([
          { title: "Réflexion de la lumière — lois de Descartes", duration: "14 min", isFree: true },
          { title: "Réfraction de la lumière — indices optiques", duration: "15 min", isFree: false },
          { title: "Miroirs plans et formation d'images", duration: "14 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      gradient: "from-emerald-500 to-teal-500",
      colorKey: "emerald",
      chapters: chs([
        { title: "La digestion et l'absorption intestinale", titleAr: "الهضم والامتصاص المعوي", lessons: ls([
          { title: "Les organes du système digestif", duration: "14 min", isFree: true },
          { title: "La digestion mécanique et enzymatique", duration: "15 min", isFree: false },
          { title: "L'absorption intestinale des nutriments", duration: "14 min", isFree: false },
        ])},
        { title: "La respiration — échanges gazeux", titleAr: "التنفس وتبادل الغازات", lessons: ls([
          { title: "Les organes respiratoires — poumons et alvéoles", duration: "12 min", isFree: true },
          { title: "Les échanges gazeux O₂ / CO₂", duration: "15 min", isFree: false },
          { title: "Respiration cellulaire — libération d'énergie", duration: "14 min", isFree: false },
        ])},
        { title: "La circulation sanguine", titleAr: "الدورة الدموية", lessons: ls([
          { title: "Le cœur — structure et fonctionnement", duration: "14 min", isFree: true },
          { title: "Grande et petite circulation", duration: "15 min", isFree: false },
          { title: "Le sang — composition et rôles", duration: "14 min", isFree: false },
        ])},
        { title: "Le système nerveux — structure et fonctions", titleAr: "الجهاز العصبي", lessons: ls([
          { title: "Cerveau, moelle épinière et nerfs", duration: "14 min", isFree: true },
          { title: "Le message nerveux — influx nerveux", duration: "15 min", isFree: false },
          { title: "Réflexe et comportement volontaire", duration: "14 min", isFree: false },
        ])},
        { title: "Les organes des sens", titleAr: "أعضاء الحس", lessons: ls([
          { title: "L'œil — structure et formation d'images", duration: "14 min", isFree: true },
          { title: "L'oreille — structure et audition", duration: "12 min", isFree: false },
          { title: "Les autres sens — toucher, goût, odorat", duration: "12 min", isFree: false },
        ])},
        { title: "La reproduction chez l'être humain", titleAr: "التكاثر عند الإنسان", lessons: ls([
          { title: "Les appareils reproducteurs masculin et féminin", duration: "14 min", isFree: true },
          { title: "La fécondation et le développement embryonnaire", duration: "15 min", isFree: false },
          { title: "La puberté et les transformations hormonales", duration: "14 min", isFree: false },
        ])},
        { title: "Structure interne de la Terre", titleAr: "البنية الداخلية للأرض", lessons: ls([
          { title: "Les couches internes de la Terre", duration: "12 min", isFree: true },
          { title: "Séismes et volcans — manifestations internes", duration: "14 min", isFree: false },
          { title: "Les plaques tectoniques", duration: "14 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      gradient: "from-amber-500 to-orange-500",
      colorKey: "amber",
      chapters: chs([
        { title: "Grammaire — les propositions subordonnées", lessons: ls([
          { title: "La proposition subordonnée relative", duration: "14 min", isFree: true },
          { title: "La proposition subordonnée conjonctive", duration: "14 min", isFree: false },
          { title: "Exercices d'identification et transformation", duration: "15 min", isFree: false },
        ])},
        { title: "Conjugaison — futur simple, conditionnel", lessons: ls([
          { title: "Le futur simple — formation et emploi", duration: "14 min", isFree: true },
          { title: "Le conditionnel présent — formation et emploi", duration: "14 min", isFree: false },
          { title: "Si + imparfait + conditionnel", duration: "15 min", isFree: false },
        ])},
        { title: "Orthographe — accord du participe passé", lessons: ls([
          { title: "Accord du participe passé avec être", duration: "14 min", isFree: true },
          { title: "Accord du participe passé avec avoir", duration: "15 min", isFree: false },
          { title: "Cas particuliers et exercices", duration: "15 min", isFree: false },
        ])},
        { title: "Le texte d'aventure et le récit historique", lessons: ls([
          { title: "Caractéristiques du roman d'aventure", duration: "12 min", isFree: true },
          { title: "Le récit historique — reconstitution du passé", duration: "14 min", isFree: false },
          { title: "Analyser un extrait de roman d'aventure", duration: "15 min", isFree: false },
        ])},
        { title: "La poésie — figures de style et versification", lessons: ls([
          { title: "La métaphore, la comparaison, la personnification", duration: "14 min", isFree: true },
          { title: "La versification — vers, rime, rythme", duration: "14 min", isFree: false },
          { title: "Analyser un poème étape par étape", duration: "18 min", isFree: false },
        ])},
        { title: "Le texte argumentatif — thèse et arguments", lessons: ls([
          { title: "Structure du texte argumentatif", duration: "14 min", isFree: true },
          { title: "Identifier la thèse et les arguments", duration: "14 min", isFree: false },
          { title: "Rédiger un texte argumentatif", duration: "20 min", isFree: false },
        ])},
        { title: "La lettre formelle et informelle", lessons: ls([
          { title: "Règles de la lettre formelle", duration: "12 min", isFree: true },
          { title: "La lettre informelle — registre courant", duration: "12 min", isFree: false },
          { title: "Rédiger une lettre de demande", duration: "18 min", isFree: false },
        ])},
        { title: "Production écrite — développer un point de vue", lessons: ls([
          { title: "Construire un plan en trois parties", duration: "14 min", isFree: true },
          { title: "Les connecteurs logiques d'opposition et de cause", duration: "12 min", isFree: false },
          { title: "Exercice complet de production écrite", duration: "25 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      gradient: "from-rose-500 to-pink-500",
      colorKey: "rose",
      chapters: chs([
        { title: "النصوص الأدبية — الشعر الكلاسيكي والحديث", lessons: ls([
          { title: "خصائص الشعر العربي الكلاسيكي", duration: "14 min", isFree: true },
          { title: "الشعر الحر والشعر الحديث", duration: "14 min", isFree: false },
          { title: "تحليل قصيدة كلاسيكية", duration: "18 min", isFree: false },
        ])},
        { title: "النحو — المبتدأ والخبر وأحكامهما", lessons: ls([
          { title: "أنواع الخبر — مفرد وجملة وشبه جملة", duration: "15 min", isFree: true },
          { title: "المبتدأ وأحكامه الخاصة", duration: "14 min", isFree: false },
          { title: "تمارين على الجملة الاسمية", duration: "15 min", isFree: false },
        ])},
        { title: "الصرف — الأفعال وتصريفها", lessons: ls([
          { title: "أوزان الأفعال الثلاثية", duration: "15 min", isFree: true },
          { title: "الفعل المزيد وأوزانه", duration: "15 min", isFree: false },
          { title: "الفعل الصحيح والمعتل", duration: "14 min", isFree: false },
        ])},
        { title: "التعبير الكتابي — المقالة والخطاب", lessons: ls([
          { title: "بنية المقالة — مقدمة وعرض وخاتمة", duration: "14 min", isFree: true },
          { title: "الخطاب الرسمي وغير الرسمي", duration: "12 min", isFree: false },
          { title: "كتابة مقالة حول موضوع اجتماعي", duration: "22 min", isFree: false },
        ])},
        { title: "البلاغة — التشبيه والاستعارة", lessons: ls([
          { title: "أركان التشبيه وأنواعه", duration: "14 min", isFree: true },
          { title: "الاستعارة المكنية والتصريحية", duration: "15 min", isFree: false },
          { title: "الكناية وأثرها البلاغي", duration: "14 min", isFree: false },
        ])},
        { title: "أعلام الأدب العربي والمغربي", lessons: ls([
          { title: "المتنبي وشعره", duration: "12 min", isFree: true },
          { title: "أبو تمام والبحتري", duration: "12 min", isFree: false },
          { title: "أعلام الأدب المغربي الحديث", duration: "14 min", isFree: false },
        ])},
        { title: "الإملاء المتقدم والتحرير", lessons: ls([
          { title: "قواعد إملاء الهمزة المتطرفة", duration: "14 min", isFree: true },
          { title: "قواعد التاء المربوطة والمبسوطة", duration: "12 min", isFree: false },
          { title: "التحرير الإداري والأدبي", duration: "15 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      gradient: "from-teal-500 to-emerald-600",
      colorKey: "teal",
      chapters: chs([
        { title: "الحديث النبوي الشريف وعلومه", lessons: ls([
          { title: "مفهوم الحديث وأقسامه", duration: "14 min", isFree: true },
          { title: "علم الرواية والسند", duration: "14 min", isFree: false },
          { title: "أحاديث مختارة وشرحها", duration: "15 min", isFree: false },
        ])},
        { title: "الفقه الإسلامي — العبادات", lessons: ls([
          { title: "الزكاة — شروطها وأنواعها", duration: "14 min", isFree: true },
          { title: "الصوم — أحكامه ومستحباته", duration: "14 min", isFree: false },
          { title: "الحج والعمرة — مناسكهما", duration: "15 min", isFree: false },
        ])},
        { title: "السيرة النبوية — المرحلة المدنية", lessons: ls([
          { title: "الهجرة إلى المدينة المنورة", duration: "14 min", isFree: true },
          { title: "غزوات النبي ﷺ الكبرى", duration: "15 min", isFree: false },
          { title: "وفاة النبي ﷺ وإرثه للبشرية", duration: "12 min", isFree: false },
        ])},
        { title: "الأخلاق — الصدق والأمانة والتسامح", lessons: ls([
          { title: "الصدق في القول والفعل", duration: "12 min", isFree: true },
          { title: "الأمانة وأثرها في المجتمع", duration: "12 min", isFree: false },
          { title: "التسامح والعفو في الإسلام", duration: "12 min", isFree: false },
        ])},
        { title: "التربية على المواطنة والقيم", lessons: ls([
          { title: "المواطن الصالح في الإسلام", duration: "12 min", isFree: true },
          { title: "حقوق الإنسان والواجبات", duration: "14 min", isFree: false },
          { title: "الإسلام والتنوع الثقافي", duration: "12 min", isFree: false },
        ])},
        { title: "العقيدة الإسلامية — الأسماء والصفات", lessons: ls([
          { title: "أسماء الله الحسنى وفضلها", duration: "14 min", isFree: true },
          { title: "صفات الله — الجمالية والجلالية", duration: "14 min", isFree: false },
          { title: "التوحيد وأثره على المسلم", duration: "12 min", isFree: false },
        ])},
        { title: "القرآن الكريم — تلاوة وتفسير", lessons: ls([
          { title: "أحكام التلاوة — المد والقصر", duration: "14 min", isFree: true },
          { title: "تفسير سور مختارة", duration: "18 min", isFree: false },
          { title: "إعجاز القرآن الكريم", duration: "14 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      gradient: "from-indigo-500 to-blue-600",
      colorKey: "indigo",
      chapters: chs([
        { title: "L'Islam — naissance et expansion", titleAr: "الإسلام — الظهور والانتشار", lessons: ls([
          { title: "La naissance de l'Islam à La Mecque", duration: "14 min", isFree: true },
          { title: "L'expansion arabo-islamique (VIIe-VIIIe siècle)", duration: "14 min", isFree: false },
          { title: "L'Islam au Maroc — l'islamisation du Maghreb", duration: "14 min", isFree: false },
        ])},
        { title: "La civilisation islamique — sciences et arts", titleAr: "الحضارة الإسلامية", lessons: ls([
          { title: "L'âge d'or de l'Islam — Bagdad et Cordoue", duration: "14 min", isFree: true },
          { title: "Les sciences islamiques — algèbre, astronomie, médecine", duration: "15 min", isFree: false },
          { title: "L'art islamique — architecture et calligraphie", duration: "12 min", isFree: false },
        ])},
        { title: "Le Moyen Âge en Europe", titleAr: "العصور الوسطى في أوروبا", lessons: ls([
          { title: "Le système féodal — seigneurs et serfs", duration: "14 min", isFree: true },
          { title: "L'Église au Moyen Âge — pouvoir et influence", duration: "14 min", isFree: false },
          { title: "Les croisades et leurs conséquences", duration: "15 min", isFree: false },
        ])},
        { title: "La Renaissance et les grandes découvertes", titleAr: "عصر النهضة والاكتشافات", lessons: ls([
          { title: "La Renaissance italienne — art et humanisme", duration: "14 min", isFree: true },
          { title: "Les grandes découvertes — Colomb et Vasco de Gama", duration: "14 min", isFree: false },
          { title: "Conséquences des découvertes pour le monde", duration: "14 min", isFree: false },
        ])},
        { title: "Le Maroc au Moyen Âge — dynasties et royaumes", titleAr: "المغرب في العصور الوسطى", lessons: ls([
          { title: "Les Almoravides et les Almohades", duration: "14 min", isFree: true },
          { title: "Les Mérinides — Fès capitale du savoir", duration: "14 min", isFree: false },
          { title: "Le Maroc et l'Andalousie", duration: "14 min", isFree: false },
        ])},
        { title: "Géographie — Ressources naturelles du Maroc", titleAr: "الموارد الطبيعية للمغرب", lessons: ls([
          { title: "L'agriculture marocaine — cultures et régions", duration: "12 min", isFree: true },
          { title: "L'eau au Maroc — barrages et irrigation", duration: "14 min", isFree: false },
          { title: "Phosphates et mines — richesses du sous-sol", duration: "14 min", isFree: false },
        ])},
        { title: "Géographie — Le monde arabe et islamique", titleAr: "العالم العربي والإسلامي", lessons: ls([
          { title: "Les pays arabes — géographie et ressources", duration: "14 min", isFree: true },
          { title: "Le monde islamique — diversité et unité", duration: "14 min", isFree: false },
          { title: "Les défis du monde arabo-islamique", duration: "14 min", isFree: false },
        ])},
      ]),
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════════
  // 3ÈME ANNÉE
  // ══════════════════════════════════════════════════════════════════════════════
  "3eme": [
    {
      id: "maths",
      label: "Mathématiques",
      labelAr: "الرياضيات",
      gradient: "from-blue-500 to-cyan-500",
      colorKey: "blue",
      chapters: chs([
        { title: "Nombres réels et nombres irrationnels", titleAr: "الأعداد الحقيقية والصماء", lessons: ls([
          { title: "Définition des nombres irrationnels — √2, π", duration: "12 min", isFree: true },
          { title: "La droite numérique et les nombres réels", duration: "14 min", isFree: false },
          { title: "Valeur absolue d'un nombre réel", duration: "12 min", isFree: false },
        ])},
        { title: "Calcul algébrique — factorisation et développement", titleAr: "الحساب الجبري", lessons: ls([
          { title: "Développer — double distributivité (a+b)(c+d)", duration: "15 min", isFree: true },
          { title: "Identités remarquables — (a+b)², (a-b)², (a+b)(a-b)", duration: "15 min", isFree: false },
          { title: "Factorisation par facteur commun", duration: "15 min", isFree: false },
          { title: "Factorisation par identités remarquables", duration: "15 min", isFree: false },
        ])},
        { title: "Systèmes d'équations du premier degré", titleAr: "أنظمة المعادلات", lessons: ls([
          { title: "Résolution par substitution", duration: "15 min", isFree: true },
          { title: "Résolution par combinaison", duration: "15 min", isFree: false },
          { title: "Problèmes menant à un système", duration: "18 min", isFree: false },
        ])},
        { title: "Fonctions — notion et représentation graphique", titleAr: "الدوال — المفهوم والتمثيل", lessons: ls([
          { title: "Définition d'une fonction — antécédent et image", duration: "14 min", isFree: true },
          { title: "La fonction linéaire f(x) = ax", duration: "15 min", isFree: false },
          { title: "La fonction affine f(x) = ax + b", duration: "15 min", isFree: false },
        ])},
        { title: "Trigonométrie dans le triangle rectangle", titleAr: "حساب المثلثات", lessons: ls([
          { title: "Sinus, cosinus et tangente d'un angle aigu", duration: "15 min", isFree: true },
          { title: "Calculer une longueur ou un angle en trigonométrie", duration: "18 min", isFree: false },
          { title: "Applications pratiques de la trigonométrie", duration: "18 min", isFree: false },
        ])},
        { title: "Statistiques — moyenne, médiane, mode", titleAr: "الإحصاء — المتوسط والوسيط والمنوال", lessons: ls([
          { title: "Calculer la moyenne pondérée", duration: "14 min", isFree: true },
          { title: "Trouver la médiane et le mode", duration: "14 min", isFree: false },
          { title: "Histogrammes et polygones des effectifs", duration: "15 min", isFree: false },
        ])},
        { title: "Géométrie dans l'espace — volumes", titleAr: "الهندسة في الفضاء — الحجوم", lessons: ls([
          { title: "Volume du prisme et du cylindre", duration: "14 min", isFree: true },
          { title: "Volume de la pyramide et du cône", duration: "15 min", isFree: false },
          { title: "Volume de la sphère — applications", duration: "14 min", isFree: false },
        ])},
        { title: "Révisions et préparation aux examens", titleAr: "المراجعة والتحضير للامتحانات", lessons: ls([
          { title: "Méthodes de résolution des problèmes", duration: "20 min", isFree: true },
          { title: "Exercices de brevet — algèbre et géométrie", duration: "25 min", isFree: false },
          { title: "Annales corrigées — Mathématiques 3ème", duration: "30 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "pc",
      label: "Physique-Chimie",
      labelAr: "الفيزياء والكيمياء",
      gradient: "from-violet-500 to-purple-500",
      colorKey: "violet",
      chapters: chs([
        { title: "Électricité — loi d'Ohm et résistance", titleAr: "الكهرباء — قانون أوم والمقاومة", lessons: ls([
          { title: "La résistance — définition et unités (Ω)", duration: "12 min", isFree: true },
          { title: "La loi d'Ohm — U = R × I", duration: "15 min", isFree: false },
          { title: "Association de résistances en série et dérivation", duration: "18 min", isFree: false },
        ])},
        { title: "Électricité — puissance et énergie électrique", titleAr: "الطاقة الكهربائية", lessons: ls([
          { title: "Puissance — P = U × I", duration: "14 min", isFree: true },
          { title: "Énergie électrique — E = P × t", duration: "15 min", isFree: false },
          { title: "Effet Joule et applications pratiques", duration: "14 min", isFree: false },
        ])},
        { title: "Mécanique — principe d'inertie, 2ème loi de Newton", titleAr: "الميكانيكا — قوانين نيوتن", lessons: ls([
          { title: "Le principe d'inertie — 1ère loi de Newton", duration: "14 min", isFree: true },
          { title: "La 2ème loi de Newton — F = m × a", duration: "18 min", isFree: false },
          { title: "La 3ème loi — principe des actions réciproques", duration: "14 min", isFree: false },
        ])},
        { title: "Optique — lentilles convergentes et divergentes", titleAr: "البصريات — العدسات", lessons: ls([
          { title: "Lentilles convergentes — foyer et vergence", duration: "14 min", isFree: true },
          { title: "Construction d'image avec une lentille convergente", duration: "18 min", isFree: false },
          { title: "L'œil et les défauts visuels — correction optique", duration: "15 min", isFree: false },
        ])},
        { title: "Transformations chimiques — oxydation", titleAr: "التحولات الكيميائية", lessons: ls([
          { title: "L'oxydation — définition et exemples", duration: "12 min", isFree: true },
          { title: "La corrosion des métaux — prévention", duration: "14 min", isFree: false },
          { title: "La combustion — réactions et bilan", duration: "15 min", isFree: false },
        ])},
        { title: "Acides et bases — pH", titleAr: "الأحماض والقواعد — الرقم الهيدروجيني", lessons: ls([
          { title: "Propriétés des acides et des bases", duration: "12 min", isFree: true },
          { title: "Le pH — définition et mesure", duration: "15 min", isFree: false },
          { title: "La neutralisation acide-base", duration: "15 min", isFree: false },
        ])},
        { title: "Énergie — formes et conversions", titleAr: "الطاقة — أشكالها وتحولاتها", lessons: ls([
          { title: "Les formes d'énergie — cinétique, potentielle, thermique", duration: "12 min", isFree: true },
          { title: "Conservation et dissipation de l'énergie", duration: "14 min", isFree: false },
          { title: "Énergies renouvelables — solaire, éolien, hydraulique", duration: "14 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "svt",
      label: "Sciences de la Vie et de la Terre",
      labelAr: "علوم الحياة والأرض",
      gradient: "from-emerald-500 to-teal-500",
      colorKey: "emerald",
      chapters: chs([
        { title: "Génétique — ADN, chromosomes et hérédité", titleAr: "علم الوراثة — الحمض النووي", lessons: ls([
          { title: "L'ADN — structure et rôle", duration: "14 min", isFree: true },
          { title: "Les chromosomes — caryotype humain", duration: "15 min", isFree: false },
          { title: "Les gènes — allèles dominants et récessifs", duration: "15 min", isFree: false },
        ])},
        { title: "Lois de Mendel — hérédité mono et dihybride", titleAr: "قوانين مندل", lessons: ls([
          { title: "1ère loi de Mendel — uniformité des hybrides", duration: "15 min", isFree: true },
          { title: "2ème loi — ségrégation des allèles", duration: "18 min", isFree: false },
          { title: "Hérédité liée au sexe — chromosomes X et Y", duration: "18 min", isFree: false },
        ])},
        { title: "Évolution des espèces — Darwin", titleAr: "تطور الأنواع", lessons: ls([
          { title: "La théorie de l'évolution — Darwin et Wallace", duration: "14 min", isFree: true },
          { title: "Sélection naturelle et adaptation", duration: "15 min", isFree: false },
          { title: "Les preuves de l'évolution — fossiles et génétique", duration: "14 min", isFree: false },
        ])},
        { title: "L'immunité — défenses de l'organisme", titleAr: "المناعة — دفاعات الجسم", lessons: ls([
          { title: "Les barrières naturelles — peau et muqueuses", duration: "12 min", isFree: true },
          { title: "La réaction inflammatoire — immunité innée", duration: "15 min", isFree: false },
          { title: "Les anticorps et la mémoire immunitaire — vaccins", duration: "18 min", isFree: false },
        ])},
        { title: "Les hormones et la régulation", titleAr: "الهرمونات والتنظيم", lessons: ls([
          { title: "Les glandes endocrines — pancréas, thyroïde", duration: "12 min", isFree: true },
          { title: "Le diabète — insuline et régulation de la glycémie", duration: "15 min", isFree: false },
          { title: "La régulation hormonale et le système nerveux", duration: "14 min", isFree: false },
        ])},
        { title: "Les risques géologiques — séismes et volcans", titleAr: "المخاطر الجيولوجية", lessons: ls([
          { title: "Les séismes — ondes sismiques et magnitude", duration: "14 min", isFree: true },
          { title: "Les volcans — types d'éruptions", duration: "15 min", isFree: false },
          { title: "La tectonique des plaques et les risques", duration: "14 min", isFree: false },
        ])},
        { title: "Écologie et développement durable", titleAr: "علم البيئة والتنمية المستدامة", lessons: ls([
          { title: "Les déséquilibres écologiques — pollution et déforestation", duration: "12 min", isFree: true },
          { title: "Le développement durable — principes", duration: "12 min", isFree: false },
          { title: "Actions pour protéger l'environnement", duration: "14 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "francais",
      label: "Français",
      labelAr: "اللغة الفرنسية",
      gradient: "from-amber-500 to-orange-500",
      colorKey: "amber",
      chapters: chs([
        { title: "Grammaire avancée — subordination et coordination", lessons: ls([
          { title: "Les conjonctions de coordination et subordination", duration: "14 min", isFree: true },
          { title: "Propositions circonstancielles — cause, conséquence", duration: "15 min", isFree: false },
          { title: "Exercices de transformation syntaxique", duration: "18 min", isFree: false },
        ])},
        { title: "Conjugaison — subjonctif présent et passé", lessons: ls([
          { title: "Le subjonctif présent — formation", duration: "15 min", isFree: true },
          { title: "Emploi du subjonctif — doute, volonté, sentiment", duration: "15 min", isFree: false },
          { title: "Le subjonctif passé et ses emplois", duration: "14 min", isFree: false },
        ])},
        { title: "Le texte argumentatif — plan et rédaction", lessons: ls([
          { title: "Construire une argumentation solide", duration: "14 min", isFree: true },
          { title: "Les types de plans — thèse/antithèse/synthèse", duration: "15 min", isFree: false },
          { title: "Rédiger une introduction et une conclusion", duration: "18 min", isFree: false },
        ])},
        { title: "La critique et le compte rendu", lessons: ls([
          { title: "Définition et structure de la critique", duration: "12 min", isFree: true },
          { title: "Le compte rendu de lecture — méthode", duration: "14 min", isFree: false },
          { title: "Exercice : rédiger un compte rendu", duration: "20 min", isFree: false },
        ])},
        { title: "Le roman — analyse narrative", lessons: ls([
          { title: "Le narrateur et le point de vue narratif", duration: "14 min", isFree: true },
          { title: "Personnages, espace et temps dans le roman", duration: "15 min", isFree: false },
          { title: "Analyser un extrait de roman", duration: "18 min", isFree: false },
        ])},
        { title: "Le théâtre — genres et mise en scène", lessons: ls([
          { title: "Tragédie, comédie et drame", duration: "12 min", isFree: true },
          { title: "Lire une pièce de théâtre — didascalies et répliques", duration: "14 min", isFree: false },
          { title: "Analyser une scène de théâtre", duration: "18 min", isFree: false },
        ])},
        { title: "Préparation au BREVET — méthodologie", lessons: ls([
          { title: "La méthode de compréhension au brevet", duration: "20 min", isFree: true },
          { title: "La production écrite au brevet", duration: "20 min", isFree: false },
          { title: "Exercices sur annales du brevet", duration: "30 min", isFree: false },
        ])},
        { title: "Production écrite — dissertation et commentaire", lessons: ls([
          { title: "Rédiger une dissertation littéraire", duration: "20 min", isFree: true },
          { title: "Le commentaire composé — méthode", duration: "20 min", isFree: false },
          { title: "Exercice guidé — commentaire complet", duration: "30 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "arabe",
      label: "Langue Arabe",
      labelAr: "اللغة العربية",
      gradient: "from-rose-500 to-pink-500",
      colorKey: "rose",
      chapters: chs([
        { title: "الأدب العربي الحديث — القصة والرواية", lessons: ls([
          { title: "نشأة القصة القصيرة العربية", duration: "14 min", isFree: true },
          { title: "الرواية العربية — أبرز أعلامها", duration: "15 min", isFree: false },
          { title: "تحليل نص قصصي حديث", duration: "18 min", isFree: false },
        ])},
        { title: "النحو المتقدم — الجمل وأنواعها", lessons: ls([
          { title: "الجملة البسيطة والمركبة", duration: "15 min", isFree: true },
          { title: "أساليب العربية — الشرط والاستفهام والنفي", duration: "15 min", isFree: false },
          { title: "الإعراب والبناء في الجملة العربية", duration: "18 min", isFree: false },
        ])},
        { title: "الصرف — المشتقات والمزيد", lessons: ls([
          { title: "اسم الفاعل واسم المفعول", duration: "14 min", isFree: true },
          { title: "الصفة المشبهة وصيغ المبالغة", duration: "15 min", isFree: false },
          { title: "المصدر وأنواعه", duration: "14 min", isFree: false },
        ])},
        { title: "التعبير الكتابي — المقالة الأدبية", lessons: ls([
          { title: "المقالة الأدبية وخصائصها", duration: "14 min", isFree: true },
          { title: "الأسلوب الأدبي وعناصره", duration: "14 min", isFree: false },
          { title: "كتابة مقالة أدبية كاملة", duration: "25 min", isFree: false },
        ])},
        { title: "البلاغة — علم البديع والمعاني", lessons: ls([
          { title: "محسنات بديعية — الجناس والطباق", duration: "14 min", isFree: true },
          { title: "علم المعاني — الخبر والإنشاء", duration: "15 min", isFree: false },
          { title: "تطبيقات بلاغية على نصوص أدبية", duration: "18 min", isFree: false },
        ])},
        { title: "النقد الأدبي — تحليل النصوص", lessons: ls([
          { title: "مناهج النقد الأدبي", duration: "14 min", isFree: true },
          { title: "تطبيق المنهج الانطباعي والتاريخي", duration: "15 min", isFree: false },
          { title: "تحليل نص أدبي كامل", duration: "22 min", isFree: false },
        ])},
        { title: "التحضير لامتحان الشهادة الإعدادية", lessons: ls([
          { title: "منهجية الإجابة عن أسئلة الامتحان", duration: "20 min", isFree: true },
          { title: "تمارين على أسئلة النحو والبلاغة", duration: "20 min", isFree: false },
          { title: "مواضيع امتحانية مع الإجابات النموذجية", duration: "30 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "islam",
      label: "Éducation Islamique",
      labelAr: "التربية الإسلامية",
      gradient: "from-teal-500 to-emerald-600",
      colorKey: "teal",
      chapters: chs([
        { title: "الفقه المقارن والاجتهاد", lessons: ls([
          { title: "مفهوم الاجتهاد ومجالاته", duration: "14 min", isFree: true },
          { title: "المذاهب الفقهية الأربعة", duration: "15 min", isFree: false },
          { title: "الفقه المقارن في المسائل المعاصرة", duration: "15 min", isFree: false },
        ])},
        { title: "القضايا الأخلاقية المعاصرة", lessons: ls([
          { title: "الإسلام وقضايا العولمة", duration: "14 min", isFree: true },
          { title: "الأخلاق الإسلامية في الفضاء الرقمي", duration: "14 min", isFree: false },
          { title: "الموقف الإسلامي من المستجدات", duration: "14 min", isFree: false },
        ])},
        { title: "الإسلام والحضارة الإنسانية", lessons: ls([
          { title: "إسهام المسلمين في الحضارة العالمية", duration: "15 min", isFree: true },
          { title: "الإسلام والعلوم — نماذج ومبادئ", duration: "14 min", isFree: false },
          { title: "القيم الحضارية الإسلامية", duration: "14 min", isFree: false },
        ])},
        { title: "التسامح والحوار بين الأديان", lessons: ls([
          { title: "مفهوم التسامح في الإسلام", duration: "12 min", isFree: true },
          { title: "الحوار بين الأديان — نماذج تاريخية", duration: "14 min", isFree: false },
          { title: "الإسلام ومبدأ التعايش السلمي", duration: "12 min", isFree: false },
        ])},
        { title: "الاقتصاد الإسلامي — مبادئ أساسية", lessons: ls([
          { title: "مبادئ الاقتصاد الإسلامي", duration: "14 min", isFree: true },
          { title: "تحريم الربا وأهمية التكافل", duration: "14 min", isFree: false },
          { title: "الزكاة والوقف في الاقتصاد الإسلامي", duration: "14 min", isFree: false },
        ])},
        { title: "الأسرة في الإسلام", lessons: ls([
          { title: "أحكام الزواج والأسرة في الإسلام", duration: "14 min", isFree: true },
          { title: "حقوق أفراد الأسرة", duration: "14 min", isFree: false },
          { title: "تحديات الأسرة المعاصرة", duration: "12 min", isFree: false },
        ])},
        { title: "القرآن الكريم — تلاوة وتدبر", lessons: ls([
          { title: "أسرار التلاوة والتدبر في القرآن", duration: "14 min", isFree: true },
          { title: "تفسير آيات مختارة من جزء عم", duration: "18 min", isFree: false },
          { title: "إعجاز القرآن العلمي والبلاغي", duration: "15 min", isFree: false },
        ])},
      ]),
    },

    {
      id: "hg",
      label: "Histoire-Géographie",
      labelAr: "التاريخ والجغرافيا",
      gradient: "from-indigo-500 to-blue-600",
      colorKey: "indigo",
      chapters: chs([
        { title: "Le Maroc sous le Protectorat français et espagnol", titleAr: "المغرب في عهد الحماية", lessons: ls([
          { title: "L'imposition du Protectorat en 1912", duration: "14 min", isFree: true },
          { title: "L'organisation du Protectorat — administration et économie", duration: "14 min", isFree: false },
          { title: "La résistance marocaine au Protectorat", duration: "14 min", isFree: false },
        ])},
        { title: "Mouvement nationaliste et indépendance du Maroc", titleAr: "الحركة الوطنية والاستقلال", lessons: ls([
          { title: "La naissance du mouvement nationaliste marocain", duration: "14 min", isFree: true },
          { title: "Le roi Mohammed V et la résistance", duration: "14 min", isFree: false },
          { title: "L'indépendance du Maroc en 1956", duration: "14 min", isFree: false },
        ])},
        { title: "La Première Guerre Mondiale", titleAr: "الحرب العالمية الأولى", lessons: ls([
          { title: "Les causes de la Première Guerre Mondiale", duration: "14 min", isFree: true },
          { title: "La guerre de tranchées et ses conditions", duration: "14 min", isFree: false },
          { title: "Le bilan — traités de paix et conséquences", duration: "14 min", isFree: false },
        ])},
        { title: "La Seconde Guerre Mondiale", titleAr: "الحرب العالمية الثانية", lessons: ls([
          { title: "Montée du nazisme et déclenchement de la guerre", duration: "14 min", isFree: true },
          { title: "Le génocide juif — la Shoah", duration: "14 min", isFree: false },
          { title: "La victoire alliée et l'ordre mondial de 1945", duration: "14 min", isFree: false },
        ])},
        { title: "Le monde après 1945 — Guerre Froide", titleAr: "العالم بعد 1945", lessons: ls([
          { title: "La Guerre Froide — USA vs URSS", duration: "14 min", isFree: true },
          { title: "La décolonisation en Afrique et en Asie", duration: "14 min", isFree: false },
          { title: "La chute du mur de Berlin et la fin de la Guerre Froide", duration: "14 min", isFree: false },
        ])},
        { title: "Géographie — Mondialisation et échanges", titleAr: "العولمة والتبادلات", lessons: ls([
          { title: "Définition et acteurs de la mondialisation", duration: "12 min", isFree: true },
          { title: "Les échanges commerciaux mondiaux", duration: "14 min", isFree: false },
          { title: "Le Maroc dans la mondialisation", duration: "14 min", isFree: false },
        ])},
        { title: "Géographie — Le Maroc dans le monde", titleAr: "المغرب في العالم", lessons: ls([
          { title: "La place géostratégique du Maroc", duration: "12 min", isFree: true },
          { title: "Les relations diplomatiques et économiques du Maroc", duration: "14 min", isFree: false },
          { title: "Les défis du Maroc — eau, énergie, jeunesse", duration: "14 min", isFree: false },
        ])},
        { title: "Révisions — Brevet du collège", titleAr: "مراجعة الشهادة الإعدادية", lessons: ls([
          { title: "Méthode de l'épreuve d'Histoire-Géo au brevet", duration: "20 min", isFree: true },
          { title: "Exercices sur les thèmes clés d'Histoire", duration: "25 min", isFree: false },
          { title: "Exercices sur les thèmes clés de Géographie", duration: "25 min", isFree: false },
        ])},
      ]),
    },
  ],
};

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function getSubject(niveau: string, matiereId: string): Subject | undefined {
  return CURRICULUM[niveau]?.find((s) => s.id === matiereId);
}

export function getChapter(niveau: string, matiereId: string, chapitreId: string): Chapter | undefined {
  return getSubject(niveau, matiereId)?.chapters.find((c) => c.id === chapitreId);
}

export function getLesson(niveau: string, matiereId: string, chapitreId: string, leconId: string): Lesson | undefined {
  return getChapter(niveau, matiereId, chapitreId)?.lessons.find((l) => l.id === leconId);
}

export const LEVEL_LABELS: Record<string, string> = {
  "1ere": "1ère année collège",
  "2eme": "2ème année collège",
  "3eme": "3ème année collège",
};

// Subject icon and gradient map for client-side rendering
export const SUBJECT_ICONS: Record<string, { gradient: string; colorKey: string }> = {
  maths:   { gradient: "from-blue-500 to-cyan-500",     colorKey: "blue" },
  pc:      { gradient: "from-violet-500 to-purple-500", colorKey: "violet" },
  svt:     { gradient: "from-emerald-500 to-teal-500",  colorKey: "emerald" },
  francais:{ gradient: "from-amber-500 to-orange-500",  colorKey: "amber" },
  arabe:   { gradient: "from-rose-500 to-pink-500",     colorKey: "rose" },
  islam:   { gradient: "from-teal-500 to-emerald-600",  colorKey: "teal" },
  hg:      { gradient: "from-indigo-500 to-blue-600",   colorKey: "indigo" },
};
