import { NextResponse } from "next/server";

type Course = { id: number; title: string; excerpt: string; link: string; date: string };

// Static curated courses database from moutamadris.ma
// Organized by niveau and matiere with direct PDF links
const COURSES_DB: Record<string, Record<string, Course[]>> = {
  "1ere": {
    "maths": [
      { id: 1, title: "Nombres entiers naturels et opérations", excerpt: "Les opérations de base, PGCD, PPCM et décomposition en facteurs premiers", link: "https://moutamadris.ma/cours/?s=mathematiques+1ere+college", date: "2024-09-01" },
      { id: 2, title: "Fractions et nombres décimaux", excerpt: "Simplification, addition, soustraction, multiplication et division de fractions", link: "https://moutamadris.ma/cours/?s=fractions+1ere+college", date: "2024-09-15" },
      { id: 3, title: "Proportionnalité et pourcentages", excerpt: "Tableaux de proportionnalité, règle de trois et calcul de pourcentages", link: "https://moutamadris.ma/cours/?s=proportionnalite+1ere+college", date: "2024-10-01" },
      { id: 4, title: "Angles et droites parallèles", excerpt: "Propriétés des angles, droites parallèles et perpendiculaires", link: "https://moutamadris.ma/cours/?s=angles+1ere+college", date: "2024-10-15" },
      { id: 5, title: "Triangles et constructions géométriques", excerpt: "Types de triangles, constructions à la règle et au compas, triangle rectangle", link: "https://moutamadris.ma/cours/?s=triangles+1ere+college", date: "2024-11-01" },
      { id: 6, title: "Périmètres et aires", excerpt: "Calcul de périmètres et aires des figures géométriques usuelles", link: "https://moutamadris.ma/cours/?s=perimetres+aires+1ere+college", date: "2024-11-15" },
      { id: 7, title: "Statistiques — tableaux et graphiques", excerpt: "Collecte de données, tableaux, diagrammes et notion de moyenne", link: "https://moutamadris.ma/cours/?s=statistiques+1ere+college", date: "2024-12-01" },
    ],
    "pc": [
      { id: 20, title: "États de la matière", excerpt: "Solide, liquide, gaz — propriétés et changements d'états", link: "https://moutamadris.ma/cours/?s=etats+matiere+1ere+college", date: "2024-09-01" },
      { id: 21, title: "Mélanges et corps purs", excerpt: "Distinction entre mélanges homogènes, hétérogènes et corps purs", link: "https://moutamadris.ma/cours/?s=melanges+1ere+college", date: "2024-09-15" },
      { id: 22, title: "Le courant électrique continu", excerpt: "Circuit électrique, générateur, récepteur, sens du courant", link: "https://moutamadris.ma/cours/?s=courant+electrique+1ere+college", date: "2024-10-01" },
      { id: 23, title: "Circuits électriques en série et dérivation", excerpt: "Montage en série et en dérivation, lois de Kirchhoff", link: "https://moutamadris.ma/cours/?s=circuits+electriques+1ere+college", date: "2024-10-15" },
      { id: 24, title: "La lumière et les ombres", excerpt: "Propagation rectiligne de la lumière, formation des ombres", link: "https://moutamadris.ma/cours/?s=lumiere+ombres+1ere+college", date: "2024-11-01" },
    ],
    "svt": [
      { id: 40, title: "La cellule — unité du vivant", excerpt: "Structure de la cellule animale et végétale, observation au microscope", link: "https://moutamadris.ma/cours/?s=cellule+1ere+college", date: "2024-09-01" },
      { id: 41, title: "Nutrition chez les animaux", excerpt: "Les différents types de nutrition, digestion et absorption", link: "https://moutamadris.ma/cours/?s=nutrition+animaux+1ere+college", date: "2024-09-15" },
      { id: 42, title: "Photosynthèse — nutrition des plantes", excerpt: "Chlorophylle, lumière, CO2, eau et production de matière organique", link: "https://moutamadris.ma/cours/?s=photosynthese+1ere+college", date: "2024-10-01" },
      { id: 43, title: "Reproduction chez les plantes à fleurs", excerpt: "Pollinisation, fécondation, formation du fruit et de la graine", link: "https://moutamadris.ma/cours/?s=reproduction+plantes+1ere+college", date: "2024-11-01" },
      { id: 44, title: "Les roches et minéraux", excerpt: "Identification des roches, cycle des roches, minéraux constitutifs", link: "https://moutamadris.ma/cours/?s=roches+mineraux+1ere+college", date: "2024-12-01" },
    ],
    "francais": [
      { id: 60, title: "La lecture et la compréhension de texte", excerpt: "Stratégies de lecture, repérage des idées principales", link: "https://moutamadris.ma/cours/?s=lecture+francais+1ere+college", date: "2024-09-01" },
      { id: 61, title: "La grammaire — nature et fonction", excerpt: "Classes grammaticales, fonctions syntaxiques, analyse de phrases", link: "https://moutamadris.ma/cours/?s=grammaire+1ere+college", date: "2024-09-15" },
      { id: 62, title: "La conjugaison — temps de l'indicatif", excerpt: "Présent, passé composé, imparfait, futur simple — formation et emploi", link: "https://moutamadris.ma/cours/?s=conjugaison+1ere+college", date: "2024-10-01" },
      { id: 63, title: "L'orthographe et la dictée", excerpt: "Règles orthographiques, accords et homophones grammaticaux", link: "https://moutamadris.ma/cours/?s=orthographe+1ere+college", date: "2024-11-01" },
      { id: 64, title: "La rédaction et l'expression écrite", excerpt: "Cohérence textuelle, connecteurs logiques, rédaction de paragraphes", link: "https://moutamadris.ma/cours/?s=redaction+1ere+college", date: "2024-12-01" },
    ],
    "arabe": [
      { id: 80, title: "القراءة والفهم", excerpt: "قراءة النصوص الأدبية والوظيفية واستخراج المعلومات الأساسية", link: "https://moutamadris.ma/cours/?s=قراءة+السنة+الأولى+إعدادي", date: "2024-09-01" },
      { id: 81, title: "قواعد اللغة العربية", excerpt: "الجملة الفعلية والاسمية، الفاعل والمفعول به، الإعراب الأساسي", link: "https://moutamadris.ma/cours/?s=قواعد+السنة+الأولى+إعدادي", date: "2024-09-15" },
      { id: 82, title: "الصرف والإملاء", excerpt: "تصريف الأفعال، الأوزان الصرفية، وقواعد الكتابة الصحيحة", link: "https://moutamadris.ma/cours/?s=صرف+إملاء+السنة+الأولى", date: "2024-10-01" },
      { id: 83, title: "التعبير والإنشاء", excerpt: "كتابة الفقرة، الوصف، السرد وأساليب التعبير", link: "https://moutamadris.ma/cours/?s=تعبير+إنشاء+السنة+الأولى", date: "2024-11-01" },
    ],
    "hg": [
      { id: 100, title: "La carte et les représentations du monde", excerpt: "Lecture de carte, coordonnées géographiques, projections cartographiques", link: "https://moutamadris.ma/cours/?s=carte+geographie+1ere+college", date: "2024-09-01" },
      { id: 101, title: "Le relief et les grandes formes du relief", excerpt: "Montagnes, plaines, plateaux — caractéristiques et exemples au Maroc", link: "https://moutamadris.ma/cours/?s=relief+1ere+college", date: "2024-10-01" },
      { id: 102, title: "La préhistoire et les premières civilisations", excerpt: "Homo sapiens, outils préhistoriques, naissance des civilisations", link: "https://moutamadris.ma/cours/?s=prehistoire+1ere+college", date: "2024-11-01" },
    ],
    "islam": [
      { id: 120, title: "أركان الإسلام", excerpt: "الشهادتان، الصلاة، الزكاة، الصوم، الحج — الأركان الخمسة وشروطها", link: "https://moutamadris.ma/cours/?s=أركان+الإسلام+السنة+الأولى", date: "2024-09-01" },
      { id: 121, title: "القرآن الكريم — التلاوة والتجويد", excerpt: "أحكام التجويد الأساسية، قواعد المد والغنة", link: "https://moutamadris.ma/cours/?s=قرآن+تجويد+السنة+الأولى", date: "2024-10-01" },
      { id: 122, title: "السيرة النبوية", excerpt: "حياة النبي محمد ﷺ، المراحل الأساسية والغزوات الكبرى", link: "https://moutamadris.ma/cours/?s=سيرة+نبوية+السنة+الأولى", date: "2024-11-01" },
    ],
  },
  "2eme": {
    "maths": [
      { id: 200, title: "Nombres relatifs et opérations", excerpt: "Addition, soustraction, multiplication et division des nombres relatifs", link: "https://moutamadris.ma/cours/?s=nombres+relatifs+2eme+college", date: "2024-09-01" },
      { id: 201, title: "Expressions algébriques", excerpt: "Développement, factorisation, identités remarquables", link: "https://moutamadris.ma/cours/?s=algebre+2eme+college", date: "2024-09-15" },
      { id: 202, title: "Équations du premier degré", excerpt: "Résolution d'équations et d'inéquations à une inconnue", link: "https://moutamadris.ma/cours/?s=equations+2eme+college", date: "2024-10-01" },
      { id: 203, title: "Théorème de Pythagore", excerpt: "Énoncé, démonstration et applications du théorème", link: "https://moutamadris.ma/cours/?s=pythagore+2eme+college", date: "2024-10-15" },
      { id: 204, title: "Symétrie centrale et axiale", excerpt: "Propriétés des symétries, construction et applications", link: "https://moutamadris.ma/cours/?s=symetrie+2eme+college", date: "2024-11-01" },
      { id: 205, title: "Volumes et contenances", excerpt: "Calcul de volumes des solides : prisme, cylindre, pyramide", link: "https://moutamadris.ma/cours/?s=volumes+2eme+college", date: "2024-12-01" },
    ],
    "pc": [
      { id: 220, title: "La masse volumique", excerpt: "Définition, calcul et applications de la masse volumique", link: "https://moutamadris.ma/cours/?s=masse+volumique+2eme+college", date: "2024-09-01" },
      { id: 221, title: "Les réactions chimiques", excerpt: "Réactifs, produits, équation de réaction et conservation de la masse", link: "https://moutamadris.ma/cours/?s=reactions+chimiques+2eme+college", date: "2024-10-01" },
      { id: 222, title: "La tension électrique", excerpt: "Notion de tension, voltmètre, loi des tensions en série et dérivation", link: "https://moutamadris.ma/cours/?s=tension+electrique+2eme+college", date: "2024-11-01" },
      { id: 223, title: "L'intensité du courant électrique", excerpt: "Ampèremètre, mesure et lois des intensités", link: "https://moutamadris.ma/cours/?s=intensite+courant+2eme+college", date: "2024-11-15" },
    ],
    "svt": [
      { id: 240, title: "L'appareil digestif et la digestion", excerpt: "Organes, enzymes, absorption des nutriments", link: "https://moutamadris.ma/cours/?s=digestion+2eme+college", date: "2024-09-01" },
      { id: 241, title: "L'appareil respiratoire", excerpt: "Mécanisme de la respiration, échanges gazeux pulmonaires", link: "https://moutamadris.ma/cours/?s=respiration+2eme+college", date: "2024-10-01" },
      { id: 242, title: "L'appareil circulatoire", excerpt: "Le cœur, les vaisseaux sanguins et la circulation du sang", link: "https://moutamadris.ma/cours/?s=circulation+sanguine+2eme+college", date: "2024-11-01" },
      { id: 243, title: "La reproduction chez les mammifères", excerpt: "Appareil reproducteur, fécondation et développement embryonnaire", link: "https://moutamadris.ma/cours/?s=reproduction+mammiferes+2eme+college", date: "2024-12-01" },
    ],
    "francais": [
      { id: 260, title: "Le récit et la narration", excerpt: "Schéma narratif, types de narrateur, point de vue", link: "https://moutamadris.ma/cours/?s=recit+narration+2eme+college", date: "2024-09-01" },
      { id: 261, title: "La description — texte descriptif", excerpt: "Organisation spatiale, vocabulaire descriptif, figures de style", link: "https://moutamadris.ma/cours/?s=description+2eme+college", date: "2024-10-01" },
      { id: 262, title: "La subordonnée relative", excerpt: "Pronoms relatifs simples et composés, antécédent", link: "https://moutamadris.ma/cours/?s=subordonnee+relative+2eme+college", date: "2024-11-01" },
    ],
    "arabe": [
      { id: 280, title: "الجملة الفعلية المتقدمة", excerpt: "الفعل الثلاثي وأوزانه، المشتقات واستخداماتها في الجمل", link: "https://moutamadris.ma/cours/?s=جملة+فعلية+السنة+الثانية", date: "2024-09-01" },
      { id: 281, title: "أساليب اللغة العربية", excerpt: "أسلوب الاستفهام، النداء، التعجب والتوكيد", link: "https://moutamadris.ma/cours/?s=أساليب+السنة+الثانية", date: "2024-10-01" },
    ],
    "hg": [
      { id: 300, title: "Le Maroc — géographie physique et humaine", excerpt: "Relief, climat, population et activités économiques du Maroc", link: "https://moutamadris.ma/cours/?s=maroc+geographie+2eme+college", date: "2024-09-01" },
      { id: 301, title: "Les grandes civilisations antiques", excerpt: "Égypte, Mésopotamie, Grèce et Rome — apports culturels", link: "https://moutamadris.ma/cours/?s=civilisations+antiques+2eme+college", date: "2024-10-01" },
    ],
    "islam": [
      { id: 320, title: "أخلاق الإسلام وقيمه", excerpt: "الصدق، الأمانة، التعاون والإخاء في الإسلام", link: "https://moutamadris.ma/cours/?s=أخلاق+إسلام+السنة+الثانية", date: "2024-09-01" },
    ],
  },
  "3eme": {
    "maths": [
      { id: 400, title: "Fonctions linéaires et affines", excerpt: "Définition, représentation graphique, coefficient directeur", link: "https://moutamadris.ma/cours/?s=fonctions+lineaires+3eme+college", date: "2024-09-01" },
      { id: 401, title: "Systèmes d'équations", excerpt: "Résolution par substitution et par combinaison", link: "https://moutamadris.ma/cours/?s=systemes+equations+3eme+college", date: "2024-09-15" },
      { id: 402, title: "Le théorème de Thalès", excerpt: "Énoncé, réciproque et applications aux triangles", link: "https://moutamadris.ma/cours/?s=thales+3eme+college", date: "2024-10-01" },
      { id: 403, title: "Trigonométrie dans le triangle rectangle", excerpt: "Sinus, cosinus, tangente — définitions et calculs", link: "https://moutamadris.ma/cours/?s=trigonometrie+3eme+college", date: "2024-10-15" },
      { id: 404, title: "Statistiques et probabilités", excerpt: "Fréquences, médiane, quartiles et notion de probabilité", link: "https://moutamadris.ma/cours/?s=statistiques+probabilites+3eme+college", date: "2024-11-01" },
    ],
    "pc": [
      { id: 420, title: "Les métaux et leurs réactions", excerpt: "Oxydation, réduction, corrosion et protection des métaux", link: "https://moutamadris.ma/cours/?s=metaux+reactions+3eme+college", date: "2024-09-01" },
      { id: 421, title: "La loi d'Ohm", excerpt: "Résistance électrique, loi d'Ohm et calcul dans un circuit", link: "https://moutamadris.ma/cours/?s=loi+ohm+3eme+college", date: "2024-10-01" },
      { id: 422, title: "Les mouvements et les forces", excerpt: "Types de mouvement, notion de force, Newton", link: "https://moutamadris.ma/cours/?s=mouvements+forces+3eme+college", date: "2024-11-01" },
    ],
    "svt": [
      { id: 440, title: "Le système nerveux", excerpt: "Structure, fonctionnement et maladies du système nerveux", link: "https://moutamadris.ma/cours/?s=systeme+nerveux+3eme+college", date: "2024-09-01" },
      { id: 441, title: "L'immunité et les défenses de l'organisme", excerpt: "Antigènes, anticorps, vaccination et SIDA", link: "https://moutamadris.ma/cours/?s=immunite+3eme+college", date: "2024-10-01" },
      { id: 442, title: "La génétique et l'hérédité", excerpt: "Chromosomes, ADN, gènes et transmission des caractères", link: "https://moutamadris.ma/cours/?s=genetique+heredite+3eme+college", date: "2024-11-01" },
    ],
    "francais": [
      { id: 460, title: "L'argumentation et le texte argumentatif", excerpt: "Thèse, arguments, exemples, réfutation et concession", link: "https://moutamadris.ma/cours/?s=argumentation+3eme+college", date: "2024-09-01" },
      { id: 461, title: "Le discours rapporté", excerpt: "Discours direct, indirect et les transformations", link: "https://moutamadris.ma/cours/?s=discours+rapporte+3eme+college", date: "2024-10-01" },
      { id: 462, title: "Le conditionnel et le subjonctif", excerpt: "Formation, valeurs et emploi du conditionnel et subjonctif", link: "https://moutamadris.ma/cours/?s=conditionnel+subjonctif+3eme+college", date: "2024-11-01" },
    ],
    "arabe": [
      { id: 480, title: "البلاغة العربية — المحسنات البديعية", excerpt: "الطباق، الجناس، التشبيه والاستعارة في النصوص الأدبية", link: "https://moutamadris.ma/cours/?s=بلاغة+السنة+الثالثة", date: "2024-09-01" },
      { id: 481, title: "النص الإقناعي والحجاج", excerpt: "بناء الحجة، الأساليب الإقناعية وتحليل النصوص", link: "https://moutamadris.ma/cours/?s=نص+إقناعي+السنة+الثالثة", date: "2024-10-01" },
    ],
    "hg": [
      { id: 500, title: "La mondialisation économique", excerpt: "Échanges commerciaux, multinationales et inégalités mondiales", link: "https://moutamadris.ma/cours/?s=mondialisation+3eme+college", date: "2024-09-01" },
      { id: 501, title: "Le Maroc contemporain", excerpt: "Indépendance, développement économique et défis actuels du Maroc", link: "https://moutamadris.ma/cours/?s=maroc+contemporain+3eme+college", date: "2024-10-01" },
    ],
    "islam": [
      { id: 520, title: "فقه العبادات — الصلاة والصيام", excerpt: "أحكام الصلاة وشروطها، فضائل الصيام وحكمه", link: "https://moutamadris.ma/cours/?s=فقه+عبادات+السنة+الثالثة", date: "2024-09-01" },
      { id: 521, title: "الإسلام والمجتمع", excerpt: "قيم التعايش، حقوق الإنسان في الإسلام، مفهوم المواطنة", link: "https://moutamadris.ma/cours/?s=إسلام+مجتمع+السنة+الثالثة", date: "2024-10-01" },
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niveau  = searchParams.get("niveau")  || "1ere";
  const matiere = searchParams.get("matiere") || "";
  const search  = searchParams.get("search")  || "";
  const page    = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const perPage = 18;

  const levelData = COURSES_DB[niveau] ?? {};

  // Get courses for requested subject or all subjects
  let courses: Course[] = matiere
    ? (levelData[matiere] ?? [])
    : Object.values(levelData).flat();

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    courses = courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.excerpt.toLowerCase().includes(q),
    );
  }

  // Pagination
  const total      = courses.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const paginated  = courses.slice((page - 1) * perPage, page * perPage);

  return NextResponse.json({ courses: paginated, total, totalPages });
}
