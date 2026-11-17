"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";
import { Sparkles, Clock, ArrowRight, Check, Tag } from "lucide-react";
import { motion } from "framer-motion";

type OfferCategory = "all" | "web" | "growth";

const offers = [
  {
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    title: "Site Vitrine Prestige",
    category: "web" as const,
    originalPrice: "200.000 F",
    price: "100.000 F",
    discount: "-50%",
    description: "Présence corporate responsive, SEO technique de base et prise de contact optimisée.",
    deliverables: ["Design sur mesure", "Hébergement guidé", "Livraison 5 jours"],
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    title: "Application Web",
    category: "web" as const,
    originalPrice: "600.000 F",
    price: "300.000 F",
    discount: "-50%",
    description: "Plateforme interactive avec espace client, API sécurisée et tableau de bord.",
    deliverables: ["Next.js & React", "Base de données", "Monitoring inclus"],
  },
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    title: "E-commerce App",
    category: "web" as const,
    originalPrice: "3.000.000 F",
    price: "1.500.000 F",
    discount: "-50%",
    description: "Boutique complète avec paiement Mobile Money / cartes et gestion automatisée.",
    deliverables: ["Checkout optimisé", "Catalogue illimité", "Formation équipe"],
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    title: "Application Mobile",
    category: "web" as const,
    originalPrice: "1.000.000 F",
    price: "500.000 F",
    discount: "-50%",
    description: "Application iOS & Android fluide avec notifications et synchronisation temps réel.",
    deliverables: ["iOS & Android", "UI native", "Publication stores"],
  },
  {
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    title: "Publicité Réseaux Sociaux",
    category: "growth" as const,
    originalPrice: "600.000 F",
    price: "300.000 F",
    discount: "-50%",
    description: "Campagnes Meta & TikTok Ads ciblées avec créas performantes et suivi ROI.",
    deliverables: ["Ciblage avancé", "Visuels & copies", "Rapport mensuel"],
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    title: "Tracking & Analytics",
    category: "growth" as const,
    originalPrice: "600.000 F",
    price: "300.000 F",
    discount: "-50%",
    description: "Instrumentation GA4, Meta Pixel, Conversions API et tableaux de pilotage.",
    deliverables: ["Events conversion", "Dashboards clairs", "Audit attribution"],
  },
  {
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    title: "Pack Affiche & Branding",
    category: "growth" as const,
    originalPrice: "400.000 F",
    price: "200.000 F",
    discount: "-50%",
    description: "Direction visuelle de campagne, déclinaisons print et formats social media.",
    deliverables: ["Sources HD & Print", "Formats stories/feed", "Charte cohérente"],
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    title: "Maintenance & Infogérance",
    category: "growth" as const,
    originalPrice: "Contrat dédié",
    price: "Sur devis",
    discount: "Prioritaire",
    description: "Supervision 24/7, sauvegardes automatiques, correctifs et évolutions continues.",
    deliverables: ["Mises à jour sécurité", "Backups quotidiens", "SLA réactif"],
  },
];

const BlackFriday = () => {
  const [filter, setFilter] = useState<OfferCategory>("all");
  const [currentYear, setCurrentYear] = useState(2026);
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredOffers =
    filter === "all" ? offers : offers.filter((offer) => offer.category === filter);

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 brand-bg-red rounded-full px-4 py-1.5 mb-5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Édition Privilège {currentYear}
              </span>
            </div>

            <h2 className="lux-heading text-4xl sm:text-5xl md:text-6xl mb-4 leading-[1.04]">
              <span className="text-[var(--brand-red)]">Offres Exceptionnelles</span>
              <br />
              <span className="lux-gradient-text">Jusqu&apos;à 50% de Réduction</span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-3">
              Lancez votre plateforme ou accélérez votre acquisition à conditions préférentielles
              pour une durée limitée.
            </p>
          </motion.div>

          {/* Compte à rebours + filtres */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
            <div className="lux-card-interactive px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--brand-red)]" />
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--brand-red)] font-semibold">
                  Fin de l&apos;offre
                </span>
              </div>
              <div className="flex gap-2.5">
                {[
                  { label: "Jours", value: timeLeft.days },
                  { label: "Heures", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div
                      className={`rounded-xl px-3 py-2 min-w-[54px] tabular-nums ${
                        index % 2 === 0 ? "brand-bg-red" : "brand-bg-blue"
                      }`}
                    >
                      <div className="text-lg md:text-xl font-bold text-white leading-none">
                        {String(item.value).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all" as const, label: "Toutes les offres" },
                { id: "web" as const, label: "Web & Applications" },
                { id: "growth" as const, label: "Marketing & Maintenance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                    filter === tab.id
                      ? "lux-chip-active-red"
                      : "lux-chip hover:border-[rgba(81,102,153,0.45)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille des offres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="lux-card-interactive overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image3D
                      src={offer.image}
                      alt={offer.title}
                      width={400}
                      height={220}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover !rounded-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full brand-bg-red px-3 py-1 text-xs font-bold shadow-md">
                      <Tag className="w-3 h-3" />
                      {offer.discount}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-semibold text-slate-900 mb-1">
                      {offer.title}
                    </h3>

                    <div className="flex items-baseline gap-2.5 mb-3">
                      <span className="text-xl font-bold text-[var(--brand-red)] tabular-nums">
                        {offer.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        {offer.originalPrice}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    <ul className="space-y-1.5 mb-5 flex-grow">
                      {offer.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[var(--brand-blue)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/devis?offre=${encodeURIComponent(offer.title)}`}
                      className="lux-btn-accent w-full !rounded-xl !py-2.5 text-xs flex items-center justify-center gap-2 mt-auto"
                    >
                      Profiter de l&apos;offre
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <div className="lux-card-interactive p-7 md:p-10 max-w-4xl mx-auto">
              <h3 className="lux-heading text-2xl md:text-4xl mb-3">
                Besoin d&apos;un pack combiné sur mesure ?
              </h3>
              <p className="text-slate-600 mb-7 text-sm md:text-base max-w-2xl mx-auto">
                Associez développement web, identité visuelle et acquisition dans une enveloppe
                optimisée pour votre entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/devis"
                  className="lux-btn-accent flex items-center justify-center gap-2 !px-7 !py-3.5 text-sm"
                >
                  Configurer mon offre
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/book"
                  className="lux-btn-ghost flex items-center justify-center gap-2 !px-7 !py-3.5 text-sm"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlackFriday;
