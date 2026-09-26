import { useEffect, useRef } from "react";

/**
 * Fio de progresso de leitura no topo — 100% via rAF, sem re-render.
 */
export function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            const progress = max > 0 ? el.scrollTop / max : 0;
            ref.current?.style.setProperty("transform", `scaleX(${progress})`);
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
    }, []);

    return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
