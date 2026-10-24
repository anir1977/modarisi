import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroPhotoSlider } from "@/components/hero-photo-slider";
import s from "./home.module.css";
import { EXAMS, HISTORY, PHILO, STATS, TRACKS } from "@/lib/home-data";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <div className={s.page} dir="rtl">
        <div className={s.top}>
          <div className={s.wrap}>
            <section className={s.hero}>
              <div className={s.heroText}>
                <h1 className={`${s.h1} ${s.lalezar}`}>الباك<br />بلا خوف</h1>
                <p className={s.lead}>ملخصات الدروس، امتحانات وطنية حقيقية بتصحيح مفصل، وحاسبة معدل لكل شعبة. مجاناً وبدون تسجيل.</p>
                <div className={s.ctas}>
                  <Link href="/examens" className={s.btn}>تصفح الامتحانات المصححة</Link>
                  <Link href="/calculateur" className={s.btnW}>احسب معدلك</Link>
                </div>
              </div>
              <div className={s.slider}>
                <HeroPhotoSlider />
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
              <Link href="/examens" className={s.more}>كل الامتحانات ←</Link>
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

          <section className={s.block}>
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

          <section className={s.block}>
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
      </div>
      <Footer />
    </div>
  );
}
