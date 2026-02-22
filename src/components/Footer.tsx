'use client';

import Image from 'next/image';
import FadeIn from './anim/FadeIn';

export default function Footer() {
  return (
    <div id="card-footer" className="card-section" style={{ order: 13 }}>
        <Image
          src="/images/1763782529212-footer.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          sizes="575px"
        />
        <div className="card-footer-inner">
            <FadeIn direction="left" className="title">In you</FadeIn>
            <FadeIn direction="up" className="text">
                I&apos;ve found my home<br/>my heart<br/>and my forever
            </FadeIn>
        </div>
    </div>
  );
}
