"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { LLM_KEY, LLM_CONFIG, type LLMChoice } from "./ExerciseComponents";

function MobileLLMPill() {
  const [llm, setLlm] = useState<LLMChoice>("claude");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LLM_KEY);
    if (saved === "claude" || saved === "openai" || saved === "gemini") setLlm(saved);
    const handler = (e: StorageEvent) => {
      if (e.key === LLM_KEY && (e.newValue === "claude" || e.newValue === "openai" || e.newValue === "gemini"))
        setLlm(e.newValue);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const select = (val: LLMChoice) => {
    setLlm(val);
    setOpen(false);
    localStorage.setItem(LLM_KEY, val);
    window.dispatchEvent(new StorageEvent("storage", { key: LLM_KEY, newValue: val }));
  };

  const cfg = LLM_CONFIG[llm];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
        style={{ background: cfg.bg, color: cfg.color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
        {cfg.command}
        <span className="opacity-50">▾</span>
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute top-full right-0 mt-1 rounded-lg overflow-hidden z-50 min-w-[140px]"
            style={{ border: "1px solid #33363e", background: "#161618" }}
          >
            {(["claude", "openai", "gemini"] as LLMChoice[]).map((key) => {
              const c = LLM_CONFIG[key];
              const active = llm === key;
              return (
                <button
                  key={key}
                  onClick={() => select(key)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors hover:bg-white/5"
                  style={{ color: active ? c.color : "#8b8f9a" }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: active ? c.color : "#33363e" }} />
                  <span className="font-medium">{c.vendor}</span>
                  <code className="ml-auto opacity-60">{c.command}</code>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 md:hidden"
      style={{ background: "#0f0f0f", borderBottom: "1px solid #33363e" }}
    >
      <Link href="/" className="flex flex-col gap-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ai-builder-camp/logo-alun-white.svg" alt="Alun Business" width={90} height={11} style={{ opacity: 0.9 }} />
        <span className="text-[9px] font-medium tracking-[0.18em] uppercase" style={{ color: "#d1a476" }}>
          AI Builder Camp
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <MobileLLMPill />
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{ color: "#cfd2d8", background: "rgba(255,255,255,0.05)" }}
          aria-label="Abrir menu"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
