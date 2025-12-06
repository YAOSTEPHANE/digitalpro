import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Demander un devis gratuit | digitalpro solutions",
  description: "Obtenez un devis personnalisé pour votre projet digital. Remplissez notre formulaire détaillé et recevez votre devis gratuit dans les 24 heures. Devis pour sites web, applications mobiles, SEO, marketing digital et plus.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Demander un devis gratuit | digitalpro solutions",
    description: "Obtenez un devis personnalisé pour votre projet digital. Remplissez notre formulaire détaillé et recevez votre devis gratuit dans les 24 heures.",
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "Demander un devis gratuit | digitalpro solutions",
    description: "Obtenez un devis personnalisé pour votre projet digital. Remplissez notre formulaire détaillé et recevez votre devis gratuit dans les 24 heures.",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}







