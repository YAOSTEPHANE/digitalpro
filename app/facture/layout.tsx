import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Tarifs et Facturation",
  description: "Découvrez nos tarifs pour les services de SEO, développement web, marketing digital et médias sociaux. Solutions adaptées à tous les budgets. Demandez un devis gratuit.",
  keywords: [
    "tarifs agence digitale",
    "prix SEO",
    "devis site web",
    "tarifs développement web",
    "prix marketing digital",
    "facturation agence web"
  ],
  openGraph: {
    title: "Tarifs et Facturation | digitalpro solutions",
    description: "Découvrez nos tarifs pour les services de SEO, développement web, marketing digital et médias sociaux.",
    url: `${siteConfig.url}/facture`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs et Facturation | digitalpro solutions",
    description: "Découvrez nos tarifs pour les services de SEO, développement web, marketing digital et médias sociaux.",
  },
  alternates: {
    canonical: `${siteConfig.url}/facture`,
  },
}

export default function FactureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

