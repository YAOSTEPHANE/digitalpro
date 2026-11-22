import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Chatbot from "@/components/chatbot";
import ConsentAnalytics from "@/components/consent-analytics";
import CookieBanner from "@/components/cookie-banner";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import ModernFooter from "@/components/modern-footer";
import { defaultMetadata } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import { Toaster } from "@/components/ui/sonner";

const displayFont = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  variable: "--font-display",
  weight: "400 800",
  style: "normal",
  display: "swap",
});

const bodyFont = localFont({
  src: "./fonts/plus-jakarta-sans.woff2",
  variable: "--font-body",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

const monoFont = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-mono-face",
  weight: "400 600",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="lux-theme font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--brand-blue)] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <StructuredData />
        <CookieConsentProvider>
          {children}
          <ModernFooter />
          <Chatbot />
          <Toaster />
          <CookieBanner />
          <ConsentAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
