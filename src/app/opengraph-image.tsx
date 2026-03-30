import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DUKA — Gestion commerciale intelligente pour l'Afrique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Teal glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(20,184,166,0.15)",
              border: "1px solid rgba(20,184,166,0.3)",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#14b8a6",
                fontFamily: "monospace",
              }}
            >
              D
            </span>
          </div>

          {/* Title */}
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: -2,
              fontFamily: "monospace",
            }}
          >
            DUKA
          </span>

          {/* Tagline */}
          <span
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            La gestion commerciale intelligente
            pour l&apos;Afrique
          </span>

          {/* Tech badges */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {["Stock", "POS", "Factures OHADA", "CRM", "IA", "Mobile Money"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    background: "rgba(39,39,42,0.8)",
                    border: "1px solid rgba(63,63,70,0.5)",
                    fontSize: 14,
                    color: "#a1a1aa",
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#52525b",
            fontSize: 16,
          }}
        >
          <span>duka-rho.vercel.app</span>
          <span style={{ color: "#14b8a6" }}>•</span>
          <span>Next.js 16 + Prisma + Convex + Claude AI</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
