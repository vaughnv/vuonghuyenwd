import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vuonghuyenw.web.app";
const title = "Hùng Vương & Thu Huyền — Thiệp cưới 09.08.2026";
const description =
  "Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Hùng Vương & Thu Huyền. Lễ Thành Hôn được tổ chức ngày 09.08.2026 — sự hiện diện và lời chúc phúc của bạn là niềm vinh hạnh cho gia đình chúng tôi.";
const shareImage = "https://www.vuongxhuyen.love/images/album/PMN08846.webp";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "thiệp cưới",
    "thiệp cưới online",
    "Hùng Vương",
    "Thu Huyền",
    "Hùng Vương Thu Huyền",
    "Lễ Thành Hôn",
    "đám cưới 09.08.2026",
    "wedding invitation",
  ],
  authors: [{ name: "Hùng Vương & Thu Huyền" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Thiệp cưới Hùng Vương & Thu Huyền",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 1800,
        height: 1200,
        alt: "Hùng Vương & Thu Huyền — Thiệp cưới 09.08.2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4e6437",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
