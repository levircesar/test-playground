import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rotas de admin
  if (pathname.startsWith('/admin')) {
    // Permitir acesso à página de login
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Para outras rotas de admin, verificar se há token de autenticação
    const token = request.cookies.get('firebase-auth-token')?.value;
    
    if (!token) {
      // Redirecionar para login se não estiver autenticado
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
