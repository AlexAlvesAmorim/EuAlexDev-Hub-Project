import { useCallback, useRef, useState } from "react";

/**
 * Reveal on scroll: observa o container uma vez e sinaliza visível.
 * Sem setState dentro de effect (regra do lint) — tudo via callbacks.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
    const [visible, setVisible] = useState(false);
    const ioRef = useRef<IntersectionObserver | null>(null);

    const ref = useCallback((el: T | null) => {
        ioRef.current?.disconnect();
        ioRef.current = null;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        );
        ioRef.current = io;
        io.observe(el);
    }, []);

    return [ref, visible] as const;
}
