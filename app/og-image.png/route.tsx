import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #14b8a6 100%)",
          color: "white",
          fontFamily: "Arial",
          direction: "ltr",
        }}
      >
        <div style={{ fontSize: 54, marginBottom: 24 }}>📚</div>
        <h1 style={{ fontSize: 86, lineHeight: 1.05, fontWeight: 900, margin: 0, textAlign: "left" }}>
          MODARISI
        </h1>
        <p style={{ fontSize: 36, lineHeight: 1.35, margin: "24px 0 0", maxWidth: 850, textAlign: "left" }}>
          Smart lessons, exercises, mock exams, and AI help for Moroccan middle school students.
        </p>
        <div
          style={{
            marginTop: 46,
            display: "flex",
            gap: 18,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span style={{ background: "rgba(255,255,255,0.18)", padding: "14px 22px", borderRadius: 999 }}>
            Arabic, Darija, French
          </span>
          <span style={{ background: "rgba(255,255,255,0.18)", padding: "14px 22px", borderRadius: 999 }}>
            Made in Morocco
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
