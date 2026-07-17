import { NextRequest, NextResponse } from 'next/server';

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


  return disableGuestCache(NextResponse.next());
}
