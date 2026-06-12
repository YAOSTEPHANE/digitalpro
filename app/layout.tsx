import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/chatbot";
import ModernFooter from "@/components/modern-footer";
import { defaultMetadata } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import { Toaster } from "@/components/ui/sonner";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="lux-theme font-body antialiased">
        <StructuredData />
            {children}
            <ModernFooter />
            <Chatbot />
            <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
