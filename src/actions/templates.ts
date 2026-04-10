"use server";

import { revalidatePath } from "next/cache";

import { createTemplateSchema } from "@/features/templates/schemas";
import { createTemplate } from "@/services/template-service";

export async function createTemplateAction(formData: FormData) {
  const parsed = createTemplateSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    canvasWidth: Number(formData.get("canvasWidth") || 1200),
    canvasHeight: Number(formData.get("canvasHeight") || 800),
    slots: [],
  });

  if (!parsed.success) {
    throw new Error("Les données du modèle sont invalides.");
  }

  await createTemplate(parsed.data);
  revalidatePath("/");
  revalidatePath("/templates");
}
