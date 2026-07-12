'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/utils/firebase';

interface Wish {
  id: string;
  name: string;
  message: string;
}

const SHOW_MS = 7000;

export default function WishesToast({ showToast }: { showToast: boolean }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  // Live subscription to the public wishes feed.
  useEffect(() => {
    const db = getDb();
    if (!db) return;
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'), limit(30));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: Wish[] = [];
        snap.forEach((doc) => {
          const data = doc.data();
          const name = typeof data.name === 'string' ? data.name : '';
          const message = typeof data.message === 'string' ? data.message : '';
          if (name && message) list.push({ id: doc.id, name, message });
        });
        setWishes(list);
      },
      () => {
        /* read blocked / offline — toast simply stays hidden */
      },
    );
    return () => unsub();
  }, []);

  // Rotate to the next wish on an interval.
  useEffect(() => {
    if (wishes.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % wishes.length), SHOW_MS);
    return () => clearInterval(id);
  }, [wishes.length]);

  const current = useMemo(
    () => (wishes.length ? wishes[idx % wishes.length] : null),
    [wishes, idx],
  );

  const show = showToast && current !== null;
  const enter = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  const from = reduce ? { opacity: 0 } : { opacity: 0, y: -14 };

  return (
    <div
      aria-hidden={!show}
      style={{
        position: 'fixed',
        top: 20,
        right: 'max(16px, calc((100vw - 575px) / 2 + 16px))',
        zIndex: 50,
        maxWidth: 'min(300px, 74vw)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {show && current && (
          <motion.div
            key={current.id}
            initial={from}
            animate={enter}
            exit={from}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'relative',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              padding: '11px 14px',
              background: 'var(--wc-surface, #fff)',
              border: '1px solid var(--wc-line-soft, #e6e4dc)',
              borderRadius: 'var(--wc-radius-md, 14px)',
              boxShadow: '0 8px 24px rgba(40, 52, 30, 0.16)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: '0 0 auto',
                display: 'flex',
                marginTop: 2,
                color: 'var(--wc-primary, #4a6037)',
              }}
            >
              <Heart size={16} fill="currentColor" strokeWidth={0} />
            </span>

            <span style={{ minWidth: 0 }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--wc-font-display, serif)',
                  color: 'var(--wc-primary, #4a6037)',
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
              >
                {current.name}
              </span>
              <span
                style={{
                  display: 'block',
                  marginTop: 2,
                  fontFamily: 'var(--wc-font-serif, serif)',
                  color: 'var(--wc-ink-soft, #55603f)',
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                {current.message}
              </span>
            </span>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
