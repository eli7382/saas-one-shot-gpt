import { NextRequest, NextResponse } from "next/server";
import { saveFile } from "@/lib/storage";
import { ok, fail } from "@/lib/response";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.startsWith("multipart/form-data")) return NextResponse.json(fail("Expected multipart"), { status: 400 });
  const formData = await req.formData();
  const file = formData.get("file");
  const taskId = formData.get("taskId")?.toString();
  if (!(file instanceof File) || !taskId) return NextResponse.json(fail("Invalid upload"), { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const saved = await saveFile({ buffer, mime: (file as any).type || "application/octet-stream", filename: (file as any).name || "upload.bin" });
  const att = await prisma.attachment.create({ data: { taskId, url: saved.url, mime: saved.mime, size: saved.size } });
  return NextResponse.json(ok(att));
} 