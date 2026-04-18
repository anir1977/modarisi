import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Modarisi — Le tuteur IA pour collégiens marocains";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1e",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background glow blobs */}
        <div style={{
          position: "absolute", top: "-80px", left: "200px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "rgba(59,130,246,0.18)", filter: "blur(100px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "200px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(16,185,129,0.14)", filter: "blur(80px)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "16px",
            background: "linear-gradient(135deg, #3b82f6, #10b981)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "36px",
          }}>
            🎓
          </div>
          <span style={{ fontSize: "42px", fontWeight: "800", color: "#fff", letterSpacing: "-1px" }}>
            Modarisi<span style={{ color: "#60a5fa" }}>.</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: "58px", fontWeight: "900", color: "#fff",
          letterSpacing: "-2px", lineHeight: "1.1", textAlign: "center",
          maxWidth: "900px", marginBottom: "16px",
        }}>
          Le tuteur IA pour{" "}
          <span style={{
            background: "linear-gradient(90deg, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            collégiens marocains
          </span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: "24px", color: "rgba(156,163,175,1)",
          marginBottom: "36px", textAlign: "center",
        }}>
          Maths · Physique · SVT · Français · Arabe · Islam · Histoire-Géo
        </div>

        {/* Pill badges */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "99 DH/mois", bg: "rgba(59,130,246,0.2)",  border: "rgba(59,130,246,0.4)",  color: "#93c5fd" },
            { label: "7 matières", bg: "rgba(16,185,129,0.2)",  border: "rgba(16,185,129,0.4)",  color: "#6ee7b7" },
            { label: "24h/7j",     bg: "rgba(139,92,246,0.2)", border: "rgba(139,92,246,0.4)",  color: "#c4b5fd" },
            { label: "🇲🇦 Maroc",   bg: "rgba(245,158,11,0.2)", border: "rgba(245,158,11,0.4)",  color: "#fcd34d" },
          ].map(p => (
            <div key={p.label} style={{
              display: "flex", alignItems: "center",
              padding: "10px 22px", borderRadius: "999px",
              background: p.bg, border: `1.5px solid ${p.border}`,
              fontSize: "20px", fontWeight: "700", color: p.color,
            }}>
              {p.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
