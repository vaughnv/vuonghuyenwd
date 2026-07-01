'use client';

import FadeIn from './anim/FadeIn';

export default function Timeline() {
  return (
    <div id="card-timelines" style={{ order: 7 }}>
        <div className="wedding-photo-placeholder timeline-photo-placeholder">
          Ảnh sẽ cập nhật sau
        </div>
        <div className="inner">
            <FadeIn direction="up" className="title">Timeline</FadeIn>
            <div className="timelines">
                <FadeIn direction="up" className="timeline-box">
                    <div className="img">
                        <img src="/images/icon-tl1.webp" alt="" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="content">
                        <div className="time">
                            <span>14:00</span>
                        </div>
                        <div className="text">
                            Chụp ảnh với photobooth
                        </div>
                    </div>
                </FadeIn>
                <FadeIn direction="up" className="timeline-box">
                    <div className="img">
                        <img src="/images/icon-tl4.webp" alt="" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="content">
                        <div className="time">
                            <span>14:30</span>
                        </div>
                        <div className="text">
                            Tiếp đón khách mời
                        </div>
                    </div>
                </FadeIn>
                <FadeIn direction="up" className="timeline-box">
                    <div className="img">
                        <img src="/images/icon-tl4.webp" alt="" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="content">
                        <div className="time">
                            <span>15:30</span>
                        </div>
                        <div className="text">
                            Khai tiệc chúc mừng
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    </div>
  );
}
