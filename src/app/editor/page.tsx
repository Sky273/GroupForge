import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { EditorPreview } from "@/components/editor-preview";
import { SectionTitle, SurfaceCard } from "@/components/ui-shell";

export default function EditorPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/editor" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Éditeur visuel" subtitle="Le centre névralgique de GroupForge : un canevas interactif pour composer des groupes, positionner des slots et affecter des personnes." action={<button className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] px-5 py-3 text-sm font-semibold text-white">Sauvegarder</button>} />
        <SurfaceCard>
          <SectionTitle kicker="Prototype interactif" title="Canevas de travail" description="Cette première base matérialise la structure de l'éditeur en trois colonnes, avant l'arrivée du vrai drag and drop et de la persistance métier." />
          <div className="mt-6">
            <EditorPreview />
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
