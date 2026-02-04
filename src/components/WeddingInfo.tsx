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
                        <div className="name bochure">Ông: Nguyễn Viết Huấn</div>
                        <div className="name mechure">Bà: Nguyễn Thị Mai</div>
                        <div className="name chure">Chú rể: Nguyễn Viết Hiếu</div>
                    </div>
                    <div className="location">Thôn Đoài, Xã Quảng Oai, Hà Nội</div>
                </FadeIn>
                <FadeIn direction="right" className="parent">
                    <div className="label">Nhà gái</div>
                    <div className="names">
                        <div className="name bocodau">Ông: Phùng Trọng Quế</div>
                        <div className="name mecodau">Bà: Nguyễn Thị Nhàn</div>
                        <div className="name codau">Cô dâu: Phùng Thị Ánh Nguyệt</div>
                    </div>
                    <div className="location">74 Ngõ 11 Hà Huy Tập, Phường Việt Trì, Tỉnh Phú Thọ</div>
                </FadeIn>
            </div>

            <FadeIn direction="up" className="signature">
                <div className="signature-inner">
                    <img src="/images/signature-bg.webp" alt="" />
                    <div className="character groom">H</div>
                    <div className="character bride">N</div>
                </div>
            </FadeIn>

            <FadeIn direction="up" className="welcome-text">
                Trân trọng kính mời Quý Khách tới Lễ Thành Hôn <br/>chung vui cùng chúng tôi
            </FadeIn>
            
            <div className="vertical-line"></div>
            
            <div className="groom-bride-names">
                <FadeIn direction="left" className="name groom">
                    Viết Hiếu
                </FadeIn>
                <FadeIn direction="up" className="and">&</FadeIn>
                <FadeIn direction="right" className="name bride">
                    Ánh Nguyệt
                </FadeIn>
            </div>

            <div className="dual-events-container">
                <FadeIn direction="up" className="event-block" id="event1">
                    <div className="wedding-side-title">Lễ Thành Hôn</div>
                    <div className="date-and-time">
                        <div className="time">12 giờ 30</div>
                        <div className="vertical-line"></div>
                        <motion.div 
                            className="date"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div>07</div>
                            <div>03</div>
                            <div>26</div>
                        </motion.div>
                        <div className="vertical-line"></div>
                        <div className="dayofweek">
                            Thứ Bảy
                        </div>
                    </div>
                    <div className="lunar-date">
                        (Tức ngày 19 tháng 01 năm Bính Ngọ)
                    </div>
                    <div className="locations">
                        <div className="label">Địa điểm</div>
                        <div className="location">
                            <div className="name">Tư gia nhà trai</div>
                            <div className="address">Thôn Đoài, Xã Quảng Oai, Hà Nội</div>
                        </div>
                    </div>
                </FadeIn>

                <div className="horizontal-line"></div>

                <FadeIn direction="up" className="event-block" id="event2">
                    <div className="wedding-side-title">Lễ Vu Quy</div>
                    <div className="date-and-time">
                        <div className="time">10 giờ 00</div>
                        <div className="vertical-line"></div>
                        <motion.div 
                            className="date"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div>06</div>
                            <div>03</div>
                            <div>26</div>
                        </motion.div>
                        <div className="vertical-line"></div>
                        <div className="dayofweek">Thứ Sáu</div>
                    </div>
                    <div className="lunar-date">(Tức ngày 18 tháng 01 năm Bính Ngọ)</div>
                    <div className="locations">
                        <div className="label">Địa điểm</div>
                        <div className="location">
                            <div className="name">Tư gia nhà gái</div>
                            <div className="address">74 Ngõ 11 Hà Huy Tập, Phường Việt Trì, Tỉnh Phú Thọ</div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    </div>
  );
}
