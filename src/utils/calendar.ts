import type { WeddingEvent } from '@/data/wedding';
import { couple } from '@/data/wedding';

const COUPLE = `${couple.groom.name} & ${couple.bride.name}`;

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

/** Format a Date as a UTC iCal timestamp: YYYYMMDDTHHMMSSZ. */
function toICalUTC(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}` +
    `T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}${pad2(d.getUTCSeconds())}Z`
  );
}

/** RFC5545 escaping for TEXT properties. */
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/** Event start (local +07:00) and end (start + duration) as Dates. */
function eventDates(e: WeddingEvent): { start: Date; end: Date } {
  const start = new Date(`${e.start}+07:00`);
  const end = new Date(start.getTime() + e.durationHours * 3600 * 1000);
  return { start, end };
}

function description(e: WeddingEvent): string {
  return [
    COUPLE,
    e.name,
    `${e.weekday}, ${e.dateLabel}`,
    e.lunar ?? '',
    `${e.time} • ${e.venue}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Full VCALENDAR string with a 1-day-before reminder. */
export function buildICS(e: WeddingEvent): string {
  const { start, end } = eventDates(e);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vuong Huyen Wedding//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.id}@vuonghuyenw`,
    `DTSTAMP:${toICalUTC(new Date())}`,
    `DTSTART:${toICalUTC(start)}`,
    `DTEND:${toICalUTC(end)}`,
    `SUMMARY:${esc(`${e.name} — ${COUPLE}`)}`,
    `LOCATION:${esc(`${e.venue}, ${e.address}`)}`,
    `DESCRIPTION:${esc(description(e))}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(`Nhắc: ${e.name}`)}`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/** Google Calendar template link (opens the web calendar add screen). */
export function googleCalendarURL(e: WeddingEvent): string {
  const { start, end } = eventDates(e);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${e.name} — ${COUPLE}`,
    dates: `${toICalUTC(start)}/${toICalUTC(end)}`,
    details: description(e),
    location: `${e.venue}, ${e.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Open the event straight in the device calendar (no file download).
 * On iOS/Safari, navigating to a `text/calendar` data URL opens the Calendar
 * "Add Event" screen directly. Opened in a new tab so the invite stays put.
 */
export function openInCalendar(e: WeddingEvent): void {
  const uri = `data:text/calendar;charset=utf-8,${encodeURIComponent(buildICS(e))}`;
  const a = document.createElement('a');
  a.href = uri;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
