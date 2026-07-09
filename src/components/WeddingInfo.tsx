'use client';

import { motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';

export default function WeddingInfo() {
  return (
    <div id="card-info" style={{ order: 3 }}>
        <div className="inner">
            <div className="parents">
                <FadeIn direction="left" className="parent">
                    <div className="label">Nhà trai</div>
                    <div className="names">
                        <div className="name bochure">Ông: Nguyễn Văn Lĩnh</div>
                        <div className="name mechure">Bà: Trần Thị Thương</div>
                        <div className="name chure">Chú rể: Hùng Vương</div>
                    </div>
                    <div className="location">Số 601 đường 512B, Thôn Thái Tượng, Xã Tượng Lĩnh, Tỉnh Thanh Hoá</div>
                </FadeIn>
                <FadeIn direction="right" className="parent">
                    <div className="label">Nhà gái</div>
                    <div className="names">
                        <div className="name bocodau">Ông: Nguyễn Văn Tấn</div>
                        <div className="name mecodau">Bà: Nguyễn Thị Nga</div>
                        <div className="name codau">Cô dâu: Thu Huyền</div>
                    </div>
                    <div className="location">Số 463 đường 512B, Thôn Cát Vinh, Xã Tượng Lĩnh, Tỉnh Thanh Hoá</div>
                </FadeIn>
            </div>

            <FadeIn direction="up" className="signature">
                <div className="signature-inner">
                    <img src="/images/signature-bg.webp" alt="" />
                    <div className="character groom">V</div>
                    <div className="character bride">H</div>
                </div>
            </FadeIn>

            <FadeIn direction="up" className="welcome-text">
                Trân trọng kính mời Quý Khách tới Lễ Thành Hôn <br/>chung vui cùng chúng tôi
            </FadeIn>
            
            <div className="vertical-line"></div>
            
            <div className="groom-bride-names">
                <FadeIn direction="left" className="name groom">
                    Hùng Vương
                </FadeIn>
                <FadeIn direction="up" className="and">&</FadeIn>
                <FadeIn direction="right" className="name bride">
                    Thu Huyền
                </FadeIn>
            </div>

            <div className="dual-events-container">
                <FadeIn direction="up" className="event-block" id="event1">
                    <div className="wedding-side-title">Lễ Vu Quy</div>
                    <div className="date-and-time">
                        <div className="time">07 giờ 15</div>
                        <div className="vertical-line"></div>
                        <motion.div 
                            className="date"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div>07</div>
                            <div>08</div>
                            <div>26</div>
                        </motion.div>
                        <div className="vertical-line"></div>
                        <div className="dayofweek">
                            Thứ Sáu
                        </div>
                    </div>
                    <div className="lunar-date">
                        (Tức ngày 25 tháng 06 năm Bính Ngọ)
                    </div>
                    <div className="locations">
                        <div className="label">Địa điểm</div>
                        <div className="location">
                            <div className="name">Tư gia nhà gái</div>
                            <div className="address">Số 463 đường 512B, Thôn Cát Vinh, Xã Tượng Lĩnh, Tỉnh Thanh Hoá</div>
                        </div>
                    </div>
                </FadeIn>

                <div className="horizontal-line"></div>

                <FadeIn direction="up" className="event-block" id="event2">
                    <div className="wedding-side-title">Lễ Thành Hôn</div>
                    <div className="date-and-time">
                        <div className="time">07 giờ 15</div>
                        <div className="vertical-line"></div>
                        <motion.div 
                            className="date"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div>09</div>
                            <div>08</div>
                            <div>26</div>
                        </motion.div>
                        <div className="vertical-line"></div>
                        <div className="dayofweek">Chủ Nhật</div>
                    </div>
                    <div className="lunar-date">(Tức ngày 27 tháng 06 năm Bính Ngọ)</div>
                    <div className="locations">
                        <div className="label">Địa điểm</div>
                        <div className="location">
                            <div className="name">Tư gia nhà trai</div>
                            <div className="address">Số 601 đường 512B, Thôn Thái Tượng, Xã Tượng Lĩnh, Tỉnh Thanh Hoá</div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    </div>
  );
}
