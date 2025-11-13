import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "digitalpro solutions - Agence d'intelligence numérique",
  description: "digitalpro solutions - Agence spécialisée en SEO, médias sociaux et développement web. Solutions sur mesure pour votre transformation digitale.",
  icons: {
    icon: '/logo/logo.jpg',
    shortcut: '/logo/logo.jpg',
    apple: '/logo/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
