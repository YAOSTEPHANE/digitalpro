import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Technologies & Marques | digitalpro solutions",
  description: "Découvrez les technologies et marques avec lesquelles nous travaillons. Expertise dans les dernières solutions digitales.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Technologies & Marques | digitalpro solutions",
    description: "Découvrez les technologies et marques avec lesquelles nous travaillons.",
  },
};

export default function TechnologiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

