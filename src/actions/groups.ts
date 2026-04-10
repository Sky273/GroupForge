"use server";

import { revalidatePath } from "next/cache";

import { createGroupFromTemplate } from "@/services/group-service";

export async function instantiateTemplateToEventAction(formData: FormData) {
  const eventId = String(formData.get("eventId") || "");
  const templateId = String(formData.get("templateId") || "");
  const title = String(formData.get("title") || "");

  if (!eventId || !templateId) {
    throw new Error("Impossible d'instancier le groupe.");
  }

  await createGroupFromTemplate({ eventId, templateId, title: title || undefined });
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
}
