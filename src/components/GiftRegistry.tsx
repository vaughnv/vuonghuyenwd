'use client';
import { useState } from 'react';
import FadeIn from './anim/FadeIn';
import { Gift, X } from 'lucide-react';

export default function GiftRegistry() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="card-banks" style={{ order: 11 }}>
        <div className="qr-button-section">
            <FadeIn direction="up">
                <button className="qr-gift-button mb-4" onClick={() => setIsOpen(true)}>
                    <Gift className="mr-2" /> Quà mừng cưới chú rể
                </button>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
                <button className="qr-gift-button" onClick={() => setIsOpen(true)}>
                    <Gift className="mr-2" /> Quà mừng cưới cô dâu
                </button>
            </FadeIn>
        </div>

        {isOpen && (
            <div className="qr-modal show" onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}>
                <div className="qr-modal-content">
                    <button className="qr-modal-close" onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                    <div className="qr-modal-header" style={{ backgroundImage: "url(/images/1763782492026-main.webp)" }}>
                        <div className="qr-modal-header-overlay"></div>
                    </div>
                    <div className="qr-modal-body">
                        <div className="qr-cards">
                            <div className="qr-card">
                                <div className="qr-card-image">
                                    <img src="https://img.vietqr.io/image/TCB-19036331006012-qr_only.png" alt="QR Chú rể" />
                                </div>
                                <div className="qr-card-name">NGUYEN VIET HIEU</div>
                                <div className="qr-card-bank">Techcombank</div>
                                <div className="qr-card-account">19036331006012</div>
                            </div>
                            <div className="qr-card">
                                <div className="qr-card-image">
                                    <img src="https://img.vietqr.io/image/TCB-19034056865015-qr_only.png" alt="QR Cô dâu" />
                                </div>
                                <div className="qr-card-name">PHUNG THI ANH NGUYET</div>
                                <div className="qr-card-bank">Techcombank</div>
                                <div className="qr-card-account">19034056865015</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
