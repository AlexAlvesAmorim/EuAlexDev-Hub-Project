/**
 * Tokens single-source.
 * Espelha src/styles/tokens.css — edite aqui e replique no CSS.
 * Passo futuro: gerar tokens.css a partir daqui no build.
 */
export const themeTokens = {
  bg: "#f7f4ed",
  surface: "#fffdf9",
  text: "#57534e",
  textH: "#1c1917",
  primary: "#c2410c",
  border: "#e5ddcf",
  accentBg: "rgba(194, 65, 12, 0.08)",
  accentBorder: "rgba(194, 65, 12, 0.35)",
  socialBg: "rgba(28, 25, 23, 0.05)",
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
