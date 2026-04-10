import type { CreateTemplateInput } from "@/features/templates/schemas";

export async function createTemplate(input: CreateTemplateInput) {
  return {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
