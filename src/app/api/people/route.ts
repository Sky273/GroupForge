import { NextResponse } from "next/server";

import { createPersonSchema } from "@/features/people/schemas";
import { createPerson, listPeople } from "@/services/people-service";

export async function GET() {
  const people = await listPeople();
  return NextResponse.json({ data: people });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createPersonSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const person = await createPerson(parsed.data);
  return NextResponse.json({ data: person }, { status: 201 });
}
