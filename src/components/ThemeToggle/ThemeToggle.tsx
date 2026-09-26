import { useCallback, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

type Theme = "light" | "dark";

const STORAGE_KEY = "hub-theme";

function currentTheme(): Theme {
    if (typeof document !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") return saved;
    }
    return "light";
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#131511" : "#f7f4ed");
}

/**
 * Alterna papel e tinta ↔ noite carioca. Padrão: claro (sem FOUC,
 * pois o claro é o :root). Escolha persiste em localStorage.
 */
export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => currentTheme());

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const toggle = useCallback(() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
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

    const dark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={dark}
            aria-label={dark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            title={dark ? "Tema claro" : "Tema escuro"}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 text-text-h/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
        >
            {dark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>
    );
}
