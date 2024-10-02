import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname !== '/') {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}
