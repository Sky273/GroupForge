import { PrismaClient, EventStatus, PersonStatus, SlotType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.slotAssignment.deleteMany();
  await prisma.groupSlot.deleteMany();
  await prisma.group.deleteMany();
  await prisma.templateSlot.deleteMany();
  await prisma.groupTemplate.deleteMany();
  await prisma.personTag.deleteMany();
  await prisma.person.deleteMany();
  await prisma.eventTag.deleteMany();
  await prisma.event.deleteMany();

  const people = await Promise.all([
    ["Emma", "Martin", "Direction artistique"],
    ["Lucas", "Bernard", "Régie son"],
    ["Chloé", "Petit", "Accueil invités"],
    ["Hugo", "Robert", "Speaker"],
    ["Lina", "Richard", "Modératrice"],
  ].map(([firstName, lastName, notes]) =>
    prisma.person.create({
      data: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        notes,
        status: PersonStatus.active,
      },
    }),
  ));

  const template = await prisma.groupTemplate.create({
    data: {
      title: "Scène conférence",
      subtitle: "Modèle 4 intervenants",
      description: "Disposition simple pour conférence produit.",
      canvasWidth: 1200,
      canvasHeight: 800,
      theme: "conference",
      slots: {
        create: [
          { title: "Speaker 1", subtitle: "Intervenant", x: 18, y: 28, slotType: SlotType.person, capacity: 1 },
          { title: "Speaker 2", subtitle: "Intervenant", x: 38, y: 28, slotType: SlotType.person, capacity: 1 },
          { title: "Speaker 3", subtitle: "Intervenant", x: 58, y: 28, slotType: SlotType.person, capacity: 1 },
          { title: "Moderator", subtitle: "Animation", x: 78, y: 28, slotType: SlotType.person, capacity: 1 },
        ],
      },
    },
    include: { slots: true },
  });

  const event = await prisma.event.create({
    data: {
      title: "Conférence produit 2026",
      subtitle: "Paris",
      description: "Événement de lancement interne.",
      eventDate: new Date("2026-06-12T08:00:00.000Z"),
      startTime: "09:00",
      endTime: "18:00",
      timezone: "Europe/Paris",
      location: "Paris",
      status: EventStatus.planned,
    },
  });

  const group = await prisma.group.create({
    data: {
      eventId: event.id,
      templateId: template.id,
      title: "Scène principale",
      subtitle: "Session matin",
      canvasWidth: template.canvasWidth,
      canvasHeight: template.canvasHeight,
      status: "active",
      slots: {
        create: template.slots.map((slot) => ({
          templateSlotId: slot.id,
          title: slot.title,
          subtitle: slot.subtitle,
          x: slot.x,
          y: slot.y,
          width: slot.width,
          height: slot.height,
          capacity: slot.capacity,
          slotType: slot.slotType,
          shape: slot.shape,
          rotation: slot.rotation,
          zIndex: slot.zIndex,
          allowNestedGroup: slot.allowNestedGroup,
          rulesJson: slot.rulesJson ?? undefined,
          locked: slot.locked,
        })),
      },
    },
    include: { slots: true },
  });

  await prisma.slotAssignment.create({
    data: {
      groupSlotId: group.slots[0].id,
      assignmentType: "person",
      personId: people[3].id,
      note: "Seed initiale",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
