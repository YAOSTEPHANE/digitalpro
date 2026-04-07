"use client";

import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";
import ModernBrands from "@/components/modern-brands";

export default function TechnologiesPage() {
  const scrollToServices = () => {};
  const scrollToWebsiteDesign = () => {};
  const scrollToGraphicDesign = () => {};
  const scrollToShopifyStores = () => {};
  const scrollToBrands = () => {};
  const principles = [
    "Choix d'outils éprouvés et maintenables sur le long terme",
    "Priorité aux performances réelles sur mobile et desktop",
    "Architecture claire pour faciliter les évolutions futures",
    "Sécurité, sauvegarde et supervision dès la mise en ligne",
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
              Technologies
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              Une stack moderne choisie pour la vitesse, la fiabilité et la maintenance
            </h1>
            <p className="mt-4 text-slate-600 max-w-3xl">
              Nous sélectionnons les outils les plus adaptés à vos objectifs pour
              garantir une base technique solide et durable.
            </p>
          </div>
        </section>
        <section className="mb-12 px-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Nos principes techniques
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {principles.map((item) => (
                <p key={item} className="text-slate-600 text-sm rounded-xl bg-slate-50 border border-slate-200 p-4">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
        <ModernBrands />
      </div>
    </div>
  );
}



