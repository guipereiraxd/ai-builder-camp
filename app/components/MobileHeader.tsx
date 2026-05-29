"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 md:hidden"
      style={{
        background: "#0f0f0f",
        borderBottom: "1px solid #33363e",
      }}
    >
      <Link href="/" className="flex flex-col gap-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ai-builder-camp/logo-alun-white.svg"
          alt="Alun Business"
          width={90}
          height={11}
          style={{ opacity: 0.9 }}
        />
        <span
          className="text-[9px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "#d1a476" }}
        >
          AI Builder Camp
        </span>
      </Link>

      <button
        onClick={onMenuClick}
        className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
        style={{ color: "#cfd2d8", background: "rgba(255,255,255,0.05)" }}
        aria-label="Abrir menu"
      >
        <Menu size={18} />
      </button>
    </header>
  );
}
