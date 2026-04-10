export const dynamic = "force-dynamic";

import Link from "next/link";

import { createTemplateAction } from "@/actions/templates";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton, TextAreaField, TextField } from "@/components/forms";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { listTemplates } from "@/services/template-service";

export default async function TemplatesPage() {
  const templates = await listTemplates();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/templates" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Modèles" subtitle="Préparez des canevas réutilisables pour vos futurs événements." />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SurfaceCard>
            <SectionTitle kicker="Galerie" title="Bibliothèque des modèles" description="Chaque modèle peut ensuite être instancié dans un événement réel." />
            <div className="mt-6">
              {templates.length === 0 ? (
                <EmptyState title="Aucun modèle disponible" text="Créez un modèle avec vos premiers slots pour gagner du temps ensuite." />
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {templates.map((template) => (
                    <article key={template.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                      <div className="mb-3 h-32 rounded-[1.25rem] bg-[linear-gradient(135deg,var(--accent-soft),transparent),var(--surface)]" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{template.title}</h2>
                          <p className="mt-1 text-sm text-[var(--muted)]">{template.subtitle || "Sans sous-titre"}</p>
                        </div>
                        <Pill>{template.theme || "MVP"}</Pill>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill>{template.canvasWidth} × {template.canvasHeight}</Pill>
                        <Pill>{template.slots.length} slots</Pill>
                      </div>
                      <div className="mt-5">
                        <Link href={`/templates/${template.id}`} className="text-sm font-medium text-[var(--accent)] transition hover:opacity-80">
                          Ouvrir le modèle
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle kicker="Créer" title="Nouveau modèle" description="Création persistée en base. L'édition visuelle détaillée vient ensuite." />
            <form action={createTemplateAction} className="mt-6 grid gap-4">
              <TextField label="Titre" name="title" required />
              <TextField label="Sous-titre" name="subtitle" />
              <TextAreaField label="Description" name="description" />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Largeur du canevas" name="canvasWidth" type="number" defaultValue={1200} required />
                <TextField label="Hauteur du canevas" name="canvasHeight" type="number" defaultValue={800} required />
              </div>
              <div className="pt-2">
                <SubmitButton>Créer un modèle</SubmitButton>
              </div>
            </form>
          </SurfaceCard>
        </section>
      </div>
    </main>
  );
}
