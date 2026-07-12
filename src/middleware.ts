import { NextRequest, NextResponse } from 'next/server';

const GUEST_KEY: Record<string, true> = {
  guest: true,
  to: true,
};

export function middleware(request: NextRequest) {
  const queryStart = request.url.indexOf('?');
  if (queryStart === -1) {
    return NextResponse.next();
  }

  const hashStart = request.url.indexOf('#', queryStart);
  const query = request.url.slice(queryStart + 1, hashStart === -1 ? undefined : hashStart);
  const isGuestRequest = query.split('&').some((part) => {
    const separatorIndex = part.indexOf('=');
    const rawKey = separatorIndex === -1 ? part : part.slice(0, separatorIndex);
    return Boolean(GUEST_KEY[rawKey]);
  });

  if (!isGuestRequest) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}
