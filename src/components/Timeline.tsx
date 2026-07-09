'use client';

import type { WeddingEvent } from '@/data/wedding';
import FadeIn from './anim/FadeIn';
import { events } from '@/data/wedding';
import { openInCalendar } from '@/utils/calendar';


function EventContent({ ev, side }: { ev: WeddingEvent; side: 'left' | 'right' }) {
  const align = side === 'left' ? 'right' : 'left';
  return (
    <div
      className="flex min-w-0 flex-col gap-1.5"
      style={{ textAlign: align, alignItems: side === 'left' ? 'flex-end' : 'flex-start' }}
    >
      <span
        style={{
          fontFamily: 'var(--wc-font-serif)',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--wc-muted)',
        }}
      >
        {ev.weekday} · <span style={{ color: 'var(--wc-ink)', fontWeight: 700 }}>{ev.time}</span> · {ev.dateLabel}
      </span>

      <h3
        style={{
          fontFamily: 'var(--wc-font-display)',
          fontSize: 'clamp(19px, 5vw, 24px)',
          fontWeight: 600,
          color: 'var(--wc-primary)',
          lineHeight: 1.15,
          margin: 0,
          minWidth: 0,
        }}
      >
        {ev.name}
      </h3>

      <p
        style={{
          fontFamily: 'var(--wc-font-serif)',
          fontSize: 13.5,
          fontWeight: 600,
          color: 'var(--wc-ink)',
          margin: 0,
          lineHeight: 1.4,
          minWidth: 0,
          wordBreak: 'break-word',
        }}
      >
        {ev.venue}
      </p>
      <p
        style={{
          fontFamily: 'var(--wc-font-serif)',
          fontSize: 12.5,
          color: 'var(--wc-ink-soft)',
          margin: 0,
          lineHeight: 1.5,
          minWidth: 0,
          wordBreak: 'break-word',
        }}
      >
        {ev.address}
      </p>

      {ev.lunar ? (
        <p
          style={{
            fontFamily: 'var(--wc-font-serif)',
            fontSize: 12,
            fontStyle: 'italic',
            color: 'var(--wc-muted)',
            margin: 0,
            lineHeight: 1.5,
            minWidth: 0,
          }}
        >
          {ev.lunar}
        </p>
      ) : null}

      <div
        className="mt-1.5 flex"
        style={{ justifyContent: side === 'left' ? 'flex-end' : 'flex-start' }}
      >
        <button
          type="button"
          className="wc-btn wc-btn-outline wc-btn-sm"
          onClick={() => openInCalendar(ev)}
        >
          Thêm vào lịch
        </button>
      </div>
    </div>
  );
}

export default function Timeline() {
  const spineBends = 4;
  const spineH = 1000;
  const cx = 7;
  const amp = 9;
  const seg = spineH / spineBends;
  let wavePath = `M ${cx} 0`;
  for (let i = 0; i < spineBends; i++) {
    const y1 = (i + 1) * seg;
    const cxp = cx + (i % 2 === 0 ? amp : -amp);
    wavePath += ` C ${cxp} ${i * seg + seg * 0.5}, ${cxp} ${y1 - seg * 0.5}, ${cx} ${y1}`;
  }
  return (
    <div id="card-timelines" style={{ order: 5 }}>
      <div className="wc-section" style={{ minWidth: 0 }}>
        <FadeIn direction="down" className="wc-head">
          <h2 className="wc-title">Timeline</h2>
          <div className="wc-divider">
            <span />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.06}>
          <p
            className="wc-subtitle mx-auto mt-3 max-w-[34ch] text-center"
            style={{ fontSize: 14 }}
          >
            Chạm &ldquo;Thêm vào lịch&rdquo; để lưu và được nhắc trước ngày cưới.
          </p>
        </FadeIn>

        {/* Center-spine timeline: events alternate left / right of the middle line */}
        <div
          className="relative mx-auto"
          style={{ marginTop: 36, maxWidth: 480, minWidth: 0 }}
        >
          {/* Center vertical line */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 14 ${spineH}`}
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 8,
              height: 'calc(100% - 16px)',
              width: 40,
              zIndex: 0,
            }}
          >
            <path
              d={wavePath}
              fill="none"
              stroke="var(--wc-line)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col" style={{ gap: 28 }}>
            {events.map((ev, i) => {
              const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
              return (
                <FadeIn key={ev.id} direction="up" delay={0.1 + i * 0.08} style={{ minWidth: 0 }}>
                  <div
                    className="relative grid items-start"
                    style={{ gridTemplateColumns: '1fr 26px 1fr', minWidth: 0 }}
                  >
                    {/* Left cell */}
                    <div className="min-w-0 pr-1">
                      {side === 'left' ? <EventContent ev={ev} side="left" /> : null}
                    </div>

                    {/* Center node */}
                    <div className="flex justify-center" style={{ minWidth: 0 }}>
                      <div
                        style={{
                          marginTop: 6,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: 'var(--wc-primary)',
                          border: '3px solid var(--wc-surface)',
                          boxShadow: '0 0 0 1px var(--wc-line)',
                          zIndex: 1,
                        }}
                      />
                    </div>

                    {/* Right cell */}
                    <div className="min-w-0 pl-1">
                      {side === 'right' ? <EventContent ev={ev} side="right" /> : null}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
