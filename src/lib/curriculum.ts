export type Track = {
  id: string;
  name: string;
  nameAr: string;
  level: "2bac" | "1bac" | "college";
  subjects: string[];
  description: string;
  badgeColor: string;
};

export const TRACKS: Track[] = [
  {
    id: "2bac-sm",
    name: "2ème Bac Sciences Maths",
    nameAr: "الثانية باك علوم رياضية (أ / ب)",
    level: "2bac",
    subjects: ["Mathématiques", "Physique-Chimie", "SVT / SI", "Philosophie", "Anglais"],
    description: "Algèbre, Arithmétique, Structures, Analyse avancée, Mécanique et Électricité RLC.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "2bac-pc",
    name: "2ème Bac Sciences Physiques",
    nameAr: "الثانية باك علوم فيزيائية",
    level: "2bac",
    subjects: ["Physique-Chimie", "Mathématiques", "SVT", "Philosophie", "Anglais"],
    description: "Ondes, Décroissance radioactive, Électricité, Mécanique de Newton, Acides-Bases, Fonctions.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "2bac-svt",
    name: "2ème Bac SVT",
    nameAr: "الثانية باك علوم الحياة والأرض",
    level: "2bac",
    subjects: ["SVT", "Physique-Chimie", "Mathématiques", "Philosophie", "Anglais"],
    description: "Consommation de matière organique, Génétique humaine et des populations, Immunologie, Géologie.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
  },
  {
    id: "2bac-eco",
    name: "2ème Bac Sciences Économiques",
    nameAr: "الثانية باك علوم اقتصادية وتدبير",
    level: "2bac",
    subjects: ["Économie Générale & Statistiques", "Comptabilité & Mathématiques Financières", "Économie & Organisation des Entreprises", "Philosophie"],
    description: "Agrégats économiques, Politique monétaire et budgétaire, Commerce extérieur, Analyse financière.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "1bac-reg",
    name: "1ère Bac - Examen Régional",
    nameAr: "الأولى باك - الامتحان الجهوي",
    level: "1bac",
    subjects: ["Français", "Éducation Islamique", "Histoire-Géographie", "Arabe"],
    description: "La Boîte à Merveilles, Antigone, Le Dernier Jour d'un Condamné, Coran (Sourate Youssef), Histoire contemporaine.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "college-3ac",
    name: "3ème Année Collège (Brevet)",
    nameAr: "الثالثة إعدادي - الامتحان الموحد",
    level: "college",
    subjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Arabe"],
    description: "Théorème de Thalès et Pythagore, Équations et Inéquations, Trigonométrie, Mouvement et Vitesse, Solutions aqueuses.",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
  },
];

export type SampleExam = {
  id: string;
  title: string;
  trackId: string;
  year: string;
  session: "Normale" | "Rattrapage";
  subject: string;
  duration: string;
  coef: number;
  featuredExercise: string;
  solutionSummary: string;
};

export const SAMPLE_EXAMS: SampleExam[] = [
  {
    id: "bac-pc-math-2024",
    title: "National 2024 - Mathématiques (Session Normale)",
    trackId: "2bac-pc",
    year: "2024",
    session: "Normale",
    subject: "Mathématiques",
    duration: "3h",
    coef: 7,
    featuredExercise: "Étude d'une fonction exponentielle avec intégrale et calcul d'aire, Suites récurrentes et Nombres Complexes.",
    solutionSummary: "Correction détaillée étape par étape avec barème officiel du Ministère de l'Éducation Nationale.",
  },
  {
    id: "bac-pc-physique-2024",
    title: "National 2024 - Physique-Chimie (Session Normale)",
    trackId: "2bac-pc",
    year: "2024",
    session: "Normale",
    subject: "Physique-Chimie",
    duration: "3h",
    coef: 7,
    featuredExercise: "Ondes mécaniques progressives, Étude du circuit RLC amorti et chute verticale d'une bille dans l'huile.",
    solutionSummary: "Explication des équations différentielles, bilan des forces et calcul des incertitudes de mesure.",
  },
  {
    id: "bac-sm-math-2024",
    title: "National 2024 - Mathématiques (Sciences Maths)",
    trackId: "2bac-sm",
    year: "2024",
    session: "Normale",
    subject: "Mathématiques",
    duration: "4h",
    coef: 9,
    featuredExercise: "Structures algébriques (Loi interne, Corps), Arithmétique dans Z/pZ et Problème d'Analyse avec théorème de Rolle.",
    solutionSummary: "Démonstrations rigoureuses pas-à-pas avec astuces de calcul spécifiques aux Sciences Maths.",
  },
  {
    id: "reg-1bac-francais-2024",
    title: "Régional 2024 - Français (Casablanca-Settat)",
    trackId: "1bac-reg",
    year: "2024",
    session: "Normale",
    subject: "Français",
    duration: "2h",
    coef: 4,
    featuredExercise: "Extrait de 'Le Dernier Jour d'un Condamné' de Victor Hugo : Figures de style et sujet de Production Écrite sur la peine de mort.",
    solutionSummary: "Plan dialectique complet rédigé avec connecteurs logiques, arguments solides et vocabulaire soutenu.",
  },
];
