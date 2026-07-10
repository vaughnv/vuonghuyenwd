import { events } from '@/data/wedding';
import { buildICS } from '@/utils/calendar';

// Served as a real text/calendar resource so iOS/Safari opens the native
// "Add to Calendar" screen directly (no manual file import).
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export function GET(_req: Request, { params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);
  if (!event) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(buildICS(event), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${event.id}.ics"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
