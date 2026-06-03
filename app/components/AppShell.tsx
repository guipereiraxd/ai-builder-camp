"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import { REGISTERED_KEY } from "../../lib/firebase";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Registration gate for exercise routes
  useEffect(() => {
    const isProtected = pathname.startsWith("/exercises") || pathname.startsWith("/secret-zone") || pathname.startsWith("/dashboard") || pathname.startsWith("/canvas") || pathname.startsWith("/rag") || pathname.startsWith("/exercises/m6");
    const registered = localStorage.getItem(REGISTERED_KEY) === "true";
    if (isProtected && !registered) {
      router.push("/");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Sidebar — always visible on desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile drawer — always mounted, slides in/out via CSS */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
            opacity: drawerOpen ? 1 : 0,
            pointerEvents: drawerOpen ? "auto" : "none",
          }}
        />
        {/* Drawer panel */}
        <div
          className="fixed top-0 left-0 bottom-0 z-40 transition-transform duration-300 ease-out"
          style={{
            width: "280px",
            transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header */}
        <MobileHeader onMenuClick={() => setDrawerOpen(true)} />

        {/* Page content */}
        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-8 md:px-8 md:py-12">
            {children}
          </div>
        </main>

        {/* Footer */}
        <div className="px-4 py-4 md:px-8 flex justify-end" style={{ borderTop: "1px solid #0f0f0f" }}>
          <a href="/ai-builder-camp/privacy" className="text-xs transition-colors hover:text-white/30" style={{ color: "var(--border-sub)" }}>
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}
