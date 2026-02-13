import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = [
  '/course-videos',
  '/buy',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check if the route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Try to get JWT from cookies (for SSR protection)
  const token = request.cookies.get('jwt_token')?.value;

  // If token exists, allow access (user is signed up/logged in)
  if (token) {
    return NextResponse.next();
  }

  // If no token, redirect to signup
  const signupUrl = new URL('/signup', request.url);
  signupUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(signupUrl);
}

export const config = {
  matcher: ['/course-videos/:path*', '/buy/:path*'],
}; 