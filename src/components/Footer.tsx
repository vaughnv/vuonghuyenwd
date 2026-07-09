'use client';

import FadeIn from './anim/FadeIn';
import { couple } from '@/data/wedding';

export default function Footer() {
  return (
    <div id="card-footer" className="wc-section" style={{ order: 10 }}>
      <FadeIn direction="up" className="mx-auto w-full max-w-[460px] text-center">
        {/* Small floral decor */}
        <div className="flex items-center justify-center mb-5" aria-hidden="true">
          <img
            src="/images/decor-flower1.webp"
            alt=""
            className="h-9 w-auto opacity-70 select-none"
            style={{ transform: 'rotate(-12deg)' }}
          />
        </div>

        <FadeIn direction="none" className="wc-title mb-2">Trọn đời bên nhau</FadeIn>
        <p className="wc-subtitle mb-6" style={{ lineHeight: 1.75 }}>
          Cảm ơn bạn đã hiện diện và chung vui,<br />trao cho chúng tôi những lời chúc phúc ấm áp<br />trong ngày trọng đại nhất của đời mình.
        </p>

        <div className="wc-divider mb-7">
          <span />
        </div>

        {/* Couple sign-off */}
        <FadeIn direction="up" delay={0.1}>
          <p
            className="leading-tight mb-1"
            style={{
              fontFamily: 'var(--wc-font-display)',
              color: 'var(--wc-primary)',
              fontSize: 'clamp(30px, 8vw, 42px)',
              fontWeight: 600,
            }}
          >
            {couple.groom.name} <span style={{ color: 'var(--wc-muted)' }}>&amp;</span> {couple.bride.name}
          </p>
          <p
            className="tracking-[0.18em] uppercase"
            style={{ fontFamily: 'var(--wc-font-serif)', color: 'var(--wc-ink-soft)', fontSize: '13px' }}
          >
            {couple.dateLabel}
          </p>
        </FadeIn>

        {/* Trailing floral — balanced with the top decor */}
        <div className="flex items-center justify-center mt-7" aria-hidden="true">
          <img
            src="/images/decor-flower2.webp"
            alt=""
            className="h-9 w-auto opacity-70 select-none"
            style={{ transform: 'rotate(12deg) scaleX(-1)' }}
          />
        </div>
      </FadeIn>
    </div>
  );
}
