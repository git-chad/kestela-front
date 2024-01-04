// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: any) {
  const session = await getToken({
    req: request,
    secret: process.env.JWT_SECRET, 
  });

  console.log("Session Middleware", session);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('p', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
