'use client';

import Image from 'next/image';
import FadeIn from './anim/FadeIn';

export default function Hero() {
  return (
    <div id="card-banner" className="card-banner" style={{ order: 1 }}>
      <Image
        src="/images/1763782492026-main.webp"
        alt="Wedding banner"
        fill
        className="object-cover"
        style={{ objectPosition: 'top' }}
        priority
        sizes="575px"
      />
      <div className="card-banner-inner">
        <FadeIn direction="down" delay={0.2}>
          <div className="wedding-save-the-date">
            <span>S</span>ave our date
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.4}>
          <h2 className="wedding-name">
            Viết Hiếu & Ánh Nguyệt
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <div className="wedding-date">
            07.03.2026
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
