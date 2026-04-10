export const dashboardMetrics = [
  { label: "Événements actifs", value: "12", detail: "3 à finaliser aujourd'hui" },
  { label: "Modèles réutilisables", value: "28", detail: "orchestre, mariage, conférence" },
  { label: "Personnes disponibles", value: "164", detail: "historique global" },
  { label: "Slots à compléter", value: "37", detail: "sur les 5 prochains événements" },
];

export const events = [
  { id: "event-1", title: "Mariage Martin x Leroy", subtitle: "Salle des fêtes, grand dîner", date: "26 juin 2026", time: "16:00 - 02:00", groups: 4, status: "Planifié" },
  { id: "event-2", title: "Concert symphonique d'été", subtitle: "Orchestre + placements scéniques", date: "02 juillet 2026", time: "18:30 - 22:30", groups: 6, status: "En préparation" },
  { id: "event-3", title: "Conférence produit GroupForge", subtitle: "Scène, bénévoles, speaker flow", date: "09 juillet 2026", time: "08:30 - 19:00", groups: 5, status: "Brouillon" },
];

export const templates = [
  { id: "template-1", title: "Orchestre symphonique", subtitle: "Chef, cordes, vents, percussions", slots: 42, theme: "Scène" },
  { id: "template-2", title: "Plan de salle mariage", subtitle: "Tables, mariés, témoins, DJ", slots: 29, theme: "Événementiel" },
  { id: "template-3", title: "Équipe conférence", subtitle: "Accueil, régie, speakers, backstage", slots: 18, theme: "Conférence" },
];

export const people = [
  { id: "person-1", name: "Jeanne Martin", role: "Violon 1", tag: "Musicienne" },
  { id: "person-2", name: "Paul Rivière", role: "Régie son", tag: "Technique" },
  { id: "person-3", name: "Mina Laurent", role: "Accueil invités", tag: "Hospitalité" },
  { id: "person-4", name: "Louis Bernard", role: "Chef d'orchestre", tag: "Direction" },
  { id: "person-5", name: "Emma Faure", role: "Photographe", tag: "Prestataire" },
];

export const editorSlots = [
  { id: "slot-1", title: "Chef d'orchestre", subtitle: "Direction musicale", x: 44, y: 10, type: "person" },
  { id: "slot-2", title: "Violons I", subtitle: "Section avant gauche", x: 14, y: 38, type: "group" },
  { id: "slot-3", title: "Violons II", subtitle: "Section avant droite", x: 54, y: 38, type: "group" },
  { id: "slot-4", title: "Violoncelles", subtitle: "Section centre", x: 36, y: 58, type: "group" },
  { id: "slot-5", title: "Percussions", subtitle: "Fond de scène", x: 70, y: 20, type: "group" },
];
