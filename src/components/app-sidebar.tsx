import Link from "next/link";
import { CalendarDays, LayoutDashboard, Layers3, Settings, UsersRound, WandSparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Événements", icon: CalendarDays },
  { href: "/templates", label: "Modèles", icon: Layers3 },
  { href: "/people", label: "Personnes", icon: UsersRound },
  { href: "/editor", label: "Éditeur", icon: WandSparkles },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function AppSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] p-5 lg:w-72 lg:min-w-72">
      <div>
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-white shadow-lg shadow-fuchsia-500/20">
            <Layers3 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-[var(--foreground)]">GroupForge</div>
            <div className="text-sm text-[var(--muted)]">Composer visuellement des groupes</div>
          </div>
        </div>
      </div>

      <nav className="grid gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">MVP en cours</div>
        <p className="text-sm leading-6 text-[var(--muted)]">
          Modèles, événements, personnes, puis affectation drag and drop stable et persistée.
        </p>
      </div>
    </aside>
  );
}
