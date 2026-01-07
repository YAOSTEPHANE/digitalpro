import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "E-commerce & Boutiques Shopify | digitalpro solutions",
  description: "Créez votre boutique en ligne avec Shopify. Solutions e-commerce complètes, design personnalisé et optimisation des ventes.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "E-commerce & Boutiques Shopify | digitalpro solutions",
    description: "Créez votre boutique en ligne avec Shopify.",
  },
};

export default function ECommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



