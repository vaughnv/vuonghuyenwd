'use client';
import FadeIn from './anim/FadeIn';

export default function Footer() {
  return (
    <div id="card-footer" className="card-section" style={{ backgroundImage: "url(/images/1763782529212-footer.webp)", order: 13 }}>
        <div className="card-footer-inner">
            <FadeIn direction="left" className="title">In you</FadeIn>
            <FadeIn direction="up" className="text">
                I&apos;ve found my home<br/>my heart<br/>and my forever
            </FadeIn>
        </div>
    </div>
  );
}
