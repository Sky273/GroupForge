import { NextResponse } from "next/server";

import { templates } from "@/data/mock";

export async function GET() {
  return NextResponse.json({ data: templates });
}
