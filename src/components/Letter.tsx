'use client';

import FadeIn from './anim/FadeIn';
import { letter, couple } from '@/data/wedding';
import { storyPhotos } from '@/data/story';

// Gentle, fixed tilts so the scattered backdrop feels hand-placed.
const TILTS = [-5, 4, -3, 5, -4, 3, -5, 4, -3, 5, -4, 3, -4, 4];
// Duplicate so the collage fills the height behind the letter text.
const bgPhotos = [...storyPhotos, ...storyPhotos];

const shadow = '0 1px 8px rgba(0,0,0,0.55)';

export default function Letter() {
  return (
    <div id="card-letter" className="relative overflow-hidden" style={{ order: 7 }}>
      {/* Title — on the clean paper, above the full-bleed photo band */}
      <FadeIn
        direction="down"
        className="wc-head"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingTop: 'clamp(52px, 12vw, 76px)',
          paddingLeft: 'clamp(20px, 6vw, 34px)',
          paddingRight: 'clamp(20px, 6vw, 34px)',
          marginBottom: 6,
        }}
      >
        <h2 className="wc-title">{letter.title}</h2>
        <p className="wc-subtitle mx-auto mt-3 max-w-[32ch]" style={{ fontSize: 14 }}>
          Một chặng đường dài chúng mình đã cùng nhau đi qua.
        </p>
        <div className="wc-divider">
          <span />
        </div>
      </FadeIn>

      {/* Full-bleed scrapbook body: clear memory photos behind, white letter text on top */}
      <div className="relative w-full overflow-hidden" style={{ minWidth: 0 }}>
        {/* Scattered memory photos — kept clear so they stay visible */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{ columnCount: 3, columnGap: 8 }}>
            {bgPhotos.map((p, i) => (
              <div
                key={i}
                style={{
                  breakInside: 'avoid',
                  marginBottom: 8,
                  transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
                  background: '#fff',
                  padding: 4,
                  boxShadow: '0 4px 12px rgba(40, 52, 30, 0.22)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Soft dark veil — photos stay visible, white text stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ zIndex: 1, background: 'linear-gradient(180deg, rgba(20,26,14,0.52) 0%, rgba(20,26,14,0.6) 100%)' }}
        />

        {/* Soft fade so the photo band melts into the paper above (no hard seam) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0"
          style={{ zIndex: 1, height: 72, background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 100%)' }}
        />

        {/* Letter text — white, centered for a comfortable measure, over full-bleed photos */}
        <div
          className="relative mx-auto flex w-full flex-col items-center"
          style={{ zIndex: 2, maxWidth: 480, padding: 'clamp(66px, 15vw, 92px) clamp(22px, 6vw, 34px) clamp(30px, 8vw, 48px)' }}
        >
          <FadeIn direction="up" delay={0.06} className="w-full">
            <p className="wc-body" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.95)', textShadow: shadow }}>
              {letter.greeting}
            </p>
          </FadeIn>

          <div className="mt-4 flex w-full flex-col gap-4">
            {letter.paragraphs.map((para, i) => (
              <FadeIn key={i} direction="up" delay={0.1 + i * 0.05} className="w-full">
                <p className="wc-body" style={{ textAlign: 'justify', color: '#ffffff', textShadow: shadow }}>
                  {para}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.2} className="mt-8 flex w-full flex-col items-center">
            <p className="wc-body" style={{ color: 'rgba(255,255,255,0.95)', textShadow: shadow }}>
              {letter.signOff}
            </p>
            <p
              className="mt-1 leading-none"
              style={{
                fontFamily: 'var(--wc-font-display)',
                color: '#ffffff',
                fontSize: 'clamp(24px, 6.5vw, 32px)',
                fontWeight: 600,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              {couple.groom.name}
              <span aria-hidden="true" style={{ margin: '0 0.22em', color: 'rgba(255,255,255,0.8)' }}>
                &amp;
              </span>
              {couple.bride.name}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
