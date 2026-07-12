'use client';

import Image from 'next/image';
import FadeIn from './anim/FadeIn';
import { couple } from '@/data/wedding';

export default function Hero() {
  return (
    <section
      id="card-banner"
      aria-label="Lời mời cưới"
      style={{ order: 1, position: 'relative' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100vh', maxHeight: '100vh' }}>
        <Image
          src="/images/album/PMN08872.webp"
          alt="Hùng Vương & Thu Huyền"
          fill
          priority
          sizes="575px"
          style={{ objectFit: 'cover' }}
        />

        {/* Bottom gradient so overlaid text stays legible */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(28,35,22,0.72) 0%, rgba(28,35,22,0.35) 24%, rgba(28,35,22,0) 50%)',
          }}
        />

        {/* Text overlaid on the lower part of the photo */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            padding: '0 clamp(22px, 7vw, 40px) clamp(30px, 8vw, 46px)',
            minWidth: 0,
          }}
        >
          <FadeIn direction="up" delay={0.05}>
            <span className="wc-eyebrow" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {couple.hero.eyebrow}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.15} style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--wc-font-display)',
                color: '#ffffff',
                fontWeight: 600,
                lineHeight: 1.05,
                fontSize: 'clamp(32px, 8.8vw, 52px)',
                margin: 0,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 18px rgba(0,0,0,0.45)',
              }}
            >
              {couple.groom.name}{' '}
              <span style={{ color: 'rgba(255,255,255,0.82)' }}>&</span>{' '}
              {couple.bride.name}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <div
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontFamily: 'var(--wc-font-serif)',
                letterSpacing: '0.34em',
                fontSize: 'clamp(15px, 4.4vw, 19px)',
                fontWeight: 500,
                textShadow: '0 1px 12px rgba(0,0,0,0.4)',
              }}
            >
              {couple.dateLabel}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
