"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { addTemplateSlot } from "@/services/template-service";

const createTemplateSlotSchema = z.object({
  templateId: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional().or(z.literal("")),
  x: z.coerce.number().min(0).max(100),
  y: z.coerce.number().min(0).max(100),
  slotType: z.enum(["person", "group", "mixed"]),
  capacity: z.coerce.number().int().positive().default(1),
});

export async function addTemplateSlotAction(formData: FormData) {
  const parsed = createTemplateSlotSchema.safeParse({
    templateId: formData.get("templateId"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    x: formData.get("x"),
    y: formData.get("y"),
    slotType: formData.get("slotType"),
    capacity: formData.get("capacity"),
  });

  if (!parsed.success) {
    throw new Error("Les données du slot sont invalides.");
  }

  await addTemplateSlot(parsed.data);
  revalidatePath("/templates");
  revalidatePath(`/templates/${parsed.data.templateId}`);
}
