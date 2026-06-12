import type { BrandAccent } from "./brand";

/** Badge plein — une seule couleur (bleu ou rouge), jamais de dégradé mixte. */
export function accentBadgeClass(accent: BrandAccent): string {
  return accent === "blue" ? "brand-bg-blue" : "brand-bg-red";
}

/** Onglet / chip actif selon l'accent de la démo. */
export function accentChipActiveClass(accent: BrandAccent): string {
  return accent === "blue" ? "lux-chip-active" : "lux-chip-active-red";
}

/** Fond uni selon accent — pas de dégradé mixte. */
export function accentSolidBgClass(accent: BrandAccent): string {
  return accent === "blue" ? "bg-[var(--brand-blue)]" : "bg-[var(--brand-red)]";
}

/** Texte selon accent. */
export function accentTextClass(accent: BrandAccent): string {
  return accent === "blue" ? "text-[var(--brand-blue-light)]" : "text-[var(--brand-red-light)]";
}
