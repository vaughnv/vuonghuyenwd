'use client';
import FadeIn from './anim/FadeIn';

export default function PhotoStrip() {
  return (
    <div id="card-photo-just-married" style={{ backgroundImage: "url(/images/1763782499249-justmarried.webp)", order: 4 }}>
      <div className="text">
          <FadeIn direction="right" className="just">Just</FadeIn>
          <FadeIn direction="up" className="married">Married</FadeIn>
      </div>
    </div>
  );
}
