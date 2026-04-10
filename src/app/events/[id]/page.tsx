export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { instantiateTemplateToEventAction } from "@/actions/groups";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton, TextField } from "@/components/forms";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { formatDate } from "@/lib/format";
import { getEventById } from "@/services/event-service";
import { listTemplates } from "@/services/template-service";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, templates] = await Promise.all([getEventById(id), listTemplates()]);

  if (!event) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/events" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title={event.title} subtitle={`${formatDate(event.eventDate)} • ${event.location || "lieu à définir"}`} />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard>
            <SectionTitle kicker="Groupes" title="Groupes instanciés" description="Chaque groupe vient d'un modèle ou d'une future création libre." />
            <div className="mt-6">
              {event.groups.length === 0 ? (
                <EmptyState title="Aucun groupe pour cet événement" text="Instanciez un premier groupe depuis un modèle pour démarrer la préparation." />
              ) : (
                <div className="space-y-4">
                  {event.groups.map((group) => (
                    <article key={group.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{group.title}</h2>
                          <p className="mt-1 text-sm text-[var(--muted)]">{group.subtitle || "Sans sous-titre"}</p>
                        </div>
                        <Pill>{group.status}</Pill>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill>{group.canvasWidth} × {group.canvasHeight}</Pill>
                        <Pill>{group.slots.length} slots</Pill>
                        <Pill>
                          {group.slots.reduce((sum, slot) => sum + slot.assignments.length, 0)} affectations
                        </Pill>
                      </div>
                      <div className="mt-5">
                        <Link href={`/groups/${group.id}`} className="text-sm font-medium text-[var(--accent)] transition hover:opacity-80">
                          Ouvrir le groupe
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Instancier" title="Créer un groupe depuis un modèle" description="Cette action construit un vrai groupe persistant avec ses slots copiés depuis le modèle." />
            <form action={instantiateTemplateToEventAction} className="mt-6 grid gap-4">
              <input type="hidden" name="eventId" value={event.id} />
              <label className="grid gap-2 text-sm text-[var(--foreground)]">
                <span className="font-medium">Modèle</span>
                <select name="templateId" className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]" required>
                  <option value="">Choisir un modèle</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.title} ({template.slots.length} slots)
                    </option>
                  ))}
                </select>
              </label>
              <TextField label="Nom du groupe" name="title" placeholder="ex. Scène principale" />
              <div className="pt-2">
                <SubmitButton>Instancier le groupe</SubmitButton>
              </div>
            </form>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
