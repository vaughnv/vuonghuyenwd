'use client';
import FadeIn from './anim/FadeIn';

export default function Timeline() {
  return (
    <div id="card-timelines" style={{ order: 7, backgroundImage: "url(/images/1763782523162-timeline.webp)" }}>
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
                            <span>17:30</span>
                        </div>
                        <div className="text">
                            Ăn kem, chụp ảnh với photobooth
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
                            <span>18:00</span>
                        </div>
                        <div className="text">
                            Tiếp đón khách mời
                        </div>
                    </div>
                </FadeIn>
                <FadeIn direction="up" className="timeline-box">
                    <div className="img">
                        <img src="/images/icon-tl3.webp" alt="" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="content">
                        <div className="time">
                            <span>19:00</span>
                        </div>
                        <div className="text">
                            Bắt đầu lễ thành hôn
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
                            <span>19:30</span>
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
