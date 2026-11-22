import type { BrandAccent } from "./brand";

export type RealisationCategory =
  | "all"
  | "tech"
  | "corporate"
  | "education-commerce";

export interface RealisationItem {
  id: string;
  num: string;
  title: string;
  domain: string;
  url: string;
  logo: string;
  logoBg?: "light" | "dark";
  monogram: string;
  category: Exclude<RealisationCategory, "all">;
  tag: string;
  description: string;
  bullets: readonly string[];
  accent: BrandAccent;
  devisService: string;
}

export const REALISATIONS: RealisationItem[] = [
  {
    id: "digitalpro-solutions",
    num: "01",
    title: "Digitalpro Solutions",
    domain: "www.digitalpro-solutions.com",
    url: "https://www.digitalpro-solutions.com",
    logo: "/logo/logo.png",
    logoBg: "light",
    monogram: "DP",
    category: "tech",
    tag: "Agence Digitale",
    description:
      "Vitrine officielle et studio digital de l'agence : architecture web haute performance, direction artistique, devis guidé et assistant IA.",
    bullets: ["Next.js & SEO", "UI/UX Sur Mesure", "Assistant IA"],
    accent: "blue",
    devisService: "Développement de site web",
  },
  {
    id: "infinitecore",
    num: "02",
    title: "Infinite Core",
    domain: "www.infinitecore.net",
    url: "https://www.infinitecore.net",
    logo: "/realisations/infinitecore.png",
    logoBg: "dark",
    monogram: "IC",
    category: "tech",
    tag: "Plateforme SaaS",
    description:
      "Système d'exploitation modulaire pour entreprises africaines unifiant CRM, finance, RH, gestion de projets et opérations.",
    bullets: ["ERP & CRM Modulaire", "Finance & RH", "Architecture Cloud"],
    accent: "red",
    devisService: "Développement de site web",
  },
  {
    id: "necs-sarl",
    num: "03",
    title: "NECS SARL",
    domain: "www.servicesnecs.com",
    url: "https://www.servicesnecs.com",
    logo: "/realisations/necs-sarl.png",
    logoBg: "light",
    monogram: "NS",
    category: "corporate",
    tag: "Facility Services",
    description:
      "Portail corporate et digitalisation des services de nettoyage professionnel, industriel et tertiaire à Yaoundé et Douala.",
    bullets: ["Portail Corporate", "Suivi Qualité", "Demande de devis"],
    accent: "blue",
    devisService: "Développement de site web",
  },
  {
    id: "tcc-sarl",
    num: "04",
    title: "TCC SARL",
    domain: "www.tcc-sarl.com",
    url: "https://www.tcc-sarl.com",
    logo: "/realisations/tcc-sarl.png",
    logoBg: "light",
    monogram: "TC",
    category: "corporate",
    tag: "Cabinet Conseil",
    description:
      "Site institutionnel pour un cabinet pluridisciplinaire en audit, fiscalité, stratégie, gouvernance et capital humain.",
    bullets: ["Audit & Fiscalité", "Présence B2B", "Multi-pays"],
    accent: "red",
    devisService: "Développement de site web",
  },
  {
    id: "noya-industries",
    num: "05",
    title: "Noya Industries",
    domain: "www.noyaindustries.com",
    url: "https://www.noyaindustries.com",
    logo: "/realisations/noya-industries.webp",
    logoBg: "light",
    monogram: "NI",
    category: "tech",
    tag: "Tech & Innovation",
    description:
      "Plateforme corporate d'un groupe d'innovation, conseil stratégique et ingénierie logicielle basé à Abidjan.",
    bullets: ["Groupe Tech", "Portefeuille SaaS", "Identité Digitale"],
    accent: "blue",
    devisService: "Développement de site web",
  },
  {
    id: "batirem-groupe",
    num: "06",
    title: "Batirem Groupe",
    domain: "www.batiremgroupe.com",
    url: "https://www.batiremgroupe.com",
    logo: "/realisations/batirem-groupe.png",
    logoBg: "light",
    monogram: "BG",
    category: "corporate",
    tag: "BTP & Immobilier",
    description:
      "Vitrine professionnelle dédiée au BTP, à la construction, au foncier et à la fourniture de matériaux à Abidjan.",
    bullets: ["BTP & Foncier", "Projets & Offres", "Prise de contact"],
    accent: "red",
    devisService: "Développement de site web",
  },
  {
    id: "college-tranlefet",
    num: "07",
    title: "Collège Privé Tranlefet",
    domain: "www.collegetranlefet.com",
    url: "https://www.collegetranlefet.com",
    logo: "/realisations/college-tranlefet.svg",
    logoBg: "light",
    monogram: "CT",
    category: "education-commerce",
    tag: "Éducation",
    description:
      "Portail scolaire officiel à Bouaké présentant l'excellence éducative, la vie de l'établissement et le suivi des familles.",
    bullets: ["Portail Scolaire", "Espace Familles", "Inscriptions"],
    accent: "blue",
    devisService: "Développement de site web",
  },
  {
    id: "caisse-ci",
    num: "08",
    title: "Caisse CI",
    domain: "www.caisseci.com",
    url: "https://www.caisseci.com",
    logo: "/realisations/caisse-ci.png",
    logoBg: "light",
    monogram: "CC",
    category: "tech",
    tag: "SaaS POS",
    description:
      "Solution de caisse enregistreuse offline-first pour commerces en Côte d'Ivoire avec encaissement Wave, Orange Money et MTN MoMo.",
    bullets: ["Offline-First", "Mobile Money", "Gestion Boutique"],
    accent: "red",
    devisService: "Développement d'application mobile",
  },
  {
    id: "febis-ci",
    num: "09",
    title: "FEBiS CI",
    domain: "febis-ci.com",
    url: "https://febis-ci.com",
    logo: "/realisations/febis-ci.png",
    logoBg: "light",
    monogram: "FB",
    category: "education-commerce",
    tag: "Multi-Pôles & Boutique",
    description:
      "Écosystème digital unifié regroupant résidences meublées, BTP, location événementielle et boutique en ligne à Abidjan.",
    bullets: ["Multi-Activités", "E-commerce", "Réservations"],
    accent: "blue",
    devisService: "E-commerce",
  },
];

export const REALISATION_FILTERS: {
  id: RealisationCategory;
  label: string;
}[] = [
  { id: "all", label: "Toutes" },
  { id: "tech", label: "Tech & SaaS" },
  { id: "corporate", label: "Corporate & BTP" },
  { id: "education-commerce", label: "Éducation & Multi-pôles" },
];
