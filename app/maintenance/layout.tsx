import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Maintenance Informatique",
  description: "Services de maintenance informatique professionnels pour votre entreprise. Maintenance serveurs, réseaux, support technique, sécurité et sauvegarde. Support 24/7 disponible à Abidjan, Côte d'Ivoire.",
  keywords: [
    "maintenance informatique",
    "support technique",
    "maintenance serveurs",
    "maintenance réseau",
    "sécurité informatique",
    "support IT",
    "maintenance informatique Abidjan",
    "service informatique Côte d'Ivoire",
    "assistance technique",
    "dépannage informatique"
  ],
  openGraph: {
    title: "Maintenance Informatique | digitalpro solutions",
    description: "Services de maintenance informatique professionnels pour votre entreprise. Support 24/7 disponible.",
    url: `${siteConfig.url}/maintenance`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance Informatique | digitalpro solutions",
    description: "Services de maintenance informatique professionnels pour votre entreprise.",
  },
  alternates: {
    canonical: `${siteConfig.url}/maintenance`,
  },
}

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

