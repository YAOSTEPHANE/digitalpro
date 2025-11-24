import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

/**
 * Métadonnées pour la page d'accueil
 * Note: Cette fonction peut être utilisée dans un layout ou directement exportée depuis page.tsx
 * si la page devient un Server Component
 */
export const homeMetadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

