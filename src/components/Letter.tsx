'use client';

import FadeIn from './anim/FadeIn';
import { letter, couple } from '@/data/wedding';

export default function Letter() {
  return (
    <div id="card-letter" className="wc-section relative overflow-hidden" style={{ order: 7 }}>
      {/* Delicate floral corner accents — decorative only, sit on the paper */}
      <img
        src="/images/decor-flower2.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-5 -top-3 w-[clamp(84px,22vw,120px)] select-none"
        style={{ opacity: 0.5, mixBlendMode: 'multiply' }}
      />
      <img
        src="/images/decor-flower2.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-5 w-[clamp(84px,22vw,120px)] select-none"
        style={{ opacity: 0.5, mixBlendMode: 'multiply', transform: 'scaleX(-1) rotate(8deg)' }}
      />

      <div className="relative mx-auto flex w-full max-w-[460px] flex-col items-center">
        <FadeIn direction="down" className="wc-head">
          <h2 className="wc-title">{letter.title}</h2>
          <div className="wc-divider">
            <span />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.08} className="mt-8 w-full">
          <p
            className="wc-body"
            style={{ fontStyle: 'italic', color: 'var(--wc-ink-soft)' }}
          >
            {letter.greeting}
          </p>
        </FadeIn>

        <div className="mt-4 flex w-full flex-col gap-4">
          {letter.paragraphs.map((para, i) => (
            <FadeIn key={i} direction="up" delay={0.12 + i * 0.06} className="w-full">
              <p className="wc-body" style={{ textAlign: 'justify' }}>
                {para}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.2} className="mt-9 flex w-full flex-col items-center">
          <p
            className="wc-body"
            style={{ color: 'var(--wc-ink-soft)' }}
          >
            {letter.signOff}
          </p>
          <p
            className="mt-1 leading-none"
            style={{
              fontFamily: 'var(--wc-font-display)',
              color: 'var(--wc-primary)',
              fontSize: 'clamp(22px, 6vw, 30px)',
              fontWeight: 400,
            }}
          >
            {couple.groom.name}
            <span
              aria-hidden="true"
              style={{ margin: '0 0.22em', color: 'var(--wc-gold)', fontWeight: 400 }}
            >
              &amp;
            </span>
            {couple.bride.name}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
