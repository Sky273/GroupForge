import Link from "next/link";
import { ArrowRight, CalendarDays, Layers3, UsersRound, WandSparkles } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EditorPreview } from "@/components/editor-preview";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { listEvents } from "@/services/event-service";
import { listPeople } from "@/services/people-service";
import { listTemplates } from "@/services/template-service";

export default async function DashboardPage() {
  const [events, people, templates] = await Promise.all([listEvents(), listPeople(), listTemplates()]);

  const metrics = [
    { label: "Événements actifs", value: String(events.length), detail: events[0] ? "flux opérationnel en cours" : "crée ton premier événement" },
    { label: "Modèles disponibles", value: String(templates.length), detail: templates[0] ? "bibliothèque réutilisable" : "aucun modèle encore" },
    { label: "Personnes enregistrées", value: String(people.length), detail: people[0] ? "prêtes pour affectation" : "bibliothèque vide" },
    {
      label: "Groupes instanciés",
      value: String(events.reduce((sum, event) => sum + event.groups.length, 0)),
      detail: "depuis les événements actifs",
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/" />

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar
          title="Bonjour, prêt à structurer votre prochain événement ?"
          subtitle="Créez des modèles, préparez vos groupes et affectez vos participants plus vite."
          action={
            <Link href="/events" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95">
              Ouvrir les événements
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <SurfaceCard key={metric.label} className="p-5">
              <div className="text-sm text-[var(--muted)]">{metric.label}</div>
              <div className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">{metric.value}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{metric.detail}</div>
            </SurfaceCard>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard>
            <SectionTitle kicker="Reprendre" title="Événements" description="Planifiez, organisez et ouvrez vos groupes par événement." />
            <div className="mt-6 space-y-4">
              {events.slice(0, 4).map((event) => (
                <article key={event.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{event.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{event.subtitle || "Sans sous-titre"}</p>
                    </div>
                    <Pill>{event.status}</Pill>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
                    <Pill>{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(event.eventDate)}</Pill>
                    <Pill>{event.startTime || "horaire à définir"}</Pill>
                    <Pill>{event.groups.length} groupes</Pill>
                  </div>
                </article>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Bibliothèque" title="Modèles" description="Préparez des canevas réutilisables pour vos futurs événements." />
            <div className="mt-6 space-y-4">
              {templates.slice(0, 4).map((template) => (
                <article key={template.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{template.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{template.subtitle || "Sans sous-titre"}</p>
                    </div>
                    <Pill>{template.theme || "MVP"}</Pill>
                  </div>
                  <div className="mt-4 text-sm text-[var(--muted)]">{template.slots.length} slots configurés</div>
                </article>
              ))}
            </div>
          </SurfaceCard>
        </section>

        <SurfaceCard>
          <SectionTitle kicker="Éditeur visuel" title="Boucle critique" description="Le preview reste branché en local pour l'instant, mais le reste de l'application bascule déjà sur des données persistées." />
          <div className="mt-6">
            <EditorPreview />
          </div>
        </SurfaceCard>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Layers3, title: "Modèles", text: "Créer et dupliquer des canevas réutilisables avec image de fond et positionnement libre." },
            { icon: CalendarDays, title: "Événements", text: "Instancier des groupes depuis un modèle dans un contexte daté et opérationnel." },
            { icon: UsersRound, title: "Personnes", text: "Maintenir une bibliothèque historique consultable, filtrable et prête au drag and drop." },
            { icon: WandSparkles, title: "Affectation", text: "Déposer une personne dans un slot avec feedback immédiat et persistance fiable." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <SurfaceCard key={item.title} className="p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </SurfaceCard>
            );
          })}
        </section>
      </div>
    </main>
  );
}
