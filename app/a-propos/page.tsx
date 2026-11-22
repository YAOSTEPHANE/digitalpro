import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock3,
  Compass,
  Cpu,
  Gauge,
  Globe,
  Layers,
  Mail,
  MapPin,
  Palette,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import Image3D from "@/components/ui/image-3d";
import RealisationLogo from "@/components/realisation-logo";
import { REALISATIONS } from "@/lib/realisations";
import { siteConfig } from "@/lib/seo";
import type { BrandAccent } from "@/lib/brand";

const HERO_KPIS = [
  { value: "350+", label: "Lancements accompagnés", icon: Sparkles, accent: "blue" as BrandAccent },
  { value: "9", label: "Plateformes clients en vitrine", icon: Globe, accent: "red" as BrandAccent },
  { value: "48h", label: "Délai moyen de démarrage", icon: Clock3, accent: "blue" as BrandAccent },
  { value: "99/100", label: "Standard de performance", icon: Gauge, accent: "red" as BrandAccent },
];

const CLIENT_COMMITMENTS = [
  {
    title: "Devis transparent & périmètre clair",
    text: "Chaque mission démarre avec un chiffrage détaillé, des jalons précis et aucun frais caché.",
  },
  {
    title: "Propriété totale de vos livrables",
    text: "Code source, nom de domaine, maquettes Figma et accès cloud vous appartiennent intégralement.",
  },
  {
    title: "Suivi durable & réactivité locale",
    text: "Un interlocuteur dédié basé à Abidjan avec maintien technique, sauvegardes et évolutions continues.",
  },
];

const CORE_VALUES = [
  {
    num: "01",
    title: "Exigence d'ingénierie",
    description:
      "Architectures Next.js rapides, code typé maintenable, sécurité applicative et score Lighthouse proche de 99/100 dès le lancement.",
    tag: "Qualité technique",
    icon: Cpu,
    accent: "blue" as BrandAccent,
  },
  {
    num: "02",
    title: "Direction artistique sur mesure",
    description:
      "Aucun template générique : chaque interface et identité visuelle est dessinée pour refléter le positionnement exact de votre marque.",
    tag: "Identité unique",
    icon: Palette,
    accent: "red" as BrandAccent,
  },
  {
    num: "03",
    title: "Culture résultat & ROI",
    description:
      "Chaque page, parcours mobile et campagne SEO/Ads est conçu pour transformer vos visiteurs en appels, devis et ventes concrètes.",
    tag: "Conversion mesurable",
    icon: TrendingUp,
    accent: "blue" as BrandAccent,
  },
  {
    num: "04",
    title: "Proximité & réactivité",
    description:
      "Une expertise ancrée à Cocody, Abidjan, qui maîtrise les réalités locales (mobile-first, Wave, Orange Money, MTN MoMo, offline-first).",
    tag: "Accompagnement humain",
    icon: Award,
    accent: "red" as BrandAccent,
  },
];

const STUDIO_POLES = [
  {
    title: "Ingénierie Web & Full-Stack",
    role: "Vitrines, portails B2B & SaaS",
    image: "/images/studio/web-architecture.webp",
    icon: Globe,
    accent: "blue" as BrandAccent,
    deliverables: ["Next.js, React & TypeScript", "APIs sécurisées & bases cloud", "SEO technique natif"],
  },
  {
    title: "Studio UI/UX & Identité Visuelle",
    role: "Branding, Figma & Design Systems",
    image: "/images/studio/ui-ux-studio.webp",
    icon: Layers,
    accent: "red" as BrandAccent,
    deliverables: ["Logos & chartes graphiques", "Prototypes interactifs Figma", "Composants responsives"],
  },
  {
    title: "Applications Mobile, POS & IA",
    role: "Apps métier, terrain & automatisation",
    image: "/images/studio/mobile-apps.webp",
    icon: Smartphone,
    accent: "blue" as BrandAccent,
    deliverables: ["Solutions iOS, Android & PWA", "Caisses POS offline-first", "Assistants & workflows IA"],
  },
  {
    title: "SEO, Acquisition & Analytics",
    role: "Trafic qualifié & pilotage KPI",
    image: "/images/studio/analytics-growth.webp",
    icon: Target,
    accent: "red" as BrandAccent,
    deliverables: ["Référencement Google & local", "Campagnes Meta & TikTok Ads", "Tracking GA4 & Conversions API"],
  },
];

