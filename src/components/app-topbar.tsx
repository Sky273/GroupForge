import type { ReactNode } from "react";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function AppTopbar({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] lg:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)] lg:text-base">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">
          <Search className="h-4 w-4" />
          Recherche rapide
        </div>
        {action}
        <ThemeToggle />
      </div>
    </header>
  );
}
