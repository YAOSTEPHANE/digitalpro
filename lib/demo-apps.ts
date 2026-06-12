import type { BrandAccent } from "./brand";

export type DemoApp = {
  id: string;
  type: string;
  title: string;
  description: string;
  bullets: readonly string[];
  cta: string;
  ctaLabel: string;
  accent: BrandAccent;
  liveUrl: string;
  /** false si le site cible interdit l'iframe (CSP frame-ancestors) */
  embedAllowed: boolean;
  media: string;
  mediaAlt: string;
};

export const demoApps: DemoApp[] = [
  {
    id: "ny-immobilier",
    type: "Application Web",
    title: "NY Immobilier — Plateforme immobilière",
    description:
      "Site immobilier complet : annonces, recherche avancée, fiches biens et parcours client optimisé pour générer des contacts qualifiés.",
    bullets: ["Catalogue biens", "Recherche & filtres", "Parcours contact"],
    cta: "/devis",
    ctaLabel: "Je veux un site comme celui-ci",
    accent: "blue",
    liveUrl: process.env.NEXT_PUBLIC_DEMO_WEB_URL ?? "https://www.nyimmobilier.com",
    embedAllowed: process.env.NEXT_PUBLIC_DEMO_WEB_EMBED === "true",
    media: "/demos/web-demo-preview.svg",
    mediaAlt: "Aperçu de la plateforme NY Immobilier",
  },
  {
    id: "enregistreur-caisse",
    type: "Application SaaS",
    title: "Infinitecore — Point de vente",
    description:
      "Système de caisse en ligne : ventes, encaissement, suivi des transactions et interface pensée pour un usage quotidien en boutique.",
    bullets: ["Encaissement rapide", "Suivi des ventes", "Interface caisse"],
    cta: "/book",
    ctaLabel: "Planifier une démo POS",
    accent: "red",
    liveUrl:
      process.env.NEXT_PUBLIC_DEMO_MOBILE_URL ?? "https://enregistreur-caisse.vercel.app",
    embedAllowed: true,
    media: "/demos/mobile-demo-preview.svg",
    mediaAlt: "Aperçu du système Infinitecore point de vente",
  },
];
