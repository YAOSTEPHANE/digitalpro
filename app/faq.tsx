"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MessageSquare, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LuxSectionHeader from "@/components/lux-section-header";

type FaqCategory = "all" | "methode" | "tarifs" | "technique" | "support";

const FAQ_ITEMS: {
  id: string;
  category: Exclude<FaqCategory, "all">;
  categoryLabel: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "item-1",
    category: "methode",
    categoryLabel: "Agence & Méthode",
    question: "Qu'est-ce que Digitalpro Solutions ?",
    answer:
      "Digitalpro Solutions est une agence d'ingénierie digitale basée à Cocody, Abidjan. Nous accompagnons les entreprises ambitieuses dans la création de sites web haute performance, d'applications SaaS/mobiles, de boutiques e-commerce et de stratégies SEO/acquisition.",
  },
  {
    id: "item-2",
    category: "methode",
    categoryLabel: "Délais",
    question: "Quels sont vos délais moyens de réalisation ?",
    answer:
      "Un site vitrine sur mesure est livré en 2 à 3 semaines. Une boutique e-commerce complète prend 3 à 5 semaines, et une application web ou SaaS entre 5 et 8 semaines selon le périmètre fonctionnel. Nous proposons aussi un mode Express pour les lancements urgents.",
  },
  {
    id: "item-3",
    category: "methode",
    categoryLabel: "Démarrage",
    question: "Comment démarrer un projet avec votre équipe ?",
    answer:
      "Vous pouvez demander un devis détaillé via /devis ou réserver un échange stratégique gratuit de 30 minutes via /book. Sous 24h ouvrées, nous vous présentons un cadrage clair, le budget par lots et le planning de production.",
  },
  {
    id: "item-4",
    category: "tarifs",
    categoryLabel: "Tarifs",
    question: "Comment fonctionne votre tarification ?",
    answer:
      "Nos offres démarrent à 180.000 FCFA pour un site vitrine structuré (ou à partir de 100.000 FCFA sur campagne privilège), 520.000 FCFA pour un e-commerce, et sur devis précis pour les SaaS sur mesure. Chaque devis détaille précisément les livrables sans frais cachés.",
  },
  {
    id: "item-5",
    category: "tarifs",
    categoryLabel: "Paiement",
    question: "Quelles modalités de paiement acceptez-vous ?",
    answer:
      "Le règlement s'effectue généralement par jalons (40% au lancement, 30% à la validation du design, 30% à la mise en ligne). Nous acceptons les virements bancaires, cartes Visa/Mastercard ainsi que Wave, Orange Money et MTN MoMo.",
  },
  {
    id: "item-6",
    category: "technique",
    categoryLabel: "Technique & SEO",
    question: "Mes sites seront-ils optimisés pour Google (SEO) et le mobile ?",
    answer:
      "Oui, systématiquement. Chaque projet est conçu mobile-first avec un code sémantique propre, des balises OpenGraph/Schema.org, des temps de chargement rapides (Core Web Vitals) et une indexation prête pour Google.",
  },
  {
    id: "item-7",
    category: "technique",
    categoryLabel: "E-commerce",
    question: "Pouvez-vous intégrer Wave, Orange Money et les cartes bancaires ?",
    answer:
      "Absolument. Nous intégrons les passerelles de paiement locales (Wave, Orange Money, MTN MoMo via agrégateurs sécurisés) ainsi que Stripe, Visa et Mastercard pour vous permettre d'encaisser aussi bien en Côte d'Ivoire qu'à l'international.",
  },
  {
    id: "item-8",
    category: "technique",
    categoryLabel: "Propriété",
    question: "Suis-je propriétaire de mon site et de mon nom de domaine ?",
    answer:
      "Oui à 100%. Une fois le projet réglé et livré, vous détenez l'intégralité des droits sur votre nom de domaine, vos visuels, vos contenus et votre code source / boutique.",
  },
  {
    id: "item-9",
    category: "support",
    categoryLabel: "Support",
    question: "Proposez-vous un accompagnement et une maintenance après livraison ?",
    answer:
      "Oui. Nous assurons un support réactif du lundi au vendredi (et samedi matin), incluant la formation de vos équipes à la prise en main, ainsi que des contrats de maintenance préventive, sauvegardes et évolutions mensuelles.",
  },
  {
    id: "item-10",
    category: "support",
    categoryLabel: "Refonte",
    question: "Pouvez-vous moderniser un site existant sans perdre mon référencement ?",
    answer:
      "Oui. Lors d'une refonte, nous réalisons un audit complet des URLs existantes, mettons en place des redirections 301 propres et conservons ou améliorons votre capital SEO tout en transformant l'UI/UX et la vitesse.",
  },
];

const CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "Toutes les questions" },
  { id: "methode", label: "Méthode & Délais" },
  { id: "tarifs", label: "Tarifs & Paiement" },
  { id: "technique", label: "Technique & SEO" },
  { id: "support", label: "Support & Évolution" },
];

const FAQS = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FaqCategory>("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<FaqCategory, number> = {
      all: FAQ_ITEMS.length,
      methode: 0,
      tarifs: 0,
      technique: 0,
      support: 0,
    };
    FAQ_ITEMS.forEach((item) => {
      counts[item.category] += 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = category === "all" || item.category === category;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [search, category]);

  return (
    <div className="space-y-8">
      <div className="lux-section-premium lux-section-spotlight w-full rounded-3xl">
        {!hideHeader ? (
          <LuxSectionHeader
            indexLabel="FAQ"
            label="Base de connaissances"
            title="Vous avez des questions ?"
            description="Toutes les réponses essentielles sur notre méthode, nos délais, nos tarifs et notre accompagnement."
            align="center"
            accent="red"
          />
        ) : null}

        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--brand-blue)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un sujet (ex : délais, SEO, Wave, maintenance...)"
              className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[rgba(81,102,153,0.18)] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  category === cat.id
                    ? "lux-chip-active"
                    : "lux-chip hover:border-[var(--brand-blue)]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`font-mono text-[10px] ${
                    category === cat.id ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  ({categoryCounts[cat.id]})
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 tabular-nums">
            {filteredItems.length} question{filteredItems.length > 1 ? "s" : ""} affichée
            {filteredItems.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="lux-card-interactive p-10 text-center">
              <HelpCircle className="w-10 h-10 text-[var(--brand-blue)] mx-auto mb-3 opacity-80" />
              <p className="text-slate-900 font-semibold mb-1">
                Aucune question trouvée pour &ldquo;{search}&rdquo;
              </p>
              <p className="text-sm text-slate-600 mb-5">
                Essayez un autre mot-clé ou posez directement votre question à notre équipe.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="lux-btn-ghost !px-5 !py-2 text-xs"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {filteredItems.map((item, idx) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="lux-card-interactive px-5 md:px-6 border border-slate-200/90 rounded-2xl overflow-hidden"
                >
                  <AccordionTrigger className="lux-heading !text-base md:!text-lg font-bold text-slate-900 hover:no-underline py-5">
                    <div className="flex items-center gap-3.5 pr-4">
                      <span className="font-mono text-xs text-[var(--brand-blue)] shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm md:text-base leading-relaxed pb-5 pl-8">
                    <span className="inline-block lux-chip !text-[10px] !py-0.5 mb-2.5">
                      {item.categoryLabel}
                    </span>
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>

      <div className="lux-section-dark-cta">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl border border-white/15 bg-white/10 shrink-0">
              <MessageSquare className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
                Vous avez une question spécifique sur votre projet ?
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                Notre équipe vous répond sous 24 heures ou lors d&apos;un appel découverte offert de 30 minutes.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="lux-btn-dark-ghost !px-5 !py-2.5 text-sm">
              Nous écrire
            </Link>
            <Link href="/book" className="lux-btn-light !px-5 !py-2.5 text-sm gap-2">
              Réserver un appel
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;
