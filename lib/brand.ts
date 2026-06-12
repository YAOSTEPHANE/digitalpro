/** Couleurs extraites du logo Digitalpro Solutions — ne pas mélanger bleu + rouge en dégradé. */
export const brand = {
  blue: "#516699",
  blueLight: "#6b7eb5",
  blueDark: "#3d4f7a",
  red: "#CC2628",
  redLight: "#e84547",
  redDark: "#a31e20",
  white: "#F7F7F5",
  ink: "#0c0e14",
  muted: "#9ba3b4",
} as const;

export type BrandAccent = "blue" | "red";
