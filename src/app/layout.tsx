import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Thiệp cưới - Hùng Vương & Thu Huyền",
  description: "Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Hùng Vương và Thu Huyền. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!",
  openGraph: {
    title: "Thiệp cưới - Hùng Vương & Thu Huyền",
    description: "Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Hùng Vương và Thu Huyền. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!",
    images: [],
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
