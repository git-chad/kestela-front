import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  console.log("Session Middleware", session)
  // if (!session) {
  //   const requestedPage = request.nextUrl.pathname
  //   const url = request.nextUrl.clone()
  //   url.pathname = `/login`
  //   url.search = `p=${requestedPage}`
    
  //   return NextResponse.redirect(url)
  // }
  
  // if (request.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL("/dashboard", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}