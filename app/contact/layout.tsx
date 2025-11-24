import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Contactez-nous",
  description: "Contactez digitalpro solutions pour discuter de votre projet digital. Notre équipe vous répondra dans les 24 heures. Appelez-nous au +225 07 48 97 60 31 ou envoyez-nous un email.",
  keywords: [
    "contact agence digitale",
    "contact digitalpro",
    "devis site web",
    "devis SEO",
    "contact marketing digital",
    "agence web Abidjan"
  ],
  openGraph: {
    title: "Contactez-nous | digitalpro solutions",
    description: "Contactez digitalpro solutions pour discuter de votre projet digital. Notre équipe vous répondra dans les 24 heures.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez-nous | digitalpro solutions",
    description: "Contactez digitalpro solutions pour discuter de votre projet digital.",
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

