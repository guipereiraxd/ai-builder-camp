"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Lightbulb, AlertTriangle } from "lucide-react";

const BRAND = "#4b6afc";
const GOLD = "#d1a476";
const SURFACE = "#161618";
const BORDER = "#33363e";

export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: BRAND }}
        >
          {n}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: BORDER }} />
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-white mb-3 mt-0.5">{title}</h3>
        <div className="text-sm leading-relaxed space-y-3" style={{ color: "#cfd2d8" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Prompt({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: "#3d3d3d" }}>
          <Terminal size={12} />
          <span>Prompt para o Claude Code</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: copied ? "#4b6afc" : "#3d3d3d" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre
        className="p-4 text-sm overflow-x-auto m-0 rounded-none border-0 font-mono leading-relaxed whitespace-pre-wrap"
        style={{ background: "#0d0d10", color: "#e8e8eb" }}
      >
        {children}
      </pre>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg my-4"
      style={{ background: "rgba(75,106,252,0.08)", border: `1px solid rgba(75,106,252,0.2)` }}
    >
      <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: BRAND }} />
      <p className="text-sm leading-relaxed m-0" style={{ color: "#8fa8ff" }}>{children}</p>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg my-4"
      style={{ background: "rgba(209,164,118,0.08)", border: `1px solid rgba(209,164,118,0.2)` }}
    >
      <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
      <p className="text-sm leading-relaxed m-0" style={{ color: "#e8c99a" }}>{children}</p>
    </div>
  );
}

export function Command({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg my-3 group cursor-pointer"
      style={{ background: "#0d0d10", border: `1px solid ${BORDER}` }}
      onClick={copy}
    >
      <span className="font-mono text-sm shrink-0" style={{ color: "#4b6afc" }}>$</span>
      <code className="flex-1 text-sm font-mono" style={{ background: "transparent", padding: 0, color: "#e8e8eb" }}>
        {children}
      </code>
      <span className="transition-opacity opacity-0 group-hover:opacity-100" style={{ color: "#3d3d3d" }}>
        {copied ? <Check size={14} style={{ color: BRAND }} /> : <Copy size={14} />}
      </span>
    </div>
  );
}

export function ExerciseHeader({
  act,
  number,
  title,
  duration,
  description,
}: {
  act: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ color: BRAND, background: "rgba(75,106,252,0.1)" }}
        >
          {act}
        </span>
        <span style={{ color: "#33363e" }}>·</span>
        <span className="text-xs" style={{ color: "#3d3d3d" }}>{duration}</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">
        <span className="font-normal mr-2" style={{ color: "#33363e" }}>{number}</span>
        {title}
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: "#cfd2d8" }}>{description}</p>
      <div className="mt-6" style={{ borderTop: `1px solid ${BORDER}` }} />
    </div>
  );
}
