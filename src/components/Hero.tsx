'use client';

import FadeIn from './anim/FadeIn';

export default function Hero() {
  return (
    <div id="card-banner" className="card-banner" style={{ backgroundImage: "url(/images/1763782492026-main.webp)", order: 1 }}>
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
