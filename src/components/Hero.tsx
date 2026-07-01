'use client';

import FadeIn from './anim/FadeIn';

export default function Hero() {
  return (
    <div id="card-banner" className="card-banner" style={{ order: 1 }}>
      <div className="wedding-photo-placeholder hero-photo-placeholder" aria-label="Ảnh cưới sẽ cập nhật sau">
        Ảnh sẽ cập nhật sau
      </div>
      <div className="card-banner-inner">
        <FadeIn direction="down" delay={0.2}>
          <div className="wedding-save-the-date">
            <span>S</span>ave our date
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.4}>
          <h2 className="wedding-name">
            Hùng Vương & Thu Huyền
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <div className="wedding-date">
            09.08.2026
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
