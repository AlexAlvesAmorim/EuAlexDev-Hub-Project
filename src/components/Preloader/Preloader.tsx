import { useEffect, useState } from "react";

interface PreloaderProps {
    onDone: () => void;
}

export function Preloader({ onDone }: PreloaderProps) {
    const [phase, setPhase] = useState<"visible" | "fading">("visible");

    useEffect(() => {
        let finished = false;
        const fade = () => {
            if (finished) return;
            finished = true;
            setPhase((prev) => (prev === "visible" ? "fading" : prev));
        };

        const minTimer = setTimeout(() => {
            if (document.readyState === "complete") {
                fade();
            } else {
                window.addEventListener("load", fade, { once: true });
            }
        }, 900);

        const capTimer = setTimeout(fade, 2800);

        return () => {
            clearTimeout(minTimer);
            clearTimeout(capTimer);
        };
    }, []);

    useEffect(() => {
        if (phase !== "fading") return;
        const t = setTimeout(onDone, 500);
        return () => clearTimeout(t);
    }, [phase, onDone]);

    return (
        <div
            className={`preloader ${phase === "fading" ? "preloader--fading" : ""}`}
            aria-hidden="true"
        >
            <div className="preloader__logo" aria-hidden="true">A</div>
            <h2 className="preloader__title">Dev. de Favela Hub</h2>
            <p className="preloader__subtitle">Bem-vindo ao meu Hub de Portfólio</p>
            <div className="preloader__bar" aria-hidden="true">
                <span />
            </div>
        </div>
    );
}