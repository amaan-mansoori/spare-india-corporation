import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0071e3",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://spareindiacorporation.vercel.app"),
  title: "Spare India Corporation",
  description: "Vidisha's Best AC, Refrigerator and Washing Machine Spare Parts Shop",
  keywords: ["Spare Parts", "Vidisha", "AC Parts", "Refrigerator Parts", "Washing Machine Parts", "Spare India Corporation"],
  authors: [{ name: "Spare India Corporation" }],
  openGraph: {
    title: "Spare India Corporation | Best Spare Parts Shop in Vidisha",
    description: "Your one-stop destination for A to Z spare parts in Vidisha.",
    url: "https://spareindiacool.com",
    siteName: "Spare India Corporation",
    images: [
      {
        url: "/images/categories/ac.jpg",
        width: 1200,
        height: 630,
        alt: "Spare India Corporation Catalog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
