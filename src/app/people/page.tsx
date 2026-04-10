export const dynamic = "force-dynamic";

import { createPersonAction } from "@/actions/people";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton, TextAreaField, TextField } from "@/components/forms";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { listPeople } from "@/services/people-service";

export default async function PeoplePage() {
  const people = await listPeople();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/people" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Personnes" subtitle="Centralisez les participants et retrouvez-les instantanément." />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SurfaceCard>
            <SectionTitle kicker="Bibliothèque globale" title="Répertoire des personnes" description="Ces données sont maintenant persistées dans la base locale du projet." />
            <div className="mt-6">
              {people.length === 0 ? (
                <EmptyState title="Aucune personne enregistrée" text="Ajoutez vos premières personnes pour commencer les affectations." />
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {people.map((person) => (
                    <article key={person.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]">
                          {person.firstName[0]}
                          {person.lastName[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{person.fullName}</h2>
                              <p className="mt-1 text-sm text-[var(--muted)]">{person.notes || "Sans note"}</p>
                            </div>
                            <Pill>{person.status}</Pill>
                          </div>
                          <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
                            <div>{person.email || "email non renseigné"}</div>
                            <div>{person.phone || "téléphone non renseigné"}</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Créer" title="Nouvelle personne" description="Ajout direct en base, puis réaffichage automatique de la liste." />
            <form action={createPersonAction} className="mt-6 grid gap-4">
              <TextField label="Prénom" name="firstName" required />
              <TextField label="Nom" name="lastName" required />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Téléphone" name="phone" />
              <TextAreaField label="Note" name="notes" placeholder="Rôle, compétence, contexte..." />
              <div className="pt-2">
                <SubmitButton>Ajouter une personne</SubmitButton>
              </div>
            </form>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
