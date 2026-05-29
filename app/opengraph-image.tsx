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
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4b6afc 0%, #d1a476 100%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              background: "rgba(75,106,252,0.15)",
              border: "1px solid rgba(75,106,252,0.3)",
              borderRadius: "20px",
              padding: "6px 16px",
              color: "#4b6afc",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Alun Business
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#e8e8eb",
            lineHeight: 1.1,
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          AI Builder Camp
        </div>

        {/* Subtitle in gold */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "#d1a476",
            marginBottom: "40px",
          }}
        >
          Transforme ideia em entrega.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#64687a",
            lineHeight: 1.5,
            maxWidth: "780px",
          }}
        >
          Curso prático com 9 exercícios. Automação, produtos e agentes de IA — mão na massa.
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "52px",
            right: "90px",
            fontSize: "18px",
            color: "#33363e",
            letterSpacing: "0.04em",
          }}
        >
          guipereiraxd.github.io/ai-builder-camp
        </div>
      </div>
    ),
    { ...size }
  );
}
