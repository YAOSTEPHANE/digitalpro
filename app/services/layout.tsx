import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Nos Services | digitalpro solutions",
  description: "Découvrez tous nos services : conception de sites web, design graphique, e-commerce, SEO et marketing digital. Solutions sur mesure pour votre entreprise.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Nos Services | digitalpro solutions",
    description: "Découvrez tous nos services : conception de sites web, design graphique, e-commerce, SEO et marketing digital.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


