import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    serverTimestamp: new Date().toISOString(),
    message: 'Pong! API está funcionando'
  });
}
