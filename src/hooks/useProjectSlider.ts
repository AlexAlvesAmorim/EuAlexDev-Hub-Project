import { useState, useEffect, useCallback, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";

/** Tempo que cada card fica em destaque (cadência da legenda). */
const AUTO_ROTATE_INTERVAL_MS = 5000;

/** Adianta a troca do nome "Em destaque" N ms antes do card chegar ao centro. */
const CAPTION_LEAD_MS = 2000;

/**
 * Controla o carrossel 3D de projetos.
 *
 * - Rotação contínua e suave via `requestAnimationFrame` (sem saltos
 *   por degrau). A legenda "Em destaque" troca `CAPTION_LEAD_MS` antes
 *   do próximo card chegar à frente do cilindro (o nome antecipa a
 *   imagem, como um teaser) — a fonte única de verdade é o ângulo, e o
 *   índice é derivado dele.
 *   O card frontal (face virada pro espectador) é o que satisfaz
 *   `--rotation + (position-1)*degreesPerCard ≡ 0`, ou seja
 *   `frontIndex = (total - k) % total` com `k = floor(rotation/dpc)`.
 * - Pausa em hover (mouseenter/mouseleave), como um
 *   `animation-play-state: paused` de verdade.
 * - Honra `prefers-reduced-motion`: desliga a rotação por completo e
 *   só avança mediante clique/teclado do usuário.
 * - Reage dinamicamente a mudanças no sistema operacional (o usuário
 *   pode ativar "menos movimento" enquanto a página está aberta).
 *
 * Implementação: o ângulo vive num ref e é aplicado direto no elemento
 * via `--rotation` — nada de re-render a cada frame. O `selectedIndex`
 * só vira estado quando cruza a fronteira de um card.
 */
export function useProjectSlider(total: number) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [userAutoRotate, setUserAutoRotate] = useState(true);

    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const autoRotate = userAutoRotate && !reducedMotion;

    const degreesPerCard = 360 / total;
    const degreesPerSecond = degreesPerCard / (AUTO_ROTATE_INTERVAL_MS / 1000);
    const captionLeadAngle = degreesPerSecond * (CAPTION_LEAD_MS / 1000);

    const rotationRef = useRef(0);
    const indexRef = useRef(0);
    const lastTsRef = useRef(0);

    useEffect(() => {
        if (!autoRotate) return;
        if (typeof requestAnimationFrame === "undefined") return;

        let raf = 0;

        const tick = (ts: number) => {
            const prev = lastTsRef.current || ts;
            lastTsRef.current = ts;
            rotationRef.current += degreesPerSecond * ((ts - prev) / 1000);

            const el = sliderRef.current;
            if (el) {
                el.style.setProperty("--rotation", `${rotationRef.current}deg`);
            }

            const k = Math.floor((rotationRef.current + captionLeadAngle) / degreesPerCard) % total;
            const nextIndex = (total - k) % total;
            if (nextIndex !== indexRef.current) {
                indexRef.current = nextIndex;
                setSelectedIndex(nextIndex);
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            lastTsRef.current = 0;
        };
    }, [autoRotate, total, degreesPerSecond, degreesPerCard, captionLeadAngle, sliderRef]);

    const handleSelect = useCallback((index: number) => {
        const targetK = (total - index) % total;
        const target = targetK * degreesPerCard;
        const el = sliderRef.current;
        if (el) {
            el.style.setProperty("--rotation", `${target}deg`);
        }
        rotationRef.current = target;
        indexRef.current = index;
        setSelectedIndex(index);
    }, [degreesPerCard, total, sliderRef]);

    const handleMouseEnter = useCallback(() => {
        setUserAutoRotate(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setUserAutoRotate(true);
    }, []);

    return {
        sliderRef,
        selectedIndex,
        autoRotate,
        handleSelect,
        handleMouseEnter,
        handleMouseLeave,
    };
}