const METHOD_MILESTONES = [
  {
    step: "01",
    title: "Audit & Stratégie",
    description: "Analyse de votre marché, cadrage UX/SEO, feuille de route et chiffrage détaillé sous 24h.",
    icon: Compass,
    accent: "blue" as BrandAccent,
  },
  {
    step: "02",
    title: "Design UI/UX",
    description: "Système visuel porcelaine/marque, maquettes Figma validées ensemble sur desktop et mobile.",
    icon: Palette,
    accent: "red" as BrandAccent,
  },
  {
    step: "03",
    title: "Développement & QA",
    description: "Intégration full-stack, paiements Wave/Orange Money/Stripe, tests de vitesse et sécurité.",
    icon: Cpu,
    accent: "blue" as BrandAccent,
  },
  {
    step: "04",
    title: "Croissance & Suivi",
    description: "Mise en ligne, indexation Google, instrumentation analytics et support réactif continu.",
    icon: TrendingUp,
    accent: "red" as BrandAccent,
  },
];

export default function AProposPage() {
  return (
    <LuxPageLayout breadcrumb="À propos">
      {/* 01 · En-tête studio À propos */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-gradient-to-br from-white via-[#f9fbff] to-[#eef3fb] p-6 sm:p-10 md:p-14 shadow-[0_24px_64px_rgba(15,23,42,0.06)] mb-16">
        <div className="lux-orb lux-orb-blue w-[340px] h-[340px] -top-28 -left-20 opacity-50" aria-hidden="true" />
        <div className="lux-orb lux-orb-red w-[260px] h-[260px] -bottom-24 -right-16 opacity-35" aria-hidden="true" />
        <div className="absolute inset-0 lux-grid-backdrop opacity-55 [mask-image:radial-gradient(ellipse_85%_65%_at_50%_40%,#000_35%,transparent_100%)] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <LuxReveal>
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 shadow-2xs backdrop-blur-md mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="lux-label !tracking-[0.18em]">
                Studio Digital · Cocody, Abidjan
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-[11px] font-medium text-slate-600">
                Côte d&apos;Ivoire &amp; International
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.06] text-slate-900 mb-5">
              Un studio d&apos;ingénierie digitale bâti pour{" "}
              <span className="lux-gradient-text">l&apos;impact durable</span>
            </h1>

            <p className="lux-lead max-w-2xl mx-auto mb-8 text-slate-700">
              Chez digitalpro solutions, nous réunissons direction artistique, architecture web
              Next.js et stratégie d&apos;acquisition pour doter les entreprises ambitieuses
              d&apos;outils rapides, fiables et rentables.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/book"
                className="lux-btn-primary gap-2 text-sm px-6 py-3 w-full sm:w-auto"
              >
                Planifier un échange gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/devis"
                className="lux-btn-ghost gap-2 text-sm px-6 py-3 w-full sm:w-auto"
              >
                Estimer mon projet
              </Link>
              <a
                href="#notre-histoire"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)] hover:text-slate-900 transition-colors"
              >
                Découvrir le studio
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </LuxReveal>
        </div>

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-10">
          {HERO_KPIS.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <LuxReveal key={kpi.label} delay={0.05 * idx}>
                <div
                  className={`lux-card-interactive bg-white/95 backdrop-blur-md p-4 sm:p-5 h-full ${
                    kpi.accent === "red" ? "lux-card-accent-red" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`lux-icon-badge !p-2 ${
                        kpi.accent === "red" ? "lux-icon-badge-red" : ""
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          kpi.accent === "red"
                            ? "text-[var(--brand-red)]"
                            : "text-[var(--brand-blue)]"
                        }`}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {kpi.value}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">{kpi.label}</p>
                </div>
              </LuxReveal>
            );
          })}
        </div>
      </section>

      {/* 02 · Notre histoire & mission */}
      <section id="notre-histoire" className="mb-16 scroll-mt-28">
        <LuxSectionHeader
          indexLabel="01"
          label="Notre Histoire & Mission"
          title="Allier standards d'ingénierie internationaux et réalités terrain"
          description="Basés à Abidjan, nous accompagnons PME, groupes, établissements et startups dans la conception de plateformes robustes pensées pour leurs utilisateurs réels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <LuxReveal className="lg:col-span-7 flex">
            <div className="lux-card-interactive p-6 sm:p-8 flex flex-col justify-between w-full">
              <div className="space-y-4">
                <span className="lux-chip">Vision Studio</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 leading-snug">
                  Transformer chaque présence digitale en levier mesurable de croissance
                </h3>
                <p className="lux-muted text-sm sm:text-base leading-relaxed">
                  Trop d&apos;entreprises disposent encore de sites lents, génériques ou impossibles
                  à convertir en clients. digitalpro solutions est né d&apos;une conviction simple :
                  offrir aux marques ivoiriennes, africaines et internationales la rigueur
                  d&apos;un studio produit complet, du design system jusqu&apos;à l&apos;acquisition.
                </p>
                <p className="lux-muted text-sm leading-relaxed">
                  Nous concevons des expériences adaptées aux usages concrets : navigation ultra
                  fluide sur réseau mobile, modes hors ligne pour la caisse POS, paiements Wave /
                  Orange Money / MTN MoMo / cartes bancaires et tableaux de bord transparents.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                {CLIENT_COMMITMENTS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--brand-blue)] shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </LuxReveal>

          <LuxReveal delay={0.1} className="lg:col-span-5 flex flex-col gap-4">
            <div className="lux-card-interactive p-4 flex-1 flex flex-col justify-between">
              <Image3D
                src="/images/studio/business-strategy.webp"
                alt="Architecture et stratégie d'entreprise digitalpro solutions"
                width={600}
                height={420}
                className="h-52 sm:h-56 w-full rounded-xl"
              />
              <div className="pt-4 px-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue)]">
                  Accompagnement stratégique
                </p>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  Cocody, Abidjan · Projets déployés en Afrique de l&apos;Ouest &amp; en Europe
                </p>
              </div>
            </div>

            <div className="lux-card-interactive lux-card-accent-red p-4 flex items-center gap-4">
              <div className="w-28 h-20 shrink-0 overflow-hidden rounded-xl">
                <Image3D
                  src="/images/studio/web-architecture.webp"
                  alt="Ingénierie Next.js et tableaux de bord sur mesure"
                  width={320}
                  height={224}
                  className="h-20 w-28"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-red)]">
                  Standard technique
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  Next.js, React, SEO technique &amp; automatisation IA
                </p>
              </div>
            </div>
          </LuxReveal>
        </div>
      </section>

      {/* 03 · Nos 4 valeurs fondatrices */}
      <section className="mb-16">
        <LuxSectionHeader
          indexLabel="02"
          label="Nos Valeurs"
          title="Quatre piliers qui guident chaque livraison"
          description="Une culture studio centrée sur la finition, la performance réelle et la relation de confiance."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <LuxReveal key={val.num} delay={idx * 0.06}>
                <article
                  className={`lux-card-interactive p-6 h-full flex flex-col ${
                    val.accent === "red" ? "lux-card-accent-red" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`lux-icon-badge ${
                        val.accent === "red" ? "lux-icon-badge-red" : ""
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          val.accent === "red"
                            ? "text-[var(--brand-red)]"
                            : "text-[var(--brand-blue)]"
                        }`}
                      />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {val.num}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="lux-muted text-sm leading-relaxed flex-grow">{val.description}</p>
                  <div
                    className={`mt-4 pt-3 border-t border-slate-100 text-xs font-semibold ${
                      val.accent === "red"
                        ? "text-[var(--brand-red)]"
                        : "text-[var(--brand-blue)]"
                    }`}
                  >
                    {val.tag}
                  </div>
                </article>
              </LuxReveal>
            );
          })}
        </div>
      </section>

      {/* 04 · Notre équipe & pôles pluridisciplinaires */}
      <section className="mb-16">
        <LuxSectionHeader
          indexLabel="03"
          label="Équipe & Pôles d'Expertise"
          title="Quatre pôles intégrés travaillant main dans la main"
          description="Designers, ingénieurs web, spécialistes mobile/IA et stratèges acquisition avancent sur un même cycle de production."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDIO_POLES.map((pole, idx) => {
            const Icon = pole.icon;
            return (
              <LuxReveal key={pole.title} delay={idx * 0.07}>
                <article
                  className={`lux-card-interactive overflow-hidden h-full flex flex-col sm:flex-row ${
                    pole.accent === "red" ? "lux-card-accent-red" : ""
                  }`}
                >
                  <div className="sm:w-48 md:w-52 shrink-0 p-3 sm:p-4 pb-0 sm:pb-4">
                    <Image3D
                      src={pole.image}
                      alt={pole.title}
                      width={420}
                      height={320}
                      className="h-44 sm:h-full w-full rounded-xl"
                    />
                  </div>
                  <div className="p-5 sm:pl-1 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div
                          className={`lux-icon-badge !p-2 ${
                            pole.accent === "red" ? "lux-icon-badge-red" : ""
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              pole.accent === "red"
                                ? "text-[var(--brand-red)]"
                                : "text-[var(--brand-blue)]"
                            }`}
                          />
                        </div>
                        <span className="lux-chip !text-[10px]">{pole.role}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                        {pole.title}
                      </h3>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {pole.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-slate-600">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              pole.accent === "red"
                                ? "bg-[var(--brand-red)]"
                                : "bg-[var(--brand-blue)]"
                            }`}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </LuxReveal>
            );
          })}
        </div>
      </section>

      {/* 05 · Méthode en 4 jalons & 9 plateformes déployées */}
      <section className="mb-16">
        <LuxSectionHeader
          indexLabel="04"
          label="Méthode & Preuves en Production"
          title="De l'idée au déploiement, avec 9 plateformes en vitrine"
          description="Notre processus en 4 étapes garantit clarté, délais respectés et qualité mesurable dès la mise en ligne."
          rightSlot={
            <Link
              href="/#nos-realisations"
              className="lux-btn-ghost !px-4 !py-2.5 text-xs gap-1.5 w-fit"
            >
              Explorer nos réalisations
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {METHOD_MILESTONES.map((m, idx) => {
            const Icon = m.icon;
            return (
              <LuxReveal key={m.step} delay={idx * 0.05}>
                <div className="lux-card-interactive p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[var(--brand-blue)]">
                      ÉTAPE {m.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        m.accent === "red" ? "text-[var(--brand-red)]" : "text-[var(--brand-blue)]"
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 mb-1.5">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                </div>
              </LuxReveal>
            );
          })}
        </div>

        <div className="lux-card-interactive p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <p className="lux-label mb-1">Écosystèmes livrés</p>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Entreprises &amp; institutions qui nous font confiance
              </h3>
            </div>
            <Link
              href="/#nos-realisations"
              className="text-xs font-semibold text-[var(--brand-blue)] hover:text-slate-900 inline-flex items-center gap-1"
            >
              Voir les 9 projets détaillés
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REALISATIONS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 hover:border-[var(--brand-blue)] hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <RealisationLogo
                    src={item.logo}
                    alt={`Logo ${item.title}`}
                    monogram={item.monogram}
                    accent={item.accent}
                    logoBg={item.logoBg}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-slate-900 truncate group-hover:text-[var(--brand-blue)] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{item.tag}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--brand-blue)] shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · Ancrage Abidjan & CTA final */}
      <LuxReveal delay={0.08}>
        <section className="lux-section-dark-cta">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300 mb-3">
                <ShieldCheck className="w-4 h-4" />
                Studio Abidjan · Côte d&apos;Ivoire &amp; International
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Prêt à lancer votre prochain projet avec notre équipe ?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
                Retrouvez-nous à Cocody, Abidjan ou collaborez à distance partout en Afrique de
                l&apos;Ouest et à l&apos;international. Réponse garantie sous 2h ouvrées.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-300" />
                  {siteConfig.contact.address}
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-300" />
                  +225 07 48 97 60 31
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-300" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link href="/book" className="lux-btn-light gap-2 text-sm">
                Réserver 30 min offertes
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/devis" className="lux-btn-dark-ghost text-sm">
                Demander un devis
              </Link>
              <Link href="/contact" className="lux-btn-dark-ghost text-sm">
                Nous écrire
              </Link>
            </div>
          </div>
        </section>
      </LuxReveal>
    </LuxPageLayout>
  );
}
