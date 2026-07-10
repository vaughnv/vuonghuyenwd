'use client';

import { useEffect, useRef, useState } from 'react';
import type { WeddingEvent } from '@/data/wedding';
import { appleCalendarPath, googleCalendarURL, outlookCalendarURL } from '@/utils/calendar';

export default function AddToCalendar({ ev, side }: { ev: WeddingEvent; side: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const items = [
    { label: 'Google Lịch', href: googleCalendarURL(ev) },
    { label: 'Apple / iPhone', href: appleCalendarPath(ev) },
    { label: 'Outlook', href: outlookCalendarURL(ev) },
  ];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className="wc-btn wc-btn-outline wc-btn-sm"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Thêm vào lịch
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: side === 'left' ? 0 : 'auto',
            left: side === 'left' ? 'auto' : 0,
            zIndex: 30,
            minWidth: 172,
            background: 'var(--wc-surface, #ffffff)',
            border: '1px solid var(--wc-line-soft)',
            borderRadius: 12,
            boxShadow: '0 14px 32px rgba(40, 52, 30, 0.22)',
            padding: 6,
            textAlign: 'left',
          }}
        >
          {items.map((it) => (
            <a
              key={it.label}
              role="menuitem"
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '9px 12px',
                borderRadius: 8,
                fontFamily: 'var(--wc-font-serif)',
                fontSize: 14,
                color: 'var(--wc-ink)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
