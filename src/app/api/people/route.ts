import { NextResponse } from "next/server";

import { people } from "@/data/mock";

export async function GET() {
  return NextResponse.json({ data: people });
}
