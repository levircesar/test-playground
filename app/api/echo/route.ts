import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      echo: body,
      serverTimestamp: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      message: 'Dados recebidos e ecoados com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Erro ao processar o body da requisição',
        serverTimestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }
}
