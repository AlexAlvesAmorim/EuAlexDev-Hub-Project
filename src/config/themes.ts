/**
 * Os 3 temas do Hub em ordem de ciclo: roxo (padrão, cor da master),
 * papel e tinta (claro) e noite carioca (escuro). Puro e testável —
 * o ThemeToggle só consome daqui.
 */

export const THEMES = ["roxo", "light", "dark"] as const;

export type ThemeId = (typeof THEMES)[number];

export const DEFAULT_THEME: ThemeId = "roxo";

export const THEME_META: Record<ThemeId, { themeColor: string }> = {
    roxo: { themeColor: "#16171d" },
    light: { themeColor: "#f7f4ed" },
    dark: { themeColor: "#131511" },
};

export function isThemeId(value: string | null): value is ThemeId {
    return value === "roxo" || value === "light" || value === "dark";
}

/** Normaliza o que vem do localStorage (ids antigos light/dark continuam válidos). */
export function parseTheme(value: string | null): ThemeId {
    return isThemeId(value) ? value : DEFAULT_THEME;
}

/** Próximo tema do ciclo (botão único). */
export function nextTheme(current: ThemeId): ThemeId {
    const index = THEMES.indexOf(current);
    return THEMES[(index + 1) % THEMES.length];
}
