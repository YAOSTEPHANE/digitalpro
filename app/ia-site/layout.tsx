import { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Générateur de Site Internet par IA | digitalpro solutions",
  description: "Créez votre site internet en quelques minutes grâce à notre générateur alimenté par l'intelligence artificielle. Décrivez votre projet et recevez un code HTML/CSS/JS prêt à l'emploi.",
  keywords: [
    "générateur site web IA",
    "création site internet automatique",
    "générateur site web gratuit",
    "création site web par IA",
    "générateur HTML CSS",
    "site web automatique"
  ],
  openGraph: {
    title: "Générateur de Site Internet par IA | digitalpro solutions",
    description: "Créez votre site internet en quelques minutes grâce à notre générateur alimenté par l'intelligence artificielle.",
    url: `${siteConfig.url}/ia-site`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Générateur de Site Internet par IA | digitalpro solutions",
    description: "Créez votre site internet en quelques minutes grâce à l'IA.",
  },
  alternates: {
    canonical: `${siteConfig.url}/ia-site`,
  },
}

export default function IASiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



