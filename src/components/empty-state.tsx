import type { ReactNode } from "react";

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-10 text-center">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{text}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
