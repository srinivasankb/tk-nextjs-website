import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('accept');
  const { pathname } = request.nextUrl;

  // Check if the request is for Markdown content
  if (acceptHeader && acceptHeader.includes('text/markdown')) {
    // Avoid infinite recursion and only handle content pages
    if (
      !pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/api/content-negotiation';
      url.searchParams.set('path', pathname);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
