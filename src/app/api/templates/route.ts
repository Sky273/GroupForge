import { NextResponse } from "next/server";

import { createTemplateSchema } from "@/features/templates/schemas";
import { createTemplate, listTemplates } from "@/services/template-service";

export async function GET() {
  const templates = await listTemplates();
  return NextResponse.json({ data: templates });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createTemplateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const template = await createTemplate(parsed.data);
  return NextResponse.json({ data: template }, { status: 201 });
}
