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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vuongxhuyen.love';
const SHARE_VERSION = '20260716-4';
const SHARE_IMAGE = `${SITE_URL}/images/album/PMN08846-facebook-v4.png`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;


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

function cleanGuest(searchParams: SearchParams): string {
  const raw = searchParams.guest ?? searchParams.to;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return '';
  return decodeGuestValue(value)
    .replace(/[\u0000-\u001f<>]/g, '')
    .replace(/\s{3,}/g, ' + ')
    .replace(/-\s+/g, ' + ')
    .replace(/-/g, ' ')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

// Per-guest share preview: versioned invite paths isolate Facebook's preview cache.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const guest = process.env.STATIC_EXPORT === '1' ? '' : cleanGuest(searchParams);
  const rawSharePath = searchParams.sharePath;
  const sharePath = Array.isArray(rawSharePath) ? rawSharePath[0] : rawSharePath;
  const pageUrl =
    sharePath?.startsWith(`/invite/${SHARE_VERSION}/`)
      ? new URL(sharePath, SITE_URL)
      : new URL('/', SITE_URL);

  const title = guest ? `Kính mời ${guest} — Thiệp cưới ${COUPLE}` : BASE_TITLE;
  const description = guest
    ? `Trân trọng kính mời ${guest} đến chung vui trong Lễ Thành Hôn của ${COUPLE}, ngày 09.08.2026. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.`
    : BASE_DESC;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale: 'vi_VN',
      images: [{ url: SHARE_IMAGE, type: 'image/png', width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
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
