import { prisma } from "@/lib/prisma";

export async function assignPersonToSlot({ groupSlotId, personId }: { groupSlotId: string; personId: string }) {
  const slot = await prisma.groupSlot.findUnique({ where: { id: groupSlotId } });

  if (!slot) {
    throw new Error("Slot introuvable.");
  }

  if (slot.slotType === "group") {
    throw new Error("Ce slot n'accepte pas de personne.");
  }

  return prisma.slotAssignment.upsert({
    where: { groupSlotId },
    create: {
      groupSlotId,
      assignmentType: "person",
      personId,
    },
    update: {
      assignmentType: "person",
      personId,
      childGroupId: null,
    },
  });
}

export async function clearSlotAssignment(groupSlotId: string) {
  return prisma.slotAssignment.deleteMany({
    where: { groupSlotId },
  });
}
