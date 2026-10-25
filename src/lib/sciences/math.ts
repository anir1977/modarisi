// Mathematics, 2nd year bac — sciences expérimentales (PC, SVT) & agronomic sciences.
// Chapter list follows the official programme order. Original summaries written for modarisi.ma.
// NOTE: bodies use String.raw; never write a dollar sign directly followed by "{".
import type { SciLesson } from "./types";

const r = String.raw;
const TRACKS = "علوم فيزيائية · علوم الحياة والأرض · علوم زراعية";

export const MATH_LESSONS: SciLesson[] = [
  {
    slug: "an-nihayat-wa-al-ittisal",
    subject: "math",
    order: 1,
    part: "التحليل",
    title: "النهايات والاتصال",
    tracks: TRACKS,
    intro: "يستكمل هذا الدرس دراسة النهايات ويقدم مفهوم الاتصال ونتائجه الأساسية: مبرهنة القيم الوسيطية، والدالة العكسية، ودالة الجذر من الرتبة n.",
    sections: [
      {
        heading: "النهايات: تذكير وعمليات",
        body: r`- نهايات الدوال المرجعية: $\lim_{x\to+\infty} x^n=+\infty$، $\lim_{x\to+\infty}\frac{1}{x}=0$، $\lim_{x\to+\infty}\sqrt{x}=+\infty$.
- **الأشكال غير المحددة**: $\infty-\infty$، $0\times\infty$، $\frac{\infty}{\infty}$، $\frac{0}{0}$. نزيلها بالتعميل، أو بالضرب في المرافق، أو باستعمال النهايات الاعتيادية.
- نهاية دالة حدودية أو جذرية عند $\pm\infty$ هي نهاية حدها الأكبر درجة (أو خارج الحدين الأكبر درجة).
- نهايات مثلثية: $\lim_{x\to0}\frac{\sin x}{x}=1$ و $\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$.`,
      },
      {
        heading: "النهايات والترتيب",
        body: r`- إذا كان $f(x)\ge g(x)$ بجوار $+\infty$ و $\lim g=+\infty$ فإن $\lim f=+\infty$.
- **مبرهنة الدرك**: إذا كان $g(x)\le f(x)\le h(x)$ و $\lim g=\lim h=\ell$ فإن $\lim f=\ell$.
- إذا كان $|f(x)-\ell|\le u(x)$ و $\lim u=0$ فإن $\lim f=\ell$.`,
      },
      {
        heading: "الاتصال",
        body: r`- تكون $f$ متصلة في $a$ إذا كان $\lim_{x\to a}f(x)=f(a)$.
- الدوال الحدودية والجذرية (على مجموعة تعريفها) و $\sin$ و $\cos$ و $\sqrt{\ }$ متصلة.
- مجموع وجداء وخارج (مقام غير منعدم) ومركب دوال متصلة: دالة متصلة.
- **صورة مجال بدالة متصلة** هي مجال. إذا كانت $f$ متصلة وتزايدية قطعاً على $[a,b]$ فإن $f([a,b])=[f(a),f(b)]$.`,
      },
      {
        heading: "مبرهنة القيم الوسيطية",
        body: r`إذا كانت $f$ متصلة على $[a,b]$ و $f(a)\times f(b)<0$ فإن المعادلة $f(x)=0$ تقبل **على الأقل** حلاً في $]a,b[$.

وإذا كانت $f$ إضافة إلى ذلك **رتيبة قطعاً** على $[a,b]$، فإن الحل **وحيد**.

تطبيق: طريقة التفرع الثنائي (dichotomie) لإيجاد تأطير للحل $\alpha$ بسعة معينة.`,
      },
      {
        heading: "الدالة العكسية",
        body: r`إذا كانت $f$ متصلة ورتيبة قطعاً على مجال $I$، فإنها تقابل من $I$ نحو $J=f(I)$، وتقبل دالة عكسية $f^{-1}$ معرفة على $J$:

$$f^{-1}(y)=x \iff f(x)=y \quad (x\in I,\ y\in J)$$

- $f^{-1}$ متصلة على $J$ ولها نفس رتابة $f$.
- منحنى $f^{-1}$ هو مماثل منحنى $f$ بالنسبة للمستقيم $y=x$ (في معلم متعامد ممنظم).`,
      },
      {
        heading: "دالة الجذر من الرتبة n",
        body: r`الدالة $x\mapsto x^n$ تقابل من $[0,+\infty[$ نحو $[0,+\infty[$، ودالتها العكسية هي $x\mapsto\sqrt[n]{x}$.

- $\sqrt[n]{x}=y \iff y^n=x$ (مع $x\ge0$ و $y\ge0$).
- $\sqrt[n]{a}\times\sqrt[n]{b}=\sqrt[n]{ab}$ و $\left(\sqrt[n]{a}\right)^n=a$.
- القوة الجذرية: $a^{\frac{p}{q}}=\sqrt[q]{a^p}$ لكل $a>0$.`,
      },
    ],
    formulas: [
      { label: "نهاية مثلثية", tex: r`\lim_{x\to0}\frac{\sin x}{x}=1` },
      { label: "تعريف الاتصال", tex: r`\lim_{x\to a}f(x)=f(a)` },
      { label: "الجذر من الرتبة n", tex: r`\sqrt[n]{x}=y\iff y^n=x` },
    ],
    method: [
      "لإثبات أن المعادلة تقبل حلاً وحيداً: اذكر الاتصال، ثم الرتابة القطعية، ثم احسب $f(a)\\times f(b)<0$.",
      "لا تنسَ تحديد المجال $J=f(I)$ قبل الحديث عن الدالة العكسية.",
    ],
  },
  {
    slug: "al-ishtiqaq-wa-dirasat-ad-dawal",
    subject: "math",
    order: 2,
    part: "التحليل",
    title: "الاشتقاق ودراسة الدوال",
    tracks: TRACKS,
    intro: "الاشتقاق أداة أساسية لدراسة تغيرات دالة وتحديد مطاريفها ومماساتها، ودراسة الدوال هي أكثر تمرين حضوراً في الامتحان الوطني.",
    sections: [
      {
        heading: "قابلية الاشتقاق والمماس",
        body: r`- تكون $f$ قابلة للاشتقاق في $a$ إذا كانت النهاية $\lim_{x\to a}\frac{f(x)-f(a)}{x-a}$ منتهية، ونرمز لها بـ $f'(a)$.
- معادلة المماس في النقطة ذات الأفصول $a$: $y=f'(a)(x-a)+f(a)$.
- قابلية الاشتقاق على اليمين وعلى اليسار؛ وإذا كانت النهاية لا نهائية فإن المنحنى يقبل **مماساً عمودياً**.
- كل دالة قابلة للاشتقاق في $a$ متصلة في $a$ (العكس غير صحيح).`,
      },
      {
        heading: "المشتقات وقواعد الاشتقاق",
        body: r`| الدالة | المشتقة |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $\sqrt{x}$ | $\frac{1}{2\sqrt{x}}$ |
| $\sin x$ / $\cos x$ | $\cos x$ / $-\sin x$ |
| $u\cdot v$ | $u'v+uv'$ |
| $\frac{u}{v}$ | $\frac{u'v-uv'}{v^2}$ |
| $u^n$ | $nu'u^{n-1}$ |
| $\sqrt{u}$ | $\frac{u'}{2\sqrt{u}}$ |
| $v\circ u$ | $u'\times v'\circ u$ |

مشتقة الدالة العكسية: $(f^{-1})'(y)=\frac{1}{f'(f^{-1}(y))}$ إذا كان $f'(f^{-1}(y))\ne0$.`,
      },
      {
        heading: "الرتابة والمطاريف",
        body: r`- إذا كان $f'\ge0$ على $I$ (ولا تنعدم إلا في نقط معزولة) فإن $f$ تزايدية قطعاً على $I$.
- إذا انعدمت $f'$ في $a$ وتغيرت إشارتها، فإن $f(a)$ قيمة قصوى أو دنيا محلية.`,
      },
      {
        heading: "التقعر ونقط الانعطاف",
        body: r`- إذا كانت $f''\ge0$ على $I$ فإن المنحنى محدب (يوجد فوق مماساته)، وإذا كانت $f''\le0$ فهو مقعر.
- إذا انعدمت $f''$ في $a$ وتغيرت إشارتها، فإن النقطة $(a,f(a))$ نقطة انعطاف.`,
      },
      {
        heading: "الفروع اللانهائية والتماثل",
        body: r`- $\lim_{x\to a}f(x)=\pm\infty$: مقارب عمودي معادلته $x=a$.
- $\lim_{x\to\pm\infty}f(x)=b$: مقارب أفقي معادلته $y=b$.
- $\lim_{x\to\pm\infty}[f(x)-(ax+b)]=0$: المستقيم $y=ax+b$ مقارب مائل.
- إذا كان $\lim\frac{f(x)}{x}=\pm\infty$: فرع شلجمي في اتجاه محور الأراتيب؛ وإذا كان $\lim\frac{f(x)}{x}=0$: فرع شلجمي في اتجاه محور الأفاصيل.
- محور التماثل $x=a$: $f(2a-x)=f(x)$؛ مركز التماثل $\Omega(a,b)$: $f(2a-x)+f(x)=2b$.`,
      },
    ],
    formulas: [
      { label: "معادلة المماس", tex: r`y=f'(a)(x-a)+f(a)` },
      { label: "مشتقة خارج", tex: r`\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}` },
      { label: "مشتقة الدالة العكسية", tex: r`(f^{-1})'(y)=\frac{1}{f'(f^{-1}(y))}` },
    ],
    method: [
      "خطة دراسة دالة: مجموعة التعريف ← النهايات والفروع اللانهائية ← المشتقة وإشارتها ← جدول التغيرات ← المنحنى.",
      "لدراسة الوضع النسبي للمنحنى والمقارب، ادرس إشارة $f(x)-(ax+b)$.",
    ],
  },
  {
    slug: "al-mutatalyat-al-adadiya",
    subject: "math",
    order: 3,
    part: "التحليل",
    title: "المتتاليات العددية",
    tracks: TRACKS,
    intro: "يتناول الدرس المتتاليات الحسابية والهندسية، والمتتاليات المكبورة والمصغورة والرتيبة، ونهايات المتتاليات وتقاربها.",
    sections: [
      {
        heading: "المتتالية الحسابية والهندسية",
        body: r`| | حسابية أساسها $r$ | هندسية أساسها $q$ |
|---|---|---|
| التعريف | $u_{n+1}=u_n+r$ | $u_{n+1}=q\,u_n$ |
| الحد العام | $u_n=u_p+(n-p)r$ | $u_n=u_p\,q^{\,n-p}$ |
| المجموع | (عدد الحدود) × (الأول + الأخير) ÷ 2 | الحد الأول × $\frac{1-q^{N}}{1-q}$ حيث $N$ عدد الحدود و $q\ne1$ |`,
      },
      {
        heading: "الرتابة والتأطير",
        body: r`- تكون $(u_n)$ تزايدية إذا كان $u_{n+1}-u_n\ge0$ لكل $n$ (أو $\frac{u_{n+1}}{u_n}\ge1$ إذا كانت الحدود موجبة قطعاً).
- مكبورة بـ $M$: $u_n\le M$؛ مصغورة بـ $m$: $u_n\ge m$.
- **البرهان بالترجع**: نتحقق من الخاصية من أجل الحد الأول، ونفترض صحتها من أجل $n$ ونبرهن صحتها من أجل $n+1$.`,
      },
      {
        heading: "نهاية متتالية",
        body: r`- نهاية $q^n$: إذا كان $q>1$ فإن $\lim q^n=+\infty$؛ وإذا كان $-1<q<1$ فإن $\lim q^n=0$؛ وإذا كان $q=1$ فإن النهاية 1؛ وإذا كان $q\le-1$ فليس لها نهاية.
- نهاية $n^\alpha$ ($\alpha>0$) هي $+\infty$.
- **كل متتالية تزايدية ومكبورة متقاربة**، وكل متتالية تناقصية ومصغورة متقاربة.
- المتتاليات من نوع $u_{n+1}=f(u_n)$: إذا كانت متقاربة نحو $\ell$ و $f$ متصلة في $\ell$، فإن $\ell$ حل للمعادلة $f(x)=x$.`,
      },
    ],
    formulas: [
      { label: "الحد العام لمتتالية هندسية", tex: r`u_n=u_0\,q^{\,n}` },
      { label: "مجموع حدود متتالية هندسية", tex: r`u_0+\dots+u_{n}=u_0\,\frac{1-q^{\,n+1}}{1-q}` },
    ],
    method: [
      "في التمرين الكلاسيكي: برهن بالترجع على التأطير، ثم الرتابة، ثم استنتج التقارب، ثم احسب النهاية بحل $f(x)=x$.",
      "لإثبات أن $(v_n)$ هندسية: احسب $v_{n+1}$ بدلالة $v_n$ وبيّن أن $v_{n+1}=q\\,v_n$.",
    ],
  },
  {
    slug: "ad-dawal-al-asliya",
    subject: "math",
    order: 4,
    part: "التحليل",
    title: "الدوال الأصلية",
    tracks: TRACKS,
    intro: "الدالة الأصلية هي عملية عكسية للاشتقاق، وهي أساس حساب التكامل وحل بعض المعادلات التفاضلية.",
    sections: [
      {
        heading: "التعريف والخاصيات",
        body: r`- تكون $F$ دالة أصلية لـ $f$ على المجال $I$ إذا كانت $F$ قابلة للاشتقاق على $I$ و $F'=f$.
- **كل دالة متصلة على مجال تقبل دوال أصلية**، وتختلف فيما بينها بثابتة: $G=F+c$.
- توجد دالة أصلية وحيدة تأخذ قيمة معينة $y_0$ في نقطة $x_0$.`,
      },
      {
        heading: "جدول الدوال الأصلية",
        body: r`| الدالة $f$ | دالة أصلية $F$ |
|---|---|
| $x^n$ ($n\ne-1$) | $\frac{x^{n+1}}{n+1}$ |
| $\frac{1}{\sqrt{x}}$ | $2\sqrt{x}$ |
| $\cos x$ / $\sin x$ | $\sin x$ / $-\cos x$ |
| $u'u^n$ | $\frac{u^{n+1}}{n+1}$ |
| $\frac{u'}{\sqrt{u}}$ | $2\sqrt{u}$ |
| $\frac{u'}{u^2}$ | $-\frac{1}{u}$ |
| $\frac{u'}{u}$ | $\ln\lvert u\rvert$ |
| $u'e^{u}$ | $e^{u}$ |`,
      },
    ],
    method: ["تعرّف على الشكل $u'u^n$ أو $\\frac{u'}{u}$ قبل البحث عن الدالة الأصلية، وعدّل المعامل إن لزم."],
  },
  {
    slug: "ad-dawal-al-lughaarithmiya",
    subject: "math",
    order: 5,
    part: "التحليل",
    title: "الدوال اللوغاريتمية",
    tracks: TRACKS,
    intro: "دالة اللوغاريتم النبيري $\\ln$ هي الدالة الأصلية للدالة $x\\mapsto\\frac1x$ على $]0,+\\infty[$ التي تنعدم في 1.",
    sections: [
      {
        heading: "التعريف والخاصيات الجبرية",
        body: r`- $\ln$ معرفة على $]0,+\infty[$، و $\ln 1=0$، و $\ln e=1$ (حيث $e\approx2{,}718$).
- لكل $a>0$ و $b>0$: $\ln(ab)=\ln a+\ln b$، $\ln\frac{a}{b}=\ln a-\ln b$، $\ln a^r=r\ln a$.
- $\ln a=\ln b\iff a=b$ و $\ln a<\ln b\iff a<b$.`,
      },
      {
        heading: "الدراسة",
        body: r`- $(\ln x)'=\frac1x>0$: الدالة تزايدية قطعاً على $]0,+\infty[$.
- $\lim_{x\to0^+}\ln x=-\infty$ و $\lim_{x\to+\infty}\ln x=+\infty$.
- **نهايات اعتيادية**: $\lim_{x\to+\infty}\frac{\ln x}{x}=0$، $\lim_{x\to0^+}x\ln x=0$، $\lim_{x\to1}\frac{\ln x}{x-1}=1$، $\lim_{x\to0}\frac{\ln(1+x)}{x}=1$.
- $(\ln u)'=\frac{u'}{u}$ حيث $u>0$.`,
      },
      {
        heading: "اللوغاريتم للأساس a",
        body: r`$\log_a x=\frac{\ln x}{\ln a}$ ($a>0$، $a\ne1$). وحالة خاصة: اللوغاريتم العشري $\log x=\frac{\ln x}{\ln 10}$، مع $\log 10^n=n$.`,
      },
    ],
    formulas: [
      { label: "لوغاريتم جداء", tex: r`\ln(ab)=\ln a+\ln b` },
      { label: "نهاية اعتيادية", tex: r`\lim_{x\to+\infty}\frac{\ln x}{x}=0` },
      { label: "مشتقة", tex: r`(\ln u)'=\frac{u'}{u}` },
    ],
    method: ["قبل حل معادلة أو متراجحة لوغاريتمية: حدد مجموعة التعريف أولاً، ثم تحقق من أن الحلول تنتمي إليها."],
  },
  {
    slug: "ad-dawal-al-usiya",
    subject: "math",
    order: 6,
    part: "التحليل",
    title: "الدوال الأسية",
    tracks: TRACKS,
    intro: "الدالة الأسية النبيرية $\\exp$ هي الدالة العكسية للدالة $\\ln$، ونكتب $\\exp(x)=e^x$.",
    sections: [
      {
        heading: "التعريف والخاصيات",
        body: r`- $e^x$ معرفة على $\mathbb{R}$ وموجبة قطعاً: $e^x>0$.
- $e^x=y\iff x=\ln y$ ($y>0$)، و $\ln(e^x)=x$ و $e^{\ln x}=x$ ($x>0$).
- $e^{a+b}=e^ae^b$، $e^{-a}=\frac{1}{e^a}$، $e^{a-b}=\frac{e^a}{e^b}$، $(e^a)^r=e^{ra}$.`,
      },
      {
        heading: "الدراسة والنهايات",
        body: r`- $(e^x)'=e^x$ و $(e^u)'=u'e^u$: الدالة تزايدية قطعاً على $\mathbb{R}$.
- $\lim_{x\to-\infty}e^x=0$ و $\lim_{x\to+\infty}e^x=+\infty$.
- **نهايات اعتيادية**: $\lim_{x\to+\infty}\frac{e^x}{x}=+\infty$، $\lim_{x\to-\infty}xe^x=0$، $\lim_{x\to0}\frac{e^x-1}{x}=1$.
- الأسية للأساس $a$: $a^x=e^{x\ln a}$ ($a>0$).`,
      },
    ],
    formulas: [
      { label: "خاصية أساسية", tex: r`e^{a+b}=e^a\,e^b` },
      { label: "مشتقة", tex: r`(e^{u})'=u'e^{u}` },
      { label: "نهاية اعتيادية", tex: r`\lim_{x\to0}\frac{e^x-1}{x}=1` },
    ],
    method: ["في دراسة دالة بها $e^x$: إشارة $e^x$ موجبة دائماً، فإشارة المشتقة تتعلق غالباً بالعامل الآخر فقط."],
  },
  {
    slug: "al-muadalat-at-tafadhuliya",
    subject: "math",
    order: 7,
    part: "التحليل",
    title: "المعادلات التفاضلية",
    tracks: TRACKS,
    intro: "المعادلة التفاضلية معادلة مجهولها دالة، وتربط بينها وبين مشتقاتها. البرنامج يقتصر على النوعين $y'=ay+b$ و $y''+ay'+by=0$.",
    sections: [
      {
        heading: "المعادلة y′ = ay + b",
        body: r`- حلول $y'=ay$ هي الدوال $x\mapsto Ce^{ax}$ ($C\in\mathbb{R}$).
- حلول $y'=ay+b$ ($a\ne0$) هي $x\mapsto Ce^{ax}-\frac{b}{a}$.
- يوجد حل وحيد يحقق شرطاً بدئياً $y(x_0)=y_0$.`,
      },
      {
        heading: "المعادلة y″ + ay′ + by = 0",
        body: r`نحل **المعادلة المميزة** $r^2+ar+b=0$ ونحسب $\Delta=a^2-4b$:

- $\Delta>0$ (جذران $r_1$ و $r_2$): $y=\alpha e^{r_1x}+\beta e^{r_2x}$.
- $\Delta=0$ (جذر مزدوج $r$): $y=(\alpha x+\beta)e^{rx}$.
- $\Delta<0$ (جذران عقديان $p\pm iq$): $y=e^{px}(\alpha\cos qx+\beta\sin qx)$.`,
      },
    ],
    formulas: [
      { label: "حل y′ = ay + b", tex: r`y=Ce^{ax}-\frac{b}{a}` },
      { label: "المعادلة المميزة", tex: r`r^2+ar+b=0` },
    ],
    method: ["تُستعمل هذه المعادلات أيضاً في الفيزياء (دارة RC، التذبذبات) وفي SVT (النمو والتناقص)."],
  },
  {
    slug: "hisab-at-takamul",
    subject: "math",
    order: 8,
    part: "التحليل",
    title: "حساب التكامل",
    tracks: TRACKS,
    intro: "التكامل يعطي المساحة تحت منحنى دالة موجبة، ويحسب انطلاقاً من دالة أصلية.",
    sections: [
      {
        heading: "التعريف والخاصيات",
        body: r`- إذا كانت $f$ متصلة على $[a,b]$ و $F$ دالة أصلية لها: $\int_a^b f(x)\,dx=F(b)-F(a)$.
- **علاقة شال**: $\int_a^c f=\int_a^b f+\int_b^c f$.
- **الخطية**: $\int_a^b(\alpha f+\beta g)=\alpha\int_a^b f+\beta\int_a^b g$.
- **الموجبية والترتيب**: إذا كان $f\ge0$ على $[a,b]$ ($a\le b$) فإن $\int_a^bf\ge0$؛ وإذا كان $f\le g$ فإن $\int_a^bf\le\int_a^bg$.
- القيمة المتوسطة: $\mu=\frac{1}{b-a}\int_a^b f(x)\,dx$.`,
      },
      {
        heading: "المكاملة بالأجزاء",
        body: r`$$\int_a^b u(x)v'(x)\,dx=\big[u(x)v(x)\big]_a^b-\int_a^b u'(x)v(x)\,dx$$

نختار $u$ دالة تبسط بالاشتقاق (مثل $x$ أو $\ln x$) و $v'$ دالة سهلة المكاملة (مثل $e^x$ أو $\cos x$).`,
      },
      {
        heading: "حساب المساحات والأحجام",
        body: r`- مساحة الحيز بين $C_f$ ومحور الأفاصيل والمستقيمين $x=a$ و $x=b$: $\mathcal{A}=\int_a^b|f(x)|\,dx\times u.a$ (وحدة المساحة).
- المساحة بين منحنيين: $\int_a^b|f(x)-g(x)|\,dx$.
- حجم مجسم الدوران حول محور الأفاصيل: $V=\int_a^b\pi\,(f(x))^2\,dx\times u.v$.`,
      },
    ],
    formulas: [
      { label: "التكامل", tex: r`\int_a^b f(x)\,dx=F(b)-F(a)` },
      { label: "المكاملة بالأجزاء", tex: r`\int_a^b uv'=[uv]_a^b-\int_a^b u'v` },
      { label: "حجم الدوران", tex: r`V=\pi\int_a^b f(x)^2\,dx` },
    ],
    method: ["لا تنسَ وحدة المساحة: إذا كان $\\|\\vec i\\|=2\\,cm$ و $\\|\\vec j\\|=1\\,cm$ فإن $u.a=2\\,cm^2$."],
  },
  {
    slug: "al-adad-al-uqdiya",
    subject: "math",
    order: 9,
    part: "الجبر والهندسة",
    title: "الأعداد العقدية",
    tracks: TRACKS,
    intro: "مجموعة الأعداد العقدية $\\mathbb{C}$ تمدد $\\mathbb{R}$ بإضافة عدد $i$ يحقق $i^2=-1$، وتسمح بحل جميع المعادلات من الدرجة الثانية وبدراسة تحويلات المستوى.",
    sections: [
      {
        heading: "الشكل الجبري",
        body: r`- كل عدد عقدي يكتب $z=a+ib$ حيث $a=\mathrm{Re}(z)$ و $b=\mathrm{Im}(z)$.
- المرافق: $\bar z=a-ib$، و $z\bar z=a^2+b^2$.
- يكون $z$ حقيقياً إذا وفقط إذا كان $\bar z=z$، ويكون تخيلياً صرفاً إذا وفقط إذا كان $\bar z=-z$.
- التمثيل الهندسي: النقطة $M(a,b)$ صورة $z$، ولحق المتجهة $\overrightarrow{AB}$ هو $z_B-z_A$.`,
      },
      {
        heading: "المعيار والعمدة والشكل المثلثي",
        body: r`- المعيار: $|z|=\sqrt{a^2+b^2}$، و $AB=|z_B-z_A|$.
- الشكل المثلثي: $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$ حيث $r=|z|$ و $\theta=\arg z\ [2\pi]$.
- $|zz'|=|z||z'|$ و $\arg(zz')=\arg z+\arg z'$، و $\arg\frac{z}{z'}=\arg z-\arg z'$.
- **صيغة موافر**: $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$. **صيغتا أولير**: $\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}{2}$ و $\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}$.`,
      },
      {
        heading: "المعادلة من الدرجة الثانية",
        body: r`$az^2+bz+c=0$ بمعاملات حقيقية، و $\Delta=b^2-4ac$:

- $\Delta>0$: حلان حقيقيان $\frac{-b\pm\sqrt\Delta}{2a}$؛ $\Delta=0$: حل مزدوج $-\frac{b}{2a}$.
- $\Delta<0$: حلان عقديان مترافقان $\frac{-b\pm i\sqrt{-\Delta}}{2a}$.`,
      },
      {
        heading: "الأعداد العقدية والهندسة",
        body: r`- $\left(\overrightarrow{AB},\overrightarrow{AC}\right)\equiv\arg\frac{z_C-z_A}{z_B-z_A}\ [2\pi]$.
- تكون النقط $A$ و $B$ و $C$ مستقيمية إذا وفقط إذا كان $\frac{z_C-z_A}{z_B-z_A}\in\mathbb{R}$.
- **الإزاحة**: $z'=z+b$. **التحاكي** (مركز $\Omega$، نسبة $k$): $z'-\omega=k(z-\omega)$. **الدوران** (مركز $\Omega$، زاوية $\theta$): $z'-\omega=e^{i\theta}(z-\omega)$.`,
      },
    ],
    formulas: [
      { label: "الشكل الأسي", tex: r`z=re^{i\theta}` },
      { label: "الدوران", tex: r`z'-\omega=e^{i\theta}(z-\omega)` },
      { label: "الحلول العقدية", tex: r`z=\frac{-b\pm i\sqrt{-\Delta}}{2a}` },
    ],
    method: ["لإثبات أن مثلثاً متساوي الساقين وقائم الزاوية في $A$: بيّن أن $\\frac{z_C-z_A}{z_B-z_A}=\\pm i$."],
  },
  {
    slug: "al-handasa-al-fadaiya",
    subject: "math",
    order: 10,
    part: "الجبر والهندسة",
    title: "الهندسة الفضائية",
    tracks: TRACKS,
    intro: "يدرس هذا الدرس الجداء السلمي والجداء المتجهي في الفضاء وتطبيقاتهما: معادلة مستوى، ومعادلة فلكة، والأوضاع النسبية والمسافات.",
    sections: [
      {
        heading: "الجداء السلمي في الفضاء",
        body: r`- في معلم متعامد ممنظم: $\vec u\cdot\vec v=xx'+yy'+zz'$ و $\|\vec u\|=\sqrt{x^2+y^2+z^2}$.
- تكون $\vec u$ و $\vec v$ متعامدتين إذا وفقط إذا كان $\vec u\cdot\vec v=0$.
- **معادلة مستوى** متجهته المنظمية $\vec n(a,b,c)$: $ax+by+cz+d=0$.
- **مسافة نقطة عن مستوى**: $d(A,(P))=\frac{|ax_A+by_A+cz_A+d|}{\sqrt{a^2+b^2+c^2}}$.`,
      },
      {
        heading: "الفلكة",
        body: r`- الفلكة ذات المركز $\Omega(a,b,c)$ والشعاع $R$: $(x-a)^2+(y-b)^2+(z-c)^2=R^2$.
- تقاطع فلكة ومستوى حسب $d=d(\Omega,(P))$: إذا كان $d>R$ فلا تقاطع؛ $d=R$: المستوى مماس للفلكة؛ $d<R$: التقاطع دائرة شعاعها $r=\sqrt{R^2-d^2}$.`,
      },
      {
        heading: "الجداء المتجهي",
        body: r`- $\vec u\wedge\vec v$ متجهة عمودية على $\vec u$ و $\vec v$، منظمها $\|\vec u\|\|\vec v\||\sin\theta|$.
- إحداثياتها: $\vec u\wedge\vec v=(yz'-zy',\ zx'-xz',\ xy'-yx')$.
- تكون $\vec u$ و $\vec v$ مستقيميتين إذا وفقط إذا كان $\vec u\wedge\vec v=\vec 0$.
- **تطبيقات**: متجهة منظمية لمستوى $(ABC)$ هي $\overrightarrow{AB}\wedge\overrightarrow{AC}$؛ مساحة المثلث $ABC=\frac12\|\overrightarrow{AB}\wedge\overrightarrow{AC}\|$؛ مسافة نقطة عن مستقيم $d(M,(D))=\frac{\|\overrightarrow{AM}\wedge\vec u\|}{\|\vec u\|}$.`,
      },
    ],
    formulas: [
      { label: "مسافة نقطة عن مستوى", tex: r`d=\frac{|ax_A+by_A+cz_A+d|}{\sqrt{a^2+b^2+c^2}}` },
      { label: "معادلة الفلكة", tex: r`(x-a)^2+(y-b)^2+(z-c)^2=R^2` },
      { label: "مساحة مثلث", tex: r`S=\tfrac12\|\overrightarrow{AB}\wedge\overrightarrow{AC}\|` },
    ],
  },
  {
    slug: "at-taadad-wa-al-ihtimalat",
    subject: "math",
    order: 11,
    part: "الجبر والهندسة",
    title: "التعداد والاحتمالات",
    tracks: TRACKS,
    intro: "يقدم الدرس تقنيات العد (الترتيبات والتأليفات) ثم قواعد حساب الاحتمالات والمتغير العشوائي وقانون الحدانية.",
    sections: [
      {
        heading: "التعداد",
        body: r`- **المبدأ الأساسي للتعداد**: إذا كانت تجربة تتم على $p$ مراحل، وكل مرحلة لها $n_k$ إمكانية، فإن عدد النتائج $n_1\times n_2\times\dots\times n_p$.
- الترتيبات بتكرار: $n^p$. الترتيبات بدون تكرار: $A_n^p=\frac{n!}{(n-p)!}$. التبديلات: $n!$.
- التأليفات (الترتيب غير مهم): $C_n^p=\frac{n!}{p!(n-p)!}$.
- سحب **في آن واحد**: تأليفات؛ سحب **بالتتابع بدون إحلال**: ترتيبات بدون تكرار؛ **بإحلال**: ترتيبات بتكرار.`,
      },
      {
        heading: "الاحتمالات",
        body: r`- في حالة تساوي الاحتمال: $p(A)=\frac{\mathrm{card}\,A}{\mathrm{card}\,\Omega}$.
- $p(\bar A)=1-p(A)$ و $p(A\cup B)=p(A)+p(B)-p(A\cap B)$.
- **الاحتمال الشرطي**: $p_B(A)=\frac{p(A\cap B)}{p(B)}$. **الاستقلالية**: $p(A\cap B)=p(A)\,p(B)$.
- **صيغة الاحتمالات الكلية**: $p(A)=p(B)p_B(A)+p(\bar B)p_{\bar B}(A)$.`,
      },
      {
        heading: "المتغير العشوائي وقانون الحدانية",
        body: r`- قانون احتمال $X$: الجدول $x_i \mapsto p(X=x_i)$ حيث مجموع الاحتمالات 1.
- الأمل الرياضي: $E(X)=\sum x_i\,p_i$؛ المغايرة: $V(X)=E(X^2)-E(X)^2$؛ الانحراف الطرازي: $\sigma(X)=\sqrt{V(X)}$.
- **قانون الحدانية**: نكرر $n$ مرات تجربة احتمال نجاحها $p$ بشكل مستقل، و $X$ عدد مرات النجاح:
$$p(X=k)=C_n^k\,p^k(1-p)^{n-k},\quad E(X)=np,\quad V(X)=np(1-p)$$`,
      },
    ],
    formulas: [
      { label: "التأليفات", tex: r`C_n^p=\frac{n!}{p!\,(n-p)!}` },
      { label: "الاحتمال الشرطي", tex: r`p_B(A)=\frac{p(A\cap B)}{p(B)}` },
      { label: "قانون الحدانية", tex: r`p(X=k)=C_n^k\,p^k(1-p)^{n-k}` },
    ],
    method: ["حدد أولاً نوع السحب (في آن واحد، بالتتابع بإحلال أو بدونه) لأنه يحدد طريقة حساب $\\mathrm{card}\\,\\Omega$."],
  },
];
