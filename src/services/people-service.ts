import type { CreatePersonInput } from "@/features/people/schemas";

export async function createPerson(input: CreatePersonInput) {
  return {
    id: crypto.randomUUID(),
    ...input,
    fullName: `${input.firstName} ${input.lastName}`.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
