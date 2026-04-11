import { NextResponse } from "next/server";

import { updatePersonSchema } from "@/features/people/schemas";
import { archivePerson, getPersonById, updatePerson } from "@/services/people-service";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const person = await getPersonById(id);

  if (!person) {
    return NextResponse.json({ error: "Personne introuvable" }, { status: 404 });
  }

  return NextResponse.json({ data: person });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();
  const parsed = updatePersonSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const person = await updatePerson(id, parsed.data);
  return NextResponse.json({ data: person });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const person = await archivePerson(id);
  return NextResponse.json({ data: person });
}
