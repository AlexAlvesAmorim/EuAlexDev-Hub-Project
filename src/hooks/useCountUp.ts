import { useEffect, useState } from "react";

/**
 * Conta de 0 até o alvo com easing quando `active` liga.
 * setState acontece só dentro do callback do rAF (padrão do lint);
 * sob prefers-reduced-motion o primeiro frame já entrega o final.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1200) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) return;
        if (typeof requestAnimationFrame === "undefined") {
            return;
        }
        let raf = 0;
        const reduce =
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const start = performance.now();
        const tick = (now: number) => {
            const progress = reduce ? 1 : Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, target, durationMs]);

    return value;
}
