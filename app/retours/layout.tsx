import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Retours Clients | digitalpro solutions",
  description: "Partagez votre expérience avec Digitalpro Solutions. Laissez votre avis et découvrez les témoignages de nos clients satisfaits.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Retours Clients | digitalpro solutions",
    description: "Partagez votre expérience avec Digitalpro Solutions. Laissez votre avis et découvrez les témoignages de nos clients satisfaits.",
  },
};

export default function RetoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



