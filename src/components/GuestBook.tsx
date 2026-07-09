'use client';

import FadeIn from './anim/FadeIn';
import { useState } from 'react';
import { getDb, isFirebaseConfigured } from '@/utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { FormEvent } from 'react';

export default function GuestBook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState('');
  const [done, setDone] = useState(false);

  const configured = isFirebaseConfigured;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError('Vui lòng nhập tên và lời chúc.');
      return;
    }

    const db = getDb();
    if (!db) {
      setError('Tính năng lời chúc chưa sẵn sàng.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'wishes'), {
        name: trimmedName,
        message: trimmedMessage,
        createdAt: serverTimestamp(),
      });
      setSentName(trimmedName);
      setDone(true);
      setName('');
      setMessage('');
    } catch {
      // Keep the user's typed input so they can retry.
      setError('Không gửi được lời chúc, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      id="card-comments"
      style={{ order: 8 }}
      className="wc-section relative overflow-hidden text-center"
    >
      {/* Faint botanical decor */}
      <img
        src="/images/bg5.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-6 w-28 select-none"
        style={{ opacity: 0.2, mixBlendMode: 'multiply' }}
      />
      <img
        src="/images/bg6.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-10 w-28 select-none"
        style={{ opacity: 0.2, mixBlendMode: 'multiply' }}
      />

      <div className="relative mx-auto w-full max-w-[440px]">
        <FadeIn direction="down" className="wc-head">
          <h2 className="wc-title">Sổ lưu bút</h2>
          <div className="wc-divider">
            <span />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.05}>
          <p className="wc-subtitle mx-auto mt-4 max-w-[38ch]">
            Đôi lời chúc phúc từ bạn là món quà quý giá cho ngày trọng đại của chúng tôi.
          </p>
        </FadeIn>

        {done ? (
          <FadeIn direction="up" className="mt-8">
            <div className="mx-auto px-4 py-6" role="status" aria-live="polite">
              <p
                className="font-[family-name:var(--wc-font-display)] text-[clamp(28px,7vw,38px)] leading-tight"
                style={{ color: 'var(--wc-primary)' }}
              >
                Cảm ơn {sentName || 'bạn'} đã gửi lời chúc!
              </p>
              <p className="wc-subtitle mt-3">
                Lời chúc của bạn đã được ghi nhận.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setError('');
                }}
                className="wc-btn wc-btn-outline mt-6"
              >
                Gửi lời chúc khác
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn direction="up" delay={0.1} className="mt-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 text-left"
              noValidate
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="gb-name"
                  className="text-sm font-semibold"
                  style={{ color: 'var(--wc-ink)' }}
                >
                  Tên của bạn
                </label>
                <input
                  id="gb-name"
                  type="text"
                  name="fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  autoComplete="name"
                  className="wc-field"
                  aria-invalid={!!error && !name.trim()}
                  aria-describedby={error ? 'gb-error' : undefined}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="gb-message"
                  className="text-sm font-semibold"
                  style={{ color: 'var(--wc-ink)' }}
                >
                  Lời chúc của bạn
                </label>
                <textarea
                  id="gb-message"
                  name="comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Viết lời chúc mừng..."
                  rows={4}
                  className="wc-field resize-y leading-relaxed"
                  aria-invalid={!!error && !message.trim()}
                  aria-describedby={error ? 'gb-error' : undefined}
                />
              </div>

              {error && (
                <p
                  id="gb-error"
                  role="alert"
                  className="rounded-[var(--wc-radius-sm)] px-4 py-2.5 text-left text-sm"
                  style={{
                    color: 'var(--wc-primary-700)',
                    background: 'var(--wc-primary-soft)',
                  }}
                >
                  {error}
                </p>
              )}

              {!configured && (
                <p className="text-left text-sm" style={{ color: 'var(--wc-muted)' }}>
                  Tính năng lời chúc sẽ sớm mở.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !configured}
                aria-disabled={isSubmitting || !configured}
                className="wc-btn w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
              </button>
            </form>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
