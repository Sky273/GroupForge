import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { SectionTitle, SurfaceCard } from "@/components/ui-shell";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <AppSidebar pathname="/settings" />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <AppTopbar title="Paramètres" subtitle="Les paramètres accueilleront ensuite les règles globales, les rôles, les imports et les options d'affichage." />
        <SurfaceCard>
          <SectionTitle kicker="Bientôt" title="Configuration de l'application" description="Le MVP démarre par les flux cœur métier. Les paramètres avancés viendront une fois le socle éditeur, événements et affectations stabilisé." />
        </SurfaceCard>
      </div>
    </main>
  );
}
