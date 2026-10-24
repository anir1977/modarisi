import Link from "next/link";
import "@fontsource/lalezar/400.css";
import "@fontsource/readex-pro/400.css";
import "@fontsource/readex-pro/500.css";
import "@fontsource/readex-pro/700.css";
import s from "./c.module.css";
import { EXAMS, HISTORY, NAV, PHILO, STATS, TRACKS, previewMeta } from "../data";

export const metadata = previewMeta("ملصق ماجوريل");

export default function DesignC() {
  return (
    <div className={s.page} dir="rtl">
      <div className={s.top}>
        <div className={s.wrap}>
          <header className={s.header}>
            <Link href="/" className={s.logo}>
              <svg width="30" height="30" viewBox="0 0 100 100" aria-hidden="true">
                <g fill="#f2b233">
                  <rect x="22" y="22" width="56" height="56" />
                  <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
                </g>
              </svg>
              <span className={s.lalezar}>مدرسي</span>
            </Link>
            <nav className={s.nav} aria-label="القائمة">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
            </nav>
          </header>
          <section className={s.hero}>
            <div className={s.heroText}>
              <h1 className={`${s.h1} ${s.lalezar}`}>الباك<br />بلا خوف</h1>
              <p className={s.lead}>ملخصات الدروس، امتحانات وطنية حقيقية بتصحيح مفصل، وحاسبة معدل لكل شعبة. مجاناً وبدون تسجيل.</p>
              <div className={s.ctas}>
                <Link href="/examens" className={s.btn}>تصفح الامتحانات المصححة</Link>
                <Link href="/calculateur" className={s.btnW}>احسب معدلك</Link>
              </div>
            </div>
            <div className={s.starBox} aria-hidden="true">
              <div className={s.star}><i /><i /><b /></div>
            </div>
          </section>
        </div>
      </div>

      <div className={s.bar}>
        <div className={`${s.wrap} ${s.barIn}`}>
          <span>احسب معدلك:</span>
          {TRACKS.map((t) => (
            <Link key={t.label} href={t.href}>{t.label}</Link>
          ))}
        </div>
      </div>

      <main className={`${s.wrap} ${s.main}`}>
        <section className={s.split}>
          <div>
            <h2 className={`${s.h2} ${s.lalezar}`}>امتحانات<br />مصححة</h2>
            <p className={s.count}>{STATS.exams} امتحانات وطنية بتصحيح منهجي، سؤالاً بسؤال.</p>
          </div>
          <div className={s.list}>
            {EXAMS.map((e) => (
              <Link key={e.href} href={e.href}>
                <span className={`${s.year} ${s.lalezar}`}>{e.year}</span>
                <span className={s.subj}>{e.subject}</span>
                <span className={s.track}>{e.track}</span>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 88 }}>
          <h2 className={`${s.h2} ${s.lalezar}`}>الفلسفة · {STATS.concepts} مفهوم</h2>
          <div className={s.tiles}>
            {PHILO.map((m) => (
              <div key={m.name} className={s.tile}>
                <div className={`${s.tileName} ${s.lalezar}`}>{m.short}</div>
                <div className={s.tileList}>
                  {m.concepts.map((c) => (
                    <Link key={c.href} href={c.href}>{c.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 88 }}>
          <h2 className={`${s.h2} ${s.lalezar}`}>التاريخ · {STATS.history} درس</h2>
          <div className={s.hist}>
            {HISTORY.map((l) => (
              <Link key={l.href} href={l.href}>{l.title}</Link>
            ))}
          </div>
        </section>

        <section className={s.tutor}>
          <div>
            <h2 className={s.lalezar}>عالق<br />فشي تمرين؟</h2>
            <p>اكتب السؤال للأستاذ الافتراضي: القاعدة أولاً، ثم الحل خطوة بخطوة.</p>
          </div>
          <form action="/tuteur" className={s.tutorForm}>
            <input name="q" placeholder="مثلاً: شرح لي أزمة 1929 بإيجاز" aria-label="سؤالك" />
            <button type="submit">اسأل الأستاذ</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footIn}`}>
          <span>مدرسي · موقع مستقل، غير تابع لوزارة التربية الوطنية</span>
          <nav>
            <Link href="/about">من نحن</Link>
            <Link href="/contact">اتصل بنا</Link>
            <Link href="/privacy">الخصوصية</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
