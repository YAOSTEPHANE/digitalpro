'use client'

import { useMemo, useState } from "react";
import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import ModernHero from "@/components/modern-hero";
import ModernSlider from "@/components/modern-slider";
import BlackFriday from "./black-friday";
import ServicesVideo from "@/components/services-video";
import DailyMarketingTips from "@/components/daily-marketing-tips";

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<"vitrine" | "ecommerce" | "saas">("vitrine");
  const [selectedTimeline, setSelectedTimeline] = useState<"express" | "standard" | "premium">("standard");
  const [selectedMobileScreen, setSelectedMobileScreen] = useState(0);
  const [videoUnavailable, setVideoUnavailable] = useState<Record<string, boolean>>({});

  const mobileScreens = [
    { src: "/demos/mobile-screen-1.svg", alt: "Écran mobile onboarding premium" },
    { src: "/demos/mobile-screen-2.svg", alt: "Écran mobile réservation et créneaux" },
    { src: "/demos/mobile-screen-3.svg", alt: "Écran mobile fidélité et stats" },
  ];

  const figmaEmbedUrl = "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/REPLACE_WITH_YOUR_FILE";

  const quoteEstimate = useMemo(() => 250000, []);

  const processSteps = [
    {
      title: "Audit & positionnement",
      text: "Analyse de votre marché, de vos pages actuelles et de vos leviers d'acquisition.",
    },
    {
      title: "Direction créative",
      text: "Maquettes orientées conversion avec identité visuelle cohérente et contenus utiles.",
    },
    {
      title: "Développement & performance",
      text: "Intégration rapide, animations fluides, SEO technique et optimisation mobile.",
    },
    {
      title: "Suivi & croissance",
      text: "Mesure continue, ajustements mensuels et itérations sur les éléments clés.",
    },
  ];
  const learningBlocks = [
    {
      title: "Pourquoi votre site ne convertit pas",
      text: "Nous identifions les points de friction qui bloquent vos demandes: message flou, pages lentes, CTA mal placés ou parcours trop long.",
    },
    {
      title: "Ce qui augmente vraiment les demandes",
      text: "Positionnement clair, preuve sociale, structure orientée décision, vitesse mobile et formulaires courts sont les leviers les plus efficaces.",
    },
    {
      title: "Comment piloter les résultats",
      text: "Vous suivez les bons indicateurs: trafic qualifié, taux de conversion, coût d'acquisition et qualité des leads.",
    },
  ];
  const demoApps = [
    {
      type: "Application Web",
      title: "Dashboard SaaS de pilotage commercial",
      description:
        "Vue KPI en temps réel, tunnel de vente, relances automatiques et espace équipe pour accélérer les décisions.",
      bullets: ["Vue analytics", "Gestion pipeline", "Automatisation CRM"],
      cta: "/devis",
      ctaLabel: "Je veux cette démo web",
      gradient: "from-blue-500 to-cyan-500",
      video: "/demos/web-demo.mp4",
      media: "/demos/web-demo-preview.svg",
      mediaAlt: "Aperçu d'une démo application web premium",
    },
    {
      type: "Application Mobile",
      title: "App de réservation et fidélisation client",
      description:
        "Parcours mobile premium avec onboarding, notifications ciblées, paiements et suivi de performances marketing.",
      bullets: ["Parcours UX mobile", "Push notifications", "Paiement intégré"],
      cta: "/book",
      ctaLabel: "Planifier une démo mobile",
      gradient: "from-fuchsia-500 to-violet-500",
      video: "/demos/video-demos.mp4",
      media: "/demos/mobile-demo-preview.svg",
      mediaAlt: "Aperçu d'une démo application mobile premium",
    },
  ];

  return (
    <div className="w-full md:items-center md:justify-center bg-slate-50 antialiased relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <Spotlight className="hidden md:flex md:-top-80 left-80" fill="white" />
      
      {/* Hero */}
      <ModernHero />

      <div className="p-4 mx-auto relative z-10 w-full px-2 max-w-7xl">
        {/* Réalisations */}
        <div className="w-full pt-12">
          <ModernSlider />
        </div>

        {/* Méthode */}
        <section className="mt-16 mb-12 px-2">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-red-50/40 to-blue-50/60 p-6 md:p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(71,85,105,0.12)]">
            <div className="max-w-2xl mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-700 mb-3">
                Notre approche
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight">
                Une méthode claire pour un site qui marque les esprits
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 hover:bg-slate-50 transition-colors"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white text-sm font-semibold mb-4">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section pédagogique */}
        <section className="mb-14 px-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <div className="max-w-2xl mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-indigo-700 mb-3">
                Comprendre pour mieux décider
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                Un site utile est un site qui informe, rassure et fait agir
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {learningBlocks.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Démos applications web & mobile */}
        <section className="mb-14 px-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-violet-700">
                Démos interactives
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                Découvrez des démos d&apos;applications web et mobile prêtes à personnaliser
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Chaque démo montre un niveau premium de design, fluidité et conversion.
                Vous pouvez démarrer depuis une base existante et l&apos;adapter à votre activité.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {demoApps.map((demo) => (
                <article
                  key={demo.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <div className="relative h-52 overflow-hidden">
                    {demo.video && !videoUnavailable[demo.video] ? (
                    <video
                      className="h-full w-full object-cover"
                      src={demo.video}
                      poster={demo.media}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={() =>
                        setVideoUnavailable((prev) => ({ ...prev, [demo.video as string]: true }))
                      }
                    >
                      <img
                        src={demo.media}
                        alt={demo.mediaAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </video>
                    ) : (
                      <img
                        src={demo.media}
                        alt={demo.mediaAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/15 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className={`rounded-full bg-gradient-to-r ${demo.gradient} px-3 py-1 text-[11px] font-medium text-white shadow-lg`}>
                        {demo.type}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full border border-white/35 bg-black/35 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                      Preview
                    </div>
                    <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/70 bg-emerald-500/25 px-2.5 py-1 text-[10px] font-semibold text-emerald-100 opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      LIVE DEMO
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full border border-white/35 bg-black/35 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                      Vidéo démo
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-slate-900">{demo.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{demo.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {demo.bullets.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      href={demo.cta}
                      className={`mt-5 inline-flex rounded-full bg-gradient-to-r ${demo.gradient} px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110`}
                    >
                      {demo.ctaLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Démos utilisables directement */}
        <section className="mb-14 px-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-emerald-700">
                Démos interactives en direct
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                Testez une mini app web et des expériences mobile directement sur la page
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Démo web interactive</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Mini simulateur de projet web en temps réel.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Type de projet</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "vitrine", label: "Site vitrine" },
                        { id: "ecommerce", label: "E-commerce" },
                        { id: "saas", label: "SaaS" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedPlatform(option.id as "vitrine" | "ecommerce" | "saas")}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            selectedPlatform === option.id
                              ? "border-blue-500 bg-blue-600 text-white"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Niveau d&apos;accompagnement</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "express", label: "Express" },
                        { id: "standard", label: "Standard" },
                        { id: "premium", label: "Premium+" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedTimeline(option.id as "express" | "standard" | "premium")}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            selectedTimeline === option.id
                              ? "border-violet-500 bg-violet-600 text-white"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estimation instantanée</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{quoteEstimate.toLocaleString("fr-FR")} FCFA</p>
                    <a
                      href="/devis"
                      className="mt-3 inline-flex rounded-full bg-gradient-to-r from-red-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      Lancer mon devis complet
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Démo mobile vidéo (Reel)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Format vertical optimisé social media et présentation produit.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="relative h-[340px] w-[190px] overflow-hidden rounded-[28px] border border-slate-300 bg-black shadow-xl">
                    {!videoUnavailable["/demos/video-demos.mp4"] ? (
                      <video
                        src="/demos/video-demos.mp4"
                        poster="/demos/mobile-demo-preview.svg"
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onError={() =>
                          setVideoUnavailable((prev) => ({
                            ...prev,
                            "/demos/video-demos.mp4": true,
                          }))
                        }
                      />
                    ) : (
                      <img
                        src="/demos/mobile-demo-preview.svg"
                        alt="Preview mobile format Reel"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Carrousel d&apos;écrans mobile</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Parcours UX en plusieurs étapes (onboarding, réservation, fidélisation).
                </p>
                <div className="mt-4">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <img
                      src={mobileScreens[selectedMobileScreen].src}
                      alt={mobileScreens[selectedMobileScreen].alt}
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setSelectedMobileScreen((prev) => (prev - 1 + mobileScreens.length) % mobileScreens.length)
                      }
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Précédent
                    </button>
                    <div className="flex gap-1.5">
                      {mobileScreens.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedMobileScreen(index)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            selectedMobileScreen === index ? "bg-blue-600" : "bg-slate-300"
                          }`}
                          aria-label={`Aller à l'écran ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedMobileScreen((prev) => (prev + 1) % mobileScreens.length)}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Prototype cliquable (Figma / iframe)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Intégrez votre prototype Figma pour une navigation réelle dans l&apos;interface.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <iframe
                    title="Prototype mobile Figma"
                    src={figmaEmbedUrl}
                    className="h-64 w-full"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Remplacez simplement l&apos;URL du prototype dans `figmaEmbedUrl` pour afficher votre vraie démo cliquable.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section Black Friday */}
        <BlackFriday />

        {/* Blog - Conseils Marketing Digital du Jour */}
        <DailyMarketingTips />

        {/* Section Vidéo */}
        <ServicesVideo 
          videoId="VOTRE_ID_YOUTUBE" 
          title="Découvrez nos services en vidéo"
          description="Une présentation complète de nos solutions digitales pour transformer votre entreprise"
        />

        {/* Bloc CTA final */}
        <section className="my-16 px-2">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-200/60 bg-white p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.23),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.25),transparent_38%),radial-gradient(circle_at_70%_90%,rgba(251,191,36,0.16),transparent_45%)]" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-red-700 mb-3">
                Prêt à démarrer
              </p>
              <h2 className="text-3xl md:text-5xl text-slate-900 font-semibold tracking-tight leading-tight">
                Passez d&apos;une vitrine classique à une présence digitale mémorable
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Nous construisons votre nouveau site avec une identité forte,
                des performances solides et un parcours pensé pour convertir.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/book"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold hover:brightness-110 transition"
                >
                  Planifier un rendez-vous
                </a>
                <a
                  href="/devis"
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-900 hover:bg-slate-100 transition"
                >
                  Obtenir un devis détaillé
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
