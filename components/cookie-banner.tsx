"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Cookie,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import {
  COOKIE_CATEGORIES_INFO,
  DEFAULT_COOKIE_PREFERENCES,
  type CookieCategory,
} from "@/lib/cookies";

type DraftState = Record<Exclude<CookieCategory, "necessary">, boolean>;

export default function CookieBanner() {
  const {
    consent,
    showBanner,
    isModalOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<DraftState>({
    preferences: false,
    analytics: false,
    external: false,
  });

  useEffect(() => {
    if (!isModalOpen) return;
    const base = consent ?? DEFAULT_COOKIE_PREFERENCES;
    setDraft({
      preferences: base.preferences,
      analytics: base.analytics,
      external: base.external,
    });
  }, [isModalOpen, consent]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closePreferences]);

  const handleAcceptAll = () => {
    acceptAll();
    toast.success("Tous les cookies ont été acceptés.");
  };

  const handleRejectAll = () => {
    rejectAll();
    toast.success("Seuls les cookies essentiels sont conservés.");
  };

  const handleSaveDraft = () => {
    savePreferences(draft);
    toast.success("Vos préférences cookies ont été enregistrées.");
  };

  const toggleDraftCategory = (key: keyof DraftState) => {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Bandeau de consentement non intrusif */}
      <AnimatePresence>
        {showBanner ? (
          <motion.div
            role="region"
            aria-label="Gestion des cookies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-3 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-5 z-[65] sm:w-[min(calc(100vw-11rem),46rem)] rounded-2xl border border-slate-200/95 bg-white/98 p-4 sm:p-5 shadow-[0_24px_64px_rgba(15,23,42,0.16)] backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="lux-icon-badge shrink-0 p-2.5 text-[var(--brand-blue)]">
                  <Cookie className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-900">
                      Respect de votre vie privée
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-600">
                      <ShieldCheck className="h-3 w-3 text-[var(--brand-blue)]" />
                      RGPD
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Digitalpro utilise des cookies essentiels pour le bon fonctionnement du site et,
                    avec votre accord, des outils de mesure d&apos;audience et cartes interactives.{" "}
                    <Link
                      href="/cookies"
                      className="font-medium text-[var(--brand-blue)] underline decoration-[rgba(81,102,153,0.4)] underline-offset-2 hover:text-slate-900"
                    >
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer sm:mr-auto"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
                  <span>Personnaliser</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Tout refuser
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--brand-blue)] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[var(--brand-blue-light)] transition-colors cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Tout accepter</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Modale de personnalisation granulaire */}
      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-slate-900/45 p-3 sm:p-4 backdrop-blur-sm"
            onClick={closePreferences}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_75px_rgba(15,23,42,0.22)]"
            >
              {/* En-tête */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 bg-slate-50/75 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-start gap-3">
                  <div className="lux-icon-badge shrink-0 p-2.5 text-[var(--brand-blue)]">
                    <Cookie className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="lux-label mb-0.5">Préférences de confidentialité</p>
                    <h2
                      id="cookie-modal-title"
                      className="lux-heading text-xl sm:text-2xl"
                    >
                      Paramétrer vos cookies
                    </h2>
                    <p className="mt-1 text-xs text-slate-600">
                      Choisissez librement les catégories activées. Vos choix sont conservés 6 mois.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePreferences}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Fermer les préférences cookies"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Catégories */}
              <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 space-y-3">
                {COOKIE_CATEGORIES_INFO.map((category) => {
                  const isChecked =
                    category.id === "necessary" ? true : draft[category.id];
                  return (
                    <div
                      key={category.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/65 p-4 transition-colors hover:border-slate-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-slate-900">
                              {category.title}
                            </h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-medium ${
                                category.required
                                  ? "bg-[rgba(81,102,153,0.12)] text-[var(--brand-blue)]"
                                  : "bg-slate-200/75 text-slate-700"
                              }`}
                            >
                              {category.badge}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600">
                            {category.summary}
                          </p>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                            {category.details}
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={isChecked}
                          aria-label={category.title}
                          disabled={category.required}
                          onClick={() => {
                            if (category.id !== "necessary") {
                              toggleDraftCategory(category.id);
                            }
                          }}
                          className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
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
                    </div>
                  );
                })}
              </div>

              {/* Pied de modale */}
              <div className="border-t border-slate-200/80 bg-white px-5 py-4 sm:px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/cookies"
                  onClick={closePreferences}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--brand-blue)] hover:text-slate-900 transition-colors"
                >
                  <span>Politique complète des cookies</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Tout refuser
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--brand-blue)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand-blue)] hover:bg-[rgba(81,102,153,0.08)] transition-colors cursor-pointer"
                  >
                    Enregistrer mes choix
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--brand-blue-light)] transition-colors cursor-pointer"
                  >
                    Tout accepter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
