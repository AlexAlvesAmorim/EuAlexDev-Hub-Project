/**
 * Tokens single-source.
 * Espelha src/styles/tokens.css — edite aqui e replique no CSS.
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

export type ThemeTokens = typeof themeTokens;
