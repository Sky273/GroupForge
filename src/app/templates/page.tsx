import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { Pill, SectionTitle, SurfaceCard } from "@/components/ui-shell";
import { templates } from "@/data/mock";

export default function TemplatesPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/templates" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Modèles" subtitle="Conçois des canevas réutilisables avec slots, image de fond et structure visuelle stable pour tous tes événements." action={<button className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white">Nouveau modèle</button>} />
        <SurfaceCard>
          <SectionTitle kicker="Galerie" title="Bibliothèque des modèles" description="La réutilisation doit être visible, rapide et fiable. Les modèles sont le moteur de productivité de GroupForge." />
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {templates.map((template) => (
              <article key={template.id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="mb-3 h-36 rounded-[1.25rem] bg-[linear-gradient(135deg,var(--accent-soft),transparent),var(--surface)]" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{template.title}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">{template.subtitle}</p>
                  </div>
                  <Pill>{template.theme}</Pill>
                </div>
                <div className="mt-4 text-sm text-[var(--muted)]">{template.slots} slots</div>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
