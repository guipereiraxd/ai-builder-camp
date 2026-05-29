"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Lightbulb, AlertTriangle } from "lucide-react";

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
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {n}
        </div>
        <div className="w-px flex-1 bg-white/10 mt-2" />
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-white mb-3 mt-0.5">{title}</h3>
        <div className="text-white/70 text-sm leading-relaxed space-y-3">
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
    <div className="my-4 rounded-lg overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <Terminal size={12} />
          <span>Prompt para o Claude Code</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 text-sm text-[#e6edf3] bg-[#0d1117] overflow-x-auto m-0 rounded-none border-0 font-mono leading-relaxed whitespace-pre-wrap">
        {children}
      </pre>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 my-4">
      <Lightbulb size={16} className="text-blue-400 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-200/80 leading-relaxed m-0">{children}</p>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 my-4">
      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-200/80 leading-relaxed m-0">{children}</p>
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
    <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1117] rounded-lg border border-white/10 my-3 group">
      <span className="text-green-400 font-mono text-sm shrink-0">$</span>
      <code className="flex-1 text-sm font-mono text-white/90 bg-transparent p-0">{children}</code>
      <button
        onClick={copy}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white/80"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
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
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
          {act}
        </span>
        <span className="text-xs text-white/30">·</span>
        <span className="text-xs text-white/40">{duration}</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">
        <span className="text-white/30 font-normal mr-2">{number}</span>
        {title}
      </h1>
      <p className="text-white/60 text-lg leading-relaxed">{description}</p>
      <div className="mt-6 border-t border-white/10" />
    </div>
  );
}
