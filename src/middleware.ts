import { NextRequest, NextResponse } from 'next/server'
import { PagePaths } from '@/constants'

export function middleware(request: NextRequest) {
  const isAccessTokenExists = request.cookies.has('_sat')
  if (!isAccessTokenExists) {
    return NextResponse.redirect(new URL(PagePaths.SignIn, request.url))
  }
}

export const config = {
  matcher: ['/my/:path*'],
}
