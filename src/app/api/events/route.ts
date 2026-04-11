import { NextResponse } from "next/server";

import { createEventSchema } from "@/features/events/schemas";
import { createEvent, listEvents } from "@/services/event-service";

export async function GET() {
  const events = await listEvents();
  return NextResponse.json({ data: events });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 });
  }

  const event = await createEvent(parsed.data);
  return NextResponse.json({ data: event }, { status: 201 });
}
