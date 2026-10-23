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
    name: "2ème Bac Sciences Mathématiques (A & B)",
    nameAr: "الثانية باكالوريا : شعبة العلوم الرياضية (أ / ب)",
    level: "2bac",
    subjects: ["الرياضيات (معامل 9)", "الفيزياء والكيمياء (معامل 7)", "علوم الحياة والأرض (معامل 3)", "الفلسفة (معامل 2)", "اللغة الإنجليزية (معامل 2)"],
    description: "البنيات الجبرية، الحسابيات في Z، الفضاءات المتجهية، دراسة الدوال والتكامل، الميكانيكا التحليلية والكهرباء المتقدمة.",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  {
    id: "2bac-pc",
    name: "2ème Bac Sciences Physiques (BIOF)",
    nameAr: "الثانية باكالوريا : مسلك العلوم الفيزيائية (خيار فرنسية وعربية)",
    level: "2bac",
    subjects: ["الفيزياء والكيمياء (معامل 7)", "الرياضيات (معامل 7)", "علوم الحياة والأرض (معامل 5)", "الفلسفة (معامل 2)", "اللغة الإنجليزية (معامل 2)"],
    description: "الموجات الميكانيكية، التحولات النووية، الكهرباء والدارة RLC، قوانين نيوتن، الكيمياء وحمض-قاعدة، التحليل والدوال الأسية واللوغاريتمية.",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "2bac-svt",
    name: "2ème Bac Sciences de la Vie et de la Terre",
    nameAr: "الثانية باكالوريا : مسلك علوم الحياة والأرض",
    level: "2bac",
    subjects: ["علوم الحياة والأرض (معامل 7)", "الفيزياء والكيمياء (معامل 5)", "الرياضيات (معامل 7)", "الفلسفة (معامل 2)", "اللغة الإنجليزية (معامل 2)"],
    description: "استهلاك المادة العضوية وتدفق الطاقة، الوراثة البشرية والوراثة المندلية، المناعة، والظواهر الجيولوجية المصاحبة لنشوء السلاسل الجبلية.",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
  },
  {
    id: "2bac-eco",
    name: "2ème Bac Sciences Économiques & Gestion",
    nameAr: "الثانية باكالوريا : شعبة العلوم الاقتصادية والتدبير المحاسباتي",
    level: "2bac",
    subjects: ["الاقتصاد العام والإحصاء (معامل 6)", "المحاسبة والرياضيات المالية (معامل 4)", "تنظيم المقاولات (معامل 3)", "الرياضيات (معامل 4)", "الفلسفة (معامل 2)"],
    description: "المجاميع الاقتصادية، السوق والأسعار، السياسة الاقتصادية والمالية، التجارة الخارجية، أعمال نهاية الدورة، وتحليل المردودية.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "1bac-reg",
    name: "1ère Bac - Examen Régional Unifié",
    nameAr: "الأولى باكالوريا : الامتحان الجهوي الموحد لجميع الشعب العلمية",
    level: "1bac",
    subjects: ["اللغة الفرنسية (معامل 4)", "التربية الإسلامية (معامل 2)", "التاريخ والجغرافيا (معامل 2)", "اللغة العربية (معامل 2)"],
    description: "المؤلفات المعتمدة (La Boîte à Merveilles, Antigone, Le Dernier Jour d'un Condamné)، سورة يوسف، التحولات الكبرى للعالم الرأسمالي والمغرب في مواجهة الضغوط الاستعمارية.",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "college-3ac",
    name: "3ème Année Collège - Examen Normalisé",
    nameAr: "الثالثة إعدادي : الامتحان الموحد الجهوي لنيل شهادة السلك الإعدادي",
    level: "college",
    subjects: ["الرياضيات (معامل 3)", "الفيزياء والكيمياء (معامل 2)", "علوم الحياة والأرض (معامل 2)", "اللغة الفرنسية (معامل 3)", "اللغة العربية (معامل 3)"],
    description: "مبرهنتا طاليس وفيثاغورس، الحساب المثلثي، المتطابقات الهامة، الحركة والسرعة، المحاليل الحمضية والقاعدية، وظائف الاقتيات والدوران والتربية الغذائية.",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
  },
];

export type MinistryTextbook = {
  id: string;
  title: string;
  subject: string;
  level: string;
  publisher: string;
  officialApproval: string;
  coverImage: string;
  keyUnits: string[];
  summary: string;
};

