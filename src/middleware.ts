import { NextRequest, NextResponse } from 'next/server';

const SHARE_VERSION = '20260716-4';

function disableGuestCache(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

export function middleware(request: NextRequest) {
  const legacyInviteMatch = request.nextUrl.pathname.match(/^\/invite\/[^/]+\/([^/]+)\/?$/);
  if (legacyInviteMatch) {
    let guest: string;
    try {
      guest = decodeURIComponent(legacyInviteMatch[1]);
    } catch {
      return NextResponse.next();
    }

    const queryUrl = request.nextUrl.clone();
    queryUrl.pathname = '/';
    queryUrl.search = '';
    queryUrl.searchParams.set('guest', guest);
    queryUrl.searchParams.set('v', SHARE_VERSION);
    return NextResponse.redirect(queryUrl, 307);
  }

  const guestKey = request.nextUrl.searchParams.has('guest')
    ? 'guest'
    : request.nextUrl.searchParams.has('to')
      ? 'to'
      : null;

  if (!guestKey || !request.nextUrl.searchParams.get(guestKey)) {
    return NextResponse.next();
  }

  if (request.nextUrl.searchParams.get('v') !== SHARE_VERSION) {
    const versionedUrl = request.nextUrl.clone();
    versionedUrl.searchParams.set('v', SHARE_VERSION);
    return NextResponse.redirect(versionedUrl, 307);
  }

  return disableGuestCache(NextResponse.next());
}
