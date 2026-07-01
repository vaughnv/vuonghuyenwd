'use client';

import FadeIn from './anim/FadeIn';

export default function PhotoStrip() {
  return (
    <div id="card-photo-just-married" style={{ order: 4 }}>
      <div className="wedding-photo-placeholder strip-photo-placeholder">
        Ảnh sẽ cập nhật sau
      </div>
      <div className="text">
          <FadeIn direction="right" className="just">Just</FadeIn>
          <FadeIn direction="up" className="married">Married</FadeIn>
      </div>
    </div>
  );
}
