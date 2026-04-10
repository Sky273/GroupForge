import { prisma } from "@/lib/prisma";
import type { CreateTemplateInput, TemplateSlotInput } from "@/features/templates/schemas";

export async function listTemplates() {
  return prisma.groupTemplate.findMany({
    include: {
      slots: true,
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getTemplateById(id: string) {
  return prisma.groupTemplate.findUnique({
    where: { id },
    include: {
      slots: {
        orderBy: [{ createdAt: "asc" }],
      },
    },
  });
}

export async function createTemplate(input: CreateTemplateInput) {
  return prisma.groupTemplate.create({
    data: {
      title: input.title,
      subtitle: input.subtitle || null,
      description: input.description || null,
      canvasWidth: input.canvasWidth,
      canvasHeight: input.canvasHeight,
      slots: {
        create: input.slots.map((slot: TemplateSlotInput) => ({
          title: slot.title,
          subtitle: slot.subtitle || null,
          x: slot.x,
          y: slot.y,
          slotType: slot.type,
          capacity: slot.capacity ?? 1,
        })),
      },
    },
    include: {
      slots: true,
    },
  });
}

export async function addTemplateSlot(input: {
  templateId: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  slotType: "person" | "group" | "mixed";
  capacity?: number;
}) {
  return prisma.templateSlot.create({
    data: {
      templateId: input.templateId,
      title: input.title,
      subtitle: input.subtitle || null,
      x: input.x,
      y: input.y,
      slotType: input.slotType,
      capacity: input.capacity ?? 1,
    },
  });
}
