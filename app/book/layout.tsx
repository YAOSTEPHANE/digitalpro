import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Réserver un rendez-vous",
  description: "Réservez une consultation gratuite de 30 minutes avec digitalpro solutions. Discutons de votre projet digital et découvrons comment nous pouvons vous aider à développer votre entreprise.",
  keywords: [
    "rendez-vous agence digitale",
    "consultation gratuite",
    "calendly digitalpro",
    "réserver consultation",
    "meeting agence web"
  ],
  openGraph: {
    title: "Réserver un rendez-vous | digitalpro solutions",
    description: "Réservez une consultation gratuite de 30 minutes avec digitalpro solutions. Discutons de votre projet digital.",
    url: `${siteConfig.url}/book`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réserver un rendez-vous | digitalpro solutions",
    description: "Réservez une consultation gratuite de 30 minutes avec digitalpro solutions.",
  },
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

