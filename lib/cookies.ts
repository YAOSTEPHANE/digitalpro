export const COOKIE_CONSENT_NAME = "digitalpro_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60; // 6 mois (180 jours)
export const COOKIE_CONSENT_EVENT = "digitalpro:cookie-consent-change";

export type CookieCategory =
  | "necessary"
  | "preferences"
  | "analytics"
  | "external";

export interface CookieConsentPreferences {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  external: boolean;
  version: number;
  updatedAt: string;
}

export type CookieConsentInput = Partial<
  Pick<CookieConsentPreferences, "preferences" | "analytics" | "external">
>;

export interface CookieCategoryInfo {
  id: CookieCategory;
  title: string;
  badge: string;
  required: boolean;
  summary: string;
  details: string;
}

export interface CookieInventoryItem {
  name: string;
  storageType: string;
  category: CookieCategory;
  provider: string;
  purpose: string;
  duration: string;
}

export const DEFAULT_COOKIE_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  external: false,
  version: COOKIE_CONSENT_VERSION,
  updatedAt: "",
};

export const COOKIE_CATEGORIES_INFO: readonly CookieCategoryInfo[] = [
  {
    id: "necessary",
    title: "Cookies strictement nécessaires",
    badge: "Toujours actifs",
    required: true,
    summary:
      "Indispensables au fonctionnement technique du site, à la sécurité des requêtes et à la mémorisation de vos choix de consentement.",
    details:
      "Ces traceurs ne collectent aucune donnée publicitaire et ne peuvent pas être désactivés.",
  },
  {
    id: "preferences",
    title: "Préférences & confort local",
    badge: "Stockage local",
    required: false,
    summary:
      "Permettent de conserver dans votre navigateur vos brouillons de factures et vos avis clients publiés localement.",
    details:
      "En cas de refus, ces fonctionnalités restent utilisables pendant votre session active sans sauvegarde persistante.",
  },
  {
    id: "analytics",
    title: "Mesure d'audience",
    badge: "Vercel Analytics",
    required: false,
    summary:
      "Nous aident à mesurer la fréquentation des pages, les temps de chargement et l'efficacité éditoriale du studio.",
    details:
      "Chargés uniquement après votre accord explicite, sans profilage publicitaire inter-sites.",
  },
  {
    id: "external",
    title: "Contenus & services externes",
    badge: "Google Maps · Vidéo",
    required: false,
    summary:
      "Autorisent l'affichage interactif de la carte Google Maps de notre studio à Abidjan et des lecteurs vidéo externes.",
    details:
      "Lorsqu'ils sont refusés, un aperçu statique protégé s'affiche sans appel aux serveurs tiers.",
  },
] as const;

export const COOKIE_INVENTORY: readonly CookieInventoryItem[] = [
  {
    name: COOKIE_CONSENT_NAME,
    storageType: "Cookie HTTP / navigateur",
    category: "necessary",
    provider: "Digitalpro Solutions",
    purpose:
      "Mémorise vos choix d'acceptation, de refus ou de personnalisation des cookies.",
    duration: "6 mois (180 jours)",
  },
  {
    name: "invoices",
    storageType: "Stockage local (localStorage)",
    category: "preferences",
    provider: "Digitalpro Solutions",
    purpose:
      "Conserve votre historique de factures générées depuis le module de facturation.",
    duration: "Jusqu'à suppression manuelle",
  },
  {
    name: "digitalpro_reviews",
    storageType: "Stockage local (localStorage)",
    category: "preferences",
    provider: "Digitalpro Solutions",
    purpose:
      "Mémorise les avis clients que vous publiez sur la page Retours clients.",
    duration: "Jusqu'à suppression manuelle",
  },
  {
    name: "Vercel Web Analytics",
    storageType: "Script de télémétrie anonyme",
    category: "analytics",
    provider: "Vercel Inc.",
    purpose:
      "Mesure agrégée du trafic, des pages consultées et des performances Web Vitals.",
    duration: "Session / données agrégées",
  },
  {
    name: "Google Maps (NID, AEC, SOCS)",
    storageType: "Contenu embarqué (iframe)",
    category: "external",
    provider: "Google LLC",
    purpose:
      "Affiche la carte interactive localisant notre studio au Boulevard Koffi Gadaud, Cocody.",
    duration: "Jusqu'à 6 mois (selon politique Google)",
  },
  {
    name: "YouTube (embed externe)",
    storageType: "Contenu embarqué (iframe)",
    category: "external",
    provider: "Google LLC / YouTube",
    purpose:
      "Permet la lecture des vidéos hébergées sur YouTube lorsqu'un identifiant YouTube est configuré.",
    duration: "Jusqu'à 6 mois (selon politique Google)",
  },
] as const;

