import { Clock, Globe, Mail } from "lucide-react";
import CookiePreferencesCard from "@/components/cookie-preferences-card";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import { COOKIE_INVENTORY, type CookieCategory } from "@/lib/cookies";

const CATEGORY_LABELS: Record<CookieCategory, string> = {
  necessary: "Essentiel",
  preferences: "Préférences",
  analytics: "Audience",
  external: "Externe",
};

export default function CookiesPage() {
  return (
    <LuxPageLayout breadcrumb="Cookies">
      <LuxSectionHeader
        indexLabel="01"
        label="Transparence & RGPD"
        title="Politique de gestion des cookies"
        description="Digitalpro Solutions applique un principe de consentement préalable : aucun outil d'audience ou contenu externe n'est activé sans votre accord explicite."
      />

      <CookiePreferencesCard />

      {/* Inventaire détaillé des traceurs et stockages */}
      <section className="lux-section-premium mb-10">
        <div className="mb-6">
          <p className="lux-label mb-1">Inventaire technique</p>
          <h2 className="lux-heading text-xl sm:text-2xl">
            Liste complète des cookies et stockages utilisés
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
            Ce tableau détaille exactement chaque traceur présent sur le site, sa catégorie et sa durée maximale de conservation.
          </p>
        </div>

        {/* Vue tableau desktop */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Type / Éditeur</th>
                <th className="px-4 py-3">Finalité</th>
                <th className="px-4 py-3">Durée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {COOKIE_INVENTORY.map((item) => (
                <tr key={item.name} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">
                    <div className="font-medium text-slate-800">{item.storageType}</div>
                    <div className="text-[11px] text-slate-500">{item.provider}</div>
                  </td>
                  <td className="px-4 py-3.5 leading-relaxed text-slate-600 max-w-sm">
                    {item.purpose}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                    {item.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vue cartes mobile */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {COOKIE_INVENTORY.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-slate-900">
                  {item.name}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700">
                  {CATEGORY_LABELS[item.category]}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">{item.purpose}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                <span>
                  {item.storageType} · {item.provider}
                </span>
                <span className="font-medium text-slate-700">{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cadre légal & paramétrage navigateur */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-xs">
          <div className="lux-icon-badge mb-4 w-fit p-2.5 text-[var(--brand-blue)]">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900">
            Durée de conservation
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Votre preuve de choix est mémorisée pendant 6 mois (180 jours) via un cookie de préférence sécurisé (`SameSite=Lax`). Passé ce délai ou lors d&apos;une évolution de nos services, votre accord est sollicité à nouveau.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-xs">
          <div className="lux-icon-badge mb-4 w-fit p-2.5 text-[var(--brand-blue)]">
            <Globe className="h-4 w-4" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900">
            Réglages de votre navigateur
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Vous pouvez également bloquer ou supprimer les cookies directement depuis les paramètres de Chrome, Firefox, Safari ou Microsoft Edge, sans compromettre la consultation des pages éditoriales.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-xs">
          <div className="lux-icon-badge mb-4 w-fit p-2.5 text-[var(--brand-red)]">
            <Mail className="h-4 w-4" />
          </div>
          <h3 className="font-display text-base font-bold text-slate-900">
            Contact & exercice des droits
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Pour toute question relative à vos données personnelles ou au retrait de votre consentement, écrivez-nous à{" "}
            <a
              href="mailto:digitalprosolutions27@gmail.com"
              className="font-medium text-[var(--brand-blue)] underline underline-offset-2 hover:text-slate-900"
            >
              digitalprosolutions27@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </LuxPageLayout>
  );
}
