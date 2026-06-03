import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "AI Builder Camp — Alun Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4b6afc 0%, #d1a476 60%, #ef4444 100%)",
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d1a476" }}>
            Alun Business
          </div>
          <div style={{ color: "#33363e", fontSize: "13px" }}>·</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(75,106,252,0.12)", border: "1px solid rgba(75,106,252,0.25)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", color: "#8ba3ff", fontWeight: 600 }}>
            Acesso gratuito
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "60px", fontWeight: 800, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            AI Builder Camp
          </div>
          <div style={{ fontSize: "28px", fontWeight: 500, color: "#d1a476", lineHeight: 1.3 }}>
            Para quem lidera e precisa de alavancagem real.
          </div>
          <div style={{ fontSize: "20px", color: "#8b8f9a", lineHeight: 1.5, maxWidth: "700px" }}>
            Não mais teoria sobre IA. Você sai com ferramentas funcionando, não com slides sobre o futuro.
          </div>
        </div>

        {/* Bottom stats row */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-end" }}>
          {[
            { value: "12", label: "exercícios práticos" },
            { value: "4",  label: "atos progressivos" },
            { value: "5h", label: "do zero à IA Agêntica" },
            { value: "3",  label: "Claude · OpenAI · Gemini" },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff" }}>{value}</span>
              <span style={{ fontSize: "13px", color: "#64687a" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
