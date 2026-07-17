import type { Metadata } from 'next';
import InviteLinkBuilder from '@/components/InviteLinkBuilder';

export const metadata: Metadata = {
  title: 'Tạo link mời cưới',
  robots: { index: false, follow: false },
};

export default function InvitePage() {
  return <InviteLinkBuilder />;
}
