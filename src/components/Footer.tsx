'use client';

import Image from 'next/image';
import FadeIn from './anim/FadeIn';
import { couple } from '@/data/wedding';

export default function Footer() {
  return (
    <div
      id="card-footer"
      style={{
        order: 10,
        position: 'relative',
        width: '100%',
        height: 'min(58vh, 460px)',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <Image
        src="/images/footer.webp"
        alt="Hùng Vương và Thu Huyền"
        fill
        sizes="575px"
        style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
      />

      {/* Gradient so the thank-you stays legible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(24,30,18,0.8) 0%, rgba(24,30,18,0.4) 34%, rgba(24,30,18,0.05) 66%, rgba(24,30,18,0.2) 100%)',
        }}
      />

      {/* Thank-you sign-off */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          textAlign: 'center',
          padding: '0 clamp(24px, 8vw, 44px) clamp(26px, 7vw, 40px)',
          minWidth: 0,
        }}
      >
        <FadeIn direction="up">
          <h2
            style={{
              fontFamily: 'var(--wc-font-display)',
              color: '#ffffff',
              fontWeight: 600,
              lineHeight: 1.05,
              fontSize: 'clamp(34px, 10vw, 48px)',
              margin: 0,
              textShadow: '0 2px 18px rgba(0,0,0,0.5)',
            }}
          >
            Cảm ơn bạn
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--wc-font-serif)',
              color: 'rgba(255,255,255,0.94)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '30ch',
              textShadow: '0 1px 12px rgba(0,0,0,0.45)',
            }}
          >
            Sự hiện diện của bạn là niềm hạnh phúc của chúng tôi.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.12}>
          <p
            style={{
              fontFamily: 'var(--wc-font-serif)',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontSize: 13,
              margin: 0,
              textShadow: '0 1px 12px rgba(0,0,0,0.45)',
            }}
          >
            {couple.groom.name} &amp; {couple.bride.name} · {couple.dateLabel}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
