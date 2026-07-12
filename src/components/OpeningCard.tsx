'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { couple } from '@/data/wedding';

interface OpeningCardProps {
  onOpenComplete: () => void;
  onInteract: () => void;
}

export default function OpeningCard({ onOpenComplete, onInteract }: OpeningCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [guest, setGuest] = useState('');
  const [opening, setOpening] = useState(false);
  const openedRef = useRef(false);

  const cssVars = {
    '--slide-card-max-width': '575px',
    '--slide-card-color': 'var(--wc-primary)',
    '--slide-card-stripe-color': 'var(--wc-primary-600)',
    '--slide-card-stripe-size': '3.5%',
    '--slide-seal-size': '78px',
    '--slide-seal-bg': 'var(--wc-gold)',
    '--slide-seal-fg': 'var(--wc-surface)',
    '--slide-seal-ring': 'var(--wc-gold-soft)',
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
    '--opening-names-color': 'rgba(255,255,255,0.95)',
    '--opening-name-font': "'Dancing Script'",
    '--opening-name-size': 'clamp(26px, 6.5vw, 40px)',
    '--opening-invite-bottom': 'clamp(24px, 6vh, 56px)',
    '--opening-invite-left': 'clamp(24px, 6vw, 44px)',
    '--opening-invite-color': 'rgba(255,255,255,0.92)',
    '--opening-invite-size': 'clamp(14px, 3.8vw, 18px)',
  } as CSSProperties;

function decodeGuestValue(value: string): string {
  let decoded = value;
  for (let i = 0; i < 2; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('guest') ?? params.get('to') ?? '';
    const clean = decodeGuestValue(raw).replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
    if (clean) setGuest(clean);
  }, []);

  const startOpen = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpening(true);
    onInteract();
    window.dispatchEvent(new Event('play-music'));
    window.setTimeout(() => {
      setIsVisible(false);
      onOpenComplete();
    }, 4800);
  };

  if (!isVisible) return null;

  return (
    <div
      id="card-opening-sides"
      className={`default ${opening ? '_animating' : ''}`}
      style={cssVars}
      onClick={startOpen}
      role="button"
      aria-label="Chạm để mở thiệp"
    >
      <div className="card-side right" />

      <div className="card-side left">
        <div className="wedding-save-the-date animate__animated animate__fadeInDownSlow">
          <span>S</span>ave our date
        </div>
        <div className="opening-names">
          <div className="name">{couple.groom.name}</div>
          <div className="and">&amp;</div>
          <div className="name">{couple.bride.name}</div>
        </div>
        <div className="seal-icon" aria-hidden="true">
          <img src="/images/side-card-icon.webp" alt="" />
        </div>
        <div className="opening-invite">{guest ? `Kính mời: ${guest}` : 'Trân trọng kính mời!'}</div>
      </div>

      {!opening && <div className="opening-tap-hint">Chạm để mở thiệp</div>}
    </div>
  );
}
