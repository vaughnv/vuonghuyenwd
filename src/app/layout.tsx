import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Thiệp cưới - Viết Hiếu & Ánh Nguyệt",
  description: "Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Viết Hiếu và Ánh Nguyệt. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!",
  openGraph: {
    title: "Thiệp cưới - Viết Hiếu & Ánh Nguyệt",
    description: "Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Viết Hiếu và Ánh Nguyệt. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!",
    images: [
      {
        url: "https://hieunguyetwedding.vercel.app/images/1763782492026-main.webp",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
  },
  icons: {
    icon: "/images/favicon.png",
  }
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
