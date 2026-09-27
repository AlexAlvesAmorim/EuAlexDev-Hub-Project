import { useEffect, useRef, useState } from "react";

export type Route = { name: "home" } | { name: "project"; id: string };

function routeKey(route: Route): string {
    return route.name === "project" ? `project:${route.id}` : "home";
}

function parseHash(): { route: Route; anchor: string | null } {
    if (typeof window === "undefined") {
        return { route: { name: "home" }, anchor: null };
    }
    const hash = window.location.hash;
    const project = hash.match(/^#\/projeto\/([\w-]+)/);
    if (project) return { route: { name: "project", id: project[1] }, anchor: null };
    if (hash.startsWith("#") && hash.length > 1 && !hash.startsWith("#/")) {
        return { route: { name: "home" }, anchor: hash.slice(1) };
    }
    return { route: { name: "home" }, anchor: null };
}

/**
 * Roteador mínimo por hash: `#/projeto/<id>` abre o case, qualquer outro
 * hash é a home (âncoras nativas continuam funcionando — só gerenciamos
 * scroll quando a ROTA troca, nunca em clique de âncora dentro da home).
 */
export function useHashRoute() {
    const [route, setRoute] = useState<Route>(() => parseHash().route);
    const prevKey = useRef<string>(routeKey(parseHash().route));

    useEffect(() => {
        const onChange = () => {
            const { route: next, anchor } = parseHash();
            const key = routeKey(next);
            if (key === prevKey.current) return;
            prevKey.current = key;
            setRoute(next);
            if (next.name === "project") {
                window.scrollTo({ top: 0 });
            } else if (anchor) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        document.getElementById(anchor)?.scrollIntoView();
                    });
                });
            } else {
                window.scrollTo({ top: 0 });
            }
        };
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);

    return { route };
}
