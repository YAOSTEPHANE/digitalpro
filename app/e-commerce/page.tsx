"use client";

import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Wallet,
} from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernShopify from "@/components/modern-shopify";

const ecommerceFeatures = [
  {
    icon: Wallet,
    title: "Paiements Locaux & Internationaux",
    text: "Intégration fluide de Wave, Orange Money, MTN MoMo, Visa, Mastercard et Stripe selon votre marché.",
  },
  {
    icon: Smartphone,
    title: "Expérience Achat Mobile-First",
    text: "Fiches produits rapides, ajout au panier en 1 tap et tunnel de commande sans friction sur smartphone.",
  },
  {
    icon: RefreshCw,
    title: "Relance & Fidélisation Automatisée",
    text: "Récupération des paniers abandonnés par email/WhatsApp, codes promo ciblés et ventes additionnelles.",
  },
  {
    icon: PackageCheck,
    title: "Gestion Stocks & Commandes",
    text: "Tableau de bord clair pour suivre vos expéditions, factures automatiques et notifications clients.",
  },
];

export default function ECommercePage() {
  return (
    <LuxPageLayout breadcrumb="E-commerce">
      <LuxSectionHeader
        indexLabel="01"
        label="E-commerce"
        title="Des boutiques performantes qui transforment le trafic en ventes"
        description="Architecture claire, paiement local & carte sans couture, et optimisation continue pour augmenter votre panier moyen."
        accent="red"
        rightSlot={
          <Link href="/devis?service=E-commerce" className="lux-btn-accent !px-5 !py-2.5 text-sm gap-2">
            Créer ma boutique
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Bandeau paiements & capacités */}
      <LuxReveal className="mb-10">
        <section className="lux-section-premium">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[rgba(124,144,201,0.16)]">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue-light)] mb-2">
                <ShoppingBag className="w-4 h-4" />
                Shopify · Next.js Commerce · WooCommerce
              </div>
              <h2 className="lux-heading text-2xl md:text-3xl">
                Pensé pour vendre en Côte d&apos;Ivoire et à l&apos;international
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Wave", "Orange Money", "MTN MoMo", "Visa / Mastercard", "Stripe"].map((pm) => (
                <span key={pm} className="lux-chip inline-flex items-center gap-1.5 text-xs">
                  <CreditCard className="w-3.5 h-3.5 text-[var(--brand-blue-light)]" />
                  {pm}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecommerceFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <article key={feat.title} className="lux-card-interactive p-5 h-full">
                  <div className="lux-icon-badge w-fit mb-3">
                    <Icon className="w-5 h-5 text-[var(--brand-blue-light)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--lux-champagne)] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm lux-muted leading-relaxed">{feat.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </LuxReveal>

      <ModernShopify />
    </LuxPageLayout>
  );
}
