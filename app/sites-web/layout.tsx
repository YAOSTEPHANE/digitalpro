import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Conception de Sites Web | digitalpro solutions",
  description: "Création de sites web modernes et performants pour votre entreprise. Design responsive, SEO optimisé, et expérience utilisateur exceptionnelle.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Conception de Sites Web | digitalpro solutions",
    description: "Création de sites web modernes et performants pour votre entreprise.",
  },
};

export default function SitesWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



