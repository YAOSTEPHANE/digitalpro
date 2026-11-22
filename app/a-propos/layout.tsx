import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "À propos de nous | digitalpro solutions",
  description:
    "Découvrez digitalpro solutions à Abidjan : notre histoire, nos valeurs, notre équipe pluridisciplinaire, notre méthode en 4 jalons et nos plateformes déployées.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "À propos de nous | digitalpro solutions",
    description:
      "Studio d'ingénierie digitale à Cocody, Abidjan : sites web haute performance, UI/UX Figma, applications SaaS/POS, e-commerce et SEO mesurable.",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
