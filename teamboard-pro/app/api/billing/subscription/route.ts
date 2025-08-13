import { NextResponse } from "next/server";
import { ok } from "@/lib/response";
export async function GET() {
  return NextResponse.json(ok({ plan: "PRO", status: "active", currentPeriodEnd: new Date(Date.now()+1000*3600*24*30) }));
} 