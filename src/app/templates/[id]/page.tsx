export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
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

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
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
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
