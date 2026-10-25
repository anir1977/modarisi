"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./hero-photo-slider.module.css";

// Free-licence photos from Unsplash (images.unsplash.com, allowed in next.config).
const SLIDES = [
  { id: "1511629091441-ee46146481b6", alt: "أستاذ يكتب معادلات فيزياء على السبورة أمام التلاميذ", caption: "الدرس واضح من البداية" },
  { id: "1758270704021-361c165d68fd", alt: "أستاذ يطرح سؤالاً وتلميذة ترفع يدها في القسم", caption: "اسأل، افهم، جاوب" },
  { id: "1509062522246-3755977927d7", alt: "تلاميذ في القسم يتابعون شرح الأستاذ", caption: "مراجعة مع القسم كامل" },
  { id: "1758270704262-ecc82b23dc37", alt: "تلاميذ جالسون في القسم يستمعون للأستاذ", caption: "امتحانات وطنية مصححة" },
  { id: "1523240795612-9a054b0db644", alt: "طلبة يراجعون معاً في المكتبة", caption: "حضّر الباك مع صحابك" },
];

const DELAY = 5500;

export function HeroPhotoSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = SLIDES.length;

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), DELAY);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  return (
    <div
      className={s.frame}
      role="region"
      aria-roledescription="carousel"
      aria-label="صور من القسم"
      // Pause on desktop hover only: on phones a tap fires mouseenter without a mouseleave.
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx > 0 ? i + 1 : i - 1); // RTL: swipe right = next
        touchX.current = null;
      }}
    >
      <div className={s.stage}>
        {SLIDES.map((sl, k) => (
          <div key={sl.id} className={`${s.slide} ${k === i ? s.active : ""}`} aria-hidden={k !== i}>
            <Image
              src={`https://images.unsplash.com/photo-${sl.id}?auto=format&fit=crop&w=1200&h=900&q=80`}
              alt={sl.alt}
              fill
              sizes="(max-width: 860px) 92vw, 560px"
              priority={k === 0}
              className={s.img}
            />
          </div>
        ))}
        <div className={s.shade} />
        <div className={s.caption} key={i}>
          <span className={s.count} dir="ltr">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <span className={s.text}>{SLIDES[i].caption}</span>
        </div>
        <div className={s.arrows}>
          <button type="button" onClick={() => go(i - 1)} aria-label="الصورة السابقة"><ChevronRight size={22} /></button>
          <button type="button" onClick={() => go(i + 1)} aria-label="الصورة التالية"><ChevronLeft size={22} /></button>
        </div>
      </div>
      <div className={s.bars}>
        {SLIDES.map((sl, k) => (
          <button
            key={sl.id}
            type="button"
            onClick={() => go(k)}
            aria-label={`الصورة ${k + 1}`}
            aria-current={k === i}
            className={`${s.bar} ${k === i ? s.barOn : ""} ${k < i ? s.barDone : ""}`}
          >
            <i style={{ animationDuration: `${DELAY}ms`, animationPlayState: paused ? "paused" : "running" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
