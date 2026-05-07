import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sagitta — Football Scoreboard Software for macOS",
    template: "%s | Sagitta",
  },
  description:
    "Professional football scoreboard software for clubs, leagues, and stadium operators. Built for macOS.",
  keywords: [
    "football scoreboard",
    "macOS scoreboard app",
    "stadium display",
    "match scoreboard",
    "football club software",
    "scoreboard software",
  ],
  authors: [{ name: "Sagitta" }],
  creator: "Sagitta",
  publisher: "Sagitta",
  metadataBase: new URL("https://sagitta.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sagitta.app",
    title: "Sagitta — Football Scoreboard Software for macOS",
    description:
      "Professional football scoreboard software for clubs, leagues, and stadium operators. Built for macOS.",
    siteName: "Sagitta",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sagitta Football Scoreboard Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagitta — Football Scoreboard Software for macOS",
    description:
      "Professional football scoreboard software for clubs, leagues, and stadium operators.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col animate-fade-in">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
