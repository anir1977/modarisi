// Full versions of math lessons 5–8 (ln, exp, differential equations, integrals).
// NOTE: String.raw — never write a dollar sign directly followed by "{".
import type { SciLesson } from "../types";

const r = String.raw;

export const MATH_DEEP_2: Record<string, Partial<SciLesson>> = {
  "ad-dawal-al-lughaarithmiya": {
    sections: [
      {
        heading: "تعريف دالة اللوغاريتم النبيري",
        body: r`الدالة $x\mapsto\frac1x$ متصلة على $]0,+\infty[$، إذن تقبل دوال أصلية عليه. **دالة اللوغاريتم النبيري** $\ln$ هي الدالة الأصلية الوحيدة لـ $x\mapsto\frac1x$ على $]0,+\infty[$ التي تنعدم في $1$:

$$\ln'(x)=\frac1x\qquad\ln1=0$$

- مجموعة تعريفها: $]0,+\infty[$. **لا يوجد** لوغاريتم لعدد سالب أو منعدم.
- العدد $e\approx2{,}718$ هو العدد الوحيد الذي يحقق $\ln e=1$.`,
      },
      {
        heading: "الخاصيات الجبرية",
        body: r`لكل $a>0$ و $b>0$ ولكل عدد جذري $r$:

| الخاصية | الصيغة |
|---|---|
| لوغاريتم جداء | $\ln(ab)=\ln a+\ln b$ |
| لوغاريتم خارج | $\ln\frac ab=\ln a-\ln b$ |
| لوغاريتم مقلوب | $\ln\frac1a=-\ln a$ |
| لوغاريتم قوة | $\ln a^r=r\ln a$ |
| لوغاريتم جذر | $\ln\sqrt a=\frac12\ln a$ |

**المعادلات والمتراجحات**: بما أن $\ln$ تزايدية قطعاً على $]0,+\infty[$:

$$\ln a=\ln b\iff a=b\qquad\ln a<\ln b\iff a<b$$

وبصفة خاصة: $\ln x=0\iff x=1$، و $\ln x>0\iff x>1$، و $\ln x<0\iff0<x<1$.

**منهجية الحل**: نحدد أولاً مجموعة التعريف (كل ما بداخل $\ln$ يجب أن يكون موجباً قطعاً)، ثم نجمع اللوغاريتمات في لوغاريتم واحد، ثم نحل، ثم نتحقق من انتماء الحلول لمجموعة التعريف.`,
      },
      {
        heading: "دراسة الدالة ln",
        body: r`- $\ln'(x)=\frac1x>0$ على $]0,+\infty[$: الدالة **تزايدية قطعاً**.
- $\ln''(x)=-\frac{1}{x^2}<0$: المنحنى **مقعر**.
- النهايات: $\lim_{x\to0^+}\ln x=-\infty$ (محور الأراتيب مقارب عمودي) و $\lim_{x\to+\infty}\ln x=+\infty$.
- $\lim_{x\to+\infty}\frac{\ln x}{x}=0$: فرع شلجمي في اتجاه محور الأفاصيل.
- المماس في النقطة $(1,0)$ معادلته $y=x-1$، والمنحنى تحته: $\ln x\le x-1$ لكل $x>0$.`,
      },
      {
        heading: "النهايات الاعتيادية",
        body: r`| النهاية | القيمة |
|---|---|
| $\lim_{x\to+\infty}\frac{\ln x}{x}$ | $0$ |
| $\lim_{x\to+\infty}\frac{\ln x}{x^n}$ $(n\ge1)$ | $0$ |
| $\lim_{x\to0^+}x\ln x$ | $0$ |
| $\lim_{x\to0^+}x^n\ln x$ | $0$ |
| $\lim_{x\to1}\frac{\ln x}{x-1}$ | $1$ |
| $\lim_{x\to0}\frac{\ln(1+x)}{x}$ | $1$ |

**قاعدة للحفظ**: عند $+\infty$، القوة $(x^n)$ "أقوى" من $\ln x$؛ وعند $0^+$، $x^n$ "تغلب" $\ln x$ فيكون الجداء منعدماً.`,
      },
      {
        heading: "مشتقة ln(u) واللوغاريتم للأساس a",
        body: r`إذا كانت $u$ قابلة للاشتقاق وموجبة قطعاً على مجال $I$، فإن:

$$\left(\ln u\right)'=\frac{u'}{u}$$

وإذا كانت $u$ لا تنعدم على $I$: $\left(\ln|u|\right)'=\frac{u'}{u}$، ومنه **دالة أصلية** لـ $\frac{u'}{u}$ هي $\ln|u|$.

**اللوغاريتم للأساس** $a$ ($a>0$ و $a\ne1$): $\log_a x=\frac{\ln x}{\ln a}$، وله نفس الخاصيات الجبرية، مع $\log_a a=1$. **اللوغاريتم العشري**: $\log x=\frac{\ln x}{\ln10}$، و $\log10^n=n$ (يستعمل في الكيمياء: $pH=-\log[H_3O^+]$).`,
      },
    ],
    examples: [
      {
        title: "معادلة لوغاريتمية",
        problem: r`حل في $\mathbb{R}$ المعادلة $\ln(x+1)+\ln(x-1)=\ln3$.`,
        solution: r`**مجموعة التعريف**: يجب $x+1>0$ و $x-1>0$، أي $x>1$. إذن $D=]1,+\infty[$.

لكل $x\in D$: $\ln(x+1)+\ln(x-1)=\ln\left[(x+1)(x-1)\right]=\ln(x^2-1)$.

المعادلة تصبح $\ln(x^2-1)=\ln3\iff x^2-1=3\iff x^2=4\iff x=2$ أو $x=-2$.

بما أن $-2\notin D$، فالحل الوحيد هو $x=2$.`,
      },
      {
        title: "متراجحة لوغاريتمية",
        problem: r`حل المتراجحة $\ln(2x-1)\le0$.`,
        solution: r`مجموعة التعريف: $2x-1>0$، أي $x>\frac12$.

$\ln(2x-1)\le0\iff\ln(2x-1)\le\ln1\iff2x-1\le1\iff x\le1$.

إذن $S=\left]\frac12,1\right]$.`,
      },
      {
        title: "نهايات بـ ln",
        problem: r`احسب: $\lim_{x\to+\infty}(\ln x-x)$ و $\lim_{x\to+\infty}\frac{\ln x}{\sqrt x}$.`,
        solution: r`- شكل غير محدد $\infty-\infty$. نعمل: $\ln x-x=x\left(\frac{\ln x}{x}-1\right)$. بما أن $\frac{\ln x}{x}\to0$، فإن القوس يؤول إلى $-1$، والنهاية $-\infty$.
- نضع $X=\sqrt x$: $\ln x=\ln X^2=2\ln X$، إذن $\frac{\ln x}{\sqrt x}=2\frac{\ln X}{X}$. عندما $x\to+\infty$ فإن $X\to+\infty$ و $\frac{\ln X}{X}\to0$. النهاية $0$.`,
      },
      {
        title: "دراسة دالة وإثبات متفاوتة",
        problem: r`ادرس تغيرات $f(x)=x-\ln x$ على $]0,+\infty[$، واستنتج أن $\ln x<x$ لكل $x>0$.`,
        solution: r`$f'(x)=1-\frac1x=\frac{x-1}{x}$. إشارتها إشارة $x-1$:

- $f$ تناقصية على $]0,1]$ وتزايدية على $[1,+\infty[$.
- $f(1)=1-0=1$ قيمة دنيا مطلقة.

إذن لكل $x>0$: $f(x)\ge1>0$، أي $x-\ln x>0$، ومنه $\ln x<x$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`بسّط: $A=\ln8-2\ln2+\ln\frac12$.`,
        solution: r`$\ln8=3\ln2$ و $\ln\frac12=-\ln2$. إذن $A=3\ln2-2\ln2-\ln2=0$.`,
      },
      {
        level: "سهل",
        statement: r`حل المعادلتين: $\ln x=2$ ؛ $\ln(3x-2)=\ln x$.`,
        solution: r`- $\ln x=2\iff x=e^2$.
- مجموعة التعريف: $x>\frac23$. $3x-2=x\iff x=1$، و $1>\frac23$. إذن $x=1$.`,
      },
      {
        level: "متوسط",
        statement: r`احسب: $\lim_{x\to0^+}\frac{\ln x}{x}$ و $\lim_{x\to+\infty}\left[\ln(x+1)-\ln x\right]$.`,
        solution: r`- $\ln x\to-\infty$ و $x\to0^+$، إذن $\frac{\ln x}{x}\to-\infty$ (ليس شكلاً غير محدد).
- $\ln(x+1)-\ln x=\ln\frac{x+1}{x}=\ln\left(1+\frac1x\right)\to\ln1=0$.`,
      },
      {
        level: "صعب",
        statement: r`ادرس تغيرات $g(x)=\frac{\ln x}{x}$ على $]0,+\infty[$، واستنتج أن $\ln x\le\frac xe$ لكل $x>0$.`,
        solution: r`$g'(x)=\frac{\frac1x\times x-\ln x}{x^2}=\frac{1-\ln x}{x^2}$. تنعدم في $e$، موجبة على $]0,e[$ وسالبة على $]e,+\infty[$.

إذن $g(e)=\frac1e$ قيمة قصوى مطلقة: $\frac{\ln x}{x}\le\frac1e$، ومنه $\ln x\le\frac xe$ لكل $x>0$.`,
      },
    ],
    mistakes: [
      r`كتابة $\ln(a+b)=\ln a+\ln b$: خطأ! الصحيح $\ln(ab)=\ln a+\ln b$.`,
      r`حل المعادلة دون تحديد مجموعة التعريف، فيُقبل حل يجعل ما بداخل $\ln$ سالباً.`,
      r`كتابة $(\ln u)'=\frac1u$ ونسيان $u'$ في البسط.`,
    ],
  },

  "ad-dawal-al-usiya": {
    sections: [
      {
        heading: "تعريف الدالة الأسية النبيرية",
        body: r`الدالة $\ln$ متصلة وتزايدية قطعاً من $]0,+\infty[$ نحو $\mathbb{R}$، إذن تقبل دالة عكسية تسمى **الدالة الأسية النبيرية** ونرمز لها بـ $\exp$، ونكتب $\exp(x)=e^x$:

$$y=e^x\iff x=\ln y\qquad(x\in\mathbb{R},\ y>0)$$

**نتائج مباشرة**:
- $e^x>0$ لكل $x\in\mathbb{R}$ (الأسية لا تنعدم ولا تكون سالبة أبداً).
- $e^0=1$ و $e^1=e$.
- $\ln(e^x)=x$ لكل $x\in\mathbb{R}$، و $e^{\ln x}=x$ لكل $x>0$.`,
      },
      {
        heading: "الخاصيات الجبرية",
        body: r`لكل $a$ و $b$ من $\mathbb{R}$ ولكل عدد جذري $r$:

| الخاصية | الصيغة |
|---|---|
| جداء | $e^{a+b}=e^a\times e^b$ |
| مقلوب | $e^{-a}=\frac{1}{e^a}$ |
| خارج | $e^{a-b}=\frac{e^a}{e^b}$ |
| قوة | $\left(e^a\right)^r=e^{ra}$ |

**المعادلات والمتراجحات**: $e^a=e^b\iff a=b$ و $e^a<e^b\iff a<b$.

**تقنية مهمة**: في معادلة مثل $e^{2x}-3e^x+2=0$ نضع $X=e^x$ (مع $X>0$) فنحصل على معادلة من الدرجة الثانية.`,
      },
      {
        heading: "دراسة الدالة exp",
        body: r`- $\left(e^x\right)'=e^x>0$: الدالة **تزايدية قطعاً** على $\mathbb{R}$، و $\left(e^x\right)''=e^x>0$: المنحنى **محدب**.
- $\lim_{x\to-\infty}e^x=0$ (محور الأفاصيل مقارب أفقي بجوار $-\infty$) و $\lim_{x\to+\infty}e^x=+\infty$.
- $\lim_{x\to+\infty}\frac{e^x}{x}=+\infty$: فرع شلجمي في اتجاه محور الأراتيب.
- المماس في النقطة $(0,1)$ معادلته $y=x+1$، والمنحنى فوقه: $e^x\ge x+1$ لكل $x$.
- منحنى $\exp$ هو مماثل منحنى $\ln$ بالنسبة للمستقيم $y=x$.`,
      },
      {
        heading: "النهايات الاعتيادية",
        body: r`| النهاية | القيمة |
|---|---|
| $\lim_{x\to+\infty}\frac{e^x}{x}$ | $+\infty$ |
| $\lim_{x\to+\infty}\frac{e^x}{x^n}$ | $+\infty$ |
| $\lim_{x\to-\infty}xe^x$ | $0$ |
| $\lim_{x\to-\infty}x^ne^x$ | $0$ |
| $\lim_{x\to0}\frac{e^x-1}{x}$ | $1$ |

**قاعدة للحفظ**: الأسية "أقوى" من أي قوة لـ $x$ عند $+\infty$، وعند $-\infty$ يغلب $e^x\to0$.`,
      },
      {
        heading: "مشتقة e^u والأسية للأساس a",
        body: r`إذا كانت $u$ قابلة للاشتقاق على $I$:

$$\left(e^{u}\right)'=u'e^{u}$$

ومنه دالة أصلية لـ $u'e^u$ هي $e^u$.

**الأسية للأساس** $a>0$: $a^x=e^{x\ln a}$. مثلاً $2^x=e^{x\ln2}$، ومشتقتها $(a^x)'=\ln a\times a^x$.`,
      },
    ],
    examples: [
      {
        title: "معادلة بتغيير المتغير",
        problem: r`حل في $\mathbb{R}$ المعادلة $e^{2x}-3e^x+2=0$.`,
        solution: r`نضع $X=e^x$ مع $X>0$. بما أن $e^{2x}=(e^x)^2=X^2$، تصبح المعادلة $X^2-3X+2=0$.

$\Delta=9-8=1$، ومنه $X=1$ أو $X=2$ (كلاهما موجب).

- $e^x=1\iff x=0$.
- $e^x=2\iff x=\ln2$.

إذن $S=\{0;\ln2\}$.`,
      },
      {
        title: "متراجحة أسية",
        problem: r`حل المتراجحة $e^{x+1}>e^{3-x}$.`,
        solution: r`بما أن $\exp$ تزايدية قطعاً: $e^{x+1}>e^{3-x}\iff x+1>3-x\iff2x>2\iff x>1$.

إذن $S=]1,+\infty[$.`,
      },
      {
        title: "نهايات بالأسية",
        problem: r`احسب $\lim_{x\to+\infty}(e^x-x)$ و $\lim_{x\to-\infty}(x+1)e^x$.`,
        solution: r`- $e^x-x=x\left(\frac{e^x}{x}-1\right)$. بما أن $\frac{e^x}{x}\to+\infty$، فالنهاية $+\infty$.
- $(x+1)e^x=xe^x+e^x$. لدينا $\lim_{x\to-\infty}xe^x=0$ و $\lim_{x\to-\infty}e^x=0$، إذن النهاية $0$.`,
      },
      {
        title: "دراسة دالة بالأسية",
        problem: r`ادرس تغيرات $f(x)=(x-1)e^x$ على $\mathbb{R}$.`,
        solution: r`$f'(x)=1\times e^x+(x-1)e^x=xe^x$. بما أن $e^x>0$، إشارة $f'$ هي إشارة $x$:

- $f$ تناقصية على $]-\infty,0]$ وتزايدية على $[0,+\infty[$.
- $f(0)=-1$ قيمة دنيا مطلقة.
- $\lim_{x\to-\infty}f(x)=\lim(xe^x-e^x)=0$ و $\lim_{x\to+\infty}f(x)=+\infty$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`بسّط: $e^{2\ln3}$ ؛ $\ln(e^5)$ ؛ $e^{-\ln2}$.`,
        solution: r`- $e^{2\ln3}=e^{\ln9}=9$.
- $\ln(e^5)=5$.
- $e^{-\ln2}=\frac{1}{e^{\ln2}}=\frac12$.`,
      },
      {
        level: "سهل",
        statement: r`حل: $e^{x^2}=e^4$ ؛ $e^{2x-1}\le1$.`,
        solution: r`- $x^2=4\iff x=2$ أو $x=-2$.
- $e^{2x-1}\le e^0\iff2x-1\le0\iff x\le\frac12$، إذن $S=\left]-\infty,\frac12\right]$.`,
      },
      {
        level: "متوسط",
        statement: r`احسب مشتقتي الدالتين: $f(x)=e^{-x^2}$ ؛ $g(x)=xe^{2x}$.`,
        solution: r`- $f'(x)=(-x^2)'e^{-x^2}=-2xe^{-x^2}$.
- $g'(x)=1\times e^{2x}+x\times2e^{2x}=(1+2x)e^{2x}$.`,
      },
      {
        level: "صعب",
        statement: r`احسب: $\lim_{x\to0}\frac{e^{2x}-1}{x}$ و $\lim_{x\to+\infty}\frac{e^x}{x^2}$.`,
        solution: r`- $\frac{e^{2x}-1}{x}=2\times\frac{e^{2x}-1}{2x}$. بوضع $X=2x\to0$: $\frac{e^X-1}{X}\to1$. النهاية $2$.
- نهاية اعتيادية: $\lim_{x\to+\infty}\frac{e^x}{x^n}=+\infty$ لـ $n=2$.`,
      },
    ],
    mistakes: [
      r`كتابة $e^{a+b}=e^a+e^b$: الصحيح $e^{a+b}=e^ae^b$.`,
      r`نسيان شرط $X>0$ بعد وضع $X=e^x$، فيُقبل حل سالب لا يوافق أي قيمة لـ $x$.`,
      r`كتابة $(e^{u})'=e^{u}$ ونسيان العامل $u'$.`,
    ],
  },

  "al-muadalat-at-tafadhuliya": {
    sections: [
      {
        heading: "ما هي المعادلة التفاضلية؟",
        body: r`**المعادلة التفاضلية** هي معادلة مجهولها **دالة** $y$، وتربط بين $y$ ومشتقاتها $y'$ و $y''$. **حل** المعادلة هو كل دالة قابلة للاشتقاق تحققها.

مثال: الدالة $y=e^{2x}$ حل للمعادلة $y'=2y$ لأن $y'=2e^{2x}=2y$.

هذه المعادلات تنمذج ظواهر كثيرة: شحن مكثف (الفيزياء)، التناقص الإشعاعي، نمو ساكنة (SVT)...`,
      },
      {
        heading: "المعادلة y′ = ay + b",
        body: r`- **حالة** $b=0$: حلول المعادلة $y'=ay$ هي الدوال
$$y(x)=Ce^{ax}\qquad(C\in\mathbb{R})$$
- **الحالة العامة** $(a\ne0)$: حلول $y'=ay+b$ هي
$$y(x)=Ce^{ax}-\frac ba\qquad(C\in\mathbb{R})$$
- **الحل الخاص**: يوجد حل **وحيد** يحقق شرطاً بدئياً $y(x_0)=y_0$؛ نعوض لتحديد $C$.

**ملاحظة**: الدالة الثابتة $-\frac ba$ حل خاص (لأن مشتقتها منعدمة و $a\left(-\frac ba\right)+b=0$).`,
      },
      {
        heading: "المعادلة y″ + ay′ + by = 0",
        body: r`نربط بها **المعادلة المميزة**: $r^2+ar+b=0$، ونحسب مميزها $\Delta=a^2-4b$:

| الحالة | جذور المعادلة المميزة | الحل العام |
|---|---|---|
| $\Delta>0$ | $r_1$ و $r_2$ حقيقيان مختلفان | $y=\alpha e^{r_1x}+\beta e^{r_2x}$ |
| $\Delta=0$ | جذر مزدوج $r=-\frac a2$ | $y=(\alpha x+\beta)e^{rx}$ |
| $\Delta<0$ | $r=p\pm iq$ عقديان مترافقان | $y=e^{px}\left(\alpha\cos qx+\beta\sin qx\right)$ |

حيث $\alpha$ و $\beta$ عددان حقيقيان. **الحل الخاص** يحدده شرطان بدئيان مثل $y(0)$ و $y'(0)$.

**حالة مهمة في الفيزياء**: $y''+\omega^2y=0$ (التذبذبات): $r=\pm i\omega$، والحلول $y=\alpha\cos\omega x+\beta\sin\omega x$.`,
      },
    ],
    examples: [
      {
        title: "y′ = ay مع شرط بدئي",
        problem: r`حدد الحل $y$ للمعادلة $y'=2y$ الذي يحقق $y(0)=3$.`,
        solution: r`الحل العام: $y(x)=Ce^{2x}$. الشرط $y(0)=C=3$. إذن $y(x)=3e^{2x}$.`,
      },
      {
        title: "y′ = ay + b",
        problem: r`حل المعادلة $y'=-2y+4$، وحدد الحل الذي يحقق $y(0)=0$.`,
        solution: r`هنا $a=-2$ و $b=4$، و $-\frac ba=2$. الحل العام: $y(x)=Ce^{-2x}+2$.

$y(0)=C+2=0$، إذن $C=-2$، ومنه $y(x)=2-2e^{-2x}$.

(لاحظ أن $y\to2$ عندما $x\to+\infty$، بحال توتر مكثف يقترب من قيمته الحدية.)`,
      },
      {
        title: "Δ > 0",
        problem: r`حل $y''-3y'+2y=0$، وحدد الحل الذي يحقق $y(0)=1$ و $y'(0)=0$.`,
        solution: r`المعادلة المميزة: $r^2-3r+2=0$، جذراها $r_1=1$ و $r_2=2$.

الحل العام: $y=\alpha e^x+\beta e^{2x}$، ومنه $y'=\alpha e^x+2\beta e^{2x}$.

$y(0)=\alpha+\beta=1$ و $y'(0)=\alpha+2\beta=0$. بالطرح: $\beta=-1$ و $\alpha=2$.

إذن $y(x)=2e^x-e^{2x}$.`,
      },
      {
        title: "Δ < 0 و Δ = 0",
        problem: r`حل المعادلتين: $y''+4y=0$ ؛ $y''-2y'+y=0$.`,
        solution: r`- $r^2+4=0$: $r=\pm2i$ ($p=0$ و $q=2$). الحل: $y=\alpha\cos2x+\beta\sin2x$.
- $r^2-2r+1=(r-1)^2=0$: جذر مزدوج $r=1$. الحل: $y=(\alpha x+\beta)e^x$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`حدد حل المعادلة $y'+y=0$ الذي يحقق $y(1)=e^{-1}$.`,
        solution: r`$y'=-y$، إذن $y=Ce^{-x}$. $y(1)=Ce^{-1}=e^{-1}$ ومنه $C=1$: $y=e^{-x}$.`,
      },
      {
        level: "سهل",
        statement: r`حدد الحل العام للمعادلة $y'=3y-6$.`,
        solution: r`$a=3$، $b=-6$، $-\frac ba=2$. الحل العام: $y=Ce^{3x}+2$.`,
      },
      {
        level: "متوسط",
        statement: r`حل المعادلة $y''+2y'+5y=0$.`,
        solution: r`$r^2+2r+5=0$، $\Delta=4-20=-16=(4i)^2$. الجذران $r=\frac{-2\pm4i}{2}=-1\pm2i$.

الحل: $y=e^{-x}(\alpha\cos2x+\beta\sin2x)$.`,
      },
      {
        level: "صعب",
        statement: r`حدد حل المعادلة $y''-4y=0$ الذي يحقق $y(0)=0$ و $y'(0)=4$.`,
        solution: r`$r^2-4=0$: $r=2$ أو $r=-2$. $y=\alpha e^{2x}+\beta e^{-2x}$ و $y'=2\alpha e^{2x}-2\beta e^{-2x}$.

$\alpha+\beta=0$ و $2\alpha-2\beta=4$، إذن $\alpha=1$ و $\beta=-1$: $y=e^{2x}-e^{-2x}$.`,
      },
    ],
    mistakes: [
      r`الخلط بين $y'=ay+b$ (الحل $Ce^{ax}-\frac ba$) و $y'=ay$ (الحل $Ce^{ax}$).`,
      r`في حالة $\Delta<0$: استعمال الجزء التخيلي $q$ كأس للأسية، والصحيح أن الأس هو الجزء الحقيقي $p$.`,
      r`نسيان اشتقاق الحل العام قبل استعمال الشرط على $y'(0)$.`,
    ],
  },

  "hisab-at-takamul": {
    sections: [
      {
        heading: "تعريف التكامل",
        body: r`لتكن $f$ دالة متصلة على مجال $I$، و $a$ و $b$ من $I$، و $F$ دالة أصلية لـ $f$ على $I$. **تكامل** $f$ من $a$ إلى $b$ هو العدد:

$$\int_a^b f(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a)$$

هذا العدد لا يتعلق بالدالة الأصلية المختارة (الثابتة $c$ تختفي في الفرق). الحرف $x$ متغير "صامت": $\int_a^bf(x)\,dx=\int_a^bf(t)\,dt$.

**التأويل الهندسي**: إذا كانت $f$ موجبة على $[a,b]$ $(a<b)$، فإن $\int_a^bf(x)\,dx$ هو مساحة الحيز المحصور بين المنحنى ومحور الأفاصيل والمستقيمين $x=a$ و $x=b$.`,
      },
      {
        heading: "خاصيات التكامل",
        body: r`- $\int_a^af=0$ و $\int_b^af=-\int_a^bf$.
- **علاقة شال**: $\int_a^cf=\int_a^bf+\int_b^cf$.
- **الخطية**: $\int_a^b(\alpha f+\beta g)=\alpha\int_a^bf+\beta\int_a^bg$.
- **الموجبية**: إذا كان $a\le b$ و $f\ge0$ على $[a,b]$، فإن $\int_a^bf\ge0$.
- **الترتيب**: إذا كان $a\le b$ و $f\le g$ على $[a,b]$، فإن $\int_a^bf\le\int_a^bg$.
- **القيمة المتوسطة**: $\mu=\frac{1}{b-a}\int_a^bf(x)\,dx$، وإذا كان $m\le f\le M$ على $[a,b]$ فإن $m(b-a)\le\int_a^bf\le M(b-a)$.`,
      },
      {
        heading: "المكاملة بالأجزاء",
        body: r`إذا كانت $u$ و $v$ قابلتين للاشتقاق ومشتقتاهما متصلتين على $[a,b]$:

$$\int_a^b u(x)v'(x)\,dx=\big[u(x)v(x)\big]_a^b-\int_a^b u'(x)v(x)\,dx$$

**كيفاش نختار؟** نختار $u$ الدالة التي تبسط بالاشتقاق، و $v'$ الدالة التي نعرف دالتها الأصلية بسهولة:

| التكامل | $u$ | $v'$ |
|---|---|---|
| $\int x\,e^x$ | $x$ | $e^x$ |
| $\int x\cos x$ | $x$ | $\cos x$ |
| $\int\ln x$ | $\ln x$ | $1$ |
| $\int x\ln x$ | $\ln x$ | $x$ |`,
      },
      {
        heading: "حساب المساحات والأحجام",
        body: r`- **المساحة** بين المنحنى $C_f$ ومحور الأفاصيل والمستقيمين $x=a$ و $x=b$ $(a<b)$:
$$\mathcal{A}=\int_a^b|f(x)|\,dx\ \ (u.a)$$
إذا كانت $f$ تتغير إشارتها، نقسم المجال حسب الإشارة.
- **المساحة بين منحنيين**: $\mathcal{A}=\int_a^b|f(x)-g(x)|\,dx$.
- **وحدة المساحة**: $u.a=\|\vec i\|\times\|\vec j\|$؛ مثلاً إذا كانت الوحدة $2\,cm$ على المحورين فإن $u.a=4\,cm^2$.
- **حجم مجسم الدوران** حول محور الأفاصيل:
$$V=\int_a^b\pi\left(f(x)\right)^2dx\ \ (u.v)$$`,
      },
    ],
    examples: [
      {
        title: "تكامل مباشر",
        problem: r`احسب $I=\int_0^1(3x^2+2x)\,dx$ و $J=\int_0^{\frac\pi2}\cos x\,dx$.`,
        solution: r`- $I=\left[x^3+x^2\right]_0^1=(1+1)-0=2$.
- $J=\left[\sin x\right]_0^{\frac\pi2}=\sin\frac\pi2-\sin0=1$.`,
      },
      {
        title: "مكاملة بالأجزاء (x·eˣ)",
        problem: r`احسب $K=\int_0^1xe^x\,dx$.`,
        solution: r`نضع $u(x)=x$ و $v'(x)=e^x$، إذن $u'(x)=1$ و $v(x)=e^x$.

$$K=\left[xe^x\right]_0^1-\int_0^1e^x\,dx=e-\left[e^x\right]_0^1=e-(e-1)=1$$`,
      },
      {
        title: "مكاملة بالأجزاء (ln x)",
        problem: r`احسب $L=\int_1^e\ln x\,dx$.`,
        solution: r`نكتب $\ln x=1\times\ln x$، ونضع $u=\ln x$ و $v'=1$، إذن $u'=\frac1x$ و $v=x$.

$$L=\left[x\ln x\right]_1^e-\int_1^e\frac1x\times x\,dx=(e\ln e-1\times\ln1)-\int_1^e1\,dx=e-(e-1)=1$$`,
      },
      {
        title: "مساحة بين منحنيين",
        problem: r`احسب مساحة الحيز المحصور بين المنحنيين $y=x$ و $y=x^2$ على $[0,1]$ (الوحدة: $1\,cm$).`,
        solution: r`على $[0,1]$: $x^2\le x$، إذن $|x-x^2|=x-x^2$.

$$\mathcal{A}=\int_0^1(x-x^2)\,dx=\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1=\frac12-\frac13=\frac16\,cm^2$$`,
      },
      {
        title: "حجم مجسم دوران",
        problem: r`احسب حجم المجسم المولد بدوران منحنى $f(x)=\sqrt x$ حول محور الأفاصيل على $[0,4]$.`,
        solution: r`$V=\int_0^4\pi(\sqrt x)^2\,dx=\pi\int_0^4x\,dx=\pi\left[\frac{x^2}{2}\right]_0^4=8\pi$ (وحدة حجم).`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`احسب $\int_1^2\frac{1}{x^2}\,dx$.`,
        solution: r`$\left[-\frac1x\right]_1^2=-\frac12-(-1)=\frac12$.`,
      },
      {
        level: "سهل",
        statement: r`احسب $\int_0^1\frac{2x}{x^2+1}\,dx$.`,
        solution: r`الشكل $\frac{u'}{u}$ مع $u=x^2+1>0$: $\left[\ln(x^2+1)\right]_0^1=\ln2-\ln1=\ln2$.`,
      },
      {
        level: "متوسط",
        statement: r`باستعمال المكاملة بالأجزاء، احسب $\int_0^\pi x\sin x\,dx$.`,
        solution: r`$u=x$، $v'=\sin x$، إذن $u'=1$ و $v=-\cos x$.

$\left[-x\cos x\right]_0^\pi+\int_0^\pi\cos x\,dx=(-\pi\cos\pi)-0+\left[\sin x\right]_0^\pi=\pi+0=\pi$.`,
      },
      {
        level: "متوسط",
        statement: r`احسب القيمة المتوسطة للدالة $f(x)=x^2$ على $[0,3]$.`,
        solution: r`$\mu=\frac{1}{3-0}\int_0^3x^2\,dx=\frac13\left[\frac{x^3}{3}\right]_0^3=\frac13\times9=3$.`,
      },
      {
        level: "صعب",
        statement: r`نضع $I_n=\int_0^1x^ne^x\,dx$. بيّن أن $0\le I_n\le\frac{e}{n+1}$، واستنتج $\lim I_n$.`,
        solution: r`على $[0,1]$: $0\le x^n$ و $1\le e^x\le e$، إذن $0\le x^ne^x\le ex^n$.

بالمكاملة (مع $0\le1$): $0\le I_n\le e\int_0^1x^n\,dx=e\left[\frac{x^{n+1}}{n+1}\right]_0^1=\frac{e}{n+1}$.

بما أن $\lim\frac{e}{n+1}=0$، فحسب مبرهنة الدرك $\lim I_n=0$.`,
      },
    ],
    mistakes: [
      r`حساب المساحة بـ $\int_a^bf$ دون القيمة المطلقة، بينما $f$ سالبة على جزء من المجال.`,
      r`نسيان وحدة المساحة $u.a$ في الجواب النهائي.`,
      r`في المكاملة بالأجزاء: اختيار $u=e^x$ و $v'=x$، فيصبح التكامل أصعب.`,
    ],
  },
};
