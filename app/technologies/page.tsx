"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Database,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe,
  CreditCard,
} from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernBrands from "@/components/modern-brands";

type StackGroup = "frontend" | "backend" | "commerce" | "cloud";

const stackCategories: {
  id: StackGroup;
  label: string;
  icon: typeof Cpu;
  items: { name: string; role: string; benefit: string }[];
}[] = [
  {
    id: "frontend",
    label: "Frontend & UI",
    icon: Sparkles,
    items: [
      {
        name: "Next.js 15 & React 19",
        role: "Rendu hybride & App Router",
        benefit: "Chargement ultra-rapide et SEO optimal dès le premier octet.",
      },
      {
        name: "TypeScript Strict",
        role: "Fiabilité logicielle",
        benefit: "Zéro régression silencieuse et maintenabilité durable.",
      },
      {
        name: "Tailwind CSS & Framer Motion",
        role: "Design System & Animations",
        benefit: "Interfaces sur mesure fluides à 60 images/seconde.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: Database,
    items: [
      {
        name: "Node.js & API Routes",
        role: "Services métier & formulaires",
        benefit: "Traitement rapide des commandes, devis et automatisations.",
      },
      {
        name: "PostgreSQL / Prisma",
        role: "Données relationnelles",
        benefit: "Intégrité transactionnelle et requêtes performantes.",
      },
      {
        name: "Zod & Validation Stricte",
        role: "Sécurité des entrées",
        benefit: "Contrôle rigoureux côté client et serveur.",
      },
    ],
  },
  {
    id: "commerce",
    label: "E-commerce & Paiements",
    icon: CreditCard,
    items: [
      {
        name: "Shopify & Headless Storefront",
        role: "Catalogue & Checkout",
        benefit: "Gestion commerciale robuste couplée à un design unique.",
      },
      {
        name: "Wave · Orange Money · MTN",
        role: "Paiements mobiles locaux",
        benefit: "Encaissement adapté aux habitudes d'achat en Afrique de l'Ouest.",
      },
      {
        name: "Stripe & Cartes Internationales",
        role: "Facturation multi-devises",
        benefit: "Vendez partout dans le monde en toute conformité.",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud, IA & Sécurité",
    icon: ShieldCheck,
    items: [
      {
        name: "Google Gemini & OpenAI API",
        role: "Assistants & automatisation",
        benefit: "Conseillers clients IA et génération de contenu contextuelle.",
      },
      {
        name: "Vercel Edge & VPS SSL",
        role: "Déploiement haute disponibilité",
        benefit: "HTTPS forcé, CDN mondial et latence minimale.",
      },
      {
        name: "GA4 · Conversions API",
        role: "Mesure & Attribution",
        benefit: "Suivi précis de chaque conversion sans perte de signal.",
      },
    ],
  },
];

const principles = [
  {
    icon: Zap,
    title: "Performance mesurée",
    text: "Priorité absolue aux temps de chargement réels sur mobile 4G et desktop.",
  },
  {
    icon: Globe,
    title: "Architecture pérenne",
    text: "Code propre, modulaire et sans dette technique pour faciliter chaque évolution.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité native",
    text: "Validation stricte des formulaires, chiffrement TLS et sauvegardes régulières.",
  },
  {
    icon: Cpu,
    title: "Standards éprouvés",
    text: "Sélection d'outils leaders adoptés mondialement, jamais d'effet de mode fragile.",
  },
];

export default function TechnologiesPage() {
  const [activeGroup, setActiveGroup] = useState<StackGroup>("frontend");
  const currentGroup =
    stackCategories.find((cat) => cat.id === activeGroup) ?? stackCategories[0];

  return (
    <LuxPageLayout breadcrumb="Technologies">
      <LuxSectionHeader
        indexLabel="01"
        label="Technologies"
        title="Une stack moderne choisie pour la vitesse, la fiabilité et la maintenance"
        description="Nous assemblons des technologies éprouvées pour livrer des plateformes rapides, sécurisées et évolutives."
        rightSlot={
          <Link href="/devis" className="lux-btn-primary !px-5 !py-2.5 text-sm gap-2">
            Discuter architecture
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Stack interactive */}
      <LuxReveal className="mb-10">
        <section className="lux-section-premium">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="lux-label mb-1">Architecture technique</p>
              <h2 className="lux-heading text-2xl md:text-3xl">Explorez notre stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {stackCategories.map((cat) => {
                const Icon = cat.icon;
                const active = activeGroup === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveGroup(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "lux-chip-active"
                        : "lux-chip hover:border-[rgba(124,144,201,0.45)]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentGroup.items.map((item) => (
              <article key={item.name} className="lux-card-interactive p-5 h-full flex flex-col">
                <span className="lux-chip w-fit text-[10px] mb-3">{item.role}</span>
                <h3 className="font-display text-xl font-semibold text-[var(--lux-champagne)] mb-2">
                  {item.name}
                </h3>
                <p className="lux-muted text-sm leading-relaxed">{item.benefit}</p>
              </article>
            ))}
          </div>
        </section>
      </LuxReveal>

      {/* Principes techniques */}
      <LuxReveal className="mb-10">
        <section className="lux-section-premium">
          <h2 className="text-2xl font-semibold lux-heading mb-6">Nos principes d&apos;ingénierie</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="lux-card-interactive p-5 h-full">
                  <div className="lux-icon-badge w-fit mb-3">
                    <Icon className="w-4 h-4 text-[var(--brand-blue-light)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--lux-champagne)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="lux-muted text-xs md:text-sm leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </LuxReveal>

      <ModernBrands />
    </LuxPageLayout>
  );
}
