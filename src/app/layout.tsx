import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sonamjsherpa.com'),
  title: {
    default: "Sonam J Sherpa | Singer, Performer & Full-Stack Developer",
    template: "%s | Sonam J Sherpa",
  },
  description:
    "Sonam J Sherpa is a professional singer and full-stack developer from the Everest Region of Nepal, now based in California, USA. Explore his music, albums, and performances.",
  keywords: [
    "Sonam J Sherpa",
    "Sherpa singer",
    "Nepali singer",
    "Nepali music",
    "Sherpa music",
    "Sonaming album",
    "Khumjung",
    "Everest region",
    "Nepal musician",
    "Full-stack developer",
  ],
  authors: [{ name: "Sonam J Sherpa" }],
  creator: "Sonam J Sherpa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sonamjsherpa.com",
    siteName: "Sonam J Sherpa",
    title: "Sonam J Sherpa | Singer, Performer & Full-Stack Developer",
    description:
      "Professional singer from the Everest Region of Nepal, bringing Sherpa and Nepali music to the world.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sonam J Sherpa - Singer & Performer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonam J Sherpa | Singer, Performer & Full-Stack Developer",
    description:
      "Professional singer from the Everest Region of Nepal, bringing Sherpa and Nepali music to the world.",
    images: ["/images/og-image.jpg"],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