export const MINISTRY_TEXTBOOKS: MinistryTextbook[] = [
  {
    id: "tb-math-moufid",
    title: "المفيد في الرياضيات (Al-Moufid en Mathématiques)",
    subject: "الرياضيات",
    level: "الثانية باكالوريا علوم تجريبية ورياضية",
    publisher: "دار الثقافة - الدار البيضاء",
    officialApproval: "تأكد من الطبعة المقررة مع أستاذك",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["الاتصال والاشتقاق", "المتتاليات العددية", "الدوال اللوغاريتمية والأسية", "الحساب التكاملي والمعادلات التفاضلية", "الأعداد العقدية والهندسة الفضائية"],
    summary: "مرجع شامل يتضمن أنشطة تمهيدية، براهين القواعد، ونماذج تمارين تطبيقية ومسائل مركبة تحاكي الامتحان الوطني.",
  },
  {
    id: "tb-pc-rihab",
    title: "في رحاب العلوم الفيزيائية (Étincelle / Rihab PC)",
    subject: "الفيزياء والكيمياء",
    level: "الثانية باكالوريا علوم فيزيائية ورياضية",
    publisher: "دار نشر المعرفة - الرباط",
    officialApproval: "تأكد من الطبعة المقررة مع أستاذك",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["الموجات الميكانيكية والضوئية", "التحولات النووية والتناقص الإشعاعي", "الكهرباء: ثنائيات القطب RC وRL وRLC", "الميكانيكا وقوانين نيوتن وحركة القذائف والأقمار", "الكيمياء: التحولات السريعة والبطيئة، والتفاعلات حمض-قاعدة"],
    summary: "مرجع مفيد للتجارب المخبرية والدراسات النظرية، مدعم بتطبيقات دقيقة للمنحنيات الطاقية ومعالجة المعطيات التجريبية.",
  },
  {
    id: "tb-svt-rihab",
    title: "في رحاب علوم الحياة والأرض (SVT Maroc)",
    subject: "علوم الحياة والأرض",
    level: "الثانية باكالوريا مسلك SVT وPC",
    publisher: "مكتبة المعارف - الرباط",
    officialApproval: "تأكد من الطبعة المقررة مع أستاذك",
    coverImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["استهلاك المادة العضوية وتدفق الطاقة (التنفس والتخمر وATP)", "طبيعة الخبر الوراثي وآلية تعبيره", "الهندسة الوراثية وتطبيقاتها", "علم المناعة: الذاتي وغير الذاتي واعتلالات الجهاز المناعي", "الظواهر الجيولوجية وحركية الصفائح"],
    summary: "يتيح للتلميذ التمكن من منهجية استثمار الوثائق العلمية، وصياغة الفرضيات، والتحليل البياني المنهجي وفق المعايير الرسمية.",
  },
  {
    id: "tb-philo-rihab",
    title: "في رحاب الفلسفة (Philosophie Maroc)",
    subject: "الفلسفة",
    level: "الثانية باكالوريا - جميع الشعب",
    publisher: "دار الأمان للنشر والتوزيع",
    officialApproval: "تأكد من الطبعة المقررة مع أستاذك",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["مجزوءة الوضع البشري (الشخص والغير)", "مجزوءة المعرفة (النظرية والتجربة والحقيقة)", "مجزوءة السياسة (الدولة والحق والعدالة)", "مجزوءة الأخلاق (الواجب والسعادة والحرية)"],
    summary: "شرح معمق لإشكالات النصوص، والمفاهيم الفلسفية الأساسية، مع آليات الكتابة الإنشائية الفلسفية (صيغة النص، صيغة السؤال، وصيغة القولة).",
  },
  {
    id: "tb-fr-oeuvres",
    title: "المؤلفات الرسمية المقررة في اللغة الفرنسية (Les Œuvres au Programme)",
    subject: "اللغة الفرنسية",
    level: "الأولى باكالوريا - الامتحان الجهوي الموحد",
    publisher: "المؤلفات المقررة",
    officialApproval: "تأكد من لائحة المؤلفات المقررة هذا العام",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["La Boîte à Merveilles (Ahmed Sefrioui) - Roman autobiographique", "Antigone (Jean Anouilh) - Tragédie moderne", "Le Dernier Jour d'un Condamné (Victor Hugo) - Roman à thèse", "Module de Production Écrite & Argumentation (Plans: dialectique, thématique, analytique)"],
    summary: "تحليل شامل لكل فصل ومشهد، دراسة الحقول الدلالية والأساليب البلاغية (Figures de style)، مع مواضيع إنشاء نموذجية مصححة بالسلم.",
  },
  {
    id: "tb-islamic-rihab",
    title: "في رحاب التربية الإسلامية (Éducation Islamique)",
    subject: "التربية الإسلامية",
    level: "الأولى باكالوريا - الامتحان الجهوي",
    publisher: "حسب المؤسسة",
    officialApproval: "تأكد من الطبعة المقررة مع أستاذك",
    coverImage: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
    keyUnits: ["سورة يوسف دراسة وتدبراً وحفظاً", "مدخل التزكية: الإيمان والغيب، الإيمان والعلم، الإيمان والفلسفة", "مدخل الاقتداء: صلح الحديبية وفتح مكة", "مدخل الاستجابة: فقه الأسرة (الزواج، الطلاق، رعاية الأطفال)", "مدخل القسط والحكمة"],
    summary: "منهجية معالجة الوضعية المشكلة التقويمية، واستخراج القيم والأحكام الشرعية، والاستدلال بالنصوص القرآنية من سورة يوسف.",
  },
];

export type MinistryFramework = {
  id: string;
  trackId: string;
  subject: string;
  circularNumber: string;
  duration: string;
  coefficient: number;
  domains: { name: string; weight: string; description: string }[];
  skillDistribution: { skill: string; percentage: string }[];
};

