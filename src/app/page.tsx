import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import WeddingInfo from '@/components/WeddingInfo';
import PhotoStrip from '@/components/PhotoStrip';
import CalendarSection from '@/components/CalendarSection';
import Gallery from '@/components/Gallery';
import GuestBook from '@/components/GuestBook';
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
      <Gallery />
      <GuestBook />
      <Rsvp />
      <Footer />
    </PageShell>
  );
}
