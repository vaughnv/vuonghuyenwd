import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import Letter from '@/components/Letter';
import WeddingInfo from '@/components/WeddingInfo';
import Directions from '@/components/Directions';
import CalendarSection from '@/components/CalendarSection';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import GuestBook from '@/components/GuestBook';
import Footer from '@/components/Footer';

type SearchParams = { [key: string]: string | string[] | undefined };

const COUPLE = 'Hùng Vương & Thu Huyền';
const BASE_TITLE = `${COUPLE} — Thiệp cưới 09.08.2026`;
const BASE_DESC =
  'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Hùng Vương & Thu Huyền. Lễ Thành Hôn ngày 09.08.2026 — sự hiện diện và lời chúc phúc của bạn là niềm vinh hạnh cho gia đình chúng tôi.';

function cleanGuest(searchParams: SearchParams): string {
  const raw = searchParams.guest ?? searchParams.to;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return '';
  return value
    .replace(/[\u0000-\u001f<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

// Per-guest share preview: `?guest=Tên` -> "Kính mời Tên" in title/description/OG.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const guest = process.env.STATIC_EXPORT === '1' ? '' : cleanGuest(searchParams);

  const title = guest ? `Kính mời ${guest} — Thiệp cưới ${COUPLE}` : BASE_TITLE;
  const description = guest
    ? `Trân trọng kính mời ${guest} đến chung vui trong Lễ Thành Hôn của ${COUPLE}, ngày 09.08.2026. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.`
    : BASE_DESC;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'vi_VN',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Introduction />
      <WeddingInfo />
      <CalendarSection />
      <Timeline />
      <Gallery />
      <Letter />
      <GuestBook />
      <Directions />
      <Footer />
    </PageShell>
  );
}
