import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guipereiraxd.github.io/ai-builder-camp"),
  title: "AI Builder Camp",
  description: "Curso prático de IA com a mão na massa. Construa soluções reais, automatize tarefas e transforme problemas do dia a dia em entregas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('aibc-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}())` }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
