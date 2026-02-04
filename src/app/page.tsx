'use client';
import { useState, useEffect } from 'react';
import OpeningCard from '@/components/OpeningCard';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import WeddingInfo from '@/components/WeddingInfo';
import PhotoStrip from '@/components/PhotoStrip';
import CalendarSection from '@/components/CalendarSection';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import GuestBook from '@/components/GuestBook';
import GiftRegistry from '@/components/GiftRegistry';
import Rsvp from '@/components/Rsvp';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import { useAutoScroll } from '@/hooks/useAutoScroll';

export default function Home() {
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
    <main className="min-h-screen relative miu-order-container max-w-[575px] mx-auto bg-white overflow-hidden shadow-2xl">
      <OpeningCard 
        onOpenComplete={() => setIsOpened(true)} 
        onInteract={() => {}}
      />
      
      <Hero />
      <Introduction />
      <WeddingInfo />
      <PhotoStrip />
      <CalendarSection />
      <Timeline />
      <Gallery />
      <GuestBook />
      <GiftRegistry />
      <Rsvp />
      <Footer />
      
      <MusicPlayer />
      
      <div className="miu-branding" style={{ order: 100 }}>
          <div className="miu-branding__title">Cảm ơn bạn đã dành thời gian xem thiệp cưới của chúng tôi ❤️</div>
      </div>

      <div className="snowflakes" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="snowflake">❅</div>
          ))}
      </div>
    </main>
  );
}
