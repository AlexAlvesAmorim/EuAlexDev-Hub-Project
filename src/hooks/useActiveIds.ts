import { useEffect, useState } from "react";

/**
 * Id ativo entre âncoras dadas: IntersectionObserver genérico.
 * `useActiveSection` delega pra cá com os ids do `siteConfig.nav`;
 * o TOC do case usa com os ids das seções do case.
 */
export function useActiveIds(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (elements.length === 0) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActive(visible.target.id);
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
        );
        elements.forEach((el) => io.observe(el));
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids.join("|")]);

    return active;
}
