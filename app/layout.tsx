import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import "./globals.css";
import Chatbot from "@/components/chatbot";
import ModernFooter from "@/components/modern-footer";
import { defaultMetadata } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
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
