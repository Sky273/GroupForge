import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { people } from "@/data/mock";

export default function PeoplePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/people" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Personnes" subtitle="Centralise les personnes historiquement connues par l'application pour les réutiliser rapidement dans tous les événements." action={<button className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white">Nouvelle personne</button>} />
        <SurfaceCard>
          <SectionTitle kicker="Bibliothèque globale" title="Répertoire des personnes" description="Chaque personne doit pouvoir être retrouvée, filtrée et glissée rapidement dans les slots des groupes." />
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {people.map((person) => (
              <article key={person.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]">
                    {person.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{person.name}</h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">{person.role}</p>
                      </div>
                      <Pill>{person.tag}</Pill>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
