import { useCallback } from "react";
import type { PointerEvent } from "react";

/**
 * Spotlight que segue o mouse: grava --mx/--my no card.
 * O brilho em si é CSS (.spotlight::after em delight.css).
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
    return useCallback((event: PointerEvent<T>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }, []);
}
