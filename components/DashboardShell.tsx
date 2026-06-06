"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export interface DashboardShellProps {
  children: ReactNode;
  /** Title shown in the top bar. */
  title?: string;
}

/**
 * App chrome: a responsive, collapsible sidebar plus a sticky top bar with a
 * theme toggle. On desktop the sidebar collapses to an icon rail; on mobile it
 * becomes an overlay drawer toggled by the hamburger button.
 */
export function DashboardShell({ children, title = "Dashboard" }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            data-testid="drawer-backdrop"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/50"
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
          <button
            type="button"
            aria-label="Open navigation"
            data-testid="open-drawer"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span aria-hidden>☰</span>
          </button>

          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            data-testid="toggle-collapse"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 md:inline-flex dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span aria-hidden>{collapsed ? "»" : "«"}</span>
          </button>

          <h1 className="flex-1 truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h1>

          <ThemeToggle />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;
