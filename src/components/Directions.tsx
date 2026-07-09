'use client';

import FadeIn from './anim/FadeIn';
import { venues } from '@/data/wedding';

type Venue = (typeof venues)[keyof typeof venues];

function embedSrc(v: Venue): string {
  const q = v.embed && v.embed.trim() ? v.embed : v.address;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=17&output=embed`;
}

function directionsHref(v: Venue): string {
  return v.mapUrl && v.mapUrl.trim()
    ? v.mapUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address)}`;
}

export default function Directions() {
  const sides: Venue[] = [venues.groom, venues.bride];

  return (
    <div id="card-directions" className="wc-section" style={{ order: 9 }}>
      <div className="mx-auto w-full text-center" style={{ maxWidth: 420, minWidth: 0 }}>
        <FadeIn direction="down">
          <h2 className="wc-title">Chỉ đường</h2>
        </FadeIn>

        <div className="mx-auto mt-4 grid grid-cols-2 gap-3" style={{ maxWidth: 390, minWidth: 0 }}>
          {sides.map((v) => (
            <FadeIn direction="up" key={v.label} className="min-w-0 flex flex-col items-center">
              <h3
                style={{
                  fontFamily: 'var(--wc-font-display)',
                  color: 'var(--wc-primary)',
                  fontSize: 'clamp(17px, 4.5vw, 22px)',
                  lineHeight: 1.1,
                }}
              >
                {v.name}
              </h3>
              <div
                className="mt-2 w-full overflow-hidden"
                style={{
                  height: 138,
                  borderRadius: 'var(--wc-radius-md)',
                  border: '1px solid var(--wc-line-soft)',
                  boxShadow: 'var(--wc-shadow-sm)',
                }}
              >
                <iframe
                  src={embedSrc(v)}
                  title={`Bản đồ ${v.label}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={directionsHref(v)}
                target="_blank"
                rel="noopener noreferrer"
                className="wc-btn wc-btn-outline mt-2"
                style={{ fontSize: 13, padding: '8px 16px' }}
              >
                Mở Google Maps
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
