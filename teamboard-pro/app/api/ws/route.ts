import { NextResponse } from "next/server";
export async function GET() {
  return new NextResponse("WebSocket is served via /socket path on the Node server (Socket.IO)", { status: 200 });
} 