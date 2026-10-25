// Full versions of math lessons 9–11 (complex numbers, space geometry, counting & probability).
// NOTE: String.raw — never write a dollar sign directly followed by "{".
import type { SciLesson } from "../types";

const r = String.raw;

export const MATH_DEEP_3: Record<string, Partial<SciLesson>> = {
  "al-adad-al-uqdiya": {
    sections: [
      {
        heading: "الشكل الجبري للعدد العقدي",
        body: r`توجد مجموعة $\mathbb{C}$ تضم $\mathbb{R}$ وعدداً $i$ يحقق $i^2=-1$. كل عدد عقدي $z$ يكتب بكيفية وحيدة:

$$z=a+ib\qquad(a,b\in\mathbb{R})$$

$a=\mathrm{Re}(z)$ **الجزء الحقيقي** و $b=\mathrm{Im}(z)$ **الجزء التخيلي**. يكون $z$ حقيقياً إذا كان $b=0$، وتخيلياً صرفاً إذا كان $a=0$.

**الحساب**: نحسب كما في $\mathbb{R}$ مع تعويض $i^2$ بـ $-1$. ولكتابة خارج على الشكل الجبري، نضرب البسط والمقام في **مرافق** المقام.

**المرافق**: $\bar z=a-ib$. خاصيات: $\overline{z+z'}=\bar z+\bar z'$، $\overline{zz'}=\bar z\,\bar z'$، $z\bar z=a^2+b^2$، و $z+\bar z=2a$ و $z-\bar z=2ib$.

يكون $z$ حقيقياً إذا وفقط إذا كان $\bar z=z$، ويكون تخيلياً صرفاً إذا وفقط إذا كان $\bar z=-z$.`,
      },
      {
        heading: "التمثيل الهندسي",
        body: r`المستوى منسوب إلى معلم متعامد ممنظم $(O,\vec u,\vec v)$. العدد $z=a+ib$ يمثل بالنقطة $M(a,b)$، ونقول إن $z$ **لحق** النقطة $M$ وأن $M$ **صورة** $z$.

- لحق المتجهة $\overrightarrow{AB}$ هو $z_B-z_A$.
- لحق منتصف $[AB]$ هو $\frac{z_A+z_B}{2}$.
- صورة $\bar z$ هي مماثلة صورة $z$ بالنسبة لمحور الأفاصيل.`,
      },
      {
        heading: "المعيار والعمدة والشكل المثلثي",
        body: r`- **المعيار**: $|z|=\sqrt{a^2+b^2}=\sqrt{z\bar z}$، وهو المسافة $OM$. وبصفة عامة $AB=|z_B-z_A|$.
- **العمدة**: إذا كان $z\ne0$، عمدة $z$ هي قياس للزاوية $\left(\vec u,\overrightarrow{OM}\right)$، ونكتب $\arg z\equiv\theta\ [2\pi]$.

**الشكل المثلثي والشكل الأسي**: إذا كان $r=|z|$ و $\theta=\arg z$:
$$z=r(\cos\theta+i\sin\theta)=re^{i\theta}$$
مع $\cos\theta=\frac ar$ و $\sin\theta=\frac br$.

**خاصيات** $(z,z'\ne0)$:

| | المعيار | العمدة |
|---|---|---|
| جداء | $\lvert zz'\rvert=\lvert z\rvert\,\lvert z'\rvert$ | $\arg(zz')\equiv\arg z+\arg z'$ |
| خارج | $\left\lvert\frac{z}{z'}\right\rvert=\frac{\lvert z\rvert}{\lvert z'\rvert}$ | $\arg\frac{z}{z'}\equiv\arg z-\arg z'$ |
| قوة | $\lvert z^n\rvert=\lvert z\rvert^n$ | $\arg z^n\equiv n\arg z$ |
| مرافق | $\lvert\bar z\rvert=\lvert z\rvert$ | $\arg\bar z\equiv-\arg z$ |

**صيغة موافر**: $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$.
**صيغتا أولير**: $\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}{2}$ و $\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}$.`,
      },
      {
        heading: "المعادلة من الدرجة الثانية بمعاملات حقيقية",
        body: r`المعادلة $az^2+bz+c=0$ $(a\ne0)$ مميزها $\Delta=b^2-4ac$:

- $\Delta>0$: حلان حقيقيان $z_{1,2}=\frac{-b\pm\sqrt\Delta}{2a}$.
- $\Delta=0$: حل مزدوج $z=-\frac{b}{2a}$.
- $\Delta<0$: حلان عقديان مترافقان $z_{1,2}=\frac{-b\pm i\sqrt{-\Delta}}{2a}$.`,
      },
      {
        heading: "الأعداد العقدية والهندسة",
        body: r`- **قياس زاوية**: $\left(\overrightarrow{AB},\overrightarrow{AC}\right)\equiv\arg\frac{z_C-z_A}{z_B-z_A}\ [2\pi]$.
- تكون $A$ و $B$ و $C$ **مستقيمية** إذا وفقط إذا كان $\frac{z_C-z_A}{z_B-z_A}$ حقيقياً.
- يكون $(AB)\perp(AC)$ إذا وفقط إذا كان $\frac{z_C-z_A}{z_B-z_A}$ تخيلياً صرفاً.
- إذا كان $\frac{z_C-z_A}{z_B-z_A}=i$ أو $-i$: المثلث $ABC$ متساوي الساقين وقائم الزاوية في $A$. وإذا كان يساوي $e^{\pm i\frac\pi3}$: المثلث متساوي الأضلاع.

**التحويلات**:

| التحويل | الكتابة العقدية |
|---|---|
| الإزاحة ذات المتجهة $\vec w(b)$ | $z'=z+b$ |
| التحاكي ذو المركز $\Omega(\omega)$ والنسبة $k$ | $z'-\omega=k(z-\omega)$ |
| الدوران ذو المركز $\Omega(\omega)$ والزاوية $\theta$ | $z'-\omega=e^{i\theta}(z-\omega)$ |`,
      },
    ],
    examples: [
      {
        title: "الحساب على الشكل الجبري",
        problem: r`اكتب على الشكل الجبري: $z_1=(1+i)(2-3i)$ و $z_2=\frac{1}{1+i}$.`,
        solution: r`- $z_1=2-3i+2i-3i^2=2-i+3=5-i$.
- $z_2=\frac{1\times(1-i)}{(1+i)(1-i)}=\frac{1-i}{1+1}=\frac12-\frac12i$.`,
      },
      {
        title: "الشكل المثلثي وصيغة موافر",
        problem: r`حدد معيار وعمدة $z=1+i\sqrt3$، ثم احسب $z^6$.`,
        solution: r`$|z|=\sqrt{1+3}=2$. لدينا $\cos\theta=\frac12$ و $\sin\theta=\frac{\sqrt3}{2}$، إذن $\theta\equiv\frac\pi3\ [2\pi]$.

$z=2e^{i\frac\pi3}$، ومنه $z^6=2^6e^{i\frac{6\pi}{3}}=64e^{2i\pi}=64$.`,
      },
      {
        title: "معادلة من الدرجة الثانية",
        problem: r`حل في $\mathbb{C}$ المعادلة $z^2-2z+5=0$.`,
        solution: r`$\Delta=4-20=-16<0$، و $\sqrt{-\Delta}=4$.

$z_1=\frac{2+4i}{2}=1+2i$ و $z_2=\frac{2-4i}{2}=1-2i$.`,
      },
      {
        title: "طبيعة مثلث",
        problem: r`نعتبر النقط $A(1+i)$ و $B(3+i)$ و $C(1+3i)$. حدد طبيعة المثلث $ABC$.`,
        solution: r`$\frac{z_C-z_A}{z_B-z_A}=\frac{(1+3i)-(1+i)}{(3+i)-(1+i)}=\frac{2i}{2}=i$.

إذن $\left|\frac{z_C-z_A}{z_B-z_A}\right|=1$، أي $AC=AB$، و $\arg i\equiv\frac\pi2$، أي $\left(\overrightarrow{AB},\overrightarrow{AC}\right)\equiv\frac\pi2$.

المثلث $ABC$ متساوي الساقين وقائم الزاوية في $A$.`,
      },
      {
        title: "صورة نقطة بدوران",
        problem: r`حدد صورة النقطة $M(2+i)$ بالدوران الذي مركزه $\Omega(1)$ وزاويته $\frac\pi2$.`,
        solution: r`الكتابة العقدية: $z'-1=e^{i\frac\pi2}(z-1)=i(z-1)$.

$z'=1+i\left((2+i)-1\right)=1+i(1+i)=1+i-1=i$. إذن الصورة هي النقطة ذات اللحق $i$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`اكتب على الشكل الجبري: $\frac{2+i}{1-i}$.`,
        solution: r`$\frac{(2+i)(1+i)}{(1-i)(1+i)}=\frac{2+2i+i-1}{2}=\frac12+\frac32i$.`,
      },
      {
        level: "سهل",
        statement: r`حدد معيار وعمدة $z=-2+2i$.`,
        solution: r`$|z|=\sqrt{4+4}=2\sqrt2$. $\cos\theta=\frac{-2}{2\sqrt2}=-\frac{\sqrt2}{2}$ و $\sin\theta=\frac{\sqrt2}{2}$، إذن $\theta\equiv\frac{3\pi}{4}$.`,
      },
      {
        level: "متوسط",
        statement: r`حل في $\mathbb{C}$: $z^2+z+1=0$.`,
        solution: r`$\Delta=1-4=-3$. $z=\frac{-1\pm i\sqrt3}{2}$.`,
      },
      {
        level: "متوسط",
        statement: r`باستعمال صيغة موافر لـ $n=2$، عبّر عن $\cos2\theta$ و $\sin2\theta$ بدلالة $\cos\theta$ و $\sin\theta$.`,
        solution: r`$(\cos\theta+i\sin\theta)^2=\cos^2\theta-\sin^2\theta+2i\sin\theta\cos\theta$، وحسب موافر هذا يساوي $\cos2\theta+i\sin2\theta$.

بمطابقة الجزأين: $\cos2\theta=\cos^2\theta-\sin^2\theta$ و $\sin2\theta=2\sin\theta\cos\theta$.`,
      },
      {
        level: "صعب",
        statement: r`حدد مجموعة النقط $M(z)$ التي تحقق $|z-2|=|z+i|$.`,
        solution: r`نضع $A(2)$ و $B(-i)$. $|z-2|=AM$ و $|z+i|=|z-(-i)|=BM$.

$AM=BM$: مجموعة النقط هي **واسط القطعة** $[AB]$.`,
      },
    ],
    mistakes: [
      r`نسيان أن $i^2=-1$ عند النشر، أو كتابة $|a+ib|=a+b$ بدل $\sqrt{a^2+b^2}$.`,
      r`تحديد العمدة من $\tan\theta$ فقط دون النظر إلى إشارتي $\cos\theta$ و $\sin\theta$ (الربع).`,
      r`في الدوران: نسيان طرح لحق المركز، أي كتابة $z'=e^{i\theta}z$ بينما المركز ليس $O$.`,
    ],
  },

  "al-handasa-al-fadaiya": {
    sections: [
      {
        heading: "الجداء السلمي في الفضاء",
        body: r`الفضاء منسوب إلى معلم متعامد ممنظم $(O,\vec i,\vec j,\vec k)$. لمتجهتين $\vec u(x,y,z)$ و $\vec v(x',y',z')$:

$$\vec u\cdot\vec v=xx'+yy'+zz'\qquad\|\vec u\|=\sqrt{x^2+y^2+z^2}$$

- $\vec u\cdot\vec v=\|\vec u\|\,\|\vec v\|\cos\left(\vec u,\vec v\right)$.
- تكون $\vec u$ و $\vec v$ متعامدتين إذا وفقط إذا كان $\vec u\cdot\vec v=0$.
- المسافة بين نقطتين: $AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$.`,
      },
      {
        heading: "معادلة مستوى ومسافة نقطة عن مستوى",
        body: r`**المتجهة المنظمية** لمستوى $(P)$ هي كل متجهة غير منعدمة عمودية على جميع متجهات $(P)$.

المستوى الذي يمر من $A$ ومتجهته المنظمية $\vec n(a,b,c)$ هو مجموعة النقط $M$ حيث $\overrightarrow{AM}\cdot\vec n=0$، ومعادلته الديكارتية:

$$ax+by+cz+d=0$$

ونحدد $d$ بتعويض إحداثيات $A$.

**مسافة نقطة** $M_0(x_0,y_0,z_0)$ عن المستوى $(P):ax+by+cz+d=0$:

$$d(M_0,(P))=\frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$$

**التمثيل البارامتري لمستقيم** مار من $A$ وموجه بـ $\vec u(\alpha,\beta,\gamma)$: $x=x_A+\alpha t$، $y=y_A+\beta t$، $z=z_A+\gamma t$ $(t\in\mathbb{R})$.`,
      },
      {
        heading: "الفلكة",
        body: r`**الفلكة** $(S)$ ذات المركز $\Omega(a,b,c)$ والشعاع $R$ هي مجموعة النقط $M$ حيث $\Omega M=R$، ومعادلتها:

$$(x-a)^2+(y-b)^2+(z-c)^2=R^2$$

إذا أعطيت معادلة على شكل $x^2+y^2+z^2+\alpha x+\beta y+\gamma z+\delta=0$، نكملها إلى مربعات لنعرف المركز والشعاع.

**تقاطع فلكة ومستوى**: نحسب $d=d(\Omega,(P))$:

| الحالة | التقاطع |
|---|---|
| $d>R$ | فارغ |
| $d=R$ | نقطة واحدة: المستوى مماس للفلكة |
| $d<R$ | دائرة شعاعها $r=\sqrt{R^2-d^2}$ ومركزها المسقط العمودي لـ $\Omega$ على $(P)$ |`,
      },
      {
        heading: "الجداء المتجهي",
        body: r`**الجداء المتجهي** لـ $\vec u$ و $\vec v$ هو متجهة $\vec w=\vec u\wedge\vec v$:
- عمودية على $\vec u$ و $\vec v$؛
- منظمها $\|\vec u\|\,\|\vec v\|\,|\sin(\vec u,\vec v)|$؛
- الثلاثي $(\vec u,\vec v,\vec w)$ مباشر.

**الإحداثيات**:
$$\vec u\wedge\vec v=\left(yz'-zy',\ zx'-xz',\ xy'-yx'\right)$$

**خاصيات**: $\vec v\wedge\vec u=-\vec u\wedge\vec v$؛ وتكون $\vec u$ و $\vec v$ مستقيميتين إذا وفقط إذا كان $\vec u\wedge\vec v=\vec 0$.

**تطبيقات**:
- متجهة منظمية للمستوى $(ABC)$: $\vec n=\overrightarrow{AB}\wedge\overrightarrow{AC}$.
- مساحة المثلث: $S_{ABC}=\frac12\|\overrightarrow{AB}\wedge\overrightarrow{AC}\|$.
- مسافة نقطة $M$ عن مستقيم $(D)$ مار من $A$ وموجه بـ $\vec u$: $d(M,(D))=\frac{\|\overrightarrow{AM}\wedge\vec u\|}{\|\vec u\|}$.`,
      },
    ],
    examples: [
      {
        title: "معادلة مستوى بالجداء المتجهي",
        problem: r`نعتبر $A(1,0,0)$ و $B(0,1,0)$ و $C(0,0,1)$. حدد معادلة ديكارتية للمستوى $(ABC)$ ومساحة المثلث $ABC$.`,
        solution: r`$\overrightarrow{AB}(-1,1,0)$ و $\overrightarrow{AC}(-1,0,1)$.

$\overrightarrow{AB}\wedge\overrightarrow{AC}=\left(1\times1-0\times0,\ 0\times(-1)-(-1)\times1,\ (-1)\times0-1\times(-1)\right)=(1,1,1)$.

المعادلة: $x+y+z+d=0$؛ $A\in(P)$ إذن $1+d=0$ و $d=-1$: $(ABC):x+y+z-1=0$.

المساحة: $S=\frac12\sqrt{1+1+1}=\frac{\sqrt3}{2}$.`,
      },
      {
        title: "مسافة نقطة عن مستوى",
        problem: r`احسب مسافة أصل المعلم $O$ عن المستوى $(P):x+y+z-1=0$.`,
        solution: r`$d(O,(P))=\frac{|0+0+0-1|}{\sqrt{1+1+1}}=\frac{1}{\sqrt3}=\frac{\sqrt3}{3}$.`,
      },
      {
        title: "فلكة وتقاطعها مع مستوى",
        problem: r`حدد مركز وشعاع الفلكة $(S):x^2+y^2+z^2-2x+4y-4=0$، ثم حدد تقاطعها مع المستوى $(Q):z=2$.`,
        solution: r`نكمل إلى مربعات: $(x-1)^2-1+(y+2)^2-4+z^2-4=0$، أي $(x-1)^2+(y+2)^2+z^2=9$.

المركز $\Omega(1,-2,0)$ والشعاع $R=3$.

$d(\Omega,(Q))=|0-2|=2<3$: التقاطع دائرة شعاعها $r=\sqrt{9-4}=\sqrt5$ ومركزها $(1,-2,2)$.`,
      },
      {
        title: "تقاطع مستقيم ومستوى",
        problem: r`حدد تقاطع المستقيم $(D)$ المار من $A(1,2,0)$ والموجه بـ $\vec u(1,-1,2)$ مع المستوى $(P):x+y+z-1=0$.`,
        solution: r`تمثيل بارامتري لـ $(D)$: $x=1+t$، $y=2-t$، $z=2t$.

نعوض في معادلة $(P)$: $(1+t)+(2-t)+2t-1=0\iff2+2t=0\iff t=-1$.

نقطة التقاطع: $(0,3,-2)$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`هل المتجهتان $\vec u(1,2,-1)$ و $\vec v(2,-1,0)$ متعامدتان؟`,
        solution: r`$\vec u\cdot\vec v=2-2+0=0$: نعم، متعامدتان.`,
      },
      {
        level: "سهل",
        statement: r`حدد معادلة المستوى المار من $A(1,1,1)$ والذي متجهته المنظمية $\vec n(2,-1,3)$.`,
        solution: r`$2x-y+3z+d=0$؛ $2-1+3+d=0$ إذن $d=-4$: $2x-y+3z-4=0$.`,
      },
      {
        level: "متوسط",
        statement: r`ادرس تقاطع الفلكة التي مركزها $O$ وشعاعها $2$ مع المستوى $x+y+z-3=0$.`,
        solution: r`$d=\frac{|-3|}{\sqrt3}=\sqrt3<2$: التقاطع دائرة شعاعها $\sqrt{4-3}=1$.`,
      },
      {
        level: "متوسط",
        statement: r`احسب $\vec u\wedge\vec v$ حيث $\vec u(1,0,1)$ و $\vec v(0,1,1)$.`,
        solution: r`$\left(0\times1-1\times1,\ 1\times0-1\times1,\ 1\times1-0\times0\right)=(-1,-1,1)$.`,
      },
    ],
    mistakes: [
      r`الخطأ في الإحداثية الثانية للجداء المتجهي: هي $zx'-xz'$ (وليس $xz'-zx'$).`,
      r`نسيان القيمة المطلقة في صيغة مسافة نقطة عن مستوى.`,
      r`عند إكمال المربعات: نسيان طرح الثوابت، فيُحسب الشعاع خطأً.`,
    ],
  },

  "at-taadad-wa-al-ihtimalat": {
    sections: [
      {
        heading: "المبدأ الأساسي للتعداد",
        body: r`إذا كانت تجربة تتم على $p$ مراحل، وكانت المرحلة الأولى تتم بـ $n_1$ كيفية، والثانية بـ $n_2$ كيفية، ...، فإن عدد النتائج الممكنة هو:

$$n_1\times n_2\times\dots\times n_p$$

مثال: عدد الأرقام السرية المكونة من 4 أرقام (من 0 إلى 9) هو $10\times10\times10\times10=10^4$.`,
      },
      {
        heading: "الترتيبات والتبديلات والتأليفات",
        body: r`لتكن $E$ مجموعة تضم $n$ عنصراً:

| المفهوم | الترتيب مهم؟ | التكرار؟ | العدد |
|---|---|---|---|
| ترتيبة بتكرار لـ $p$ عنصر | نعم | نعم | $n^p$ |
| ترتيبة بدون تكرار لـ $p$ عنصر | نعم | لا | $A_n^p=\frac{n!}{(n-p)!}$ |
| تبديلة (كل العناصر) | نعم | لا | $n!$ |
| تأليفة لـ $p$ عنصر | لا | لا | $C_n^p=\frac{n!}{p!(n-p)!}$ |

حيث $n!=n\times(n-1)\times\dots\times2\times1$ و $0!=1$.

**خاصيات** $C_n^p$: $C_n^0=C_n^n=1$، $C_n^1=n$، $C_n^p=C_n^{n-p}$.

**نوع السحب يحدد طريقة العد**:
- سحب **في آن واحد** لـ $p$ كرات من $n$: تأليفات $C_n^p$.
- سحب **بالتتابع وبدون إحلال**: ترتيبات بدون تكرار $A_n^p$.
- سحب **بالتتابع وبإحلال**: ترتيبات بتكرار $n^p$.`,
      },
      {
        heading: "الاحتمالات",
        body: r`- **كون الإمكانيات** $\Omega$: مجموعة النتائج الممكنة. **الحدث**: جزء من $\Omega$.
- **فرضية تساوي الاحتمال**: إذا كانت جميع النتائج لها نفس الحظ:
$$p(A)=\frac{\mathrm{card}\,A}{\mathrm{card}\,\Omega}$$
- $0\le p(A)\le1$، $p(\Omega)=1$، $p(\varnothing)=0$.
- **الحدث المضاد**: $p(\bar A)=1-p(A)$. مفيد جداً لعبارات "على الأقل".
- $p(A\cup B)=p(A)+p(B)-p(A\cap B)$؛ وإذا كان $A$ و $B$ غير منسجمين: $p(A\cup B)=p(A)+p(B)$.`,
      },
      {
        heading: "الاحتمال الشرطي والاستقلالية",
        body: r`- **احتمال** $A$ **علماً أن** $B$ **محقق** $(p(B)\ne0)$:
$$p_B(A)=\frac{p(A\cap B)}{p(B)}$$
ومنه $p(A\cap B)=p(B)\times p_B(A)$.
- **صيغة الاحتمالات الكلية**: $p(A)=p(B)\,p_B(A)+p(\bar B)\,p_{\bar B}(A)$. نستعمل **شجرة الاحتمالات** لتنظيمها.
- يكون الحدثان $A$ و $B$ **مستقلين** إذا وفقط إذا كان $p(A\cap B)=p(A)\times p(B)$.`,
      },
      {
        heading: "المتغير العشوائي وقانون الحدانية",
        body: r`**المتغير العشوائي** $X$ يربط كل نتيجة بعدد حقيقي. **قانون احتمال** $X$: الجدول الذي يعطي $p(X=x_i)$ لكل قيمة $x_i$، ومجموع الاحتمالات يساوي $1$.

- **الأمل الرياضي**: $E(X)=\sum x_i\,p(X=x_i)$.
- **المغايرة**: $V(X)=E(X^2)-\left(E(X)\right)^2$، و**الانحراف الطرازي** $\sigma(X)=\sqrt{V(X)}$.

**قانون الحدانية**: نكرر $n$ مرات، وبكيفية مستقلة، تجربة لها نتيجتان: "نجاح" باحتمال $p$ و"فشل" باحتمال $1-p$. المتغير $X$ عدد مرات النجاح يتبع قانون الحدانية ذا الوسيطين $n$ و $p$:

$$p(X=k)=C_n^k\,p^k(1-p)^{n-k}\qquad(0\le k\le n)$$

$$E(X)=np\qquad V(X)=np(1-p)$$`,
      },
    ],
    examples: [
      {
        title: "سحب في آن واحد",
        problem: r`يحتوي كيس على 3 كرات حمراء وكرتين بيضاوين. نسحب في آن واحد كرتين. احسب احتمال الحصول على كرتين حمراوين، ثم على كرتين من لونين مختلفين.`,
        solution: r`$\mathrm{card}\,\Omega=C_5^2=10$.

- كرتان حمراوان: $C_3^2=3$ إمكانيات، إذن $p=\frac{3}{10}$.
- لونان مختلفان: حمراء وبيضاء: $C_3^1\times C_2^1=6$، إذن $p=\frac{6}{10}=\frac35$.`,
      },
      {
        title: "احتمال شرطي وشجرة",
        problem: r`$p(A)=0{,}4$ و $p_A(B)=0{,}5$ و $p_{\bar A}(B)=0{,}2$. احسب $p(B)$ ثم $p_B(A)$.`,
        solution: r`$p(\bar A)=0{,}6$. حسب صيغة الاحتمالات الكلية:

$p(B)=p(A)p_A(B)+p(\bar A)p_{\bar A}(B)=0{,}4\times0{,}5+0{,}6\times0{,}2=0{,}2+0{,}12=0{,}32$.

$p_B(A)=\frac{p(A\cap B)}{p(B)}=\frac{0{,}2}{0{,}32}=0{,}625$.`,
      },
      {
        title: "قانون متغير عشوائي",
        problem: r`في تجربة المثال 1، ليكن $X$ عدد الكرات الحمراء المسحوبة. حدد قانون $X$ وأمله الرياضي ومغايرته.`,
        solution: r`$X$ يأخذ القيم $0$ و $1$ و $2$:

| $x_i$ | $0$ | $1$ | $2$ |
|---|---|---|---|
| $p(X=x_i)$ | $\frac{1}{10}$ | $\frac{6}{10}$ | $\frac{3}{10}$ |

($p(X=0)=\frac{C_2^2}{10}=\frac1{10}$.)

$E(X)=0+\frac{6}{10}+\frac{6}{10}=1{,}2$. $E(X^2)=0+\frac{6}{10}+\frac{12}{10}=1{,}8$، إذن $V(X)=1{,}8-1{,}44=0{,}36$.`,
      },
      {
        title: "قانون الحدانية",
        problem: r`نرمي نرداً متوازناً 4 مرات. ليكن $X$ عدد مرات الحصول على الرقم 6. احسب $p(X=2)$ و $E(X)$.`,
        solution: r`الرميات مستقلة، و"النجاح" هو الحصول على 6 باحتمال $p=\frac16$. إذن $X$ يتبع قانون الحدانية بالوسيطين $n=4$ و $p=\frac16$.

$p(X=2)=C_4^2\left(\frac16\right)^2\left(\frac56\right)^2=6\times\frac{1}{36}\times\frac{25}{36}=\frac{150}{1296}=\frac{25}{216}$.

$E(X)=np=4\times\frac16=\frac23$.`,
      },
    ],
    exercises: [
      {
        level: "سهل",
        statement: r`كم عدد الأرقام السرية المكونة من 4 أرقام (من 0 إلى 9)؟ وكم منها أرقامها مختلفة مثنى مثنى؟`,
        solution: r`- بتكرار: $10^4=10000$.
- بدون تكرار: $A_{10}^4=10\times9\times8\times7=5040$.`,
      },
      {
        level: "سهل",
        statement: r`بكم طريقة يمكن اختيار لجنة من 3 تلاميذ من بين 8؟`,
        solution: r`الترتيب غير مهم: $C_8^3=\frac{8\times7\times6}{3\times2\times1}=56$.`,
      },
      {
        level: "متوسط",
        statement: r`نرمي قطعة نقدية متوازنة 3 مرات. احسب احتمال الحصول على "وجه" مرة واحدة على الأقل.`,
        solution: r`الحدث المضاد: عدم الحصول على أي "وجه": احتماله $\left(\frac12\right)^3=\frac18$. إذن $p=1-\frac18=\frac78$.`,
      },
      {
        level: "صعب",
        statement: r`$X$ يتبع قانون الحدانية بالوسيطين $n=5$ و $p=0{,}3$. احسب $p(X=0)$ و $p(X\ge1)$ و $V(X)$.`,
        solution: r`- $p(X=0)=C_5^0(0{,}3)^0(0{,}7)^5=0{,}16807$.
- $p(X\ge1)=1-p(X=0)=0{,}83193$.
- $V(X)=np(1-p)=5\times0{,}3\times0{,}7=1{,}05$.`,
      },
    ],
    mistakes: [
      r`الخلط بين السحب في آن واحد (تأليفات) والسحب بالتتابع (ترتيبات).`,
      r`في "على الأقل": حساب كل الحالات بدل استعمال الحدث المضاد.`,
      r`استعمال قانون الحدانية بينما التجارب غير مستقلة (مثلاً سحب بدون إحلال).`,
    ],
  },
};
