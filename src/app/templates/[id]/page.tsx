export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { addTemplateSlotAction } from "@/actions/template-slots";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton, TextField } from "@/components/forms";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { getTemplateById } from "@/services/template-service";

export default async function TemplateDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const template = await getTemplateById(id);

  if (!template) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/templates" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title={template.title} subtitle={template.subtitle || "Modèle sans sous-titre"} />

        <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <SurfaceCard>
            <SectionTitle kicker="Slots" title="Structure du modèle" description="Les slots persistés ici servent ensuite à générer les groupes d'événement." />
            <div className="mt-6">
              {template.slots.length === 0 ? (
                <EmptyState title="Aucun slot pour ce modèle" text="L'éditeur visuel détaillé sera la prochaine étape pour ajouter, déplacer et dupliquer les slots." />
              ) : (
                <div className="relative h-[560px] overflow-hidden rounded-[1.5rem] border border-dashed border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02))]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
                  {template.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="absolute min-w-40 rounded-[1.25rem] border border-[var(--border-strong)] bg-[var(--panel)]/95 p-3 shadow-lg backdrop-blur"
                      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <div className="font-medium text-[var(--foreground)]">{slot.title}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">{slot.subtitle || "Sans sous-titre"}</div>
                      <div className="mt-3">
                        <Pill>{slot.slotType}</Pill>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Métadonnées" title="Résumé du modèle" />
            <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              <div><strong className="text-[var(--foreground)]">Dimensions :</strong> {template.canvasWidth} × {template.canvasHeight}</div>
              <div><strong className="text-[var(--foreground)]">Slots :</strong> {template.slots.length}</div>
              <div><strong className="text-[var(--foreground)]">Version :</strong> {template.versionNumber}</div>
              <div><strong className="text-[var(--foreground)]">Description :</strong> {template.description || "Aucune description"}</div>
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <SectionTitle kicker="Ajouter" title="Nouveau slot" description="Premier niveau d'édition persistée du modèle." />
              <form action={addTemplateSlotAction} className="mt-6 grid gap-4">
                <input type="hidden" name="templateId" value={template.id} />
                <TextField label="Titre" name="title" required />
                <TextField label="Sous-titre" name="subtitle" />
                <div className="grid gap-4 md:grid-cols-2">
                  <TextField label="Position X (%)" name="x" type="number" defaultValue={50} required />
                  <TextField label="Position Y (%)" name="y" type="number" defaultValue={50} required />
                </div>
                <label className="grid gap-2 text-sm text-[var(--foreground)]">
                  <span className="font-medium">Type de slot</span>
                  <select name="slotType" className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]">
                    <option value="person">Personne</option>
                    <option value="group">Groupe</option>
                    <option value="mixed">Mixte</option>
                  </select>
                </label>
                <TextField label="Capacité" name="capacity" type="number" defaultValue={1} required />
                <div className="pt-2">
                  <SubmitButton>Ajouter le slot</SubmitButton>
                </div>
              </form>
            </div>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
