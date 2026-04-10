export const siteConfig = {
  name: "GroupForge",
  description: "Application de création visuelle de groupes pour événements.",
  navigation: [
    { href: "/", label: "Dashboard" },
    { href: "/events", label: "Événements" },
    { href: "/templates", label: "Modèles" },
    { href: "/people", label: "Personnes" },
    { href: "/editor", label: "Éditeur" },
    { href: "/settings", label: "Paramètres" },
  ],
} as const;