export const MINISTRY_FRAMEWORKS: MinistryFramework[] = [
  {
    id: "mf-2bac-pc-math",
    trackId: "2bac-pc",
    subject: "الرياضيات",
    circularNumber: "توزيع تقريبي - راجع الإطار المرجعي الرسمي",
    duration: "3 ساعات",
    coefficient: 7,
    domains: [
      { name: "التحليل ودراسة الدوال العددية", weight: "55% (11 نقطة)", description: "الاتصال، النهايات، الاشتقاق، الدوال الأسية واللوغاريتمية، الحساب التكاملي، المعادلات التفاضلية." },
      { name: "الأعداد العقدية", weight: "15% (3 نقط)", description: "الشكل الجبري والمثلثي والأسى، التحويلات الاعتيادية في المستوى العقدي (الإزاحة، التحاكي، الدوران)." },
      { name: "الهندسة الفضائية", weight: "15% (3 نقط)", description: "الجداء السلمي والمتجهي، معادلة الفلكة، تقاطع مستقيم ومستوى، المسافات والمساحات." },
      { name: "الحسابيات والاحتمالات", weight: "15% (3 نقط)", description: "العد والاحتمالات الشرطية والمتغير العشوائي، وحساب الاحتمال بالأحداث المستقلة." },
    ],
    skillDistribution: [
      { skill: "استرداد المعارف وتطبيق القواعد المباشرة", percentage: "35%" },
      { skill: "حل تمارين تطبيقية مركبة والاستدلال الرياضي", percentage: "50%" },
      { skill: "معالجة وضعية مسألة جديدة وتوليف المعطيات", percentage: "15%" },
    ],
  },
  {
    id: "mf-2bac-pc-pc",
    trackId: "2bac-pc",
    subject: "الفيزياء والكيمياء",
    circularNumber: "توزيع تقريبي - راجع الإطار المرجعي الرسمي",
    duration: "3 ساعات",
    coefficient: 7,
    domains: [
      { name: "الكيمياء (جزأين)", weight: "35% (7 نقط)", description: "التحولات السريعة والبطيئة، التوازن الكيميائي، المعايرة البي إتشية، التحولات التلقائية في الأعمدة." },
      { name: "الموجات والتحولات النووية", weight: "25% (5 نقط)", description: "الموجات الميكانيكية والضوئية، التناقص الإشعاعي، الطاقة والكتلة والانشطار والاندماج." },
      { name: "الكهرباء (ثنائيات القطب)", weight: "25% (5 نقط)", description: "شحن وتفريغ مكثف RC، إقامة التيار في وشيعة RL، الدارات المتذبذبة RLC الحرة والمصونة." },
      { name: "الميكانيكا الكلاسيكية", weight: "15% (3 نقط)", description: "قوانين نيوتن الثلاثة، السقوط الرأسي باحتكاك وبدونه، حركة قذيفة في مجال ثقالة منتظم." },
    ],
    skillDistribution: [
      { skill: "استحضار التعاريف والوحدات الفيزيائية", percentage: "25%" },
      { skill: "استثمار المنحنيات البيانية والقياسات", percentage: "50%" },
      { skill: "البرهنة الرياضية واستخلاص النتائج الفيزيائية", percentage: "25%" },
    ],
  },
  {
    id: "mf-1bac-francais",
    trackId: "1bac-reg",
    subject: "اللغة الفرنسية",
    circularNumber: "توزيع تقريبي - راجع الإطار المرجعي الرسمي",
    duration: "ساعتان",
    coefficient: 4,
    domains: [
      { name: "Étude de texte (دراسة النص)", weight: "50% (10 نقط)", description: "Contextualisation (Situation du passage), Analyse (Figures de style, lexique), Réaction personnelle." },
      { name: "Production écrite (التعبير والإنشاء)", weight: "50% (10 نقط)", description: "Sujet d'argumentation en lien avec les thèmes des œuvres (Ex: La superstition, la justice, le conflit des générations)." },
    ],
    skillDistribution: [
      { skill: "Compréhension et analyse textuelle", percentage: "50%" },
      { skill: "Cohérence de l'argumentation et rigueur de la langue", percentage: "50%" },
    ],
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
    title: "نموذج تدريبي - الرياضيات (مسلك العلوم الفيزيائية)",
    trackId: "2bac-pc",
    year: "2024",
    session: "العادية",
    subject: "الرياضيات",
    duration: "3 ساعات",
    coef: 7,
    featuredExercise: "دراسة دالة أسية مركبة مع حساب التكامل والمساحة، المتتاليات التراجعية والأعداد العقدية.",
    solutionSummary: "تصحيح منهجي مفصل خطوة بخطوة.",
  },
  {
    id: "bac-pc-physique-2024",
    title: "نموذج تدريبي - الفيزياء والكيمياء (مسلك العلوم الفيزيائية)",
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
    title: "نموذج تدريبي - الرياضيات (شعبة العلوم الرياضية)",
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
    title: "نموذج تدريبي - اللغة الفرنسية (الجهوي الأولى باك)",
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
