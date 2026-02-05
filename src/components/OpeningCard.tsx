'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningCardProps {
  onOpenComplete: () => void;
  onInteract: () => void;
}

export default function OpeningCard({ onOpenComplete, onInteract }: OpeningCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const cssVars = {
    '--slide-card-max-width': '575px',
    '--slide-card-color': 'var(--color-primary)',
    '--slide-card-stripe-color': '#e9e9e9',
    '--slide-card-stripe-size': '3.5%',
    '--slide-seal-size': '78px',
    '--slide-seal-bg': '#b0852b',
    '--slide-seal-fg': '#ffffff',
    '--slide-seal-ring': '#8a6a2a',
    '--slide-save-top': 'calc(10vh + 4px)',
    '--slide-save-left': 'clamp(20px, 6vw, 40px)',
    '--slide-save-size': '52px',
    '--slide-save-s-size': '120px',
    '--slide-save-pad-left': '74px',
    '--slide-save-s-offset': '20px',
    '--slide-save-color': 'rgba(255,255,255,0.95)',
    '--opening-and-font': "'Dancing Script'",
    '--opening-and-size': 'clamp(24px, 5.6vw, 36px)',
    '--opening-and-rotate': '-4deg',
    '--opening-and-margin': '2px 0',
    '--opening-names-color': 'rgba(255,255,255,0.9)',
    '--opening-name-font': "'Dancing Script'",
    '--opening-name-size': 'clamp(26px, 6.5vw, 40px)',
    '--opening-invite-bottom': 'clamp(24px, 6vh, 56px)',
    '--opening-invite-left': 'clamp(24px, 6vw, 44px)',
    '--opening-invite-color': 'rgba(255,255,255,0.88)',
    '--opening-invite-size': 'clamp(14px, 3.8vw, 18px)',
  } as React.CSSProperties;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onOpenComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onOpenComplete]);

  const handleInteract = () => {
    onInteract();
    window.dispatchEvent(new Event('play-music'));
  };

  if (!isVisible) return null;

  return (
    <div
      id="card-opening-sides"
      className="default"
      style={cssVars}
      onClick={handleInteract}
    >
      <motion.div
        className="card-side right"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: '100%', opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
      />
      
      <motion.div
        className="card-side left"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: '-110%', opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
      >
        <div className="wedding-save-the-date animate__animated animate__fadeInDownSlow">
          <span>S</span>ave our date
        </div>
        <div className="opening-names">
          <div className="name">Viết Hiếu</div>
          <div className="and">&</div>
          <div className="name">Ánh Nguyệt</div>
        </div>
        <div className="seal-icon" aria-hidden="true">
          <img src="/images/side-card-icon.webp" alt="" />
        </div>
        <div className="opening-invite">Trân trọng kính mời!</div>
      </motion.div>
    </div>
  );
}
