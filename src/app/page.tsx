import { ArrowRight, CalendarDays, Layers3, UsersRound, WandSparkles } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EditorPreview } from "@/components/editor-preview";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { dashboardMetrics, events, templates } from "@/data/mock";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/" />

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar
          title="Dashboard"
          subtitle="Pilote les événements, les modèles et la composition visuelle de tes groupes depuis un cockpit unique."
          action={
            <button className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95">
              Créer un événement
              <ArrowRight className="h-4 w-4" />
            </button>
          }
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <SurfaceCard key={metric.label} className="p-5">
              <div className="text-sm text-[var(--muted)]">{metric.label}</div>
              <div className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">{metric.value}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{metric.detail}</div>
            </SurfaceCard>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard>
            <SectionTitle
              kicker="Priorités"
              title="Prochains événements à structurer"
              description="Le cockpit doit permettre d'entrer vite dans l'opérationnel, sans perdre la vision d'ensemble."
            />
            <div className="mt-6 space-y-4">
              {events.map((event) => (
                <article key={event.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{event.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{event.subtitle}</p>
                    </div>
                    <Pill>{event.status}</Pill>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
                    <Pill>{event.date}</Pill>
                    <Pill>{event.time}</Pill>
                    <Pill>{event.groups} groupes</Pill>
                  </div>
                </article>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle
              kicker="Bibliothèque"
              title="Modèles à forte réutilisation"
              description="Le gain de productivité de GroupForge vient d'abord de la capacité à réinstancier des structures visuelles fiables."
            />
            <div className="mt-6 space-y-4">
              {templates.map((template) => (
                <article key={template.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{template.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{template.subtitle}</p>
                    </div>
                    <Pill>{template.theme}</Pill>
                  </div>
                  <div className="mt-4 text-sm text-[var(--muted)]">{template.slots} slots configurés</div>
                </article>
              ))}
            </div>
          </SurfaceCard>
        </section>

        <SurfaceCard>
          <SectionTitle
            kicker="Éditeur visuel"
            title="Prototype du canevas de composition"
            description="Le cœur du produit : bibliothèque latérale, canevas central, inspecteur, et slots visuels prêts à accueillir personnes ou groupes."
          />
          <div className="mt-6">
            <EditorPreview />
          </div>
        </SurfaceCard>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Layers3, title: "Modèles", text: "Créer et dupliquer des canevas réutilisables avec image de fond et positionnement libre." },
            { icon: CalendarDays, title: "Événements", text: "Instancier des groupes depuis un modèle dans un contexte daté et opérationnel." },
            { icon: UsersRound, title: "Personnes", text: "Maintenir une bibliothèque historique consultable, filtrable et prête au drag and drop." },
            { icon: WandSparkles, title: "Affectation", text: "Déposer une personne ou un sous-groupe dans un slot avec feedback immédiat et persistance fiable." },
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
