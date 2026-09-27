/**
 * Tokens single-source.
 * Espelha src/styles/tokens.css (:root = roxo) — edite aqui e replique no CSS.
 * Passo futuro: gerar tokens.css a partir daqui no build.
 */
export const themeTokens = {
  bg: "#16171d",
  surface: "#1f2028",
  text: "#9ca3af",
  textH: "#f3f4f6",
  primary: "#c084fc",
  border: "#2e303a",
  accentBg: "rgba(192, 132, 252, 0.15)",
  accentBorder: "rgba(192, 132, 252, 0.5)",
  socialBg: "rgba(47, 48, 58, 0.5)",
  caseColors: {
    problem: "#f87171",
    solution: "#60a5fa",
    challenges: "#fbbf24",
    results: "#34d399",
  },
  fonts: {
    sans: "'Archivo', system-ui, -apple-system, sans-serif",
    display: "'Poppins', system-ui, sans-serif",
    poster: "'ICA Rubrik', 'Archivo', sans-serif",
  },
} as const;

/** Espelho do [data-theme="light"] em theme-light.css — edite os dois juntos. */
export const themeTokensLight = {
  bg: "#f7f4ed",
  surface: "#fffdf9",
  text: "#57534e",
  textH: "#1c1917",
  primary: "#c2410c",
  border: "#e5ddcf",
  accentBg: "rgba(194, 65, 12, 0.08)",
  accentBorder: "rgba(194, 65, 12, 0.35)",
} as const;

/** Espelho do [data-theme="dark"] em theme-dark.css — edite os dois juntos. */
export const themeTokensDark = {
  bg: "#131511",
  surface: "#1d2019",
  text: "#a8a29e",
  textH: "#f3efe6",
  primary: "#f59e0b",
  border: "#2b2f24",
  accentBg: "rgba(245, 158, 11, 0.14)",
  accentBorder: "rgba(245, 158, 11, 0.45)",
} as const;

export type ThemeTokens = typeof themeTokens;
