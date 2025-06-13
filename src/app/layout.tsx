import type { Metadata } from "next";
import "./globals.css";
import { ProductSans, BooksellerBk } from "./font";

const productSans = ProductSans;
const booksellerBk = BooksellerBk;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://pixelscout.com"),
  title: {
    default: "PixelScout",
    template: "%s | PixelScout",
  },
  description: "Level up your design skills with curated app UI screenshots!",
  keywords: ["PixelScout", "design", "UI", "UX", "screenshots"],
  creator: "PixelScout",
  publisher: "PixelScout",
  openGraph: {
    title: "PixelScout",
    description: "Level up your design skills with curated app UI screenshots!",
    type: "website",
    siteName: "PixelScout",
    locale: "en_US",
    images: [
      {
        url: "/logo-black.png",
        width: 1200,
        height: 630,
        alt: "PixelScout Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelScout",
    description:
      "Empowering brands and creatives to reach extraordinary heights",
    images: [
      {
        url: "/logo-black.png",
        width: 1200,
        height: 630,
        alt: "PixelScout Logo",
      },
    ],
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${productSans.className} ${booksellerBk}`}>
        {children}
      </body>
    </html>
  );
}
