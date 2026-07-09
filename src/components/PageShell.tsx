'use client';

import { useState, useEffect, ReactNode } from 'react';
import OpeningCard from './OpeningCard';
import MusicPlayer from './MusicPlayer';
import WishesToast from './WishesToast';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [isOpened, setIsOpened] = useState(false);

  useAutoScroll(isOpened, 1.2);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpened]);

  return (
    <main className="min-h-screen relative miu-order-container max-w-[575px] mx-auto overflow-hidden shadow-2xl">
      <OpeningCard
        onOpenComplete={() => setIsOpened(true)}
        onInteract={() => {}}
      />

      {children}

      <MusicPlayer showButton={isOpened} />
      <WishesToast showToast={isOpened} />
    </main>
  );
}
