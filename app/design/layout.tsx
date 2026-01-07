import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Design Graphique | digitalpro solutions",
  description: "Création de visuels époustouflants pour votre marque. Logos, identité visuelle, publications réseaux sociaux et design sur mesure.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Design Graphique | digitalpro solutions",
    description: "Création de visuels époustouflants pour votre marque.",
  },
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


