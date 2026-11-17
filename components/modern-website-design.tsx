"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Gauge,
  Globe,
  Search,
  Smartphone,
  ShieldCheck,
  X,
} from "lucide-react";
import Image3D from "@/components/ui/image-3d";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

type WebCategory = "all" | "vitrine" | "saas" | "corporate";

interface WebProject {
  id: string;
  title: string;
  category: Exclude<WebCategory, "all">;
  categoryLabel: string;
  image: string;
  summary: string;
  lighthouse: string;
  stack: string[];
  outcomes: string[];
  liveUrl?: string;
}

const webProjects: WebProject[] = [
  {
    id: "ny-immo",
    title: "NY Immobilier — Portail Biens & Contacts",
    category: "corporate",
    categoryLabel: "Portail Corporate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=550&fit=crop",
    summary:
      "Plateforme immobilière complète avec moteur de recherche multicritères, fiches biens haute définition et tunnel de prise de contact.",
    lighthouse: "98/100",
    stack: ["Next.js", "SEO Local", "UI Sur Mesure"],
    outcomes: ["Recherche instantanée par quartier & budget", "Fiches détaillées optimisées mobile"],
    liveUrl: "https://www.nyimmobilier.com",
  },
  {
    id: "infinitecore",
    title: "Infinitecore — SaaS Point de Vente",
    category: "saas",
    categoryLabel: "Application SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=550&fit=crop",
    summary:
      "Interface de gestion commerciale et d'encaissement temps réel conçue pour la rapidité en boutique et le suivi multi-caisses.",
    lighthouse: "99/100",
    stack: ["React", "Analytics Live", "Cloud API"],
    outcomes: ["Encaissement en moins de 15 secondes", "Tableau de bord journalier automatisé"],
    liveUrl: "https://enregistreur-caisse.vercel.app",
  },
  {
    id: "atelier-prestige",
    title: "Maison Ébène — Vitrine Luxe & Architecture",
    category: "vitrine",
    categoryLabel: "Site Vitrine",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=550&fit=crop",
    summary:
      "Expérience éditoriale minimaliste avec transitions fluides, galeries immersives et prise de rendez-vous privé intégrée.",
    lighthouse: "99/100",
    stack: ["Framer Motion", "Cormorant", "Booking"],
    outcomes: ["Temps de chargement < 0.8s", "+140% de demandes qualifiées"],
  },
  {
    id: "fintech-ci",
    title: "Nexus Conseil — Portail B2B & Reporting",
    category: "corporate",
    categoryLabel: "Portail Corporate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=550&fit=crop",
    summary:
      "Portail institutionnel sécurisé intégrant espace documentaire client, simulateur d'honoraires et prise de brief en ligne.",
    lighthouse: "97/100",
    stack: ["TypeScript", "Auth Sécurisée", "PDF Export"],
    outcomes: ["Parcours de qualification automatisé", "Conformité & sécurité renforcées"],
  },
  {
    id: "saas-hr",
    title: "PulseFlow — Tableau de Bord SaaS",
    category: "saas",
    categoryLabel: "Application SaaS",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=550&fit=crop",
    summary:
      "Application web de pilotage opérationnel avec graphiques interactifs, gestion des rôles et notifications automatiques.",
    lighthouse: "99/100",
    stack: ["Next.js App Router", "Tailwind", "API REST"],
    outcomes: ["Interface ergonomique haute lisibilité", "Architecture modulaire évolutive"],
  },
  {
    id: "hospitality-ci",
    title: "Riviera Suites — Réservation Directe",
    category: "vitrine",
    categoryLabel: "Site Vitrine",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=550&fit=crop",
    summary:
      "Site vitrine haute conversion avec galerie immersive, disponibilité en direct et tunnel de réservation sans commission.",
    lighthouse: "98/100",
    stack: ["Multilingue", "SEO Google Maps", "Paiement en ligne"],
    outcomes: ["Hausse des réservations directes", "Expérience mobile ultra-rapide"],
  },
];

const ModernWebsiteDesign = () => {
  const [filter, setFilter] = useState<WebCategory>("all");
  const [selectedProject, setSelectedProject] = useState<WebProject | null>(null);

  const visibleProjects =
    filter === "all" ? webProjects : webProjects.filter((p) => p.category === filter);

  return (
    <div className="relative w-full py-6 md:py-10 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="02"
          label="Architecture Web"
          title="Des sites web conçus pour la performance et la conversion"
          description="Chaque interface combine vitesse d'exécution, SEO sémantique et parcours client limpide sur mobile comme sur desktop."
          align="center"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all" as const, label: "Tous les formats" },
            { id: "vitrine" as const, label: "Sites Vitrine" },
            { id: "corporate" as const, label: "Portails Corporate" },
            { id: "saas" as const, label: "SaaS & WebApps" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                filter === tab.id
                  ? "lux-chip-active"
                  : "lux-chip hover:border-[var(--brand-blue)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <LuxReveal key={project.id} delay={index * 0.06}>
              <article
                onClick={() => setSelectedProject(project)}
                className="lux-card-interactive overflow-hidden h-full flex flex-col cursor-pointer group"
              >
                <div className="lux-browser-chrome justify-between !py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="lux-browser-dot bg-[var(--brand-red)]" />
                    <span className="lux-browser-dot bg-[rgba(81,102,153,0.45)]" />
                    <span className="lux-browser-dot bg-slate-300" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[var(--brand-blue)]">
                    Lighthouse {project.lighthouse}
                  </span>
                </div>

                <div className="relative h-52 overflow-hidden">
                  <Image3D
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={380}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover !rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-900 shadow-xs backdrop-blur-md">
                    {project.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-semibold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {project.stack.map((tech) => (
                      <span key={tech} className="lux-chip !text-[10px] !px-2.5 !py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </LuxReveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Gauge, title: "Chargement < 1s", desc: "Core Web Vitals optimisés" },
            { icon: Search, title: "SEO Structurel", desc: "Balisage Schema & sémantique" },
            { icon: Smartphone, title: "Mobile-First", desc: "Fluidité parfaite sur smartphone" },
            { icon: ShieldCheck, title: "Sécurité & SSL", desc: "Bonnes pratiques & backups" },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="lux-card-interactive p-5">
                <div className="lux-icon-badge w-fit mb-3">
                  <Icon className="w-5 h-5 text-[var(--brand-blue)]" />
                </div>
                <h4 className="font-display text-lg font-semibold text-slate-900">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal détail projet */}
      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_28px_75px_rgba(15,23,42,0.22)]"
            >
              <div className="lux-browser-chrome justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--brand-blue)]" />
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    {selectedProject.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                  aria-label="Fermer l'aperçu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <span className="lux-chip text-[11px] mb-2 inline-block">
                    Performance {selectedProject.lighthouse}
                  </span>
                  <h3 className="lux-heading text-2xl md:text-3xl">{selectedProject.title}</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-blue)] font-semibold mb-2">
                    Points clés livrés
                  </p>
                  {selectedProject.outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-800">
                      <Check className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lux-btn-ghost !px-5 !py-2.5 text-sm gap-2"
                    >
                      Visiter en direct
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                  <Link
                    href="/devis?service=Développement+de+site+web"
                    className="lux-btn-primary !px-5 !py-2.5 text-sm gap-2"
                  >
                    Créer un site similaire
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ModernWebsiteDesign;
