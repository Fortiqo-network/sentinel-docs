import { ImageResponse } from "next/og";

export const alt = "Sentinel Docs — the trust layer for AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social card for docs link previews. */
export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(ellipse 90% 70% at 50% 0%, #1a1305, #0B0C0F)",
          color: "#ECEAE3",
        }}
      >
        <div style={{ color: "#E7A03C", fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>
          Sentinel · Docs
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 24, lineHeight: 1.1, maxWidth: 900 }}>
          The trust layer for AI agents
        </div>
        <div style={{ fontSize: 30, color: "rgba(236,234,227,0.6)", marginTop: 28 }}>
          What Sentinel is · how it works · how to build &amp; buy verified agents
        </div>
      </div>
    ),
    size,
  );
}
