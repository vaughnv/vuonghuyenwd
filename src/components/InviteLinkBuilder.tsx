'use client';

import { useState } from 'react';
import copy from 'copy-to-clipboard';
import styles from '@/app/invite/page.module.css';

type Status = { kind: 'success' | 'error'; message: string } | null;

function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, 40);
}

export default function InviteLinkBuilder() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<Status>(null);


  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();
    const clean = normalizeName(name);
    if (!clean) {
      setLink('');
      setStatus({ kind: 'error', message: 'Nhập tên người được mời trước.' });
      return;
    }
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.vuongxhuyen.love';
    const generated = `${origin}/?guest=${encodeURIComponent(clean)}&v=${Date.now()}`;
    setLink(generated);
    setStatus(null);
  };

  const handleCopy = async () => {
    if (!link) return;
    const ok = await copy(link, { format: 'text/plain' });
    setStatus(
      ok
        ? { kind: 'success', message: 'Đã sao chép link.' }
        : {
            kind: 'error',
            message: 'Không thể sao chép tự động. Hãy chọn link và sao chép thủ công.',
          },
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.title}>Tạo link mời cưới</h1>
        <p className={styles.subtitle}>
          Nhập tên người được mời, tạo link riêng rồi sao chép để gửi qua Messenger, Zalo.
        </p>

        <form className={styles.form} onSubmit={handleGenerate}>
          <label className={styles.label} htmlFor="guest-name">
            Tên người được mời
          </label>
          <input
            id="guest-name"
            className={styles.input}
            type="text"
            value={name}
            maxLength={40}
            placeholder="Ví dụ: Bạn Hương"
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={styles.primaryBtn}>
            Tạo link
          </button>
        </form>

        {link && (
          <div className={styles.result}>
            <label className={styles.label} htmlFor="generated-link">
              Link mời
            </label>
            <input
              id="generated-link"
              className={styles.input}
              type="text"
              value={link}
              readOnly
              onFocus={(event) => event.target.select()}
            />
            <div className={styles.actions}>
              <button type="button" className={styles.primaryBtn} onClick={handleCopy}>
                Sao chép link
              </button>
              <a
                className={styles.secondaryBtn}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Mở link
              </a>
            </div>
          </div>
        )}

        {status && (
          <p
            className={status.kind === 'success' ? styles.success : styles.error}
            role={status.kind === 'success' ? 'status' : 'alert'}
          >
            {status.message}
          </p>
        )}
      </div>
    </main>
  );
}
