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
    name: "2ème Bac Sciences Mathématiques",
    nameAr: "الثانية باكالوريا : شعبة العلوم الرياضية (أ / ب)",
    level: "2bac",
    subjects: ["الرياضيات (Maths)", "الفيزياء والكيمياء (PC)", "علوم الحياة والأرض (SVT)", "الفلسفة", "اللغة الإنجليزية"],
    description: "البنيات الجبرية، الحسابيات، التحليل المتقدم، المعادلات التفاضلية، الميكانيكا الكلاسيكية والكهرباء.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "2bac-pc",
    name: "2ème Bac Sciences Physiques",
    nameAr: "الثانية باكالوريا : شعبة العلوم التجريبية مسلك العلوم الفيزيائية",
    level: "2bac",
    subjects: ["الفيزياء والكيمياء", "الرياضيات", "علوم الحياة والأرض", "الفلسفة", "اللغة الإنجليزية"],
    description: "الموجات الميكانيكية، التحولات النووية، الكهرباء والدارة RLC، قوانين نيوتن، الكيمياء وحمض-قاعدة، دراسة الدوال والتكامل.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "2bac-svt",
    name: "2ème Bac Sciences de la Vie et de la Terre",
    nameAr: "الثانية باكالوريا : مسلك علوم الحياة والأرض",
    level: "2bac",
    subjects: ["علوم الحياة والأرض", "الفيزياء والكيمياء", "الرياضيات", "الفلسفة", "اللغة الإنجليزية"],
    description: "استهلاك المادة العضوية وتدفق الطاقة، الوراثة البشرية ووراثة الساكنة، المناعة، والجيولوجيا التكتونية.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
  },
  {
    id: "2bac-eco",
    name: "2ème Bac Sciences Économiques & Gestion",
    nameAr: "الثانية باكالوريا : شعبة العلوم الاقتصادية والتدبير",
    level: "2bac",
    subjects: ["الاقتصاد العام والإحصاء", "المحاسبة والرياضيات المالية", "تنظيم المقاولات", "الفلسفة"],
    description: "المجاميع الاقتصادية، السياسة النقدية والمالية، التجارة الخارجية، التحليل المحاسبي وحساب الاستهلاك.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "1bac-reg",
    name: "1ère Bac - Examen Régional",
    nameAr: "الأولى باكالوريا : الامتحان الجهوي الموحد",
    level: "1bac",
    subjects: ["اللغة الفرنسية", "التربية الإسلامية", "التاريخ والجغرافيا", "اللغة العربية"],
    description: "مؤلفات الفرنسية (صندوق العجائب، أنتيغون، آخر يوم لمحكوم بالإعدام)، سورة يوسف، وتاريخ المغرب والعالم المعاصر.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "college-3ac",
    name: "3ème Année Collège",
    nameAr: "الثالثة إعدادي : الامتحان الموحد لنيل شهادة السلك الإعدادي",
    level: "college",
    subjects: ["الرياضيات", "الفيزياء والكيمياء", "علوم الحياة والأرض", "اللغة الفرنسية", "اللغة العربية"],
    description: "مبرهنة طاليس وفيتاغورس، الحساب المثلثي، المعادلات والمتراجحات، الحركة والسرعة، والمحاليل المائية.",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
  },
];

export type SampleExam = {
  id: string;
  title: string;
  trackId: string;
  year: string;
  session: "العادية" | "الاستدراكية";
  subject: string;
  duration: string;
  coef: number;
  featuredExercise: string;
  solutionSummary: string;
};

export const SAMPLE_EXAMS: SampleExam[] = [
  {
    id: "bac-pc-math-2024",
    title: "الامتحان الوطني الموحد 2024 - مادة الرياضيات (الدورة العادية)",
    trackId: "2bac-pc",
    year: "2024",
    session: "العادية",
    subject: "الرياضيات",
    duration: "3 ساعات",
    coef: 7,
    featuredExercise: "دراسة دالة أسية مركبة مع حساب التكامل والمساحة، المتتاليات التراجعية والأعداد العقدية.",
    solutionSummary: "تصحيح منهجي مفصل خطوة بخطوة وفق عناصر الإجابة وسلم التنقيط الرسمي لوزارة التربية الوطنية.",
  },
  {
    id: "bac-pc-physique-2024",
    title: "الامتحان الوطني الموحد 2024 - مادة الفيزياء والكيمياء",
    trackId: "2bac-pc",
    year: "2024",
    session: "العادية",
    subject: "الفيزياء والكيمياء",
    duration: "3 ساعات",
    coef: 7,
    featuredExercise: "الموجات الميكانيكية المتوالية، دراسة الدارة الكهربائية RLC المتذبذبة، والسقوط الرأسي باحتكاك في مائع.",
    solutionSummary: "تحديد المعادلات التفاضلية وتطبيق القانون الثاني لنيوتن مع التفسير العلمي الدقيق للظواهر الفيزيائية.",
  },
  {
    id: "bac-sm-math-2024",
    title: "الامتحان الوطني الموحد 2024 - مادة الرياضيات (شعبة العلوم الرياضية)",
    trackId: "2bac-sm",
    year: "2024",
    session: "العادية",
    subject: "الرياضيات",
    duration: "4 ساعات",
    coef: 9,
    featuredExercise: "البنيات الجبرية وقوانين التركيب الداخلي، الحسابيات في مجموعة الأعداد الصحيحة، ومسألة التحليل الشاملة.",
    solutionSummary: "براهين رياضية صارمة ومفصلة مع نصائح لتفادي الأخطاء الشائعة في الامتحانات الوطنية.",
  },
  {
    id: "reg-1bac-francais-2024",
    title: "الامتحان الجهوي الموحد 2024 - مادة اللغة الفرنسية (جهة الدار البيضاء - سطات)",
    trackId: "1bac-reg",
    year: "2024",
    session: "العادية",
    subject: "اللغة الفرنسية",
    duration: "ساعتان",
    coef: 4,
    featuredExercise: "دراسة نص من مؤلف 'Le Dernier Jour d'un Condamné' : استخراج الصور البلاغية مع موضوع إنشاء تحليلي.",
    solutionSummary: "تصميم منهجي متكامل للإنشاء (Plan dialectique) مع توظيف الروابط المنطقية والحجج المقنعة والأسلوب السليم.",
  },
];
