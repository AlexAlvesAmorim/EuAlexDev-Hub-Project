import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

/**
 * Voltar ao topo: aparece após 600px, scroll suave (auto sob reduced-motion).
 */
export function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                setShow(window.scrollY > 600);
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    if (!show) return null;

    const goTop = () => {
        const reduce =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <button
            type="button"
            onClick={goTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            className="back-to-top"
        >
            <FaArrowUp aria-hidden="true" />
        </button>
    );
}
