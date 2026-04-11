import { NextResponse } from "next/server";

import { updateEventSchema } from "@/features/events/schemas";
import { getEventById, updateEvent } from "@/services/event-service";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const event = await getEventById(id);

  if (!event) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  return NextResponse.json({ data: event });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const event = await updateEvent(id, parsed.data);
  return NextResponse.json({ data: event });
}