export function createCookieConsent(
  input: CookieConsentInput = {},
  now: Date = new Date()
): CookieConsentPreferences {
  return {
    necessary: true,
    preferences: Boolean(input.preferences),
    analytics: Boolean(input.analytics),
    external: Boolean(input.external),
    version: COOKIE_CONSENT_VERSION,
    updatedAt: now.toISOString(),
  };
}

export function serializeCookieConsent(
  prefs: CookieConsentPreferences
): string {
  return encodeURIComponent(JSON.stringify(prefs));
}

export function extractCookieValue(
  cookieHeader: string,
  name: string
): string | null {
  if (!cookieHeader || !name) return null;
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const key = pair.slice(0, idx).trim();
    if (key === name) {
      return pair.slice(idx + 1).trim();
    }
  }
  return null;
}

export function parseCookieConsent(
  rawValue: string | null | undefined
): CookieConsentPreferences | null {
  if (!rawValue || typeof rawValue !== "string") return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(rawValue.trim());
  } catch {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (
    record.version !== COOKIE_CONSENT_VERSION ||
    record.necessary !== true ||
    typeof record.preferences !== "boolean" ||
    typeof record.analytics !== "boolean" ||
    typeof record.external !== "boolean" ||
    typeof record.updatedAt !== "string"
  ) {
    return null;
  }

  return {
    necessary: true,
    preferences: record.preferences,
    analytics: record.analytics,
    external: record.external,
    version: COOKIE_CONSENT_VERSION,
    updatedAt: record.updatedAt,
  };
}

export function parseCookieConsentFromHeader(
  cookieHeader: string | null | undefined
): CookieConsentPreferences | null {
  if (!cookieHeader) return null;
  const raw = extractCookieValue(cookieHeader, COOKIE_CONSENT_NAME);
  return parseCookieConsent(raw);
}

export function buildSetCookieString(
  prefs: CookieConsentPreferences,
  options: {
    secure?: boolean;
    maxAge?: number;
    path?: string;
  } = {}
): string {
  const path = options.path ?? "/";
  const maxAge = options.maxAge ?? COOKIE_CONSENT_MAX_AGE_SECONDS;
  const secure = Boolean(options.secure);

  return `${COOKIE_CONSENT_NAME}=${serializeCookieConsent(
    prefs
  )}; Path=${path}; Max-Age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function buildClearCookieString(
  options: {
    secure?: boolean;
    path?: string;
  } = {}
): string {
  const path = options.path ?? "/";
  const secure = Boolean(options.secure);
  return `${COOKIE_CONSENT_NAME}=; Path=${path}; Max-Age=0; SameSite=Lax${
    secure ? "; Secure" : ""
  }`;
}

function isHttpsContext(): boolean {
  return (
    typeof window !== "undefined" && window.location.protocol === "https:"
  );
}

export function readClientCookieConsent(): CookieConsentPreferences | null {
  if (typeof document === "undefined") return null;
  return parseCookieConsentFromHeader(document.cookie);
}

export function writeClientCookieConsent(
  prefs: CookieConsentPreferences
): void {
  if (typeof document === "undefined") return;
  document.cookie = buildSetCookieString(prefs, {
    secure: isHttpsContext(),
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CookieConsentPreferences>(COOKIE_CONSENT_EVENT, {
        detail: prefs,
      })
    );
  }
}

export function clearClientCookieConsent(): void {
  if (typeof document === "undefined") return;
  document.cookie = buildClearCookieString({
    secure: isHttpsContext(),
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CookieConsentPreferences | null>(COOKIE_CONSENT_EVENT, {
        detail: null,
      })
    );
  }
}
