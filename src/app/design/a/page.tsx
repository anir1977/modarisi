import Link from "next/link";
import "@fontsource/aref-ruqaa/700.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import s from "./a.module.css";
import { EXAMS, FEATURED, HISTORY, NAV, PHILO, TRACKS, previewMeta } from "../data";

export const metadata = previewMeta("ورقة الامتحان");

const Mark = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="7">
      <rect x="20" y="20" width="60" height="60" />
      <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
    </g>
  </svg>
);

export default function DesignA() {
  return (
    <div className={s.page} dir="rtl">
      <div className={s.wrap}>
        <header className={s.header}>
          <Link href="/" className={s.logo}>
            <Mark />
            <span className={s.ruqaa}>مدرسي</span>
          </Link>
          <nav className={s.nav} aria-label="القائمة">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
        </header>

        <section className={s.sheet}>
          <div className={s.sheetHead}>
            <div>
              <strong>موقع مغربي مستقل</strong>
              <div className={s.muted}>للتحضير للباكالوريا</div>
            </div>
            <div className={s.center}>
              <strong>الامتحان الوطني الموحد للبكالوريا</strong>
              <span className={s.muted}>المراجعة · كل المسالك</span>
            </div>
            <div className={s.meta}>
              <span className={s.muted}>المعامل</span><strong>مجاني</strong>
              <span className={s.muted}>المدة</span><strong>على راحتك</strong>
            </div>
          </div>
          <div className={s.hero}>
            <div className={s.heroMain}>
              <h1 className={`${s.h1} ${s.ruqaa}`}>راجع للباك<br />كأنك تصحح<br />مع أستاذك</h1>
              <p className={s.lead}>ملخصات الدروس، امتحانات وطنية حقيقية بتصحيح مفصل، وحاسبة معدل لكل شعبة. مجاناً وبدون تسجيل.</p>
              <div className={s.ctas}>
                <Link href="/examens" className={s.btn}>تصفح الامتحانات المصححة</Link>
                <Link href="/calculateur" className={s.btnGhost}>احسب معدلك</Link>
              </div>
            </div>
            <div className={s.heroSide}>
              <div className={s.qLabel}>{FEATURED.label}</div>
              <p className={s.q}>{FEATURED.prompt}</p>
              <div className={`${s.note} ${s.ruqaa}`}>
                <small>ملاحظة المصحح</small>
                <span className={s.noteText}>{FEATURED.note}</span>
              </div>
              <Link href={FEATURED.href} className={s.link}>اقرأ التصحيح كاملاً ←</Link>
            </div>
          </div>
        </section>

        <div className={s.tracks}>
          <span>احسب معدلك:</span>
          {TRACKS.map((t) => (
            <Link key={t.label} href={t.href}>{t.label}</Link>
          ))}
        </div>

        <section className={s.section}>
          <h2 className={`${s.h2} ${s.ruqaa}`}>الامتحانات المصححة</h2>
          <div className={s.table}>
            <div className={`${s.row} ${s.th}`}>
              <span>الدورة</span><span>المادة</span><span>المسلك</span><span>التصحيح</span>
            </div>
            {EXAMS.map((e) => (
              <Link key={e.href} href={e.href} className={s.row}>
                <span className={s.year}>{e.year}</span>
                <span className={s.subj}>{e.subject}</span>
                <span className={s.muted}>{e.track} · الدورة {e.session}</span>
                <span className={`${s.stamp} ${s.ruqaa}`}>مصحح</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${s.section} ${s.two}`}>
          <div className={s.card}>
            <h2 className={`${s.h2} ${s.ruqaa}`}>الفلسفة</h2>
            {PHILO.map((m) => (
              <div key={m.name} className={s.mod}>
                <div className={s.modName}>{m.name}</div>
                <div className={s.concepts}>
                  {m.concepts.map((c) => (
                    <Link key={c.href} href={c.href}>{c.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={s.card}>
            <h2 className={`${s.h2} ${s.ruqaa}`}>التاريخ</h2>
            <ol className={s.ol}>
              {HISTORY.slice(0, 8).map((l) => (
                <li key={l.href}><Link href={l.href}>{l.title}</Link></li>
              ))}
            </ol>
            <p style={{ marginTop: 16 }}><Link href="/dourous/tarikh-jughrafiya" className={s.link}>كل دروس التاريخ ←</Link></p>
          </div>
        </section>

        <section className={s.tutor}>
          <div>
            <h2 className={s.ruqaa}>عالق فشي تمرين؟</h2>
            <p>اكتب السؤال للأستاذ الافتراضي: القاعدة أولاً، ثم الحل خطوة بخطوة.</p>
          </div>
          <form action="/tuteur" className={s.tutorForm}>
            <input name="q" placeholder="مثلاً: كيف أكتب مقدمة إنشاء فلسفي؟" aria-label="سؤالك" />
            <button type="submit">اسأل الأستاذ</button>
          </form>
        </section>

        <footer className={s.footer}>
          <span>مدرسي · موقع مستقل، غير تابع لوزارة التربية الوطنية</span>
          <nav>
            <Link href="/about">من نحن</Link>
            <Link href="/contact">اتصل بنا</Link>
            <Link href="/privacy">الخصوصية</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
