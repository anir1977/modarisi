import Link from "next/link";
import { previewMeta } from "./data";

export const metadata = previewMeta("اختر التصميم");

const OPTIONS = [
  { href: "/design/a", tag: "أ", name: "ورقة الامتحان", about: "ورقة مربعات بيضاء، حبر أزرق وتصحيح بالأحمر بخط الرقعة.", bg: "#fbfbf8", fg: "#1b2a6b", accent: "#c81e34" },
  { href: "/design/b", tag: "ب", name: "السبورة", about: "سبورة خضراء بإطار خشبي، طباشير أبيض وأصفر بخط كوفي.", bg: "#1e3a30", fg: "#eceee6", accent: "#f4d35e" },
  { href: "/design/c", tag: "ج", name: "ملصق ماجوريل", about: "أزرق ماجوريل وزعفراني، عناوين ضخمة ونجمة زليج.", bg: "#2b2fb3", fg: "#ffffff", accent: "#f2b233" },
];

export default function DesignIndex() {
  return (
    <div dir="rtl" style={{ minHeight: "100vh", width: "100%", background: "#f4f4f1", color: "#15171c", padding: "48px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900, margin: 0 }}>اختر تصميم مدرسي</h1>
        <p style={{ color: "#555", lineHeight: 1.8 }}>ثلاث معاينات للصفحة الرئيسية بالمحتوى الحقيقي للموقع. الروابط داخلها تفتح الصفحات الحالية.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
          {OPTIONS.map((o) => (
            <Link key={o.href} href={o.href} style={{ background: o.bg, color: o.fg, borderRadius: 20, padding: 28, textDecoration: "none", minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(0,0,0,0.1)" }}>
              <span style={{ fontSize: 56, fontWeight: 900, color: o.accent, lineHeight: 1 }}>{o.tag}</span>
              <span>
                <strong style={{ display: "block", fontSize: 24 }}>{o.name}</strong>
                <span style={{ opacity: 0.85, lineHeight: 1.7, fontSize: 15 }}>{o.about}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
