import { useEffect, useState } from "react";

/**
 * Observa uma media query e retorna se ela está ativa no viewport atual.
 *
 * - Roda no cliente (assume `window`). Em SSR, retorna `false` no
 *   primeiro render; o efeito realinha no hydration.
 * - Listener usa a API `change` (substitui o legado `addListener`).
 * - Cleanup correto remove o listener ao desmontar ou ao trocar a query.
 * - Estado inicial derivado do DOM (lazy initializer) — evita o
 *   anti-pattern de chamar setState no corpo do effect.
 *
 * @example
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *   const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia(query);
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, [query]);

    return matches;
}
