"use server";

import { revalidatePath } from "next/cache";

import { createEventSchema } from "@/features/events/schemas";
import { createEvent } from "@/services/event-service";

export async function createEventAction(formData: FormData) {
  const parsed = createEventSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    eventDate: formData.get("eventDate"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    location: formData.get("location"),
  });

  if (!parsed.success) {
    throw new Error("Les données de l'événement sont invalides.");
  }

  await createEvent(parsed.data);
  revalidatePath("/");
  revalidatePath("/events");
}
