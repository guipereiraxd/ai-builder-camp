import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-builder-camp.alura.com.br"),
  title: "AI Builder Camp — Alun Business",
  description: "De usuários de IA a builders de soluções reais. Um camp intensivo para profissionais que querem sair do prompt solto e criar agentes, automações e workflows com IA aplicados ao negócio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${spaceGrotesk.variable}`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('aibc-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}())` }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
