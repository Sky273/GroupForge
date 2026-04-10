export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { assignPersonToSlotAction, clearSlotAssignmentAction } from "@/actions/assignments";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { getGroupById } from "@/services/group-service";
import { listPeople } from "@/services/people-service";

export default async function GroupDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [group, people] = await Promise.all([getGroupById(id), listPeople()]);

  if (!group) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/events" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title={group.title} subtitle={`${group.event.title} • ${group.template?.title || "groupe libre"}`} />

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <SurfaceCard>
            <SectionTitle kicker="Éditeur de groupe" title="Affectations persistées" description="Chaque slot peut maintenant recevoir une personne en base, avec remplacement et retrait." />
            <div className="mt-6">
              {group.slots.length === 0 ? (
                <EmptyState title="Aucun slot dans ce groupe" text="Instancie un groupe depuis un modèle avec slots ou ajoute cette capacité ensuite." />
              ) : (
                <div className="relative h-[620px] overflow-hidden rounded-[1.5rem] border border-dashed border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02))]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
                  {group.slots.map((slot) => {
                    const assignment = slot.assignments[0];
                    return (
                      <div
                        key={slot.id}
                        className="absolute min-w-48 rounded-[1.25rem] border border-[var(--border-strong)] bg-[var(--panel)]/95 p-3 shadow-lg backdrop-blur"
                        style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: "translate(-50%, -50%)" }}
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <div className="font-medium text-[var(--foreground)]">{slot.title}</div>
                            <div className="text-xs text-[var(--muted)]">{slot.subtitle || "Sans sous-titre"}</div>
                          </div>
                          <Pill>{slot.slotType}</Pill>
                        </div>

                        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                          {assignment?.person ? (
                            <div>
                              <div className="text-sm font-medium text-[var(--foreground)]">{assignment.person.fullName}</div>
                              <div className="mt-1 text-xs text-[var(--muted)]">{assignment.person.notes || "Aucune note"}</div>
                              <form action={clearSlotAssignmentAction} className="mt-3">
                                <input type="hidden" name="groupId" value={group.id} />
                                <input type="hidden" name="groupSlotId" value={slot.id} />
                                <button type="submit" className="text-xs font-medium text-rose-500 transition hover:opacity-80">
                                  Retirer l&apos;affectation
                                </button>
                              </form>
                            </div>
                          ) : (
                            <form action={assignPersonToSlotAction} className="grid gap-2">
                              <input type="hidden" name="groupId" value={group.id} />
                              <input type="hidden" name="groupSlotId" value={slot.id} />
                              <select name="personId" className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--foreground)]" defaultValue="">
                                <option value="">Choisir une personne</option>
                                {people.map((person) => (
                                  <option key={person.id} value={person.id}>
                                    {person.fullName}
                                  </option>
                                ))}
                              </select>
                              <button type="submit" className="rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90">
                                Affecter
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Résumé" title="État du groupe" />
            <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              <div><strong className="text-[var(--foreground)]">Événement :</strong> {group.event.title}</div>
              <div><strong className="text-[var(--foreground)]">Modèle source :</strong> {group.template?.title || "Aucun"}</div>
              <div><strong className="text-[var(--foreground)]">Dimensions :</strong> {group.canvasWidth} × {group.canvasHeight}</div>
              <div><strong className="text-[var(--foreground)]">Slots :</strong> {group.slots.length}</div>
              <div><strong className="text-[var(--foreground)]">Affectations :</strong> {group.slots.reduce((sum, slot) => sum + slot.assignments.length, 0)}</div>
            </div>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
