import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { YandexMetrica } from "@/components/analytics/YandexMetrica";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const YM_ID = process.env.NEXT_PUBLIC_YM_ID || '';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptocash.pro';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CryptoCash - USDT to Cash Exchange in Thailand",
    template: "%s | CryptoCash",
  },
  description: "Exchange USDT to THB cash in Thailand. Best rates, fast delivery to Pattaya & Phuket. Free calculator with live exchange rates.",
  keywords: [
    "USDT exchange Thailand",
    "crypto to cash Pattaya",
    "crypto to cash Phuket",
    "USDT to THB",
    "обмен USDT Таиланд",
    "криптовалюта на наличные Паттайя",
    "обменник крипты Пхукет",
  ],
  authors: [{ name: "CryptoCash" }],
  creator: "CryptoCash",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: BASE_URL,
    siteName: "CryptoCash",
    title: "CryptoCash - USDT to Cash Exchange in Thailand",
    description: "Exchange USDT to THB cash in Thailand. Best rates, fast delivery to Pattaya & Phuket.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptoCash - USDT to THB Exchange Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoCash - USDT to Cash Exchange",
    description: "Exchange USDT to THB cash in Thailand. Best rates, fast delivery.",
    images: ["/og-image.png"],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

// JSON-LD structured data for the website
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CryptoCash",
  url: BASE_URL,
  description: "USDT to THB cash exchange calculator for Thailand",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/{city}`,
    "query-input": "required name=city",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        {GA_ID && <GoogleAnalytics measurementId={GA_ID} />}
        {YM_ID && <YandexMetrica counterId={YM_ID} />}
        {children}
      </body>
    </html>
  );
}
