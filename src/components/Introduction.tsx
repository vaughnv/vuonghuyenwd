'use client';

import { motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';
import Image from 'next/image';

const MotionImage = motion(Image);
const BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export default function Introduction() {
  return (
    <div id="groom-bride" className="card-section" style={{ order: 2 }}>
      <MotionImage
        src="/images/decor-flower1.webp"
        alt=""
        width={300}
        height={300}
        className="decor-flower1"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <MotionImage
        src="/images/decor-flower2.webp"
        alt=""
        width={300}
        height={300}
        className="decor-flower2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <FadeIn direction="up">
        <h2
          className="title"
          style={{ fontFamily: 'var(--wc-font-display)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400, fontSize: 'clamp(46px, 14vw, 68px)', lineHeight: 1.1 }}
        >
          Nên duyên
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <div className="vertical-line"></div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <h4 className="sub-title">
          Quen nhau từ thuở đi học,<br />nay về chung một nhà
        </h4>
      </FadeIn>

      <div className="groom-bride-box nha-trai">
        <FadeIn direction="left" delay={0} className="gb-box groom relative overflow-hidden">
          <Image
            src="/images/avatar/groom.webp"
            alt="Chú rể Hùng Vương"
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
          />
          <div className="info relative z-10">
            <div className="label">Chú rể</div>
            <div className="fullname">Hùng Vương</div>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2} className="gb-box bride relative overflow-hidden">
          <Image
            src="/images/avatar/bride.webp"
            alt="Cô dâu Thu Huyền"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
          />
          <div className="info relative z-10">
            <div className="label">Cô dâu</div>
            <div className="fullname">Thu Huyền</div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
