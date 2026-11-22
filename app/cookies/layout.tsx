import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Politique des cookies | digitalpro solutions",
  description:
    "Découvrez quels cookies et stockages locaux sont utilisés par digitalpro solutions et gérez librement vos préférences de confidentialité.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Politique des cookies | digitalpro solutions",
    description:
      "Transparence sur nos traceurs, durées de conservation et paramétrage RGPD de vos préférences cookies.",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
