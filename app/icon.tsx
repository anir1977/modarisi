import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2563eb, #10b981)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "22px",
          fontWeight: 900,
          position: "relative",
        }}
      >
        م
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: "4px",
            width: "7px",
            height: "7px",
            borderRadius: "999px",
            background: "#fbbf24",
          }}
        />
      </div>
    ),
    { width: 32, height: 32 }
  );
}
