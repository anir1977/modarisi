import Link from "next/link";
import "@fontsource/reem-kufi/700.css";
import "@fontsource/readex-pro/300.css";
import "@fontsource/readex-pro/400.css";
import "@fontsource/readex-pro/600.css";
import s from "./b.module.css";
import { EXAMS, HISTORY, NAV, PHILO, TRACKS, previewMeta } from "../data";

export const metadata = previewMeta("السبورة");

export default function DesignB() {
  return (
    <div className={s.page} dir="rtl">
      <div className={s.wrap}>
        <header className={s.header}>
          <Link href="/" className={s.logo}>
            <svg width="32" height="32" viewBox="0 0 100 100" aria-hidden="true">
              <g fill="none" stroke="#eceee6" strokeWidth="6">
                <rect x="20" y="20" width="60" height="60" />
                <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
              </g>
              <circle cx="50" cy="50" r="8" fill="#f4d35e" />
            </svg>
            <span className={s.kufi}>مدرسي</span>
          </Link>
          <nav className={s.nav} aria-label="القائمة">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
        </header>

        <section className={s.board}>
          <div>
            <div className={s.date}>الثانية باكالوريا · حصة المراجعة</div>
            <h1 className={`${s.h1} ${s.kufi}`}>الدرس واضح<br />والامتحان<br />مصحح</h1>
            <svg className={s.underline} viewBox="0 0 300 18" aria-hidden="true">
              <path d="M4 12 C 60 4, 140 16, 296 6" stroke="#f4d35e" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
            <p className={s.lead}>ملخصات الدروس، امتحانات وطنية حقيقية بتصحيح مفصل، وحاسبة معدل لكل شعبة. مجاناً وبدون تسجيل.</p>
            <div className={s.ctas}>
              <Link href="/examens" className={s.btn}>تصفح الامتحانات المصححة</Link>
              <Link href="/calculateur" className={s.btnGhost}>احسب معدلك</Link>
            </div>
          </div>
          <div className={`${s.formula} ${s.kufi}`}>
            <div className={s.fLabel}>المعدل العام =</div>
            <div className={s.fBody}>٪٢٥ جهوي<br />+ ٪٢٥ مراقبة مستمرة<br />+ ٪٥٠ وطني</div>
            <div className={s.dash} />
            <div className={s.fLabel}>نقطة الانتقاء =</div>
            <div className={s.fBody}>٪٧٥ وطني + ٪٢٥ جهوي</div>
            <Link href="/calculateur" className={s.fLink} style={{ fontFamily: "'Readex Pro', sans-serif" }}>جرّب الحاسبة ←</Link>
          </div>
        </section>

        <div className={s.tracks}>
          <span>شعبتك:</span>
          {TRACKS.map((t) => (
            <Link key={t.label} href={t.href}>{t.label}</Link>
          ))}
        </div>

        <section className={`${s.section} ${s.split}`}>
          <div>
            <h2 className={`${s.h2} ${s.kufi}`}>الامتحانات الوطنية المصححة</h2>
            <p className={s.sub}>مواضيع حقيقية من الوزارة، وتصحيح منهجي مكتوب سؤالاً بسؤال.</p>
          </div>
          <ul className={s.list}>
            {EXAMS.map((e) => (
              <li key={e.href}>
                <Link href={e.href}>
                  <span className={`${s.year} ${s.kufi}`}>{e.year}</span>
                  <span className={s.subj}>{e.subject}</span>
                  <span className={s.track}>{e.track}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section}>
          <h2 className={`${s.h2} ${s.kufi}`}>دروس الفلسفة</h2>
          <div className={s.mods}>
            {PHILO.map((m) => (
              <div key={m.name} className={s.mod}>
                <div className={s.modName}>{m.short}</div>
                <div className={`${s.modList} ${s.kufi}`}>
                  {m.concepts.map((c) => (
                    <Link key={c.href} href={c.href}>{c.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <h2 className={`${s.h2} ${s.kufi}`}>دروس التاريخ</h2>
          <ol className={s.hist}>
            {HISTORY.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.title}</Link></li>
            ))}
          </ol>
        </section>

        <section className={s.tutor}>
          <div>
            <h2 className={s.kufi}>عالق فشي تمرين؟</h2>
            <p>اكتب السؤال للأستاذ الافتراضي: القاعدة أولاً، ثم الحل خطوة بخطوة.</p>
          </div>
          <form action="/tuteur" className={s.tutorForm}>
            <input name="q" placeholder="مثلاً: لخص لي مفهوم الدولة" aria-label="سؤالك" />
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
