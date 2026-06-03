"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

// SHA-256 hash of the admin password — set via NEXT_PUBLIC_ADMIN_HASH GitHub Secret
const ADMIN_HASH = process.env.NEXT_PUBLIC_ADMIN_HASH ?? "";
const ADMIN_KEY  = "aibc_admin";

async function hashPassword(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

interface Registration {
  id: string;
  name: string;
  email: string;
  company: string;
  registeredAt: string;
}

function exportCSV(data: Registration[]) {
  const header = ["Nome", "Email", "Empresa", "Data de cadastro"];
  const rows = data.map(r => [
    r.name,
    r.email,
    r.company,
    new Date(r.registeredAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
  ]);
  const csv = [header, ...rows]
    .map(row => row.map(v => `"${(v ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cadastros-aibc-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false);
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const [regs, setRegs]           = useState<Registration[]>([]);
  const [loading, setLoading]     = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(ADMIN_KEY) === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed || !db) return;
    setLoading(true);
    getDocs(query(collection(db, "registrations"), orderBy("registeredAt", "desc")))
      .then(snap => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Registration));
        setRegs(docs);
      })
      .catch(err => console.error("Firestore read error:", err))
      .finally(() => setLoading(false));
  }, [authed]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const entered = await hashPassword(password);
    if (entered === ADMIN_HASH) {
      localStorage.setItem(ADMIN_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Senha incorreta.");
    }
  };

  if (!mounted) return null;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
        <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: "#161618", border: "1px solid #33363e" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#64687a" }}>Alun Business</p>
          <h1 className="text-xl font-bold text-white mb-6">Admin — AI Builder Camp</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8f9a" }}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #33363e" }}
                onFocus={e => (e.target.style.borderColor = "#4b6afc")}
                onBlur={e => (e.target.style.borderColor = "#33363e")}
              />
              {error && <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: "#4b6afc", color: "#ffffff" }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f", color: "#cfd2d8" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#33363e" }}>
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#64687a" }}>Alun Business</p>
          <h1 className="text-lg font-bold text-white">Admin — Cadastros</h1>
        </div>
        <div className="flex items-center gap-3">
          {!loading && (
            <span className="text-sm" style={{ color: "#64687a" }}>
              {regs.length} cadastro{regs.length !== 1 ? "s" : ""}
            </span>
          )}
          <button
            onClick={() => exportCSV(regs)}
            disabled={loading || regs.length === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: "rgba(75,106,252,0.15)", color: "#8ba3ff", border: "1px solid rgba(75,106,252,0.25)" }}
          >
            Exportar CSV
          </button>
          <button
            onClick={() => { localStorage.removeItem(ADMIN_KEY); setAuthed(false); }}
            className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-70"
            style={{ color: "#64687a" }}
          >
            Sair
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto">
        {loading ? (
          <p className="text-sm" style={{ color: "#64687a" }}>Carregando...</p>
        ) : regs.length === 0 ? (
          <p className="text-sm" style={{ color: "#64687a" }}>Nenhum cadastro ainda.</p>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #33363e" }}>
                {["Nome", "Email", "Empresa", "Data de cadastro"].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "#64687a" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regs.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: "1px solid #1e2026", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}
                >
                  <td className="py-3 px-4 font-medium text-white">{r.name || "—"}</td>
                  <td className="py-3 px-4" style={{ color: "#8b8f9a" }}>{r.email || "—"}</td>
                  <td className="py-3 px-4" style={{ color: "#8b8f9a" }}>{r.company || "—"}</td>
                  <td className="py-3 px-4" style={{ color: "#64687a" }}>
                    {r.registeredAt
                      ? new Date(r.registeredAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
