"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/cookie-consent-provider";

export default function ConsentAnalytics() {
  const { hasConsent } = useCookieConsent();
  if (!hasConsent("analytics")) {
    return null;
  }
  return <Analytics />;
}
