import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Palette,
  ShoppingBag,
  Cpu,
  Layers,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Mail,
  Home,
  Sparkles,
  Play,
  Compass,
  Users,
  Cookie,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  href: string;
  badge?: string;
  accent?: "blue" | "red";
  icon: LucideIcon;
  keywords: string[];
}

export const SERVICE_NAV_ITEMS: NavItem[] = [
  {
    id: "sites",
    label: "Sites Web",
    description: "Vitrines haute couture & plateformes SaaS",
    href: "/sites-web",
    badge: "99/100 Perf",
    accent: "blue",
    icon: Globe,
    keywords: ["site", "vitrine", "nextjs", "saas", "web", "seo", "performance"],
  },
  {
    id: "design",
    label: "Design & UI/UX",
    description: "Identité visuelle, Figma & direction artistique",
    href: "/design",
    badge: "Figma & Brand",
    accent: "red",
    icon: Palette,
    keywords: ["logo", "figma", "ui", "ux", "branding", "charte", "graphique"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Boutiques Shopify & paiements locaux/Stripe",
    href: "/e-commerce",
    badge: "Wave · Stripe",
    accent: "blue",
    icon: ShoppingBag,
    keywords: ["shopify", "boutique", "vente", "wave", "orange money", "stripe", "paiement"],
  },
  {
    id: "tech",
    label: "Technologies",
    description: "Stack Next.js, IA, performance & sécurité",
    href: "/technologies",
    badge: "Next.js · IA",
    accent: "red",
    icon: Cpu,
    keywords: ["stack", "ia", "gemini", "api", "securite", "cloud", "architecture"],
  },
];

export const MAIN_NAV_LINKS: NavItem[] = [
  {
    id: "services",
    label: "Services",
    description: "Vue d'ensemble de nos expertises digitales",
    href: "/services",
    badge: "Catalogue",
    accent: "blue",
    icon: Layers,
    keywords: ["services", "prestations", "agence", "offres", "poles"],
  },
  {
    id: "a-propos",
    label: "À propos",
    description: "Notre studio, nos valeurs et notre équipe à Abidjan",
    href: "/a-propos",
    badge: "Studio",
    accent: "blue",
    icon: Users,
    keywords: [
      "a propos",
      "apropos",
      "agence",
      "equipe",
      "histoire",
      "abidjan",
      "studio",
      "valeurs",
      "qui sommes nous",
    ],
  },
  {
    id: "devis",
    label: "Devis",
    description: "Chiffrage personnalisé en 3 étapes rapides",
    href: "/devis",
    badge: "Sous 24h",
    accent: "red",
    icon: FileText,
    keywords: ["devis", "tarif", "prix", "budget", "estimation"],
  },
  {
    id: "book",
    label: "Rendez-vous",
    description: "Session stratégique gratuite de 30 minutes",
    href: "/book",
    badge: "30 min offert",
    accent: "blue",
    icon: Calendar,
    keywords: ["rdv", "appel", "calendrier", "reserver", "consultation"],
  },
  {
    id: "facture",
    label: "Facturation",
    description: "Tarifs transparents & générateur de facture",
    href: "/facture",
    badge: "Tarifs",
    accent: "blue",
    icon: CreditCard,
    keywords: ["facture", "tarifs", "grille", "devis", "fcfa"],
  },
  {
    id: "retours",
    label: "Retours",
    description: "Avis vérifiés de nos clients & partenaires",
    href: "/retours",
    badge: "Avis 4.9/5",
    accent: "red",
    icon: MessageSquare,
    keywords: ["avis", "temoignages", "clients", "retours"],
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Réponses sur délais, paiements et suivi",
    href: "/faq",
    badge: "Aide",
    accent: "blue",
    icon: HelpCircle,
    keywords: ["faq", "questions", "delais", "support", "paiement"],
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Accueil",
    description: "Studio Digitalpro Solutions — Vue complète",
    href: "/",
    icon: Home,
    keywords: ["accueil", "home", "studio", "digitalpro"],
  },
  {
    id: "contact",
    label: "Contact direct",
    description: "Écrire à l'équipe · Abidjan & international",
    href: "/contact",
    badge: "Réponse < 2h",
    accent: "red",
    icon: Mail,
    keywords: ["contact", "email", "message", "telephone", "abidjan"],
  },
  {
    id: "cookies",
    label: "Politique cookies",
    description: "Gestion RGPD, traceurs & préférences de confidentialité",
    href: "/cookies",
    badge: "RGPD",
    accent: "blue",
    icon: Cookie,
    keywords: [
      "cookies",
      "rgpd",
      "confidentialite",
      "traceurs",
      "consentement",
      "vie privee",
    ],
  },
];

export const HOME_ANCHOR_LINKS: NavItem[] = [
  {
    id: "anchor-realisations",
    label: "Portfolio & Réalisations",
    description: "Carrousel des domaines d'intervention",
    href: "/#realisations",
    icon: Sparkles,
    keywords: ["portfolio", "realisations", "slider", "projets"],
  },
  {
    id: "anchor-methode",
    label: "Méthode en 4 jalons",
    description: "De l'audit stratégique au pilotage KPI",
    href: "/#methode",
    icon: Compass,
    keywords: ["methode", "processus", "etapes", "audit"],
  },
  {
    id: "anchor-nos-realisations",
    label: "Nos réalisations en ligne",
    description: "5 sites web et plateformes déployés en production",
    href: "/#nos-realisations",
    badge: "5 projets",
    accent: "blue",
    icon: Globe,
    keywords: [
      "realisations",
      "portfolio",
      "sites",
      "clients",
      "projets",
      "batirem",
      "tcc",
      "necs",
      "tranlefet",
    ],
  },
  {
    id: "anchor-offres",
    label: "Offres Privilège (-50%)",
    description: "Campagnes web, mobile, pub & maintenance",
    href: "/#offres",
    badge: "-50%",
    accent: "red",
    icon: Sparkles,
    keywords: ["promo", "offre", "reduction", "pack"],
  },
  {
    id: "anchor-showreel",
    label: "Showreel vidéo",
    description: "Présentation immersive de nos réalisations",
    href: "/#showreel",
    icon: Play,
    keywords: ["video", "showreel", "demo"],
  },
];

export function getSuggestedNextLinks(pathname: string): NavItem[] {
  const pool = [...SERVICE_NAV_ITEMS, ...MAIN_NAV_LINKS.slice(0, 4)];
  const priorityMap: Record<string, string[]> = {
    "/a-propos": ["services", "devis", "book"],
    "/services": ["sites", "design", "ecommerce"],
    "/sites-web": ["design", "tech", "devis"],
    "/design": ["sites", "ecommerce", "devis"],
    "/e-commerce": ["design", "tech", "devis"],
    "/technologies": ["sites", "ecommerce", "book"],
    "/faq": ["devis", "book", "services"],
    "/retours": ["devis", "book", "services"],
    "/facture": ["devis", "book", "faq"],
    "/book": ["devis", "services", "faq"],
    "/devis": ["book", "facture", "faq"],
    "/contact": ["devis", "book", "faq"],
  };

  const targetIds = priorityMap[pathname] ?? ["services", "devis", "book"];
  return targetIds
    .map((id) => pool.find((item) => item.id === id))
    .filter((item): item is NavItem => Boolean(item));
}
