'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';
import { albumPhotos, albumTitle, type AlbumPhoto } from '@/data/album';
import s from './Gallery.module.css';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState<AlbumPhoto[]>(albumPhotos);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null;
  const hasPhotos = visiblePhotos.length > 0;
  const PREVIEW = 6;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null || visiblePhotos.length === 0 ? null : (i - 1 + visiblePhotos.length) % visiblePhotos.length)),
    [visiblePhotos.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null || visiblePhotos.length === 0 ? null : (i + 1) % visiblePhotos.length)),
    [visiblePhotos.length],
  );

  const removeBrokenPhoto = useCallback((src: string) => {
    setVisiblePhotos((photos) => photos.filter((photo) => photo.src !== src));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    if (visiblePhotos.length === 0 || activeIndex >= visiblePhotos.length) {
      setActiveIndex(null);
    }
  }, [activeIndex, visiblePhotos.length]);

  // Esc to close; arrow keys to navigate while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, showPrev, showNext]);

  // Lock background scroll + focus the close button when the lightbox opens.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // microtask so the button is mounted before we focus it
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [isOpen]);

  return (
    <div id="card-gallery" className={s.gallerySection} style={{ order: 6 }}>
      <div className={s.galleryHead}>
        <FadeIn direction="up" delay={0.08}>
          <h2 className="wc-title">{albumTitle}</h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.16}>
          <div className="wc-divider">
            <span />
          </div>
        </FadeIn>
      </div>

      {hasPhotos ? (
        <>
          <FadeIn direction="up" delay={0.1}>
            <div
              style={{
                width: 'calc(100% + 2 * clamp(20px, 6vw, 34px))',
                marginInline: 'calc(-1 * clamp(20px, 6vw, 34px))',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                minWidth: 0,
              }}
            >
              {visiblePhotos.slice(0, PREVIEW).map((photo, i) => (
                  <button
                    key={`${photo.src}-${i}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Mở ảnh: ${photo.alt}`}
                    style={{
                      aspectRatio: '2 / 3',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 10,
                      border: '1px solid var(--wc-line-soft)',
                      padding: 0,
                      cursor: 'pointer',
                      background: 'var(--wc-surface, #fff)',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 575px) 60vw, 300px"
                      style={{ objectFit: 'cover' }}
                      onError={() => removeBrokenPhoto(photo.src)}
                    />
                  </button>
              ))}
            </div>
          </FadeIn>
          {visiblePhotos.length > PREVIEW && (
            <FadeIn direction="up" delay={0.18} className="mt-6 flex justify-center">
              <button type="button" className="wc-btn wc-btn-outline" onClick={() => setActiveIndex(0)}>
                Xem thêm ({visiblePhotos.length} ảnh)
              </button>
            </FadeIn>
          )}
        </>
      ) : (
        <FadeIn direction="up" delay={0.1}>
          <div className={s.collage} role="img" aria-label="Album ảnh đang được cặp đôi chuẩn bị">
            <div className={`${s.frame} ${s.frameTall}`}>
              <Image
                src="/images/decor-flower1.webp"
                alt=""
                width={140}
                height={140}
                className={s.frameImg}
              />
              <span className={s.frameMono}>H&nbsp;♡&nbsp;T</span>
            </div>
            <div className={`${s.frame} ${s.frameWide}`}>
              <Image
                src="/images/bg5.webp"
                alt=""
                width={160}
                height={110}
                className={s.frameImg}
              />
            </div>
            <div className={`${s.frame} ${s.frameSquare}`}>
              <Image
                src="/images/decor-flower2.webp"
                alt=""
                width={120}
                height={120}
                className={s.frameImg}
              />
            </div>
          </div>
          <p className={s.collageCaption}>
            <strong>Album đang được cặp đôi chuẩn bị</strong>
            <br />
            Những khoảnh khắc đẹp nhất sẽ sớm được chia sẻ tại đây.
          </p>
        </FadeIn>
      )}

      <AnimatePresence>
        {isOpen && activeIndex !== null && activeIndex < visiblePhotos.length && (
          <Lightbox
            photos={visiblePhotos}
            index={activeIndex}
            closeRef={closeBtnRef}
            onClose={close}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface LightboxProps {
  index: number;
  photos: AlbumPhoto[];
  closeRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, closeRef, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];
  const multiple = photos.length > 1;
  const [zoomed, setZoomed] = useState(false);
  const movedRef = useRef(false);

  // Reset zoom whenever the photo changes.
  useEffect(() => {
    setZoomed(false);
  }, [index]);

  // Preload nearby photos so navigation feels instant (kills the lag).
  useEffect(() => {
    const n = photos.length;
    [1, -1, 2, -2].forEach((d) => {
      const i = ((index + d) % n + n) % n;
      const im = new window.Image();
      im.src = photos[i].src;
    });
  }, [index, photos]);

  return (
    <motion.div
      className={s.scrim}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Ảnh ${index + 1}: ${photo.alt}`}
    >
      <motion.div
        className={s.lightboxInner}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Đóng ảnh"
        >
          ✕
        </button>

        {multiple && (
          <>
            <button type="button" className={`${s.navBtn} ${s.navPrev}`} onClick={onPrev} aria-label="Ảnh trước">
              ‹
            </button>
            <button type="button" className={`${s.navBtn} ${s.navNext}`} onClick={onNext} aria-label="Ảnh kế">
              ›
            </button>
          </>
        )}

        <figure className={s.lightboxFigure}>
          <div className={`${s.lightboxImg} ${zoomed ? s.zoomed : ''}`}>
            <AnimatePresence initial={false} mode="popLayout">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className={s.lightboxImgEl}
                draggable={false}
                drag={!zoomed && multiple ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => {
                  movedRef.current = true;
                }}
                onDragEnd={(_e, info) => {
                  if (!zoomed) {
                    if (info.offset.x < -60 || info.velocity.x < -450) onNext();
                    else if (info.offset.x > 60 || info.velocity.x > 450) onPrev();
                  }
                  window.setTimeout(() => {
                    movedRef.current = false;
                  }, 60);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (movedRef.current) {
                    movedRef.current = false;
                    return;
                  }
                  setZoomed((z) => !z);
                }}
              />
            </AnimatePresence>
          </div>
          <figcaption className={s.lightboxCaption}>
            {photo.alt}
            {multiple && <span className={s.counter}> · {index + 1}/{photos.length}</span>}
          </figcaption>
          <p className={s.zoomHint}>
            {zoomed ? 'Chạm để thu nhỏ' : 'Chạm ảnh để phóng to · vuốt để chuyển'}
          </p>
        </figure>
      </motion.div>
    </motion.div>
  );
}
