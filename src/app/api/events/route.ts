import { NextResponse } from "next/server";

import { events } from "@/data/mock";

export async function GET() {
  return NextResponse.json({ data: events });
}
