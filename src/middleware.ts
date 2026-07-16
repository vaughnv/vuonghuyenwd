import { NextRequest, NextResponse } from 'next/server';

const SHARE_VERSION = '20260716-4';
const INVITE_PREFIX = `/invite/${SHARE_VERSION}/`;

function disableGuestCache(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

export function middleware(request: NextRequest) {
  const invitePathMatch = request.nextUrl.pathname.match(/^\/invite\/([^/]+)\/([^/]+)\/?$/);
  if (invitePathMatch && invitePathMatch[1] !== SHARE_VERSION) {
    const versionedUrl = request.nextUrl.clone();
    versionedUrl.pathname = `${INVITE_PREFIX}${invitePathMatch[2]}`;
    return NextResponse.redirect(versionedUrl, 307);
  }

  if (request.nextUrl.pathname.startsWith(INVITE_PREFIX)) {
    const rawGuest = request.nextUrl.pathname.slice(INVITE_PREFIX.length);
    if (!rawGuest || rawGuest.includes('/')) {
      return NextResponse.next();
    }

    let guest: string;
    try {
      guest = decodeURIComponent(rawGuest);
    } catch {
      return NextResponse.next();
    }
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = '/';
    rewriteUrl.searchParams.set('guest', guest);
    rewriteUrl.searchParams.set('sharePath', `${INVITE_PREFIX}${encodeURIComponent(guest)}`);
    rewriteUrl.searchParams.delete('v');
    return disableGuestCache(NextResponse.rewrite(rewriteUrl));
  }

  const guestKey = request.nextUrl.searchParams.has('guest')
    ? 'guest'
    : request.nextUrl.searchParams.has('to')
      ? 'to'
      : null;

  if (!guestKey) {
    return NextResponse.next();
  }

  const guest = request.nextUrl.searchParams.get(guestKey);
  if (!guest) {
    return NextResponse.next();
  }

  const versionedUrl = request.nextUrl.clone();
  versionedUrl.pathname = `${INVITE_PREFIX}${encodeURIComponent(guest)}`;
  versionedUrl.searchParams.delete('v');
  return NextResponse.redirect(versionedUrl, 307);
}
