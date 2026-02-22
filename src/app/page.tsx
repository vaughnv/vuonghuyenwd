import PageShell from '@/components/PageShell';
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

export default function Home() {
  return (
    <PageShell>
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
    </PageShell>
  );
}
