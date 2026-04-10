import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SurfaceCard({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] p-6 shadow-sm", className)}>{children}</section>;
}

export function SectionTitle({ kicker, title, description }: { kicker?: string; title: string; description?: string }) {
  return (
    <div>
      {kicker ? <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{kicker}</div> : null}
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">{children}</span>;
}
