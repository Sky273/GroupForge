"use server";

import { revalidatePath } from "next/cache";

import { createPersonSchema } from "@/features/people/schemas";
import { createPerson } from "@/services/people-service";

export async function createPersonAction(formData: FormData) {
  const parsed = createPersonSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    throw new Error("Les données de la personne sont invalides.");
  }

  await createPerson(parsed.data);
  revalidatePath("/");
  revalidatePath("/people");
}
