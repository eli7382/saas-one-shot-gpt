import { NextResponse } from "next/server";
import { ok } from "@/lib/response";
export async function POST() { return NextResponse.json(ok({ received: true })); } 