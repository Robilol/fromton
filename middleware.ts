import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/middleware'

const blockedRoutes = ['/dashboard', '/cheese', '/auth', '/account']

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    if (process.env.NODE_ENV === 'production') {
        if (blockedRoutes.some((route) => url.pathname.startsWith(route))) {
          return NextResponse.json({ message: 'Access forbidden' }, { status: 403 })
        }
      }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}