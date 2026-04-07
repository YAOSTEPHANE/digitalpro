"use client";

import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";
import ModernServices from "@/components/modern-services";

export default function ServicesPage() {
  const scrollToServices = () => {};
  const scrollToWebsiteDesign = () => {};
  const scrollToGraphicDesign = () => {};
  const scrollToShopifyStores = () => {};
  const scrollToBrands = () => {};
  const serviceTracks = [
    {
      title: "Acquisition",
      points: "SEO, contenu et campagnes pour attirer un trafic qualifié.",
    },
    {
      title: "Expérience",
      points: "Design, ergonomie et structure de pages pour guider la lecture.",
    },
    {
      title: "Conversion",
      points: "Offres, preuves et appels à l'action pour générer plus de demandes.",
    },
    {
      title: "Suivi",
      points: "Mesure continue et itérations mensuelles basées sur les données.",
    },
  ];

  return (
    <div className="w-full md:items-center md:justify-center bg-slate-50 antialiased relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToServices={scrollToServices}
        scrollToWebsiteDesign={scrollToWebsiteDesign}
        scrollToGraphicDesign={scrollToGraphicDesign}
        scrollToShopifyStores={scrollToShopifyStores}
        scrollToBrands={scrollToBrands}
      />

      <div className="p-4 mx-auto relative z-10 w-full px-2 pt-28 max-w-7xl">
        <section className="mb-10 px-2">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-red-50/40 to-blue-50/60 p-7 md:p-10 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs uppercase tracking-[0.24em] text-blue-700 mb-3">
              Nos services
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              Des solutions digitales conçues pour accélérer votre croissance
            </h1>
            <p className="mt-4 text-slate-600 max-w-3xl">
              Chaque service est pensé pour s&apos;intégrer dans une stratégie
              globale: visibilité, expérience utilisateur et conversion.
            </p>
          </div>
        </section>

        <section className="mb-12 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{track.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{track.points}</p>
              </article>
            ))}
          </div>
        </section>
        <div id="services">
          <ModernServices />
        </div>
      </div>
    </div>
  );
}



