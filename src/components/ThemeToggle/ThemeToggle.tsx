import { useCallback, useEffect, useState } from "react";
import { FaMoon, FaPalette, FaSun } from "react-icons/fa6";
import { DEFAULT_THEME, nextTheme, parseTheme, THEME_META, type ThemeId } from "../../config/themes";
import { siteCopy } from "../../content/loader";

const STORAGE_KEY = "hub-theme";

const ICONS = {
    roxo: FaPalette,
    light: FaSun,
    dark: FaMoon,
} as const;

function applyTheme(theme: ThemeId) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", THEME_META[theme].themeColor);
}

/**
 * Ciclo roxo → papel e tinta → noite carioca. Padrão: roxo (é o :root,
 * sem FOUC). Escolha persiste em localStorage (ids antigos continuam válidos).
 */
export function ThemeToggle() {
    const [theme, setTheme] = useState<ThemeId>(() =>
        typeof document === "undefined" ? DEFAULT_THEME : parseTheme(localStorage.getItem(STORAGE_KEY))
    );

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const cycle = useCallback(() => {
        const next = nextTheme(theme);
        const doc = document as Document & {
            startViewTransition?: (callback: () => void) => void;
        };
        // Cross-fade da página inteira onde há suporte; troca seca no resto.
        if (typeof doc.startViewTransition === "function") {
            doc.startViewTransition(() => setTheme(next));
        } else {
            setTheme(next);
        }
    }, [theme]);

    const following = nextTheme(theme);
    const Icon = ICONS[theme];
    const copy = siteCopy.theme;

    return (
        <button
            type="button"
            onClick={cycle}
            aria-pressed={theme !== DEFAULT_THEME}
            aria-label={`${copy.current}: ${copy[theme]}. ${copy.switchTo} ${copy[following]}`}
            title={`${copy.switchTo} ${copy[following]}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 text-text-h/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
        >
            <Icon aria-hidden="true" />
        </button>
    );
}
