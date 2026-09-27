import { useEffect, type RefObject } from "react";

/**
 * Progresso de leitura de um artigo: 0→1 gravado em `--toc-progress`
 * no próprio elemento (rAF, sem re-render — mesmo truque do ScrollProgress).
 */
export function useReadingProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
            el.style.setProperty("--toc-progress", String(done));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref]);
}
