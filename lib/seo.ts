/**
 * Configuration SEO centralisée pour digitalpro solutions
 */

import type { Metadata } from 'next'

export const siteConfig = {
  name: "digitalpro solutions",
  title: "digitalpro solutions - Agence d'intelligence numérique",
  description: "Agence spécialisée en SEO, médias sociaux et développement web. Solutions sur mesure pour votre transformation digitale. Expertise en référencement, marketing digital et création de sites web.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://digitalprosolutions.com",
  ogImage: "/logo/logo.jpg",
  locale: "fr_FR",
  type: "website",
  twitterHandle: "@digitalprosolutions",
  author: "digitalpro solutions",
  keywords: [
    "agence digitale",
    "SEO",
    "référencement naturel",
    "médias sociaux",
    "marketing digital",
    "développement web",
    "création de site web",
    "transformation digitale",
    "Abidjan",
    "Côte d'Ivoire",
    "agence web",
    "conception UI/UX",
    "développement mobile",
    "e-commerce",
    "Shopify"
  ],
  contact: {
    email: "digitalprosolutions27@gmail.com",
    phone: "+2250748976031",
    address: "Bvd Koffi Gadaud, Cocody, Abidjan, Côte d'Ivoire"
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  }
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as "large",
      "max-snippet": -1,
    },
  } as Metadata['robots'],
  icons: {
    icon: "/logo/logo.jpg",
    shortcut: "/logo/logo.jpg",
    apple: "/logo/logo.jpg",
  },
  verification: {
    // Ajoutez vos codes de vérification ici quand vous les aurez
    // google: "votre-code-google",
    // yandex: "votre-code-yandex",
    // bing: "votre-code-bing",
  },
};

