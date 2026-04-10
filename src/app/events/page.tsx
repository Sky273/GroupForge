export const dynamic = "force-dynamic";

import Link from "next/link";

import { createEventAction } from "@/actions/events";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton, TextAreaField, TextField } from "@/components/forms";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { formatDate } from "@/lib/format";
import { listEvents } from "@/services/event-service";

export default async function EventsPage() {
  const events = await listEvents();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/events" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Événements" subtitle="Planifiez, organisez et ouvrez vos groupes par événement." />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SurfaceCard>
            <SectionTitle kicker="Liste" title="Tous les événements" description="Chaque événement devient un conteneur opérationnel pour ses groupes et affectations." />
            <div className="mt-6">
              {events.length === 0 ? (
                <EmptyState title="Aucun événement pour le moment" text="Créez votre premier événement pour commencer à organiser vos groupes." />
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {events.map((event) => (
                    <article key={event.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">{event.title}</h2>
                          <p className="mt-1 text-sm text-[var(--muted)]">{event.subtitle || "Sans sous-titre"}</p>
                        </div>
                        <Pill>{event.status}</Pill>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill>{formatDate(event.eventDate)}</Pill>
                        <Pill>{event.startTime || "horaire à définir"}</Pill>
                        <Pill>{event.groups.length} groupes</Pill>
                      </div>
                      <div className="mt-5">
                        <Link href={`/events/${event.id}`} className="text-sm font-medium text-[var(--accent)] transition hover:opacity-80">
                          Ouvrir l&apos;événement
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Créer" title="Nouvel événement" description="Création persistée avec date, horaires et localisation." />
            <form action={createEventAction} className="mt-6 grid gap-4">
              <TextField label="Titre" name="title" required />
              <TextField label="Sous-titre" name="subtitle" />
              <TextField label="Date" name="eventDate" type="date" required />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Début" name="startTime" type="time" />
                <TextField label="Fin" name="endTime" type="time" />
              </div>
              <TextField label="Lieu" name="location" />
              <TextAreaField label="Description" name="description" />
              <div className="pt-2">
                <SubmitButton>Créer un événement</SubmitButton>
              </div>
            </form>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
