import { prisma } from "@/lib/prisma";

export async function createGroupFromTemplate({
  eventId,
  templateId,
  title,
}: {
  eventId: string;
  templateId: string;
  title?: string;
}) {
  const template = await prisma.groupTemplate.findUnique({
    where: { id: templateId },
    include: { slots: true },
  });

  if (!template) {
    throw new Error("Modèle introuvable.");
  }

  return prisma.group.create({
    data: {
      eventId,
      templateId,
      title: title || template.title,
      subtitle: template.subtitle,
      description: template.description,
      canvasWidth: template.canvasWidth,
      canvasHeight: template.canvasHeight,
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
    include: {
      slots: true,
    },
  });
}

export async function getGroupById(id: string) {
  return prisma.group.findUnique({
    where: { id },
    include: {
      event: true,
      slots: {
        include: {
          assignments: {
            include: {
              person: true,
            },
          },
        },
      },
    },
  });
}
