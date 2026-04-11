import { NextResponse } from "next/server";

import { updateTemplateSchema } from "@/features/templates/schemas";
import { getTemplateById, updateTemplate } from "@/services/template-service";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const template = await getTemplateById(id);

  if (!template) {
    return NextResponse.json({ error: "Modèle introuvable" }, { status: 404 });
  }

  return NextResponse.json({ data: template });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateTemplateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const template = await updateTemplate(id, parsed.data);
  return NextResponse.json({ data: template });
}
