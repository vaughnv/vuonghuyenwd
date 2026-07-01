'use client';
import FadeIn from './anim/FadeIn';
export default function Gallery() {

  return (
    <div id="card-gallery" style={{ order: 9 }}>
        <div className="inner">
            <div className="image-split-container placeholder-split-container">
                <div className="image-part left-part wedding-photo-placeholder" />
                <div className="image-part middle-part wedding-photo-placeholder">Ảnh sẽ cập nhật sau</div>
                <div className="image-part right-part wedding-photo-placeholder" />
            </div>

            <FadeIn direction="right" delay={0.3}>
                <h2 className="card-gallery-title">
                    Our Memories
                </h2>
            </FadeIn>
            
            <div className="photo-grid placeholder-photo-grid grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="photo wedding-photo-placeholder relative w-full aspect-[3/4]">
                        Ảnh sẽ cập nhật sau
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
