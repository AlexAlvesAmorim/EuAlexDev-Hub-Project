import { useCallback, useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Rail horizontal com scroll-snap nativo: mede página atual, total de
 * páginas e progresso (0→1) e expõe prev/next/goTo/reset.
 * Sem setState dentro de effect — medidas só em listeners de scroll/
 * resize e em rAF (mesmo truque do useReadingProgress). Sem lib nova.
 */
export function useScrollRail<T extends HTMLElement = HTMLDivElement>() {
    const trackRef = useRef<T | null>(null);
    const rafRef = useRef(0);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [progress, setProgress] = useState(0);

    const measure = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const client = el.clientWidth;
        const total = el.scrollWidth;
        const max = Math.max(0, total - client);
        const left = el.scrollLeft;
        const count = client > 0 && max > 4 ? Math.max(2, Math.round(total / client)) : 1;
        const current = count > 1 ? Math.min(count - 1, Math.max(0, Math.round(left / client))) : 0;
        setPage(current);
        setPageCount(count);
        setProgress(max > 0 ? Math.min(1, Math.max(0, left / max)) : 0);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = 0;
                measure();
            });
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        const first = requestAnimationFrame(measure);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(first);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = 0;
            }
        };
    }, [measure]);

    const scrollToPage = useCallback(
        (index: number) => {
            const el = trackRef.current;
            if (!el) return;
            const maxPage = Math.max(0, Math.round(el.scrollWidth / Math.max(1, el.clientWidth)) - 1);
            const clamped = Math.min(Math.max(0, maxPage), Math.max(0, index));
            el.scrollTo({
                left: clamped * el.clientWidth,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
            });
        },
        []
    );

    const prev = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({
            left: -el.clientWidth,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }, []);

    const next = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({
            left: el.clientWidth,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }, []);

    /** Volta ao início (troca de aba) e remede após o paint. */
    const reset = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollTo({ left: 0, behavior: "auto" });
        requestAnimationFrame(measure);
    }, [measure]);

    const canPrev = page > 0;
    const canNext = page < pageCount - 1;

    return { trackRef, page, pageCount, progress, canPrev, canNext, prev, next, goTo: scrollToPage, reset } as const;
}
