import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "FAQ | digitalpro solutions",
  description: "Questions fréquemment posées sur nos services, tarification, support et processus de travail. Trouvez les réponses à vos questions.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "FAQ | digitalpro solutions",
    description: "Questions fréquemment posées sur nos services.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


