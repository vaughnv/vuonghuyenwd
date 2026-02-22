'use client';

import Image from 'next/image';
import FadeIn from './anim/FadeIn';

export default function PhotoStrip() {
  return (
    <div id="card-photo-just-married" style={{ order: 4 }}>
      <Image
        src="/images/1763782499249-justmarried.webp"
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: '50% 0%' }}
        sizes="575px"
      />
      <div className="text">
          <FadeIn direction="right" className="just">Just</FadeIn>
          <FadeIn direction="up" className="married">Married</FadeIn>
      </div>
    </div>
  );
}
