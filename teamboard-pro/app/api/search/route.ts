import { NextRequest, NextResponse } from "next/server";
import { ok } from "@/lib/response";
import { searchAll } from "@/lib/search";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const res = await searchAll("self", q);
  return NextResponse.json(ok(res));
} 