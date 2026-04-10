"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { assignPersonToSlot, clearSlotAssignment } from "@/services/assignment-service";

const assignSchema = z.object({
  groupId: z.string().min(1),
  groupSlotId: z.string().min(1),
  personId: z.string().min(1),
});

const clearSchema = z.object({
  groupId: z.string().min(1),
  groupSlotId: z.string().min(1),
});

export async function assignPersonToSlotAction(formData: FormData) {
  const parsed = assignSchema.safeParse({
    groupId: formData.get("groupId"),
    groupSlotId: formData.get("groupSlotId"),
    personId: formData.get("personId"),
  });

  if (!parsed.success) {
    throw new Error("Assignation invalide.");
  }

  await assignPersonToSlot({ groupSlotId: parsed.data.groupSlotId, personId: parsed.data.personId });
  revalidatePath(`/groups/${parsed.data.groupId}`);
}

export async function clearSlotAssignmentAction(formData: FormData) {
  const parsed = clearSchema.safeParse({
    groupId: formData.get("groupId"),
    groupSlotId: formData.get("groupSlotId"),
  });

  if (!parsed.success) {
    throw new Error("Suppression invalide.");
  }

  await clearSlotAssignment(parsed.data.groupSlotId);
  revalidatePath(`/groups/${parsed.data.groupId}`);
}
