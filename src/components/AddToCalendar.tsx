'use client';

import type { WeddingEvent } from '@/data/wedding';
import { appleCalendarPath } from '@/utils/calendar';

// Single "Add to calendar" action backed by a real hosted .ics resource.
// iOS/Safari opens Apple Calendar's add screen directly; other platforms
// download the .ics and open it in the default calendar app.
export default function AddToCalendar({ ev }: { ev: WeddingEvent; side?: 'left' | 'right' }) {
  return (
    <a
      href={appleCalendarPath(ev)}
      target="_blank"
      rel="noopener noreferrer"
      className="wc-btn wc-btn-outline wc-btn-sm"
    >
      Thêm vào lịch
    </a>
  );
}
