"use client";

import { useEffect, useState } from "react";
import { Check, Cookie, RotateCcw, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import {
  COOKIE_CATEGORIES_INFO,
  DEFAULT_COOKIE_PREFERENCES,
  type CookieCategory,
} from "@/lib/cookies";

type DraftState = Record<Exclude<CookieCategory, "necessary">, boolean>;

function getConsentStatusLabel(consent: {
  preferences: boolean;
  analytics: boolean;
  external: boolean;
} | null): {
  label: string;
  badgeClass: string;
} {
  if (!consent) {
    return {
      label: "Aucun choix enregistré",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    };
  }
  if (consent.preferences && consent.analytics && consent.external) {
    return {
      label: "Tout accepté",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }
  if (!consent.preferences && !consent.analytics && !consent.external) {
    return {
      label: "Essentiels uniquement",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    };
  }
  return {
    label: "Personnalisé",
    badgeClass:
      "bg-[rgba(81,102,153,0.1)] text-[var(--brand-blue)] border-[rgba(81,102,153,0.25)]",
  };
}

function formatConsentDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default function CookiePreferencesCard() {
  const {
    consent,
    isReady,
    hasDecided,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  } = useCookieConsent();

  const [draft, setDraft] = useState<DraftState>({
    preferences: DEFAULT_COOKIE_PREFERENCES.preferences,
    analytics: DEFAULT_COOKIE_PREFERENCES.analytics,
    external: DEFAULT_COOKIE_PREFERENCES.external,
  });

  useEffect(() => {
    const base = consent ?? DEFAULT_COOKIE_PREFERENCES;
    setDraft({
      preferences: base.preferences,
      analytics: base.analytics,
      external: base.external,
    });
  }, [consent]);

  const status = getConsentStatusLabel(consent);
  const formattedDate = formatConsentDate(consent?.updatedAt);

  const toggleCategory = (key: keyof DraftState) => {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    savePreferences(draft);
    toast.success("Vos préférences cookies ont été mises à jour.");
  };

  const handleAcceptAll = () => {
    acceptAll();
    toast.success("Toutes les catégories de cookies ont été activées.");
  };

  const handleRejectAll = () => {
    rejectAll();
    toast.success("Seuls les cookies strictement nécessaires restent actifs.");
  };

  const handleReset = () => {
    resetConsent();
    toast.info("Votre consentement a été réinitialisé.");
  };

  const handleClearLocalStorage = () => {
    try {
      localStorage.removeItem("invoices");
      localStorage.removeItem("digitalpro_reviews");
      toast.success("Les données enregistrées localement ont été effacées.");
    } catch {
      toast.error("Impossible d'effacer le stockage local.");
    }
  };

  return (
    <section className="lux-section-premium mb-10">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="lux-icon-badge shrink-0 p-2.5 text-[var(--brand-blue)]">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <p className="lux-label mb-1">Centre de contrôle en direct</p>
            <h2 className="lux-heading text-xl sm:text-2xl">
              Gérer vos préférences de confidentialité
            </h2>
            {formattedDate ? (
              <p className="mt-1 text-xs text-slate-500">
                Dernier choix enregistré le {formattedDate}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                {isReady
                  ? "Par défaut, aucun traceur non essentiel n'est déposé sans votre accord."
                  : "Chargement de vos préférences..."}
              </p>
            )}
          </div>
        </div>

        <span
          data-testid="cookie-status-badge"
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.badgeClass}`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{status.label}</span>
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {COOKIE_CATEGORIES_INFO.map((category) => {
          const isChecked =
            category.id === "necessary" ? true : draft[category.id];
          return (
            <div
              key={category.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {category.title}
                    </h3>
                    <span
                      className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-medium ${
                        category.required
                          ? "bg-[rgba(81,102,153,0.12)] text-[var(--brand-blue)]"
                          : "bg-slate-200/80 text-slate-700"
                      }`}
                    >
                      {category.badge}
                    </span>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isChecked}
                    aria-label={category.title}
                    disabled={category.required}
                    onClick={() => {
                      if (category.id !== "necessary") {
                        toggleCategory(category.id);
                      }
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                      category.required
                        ? "cursor-not-allowed border-[var(--brand-blue)] bg-[var(--brand-blue)]/85 opacity-85"
                        : isChecked
                          ? "cursor-pointer border-[var(--brand-blue)] bg-[var(--brand-blue)]"
                          : "cursor-pointer border-slate-300 bg-slate-200 hover:bg-slate-300/80"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                        isChecked ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {category.summary}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                  {category.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200/80 pt-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={!hasDecided}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-45 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Réinitialiser mon consentement</span>
          </button>

          <button
            type="button"
            onClick={handleClearLocalStorage}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Effacer les données locales</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRejectAll}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full border border-[var(--brand-blue)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand-blue)] hover:bg-[rgba(81,102,153,0.08)] transition-colors cursor-pointer"
          >
            Enregistrer mes choix
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--brand-blue)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--brand-blue-light)] transition-colors cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Tout accepter</span>
          </button>
        </div>
      </div>
    </section>
  );
}
