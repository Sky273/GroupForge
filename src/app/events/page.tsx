import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { events } from "@/data/mock";

export default function EventsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/events" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Événements" subtitle="Crée, planifie et ouvre les contextes dans lesquels les groupes sont instanciés et opérés visuellement." action={<button className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white">Nouvel événement</button>} />
        <SurfaceCard>
          <SectionTitle kicker="Liste" title="Tous les événements" description="Chaque événement devient un conteneur opérationnel pour les groupes, les affectations et les vues de préparation." />
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {events.map((event) => (
              <article key={event.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">{event.title}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">{event.subtitle}</p>
                  </div>
                  <Pill>{event.status}</Pill>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>{event.date}</Pill>
                  <Pill>{event.time}</Pill>
                  <Pill>{event.groups} groupes</Pill>
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
