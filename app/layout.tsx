import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body className="min-h-full bg-[#0a0a0a] text-[#ededed]">{children}</body>
    </html>
  );
}
