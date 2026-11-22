"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COOKIE_CONSENT_EVENT,
  DEFAULT_COOKIE_PREFERENCES,
  clearClientCookieConsent,
  createCookieConsent,
  readClientCookieConsent,
  writeClientCookieConsent,
  type CookieCategory,
  type CookieConsentInput,
  type CookieConsentPreferences,
} from "@/lib/cookies";

interface CookieConsentContextValue {
  consent: CookieConsentPreferences | null;
  isReady: boolean;
  hasDecided: boolean;
  showBanner: boolean;
  isModalOpen: boolean;
  hasConsent: (category: CookieCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (input: CookieConsentInput) => void;
  resetConsent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function CookieConsentProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [consent, setConsent] = useState<CookieConsentPreferences | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setConsent(readClientCookieConsent());
    setIsReady(true);

    const handleConsentChange = (event: Event) => {
      const custom = event as CustomEvent<CookieConsentPreferences | null>;
      if ("detail" in custom) {
        setConsent(custom.detail ?? null);
      } else {
        setConsent(readClientCookieConsent());
      }
    };

    const handleFocus = () => {
      setConsent(readClientCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const hasDecided = consent !== null;
  const showBanner = isReady && !hasDecided && !isModalOpen;

  const hasConsent = useCallback(
    (category: CookieCategory): boolean => {
      if (category === "necessary") return true;
      return Boolean(consent?.[category]);
    },
    [consent]
  );

  const acceptAll = useCallback(() => {
    const next = createCookieConsent({
      preferences: true,
      analytics: true,
      external: true,
    });
    setConsent(next);
    setIsModalOpen(false);
    writeClientCookieConsent(next);
  }, []);

  const rejectAll = useCallback(() => {
    const next = createCookieConsent({
      preferences: false,
      analytics: false,
      external: false,
    });
    setConsent(next);
    setIsModalOpen(false);
    writeClientCookieConsent(next);
  }, []);

  const savePreferences = useCallback(
    (input: CookieConsentInput) => {
      const base = consent ?? DEFAULT_COOKIE_PREFERENCES;
      const next = createCookieConsent({
        preferences: input.preferences ?? base.preferences,
        analytics: input.analytics ?? base.analytics,
        external: input.external ?? base.external,
      });
      setConsent(next);
      setIsModalOpen(false);
      writeClientCookieConsent(next);
    },
    [consent]
  );

  const resetConsent = useCallback(() => {
    setConsent(null);
    setIsModalOpen(false);
    clearClientCookieConsent();
  }, []);

  const openPreferences = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isReady,
      hasDecided,
      showBanner,
      isModalOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      savePreferences,
      resetConsent,
      openPreferences,
      closePreferences,
    }),
    [
      consent,
      isReady,
      hasDecided,
      showBanner,
      isModalOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      savePreferences,
      resetConsent,
      openPreferences,
      closePreferences,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent doit être utilisé à l'intérieur de CookieConsentProvider."
    );
  }
  return ctx;
}
