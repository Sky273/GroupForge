import type { CreateEventInput } from "@/features/events/schemas";

export async function createEvent(input: CreateEventInput) {
  return {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
