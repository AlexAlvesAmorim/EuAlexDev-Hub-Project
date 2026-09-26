// @vitest-environment jsdom
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { useScrollRail } from "./useScrollRail.ts";

type Rail = ReturnType<typeof useScrollRail>;

let api: Rail | null = null;

function Harness() {
    const rail = useScrollRail<HTMLDivElement>();
    const { trackRef } = rail;
    useEffect(() => {
        api = rail;
    });
    return <div ref={trackRef} data-testid="track" />;
}

function stubMotion(reduced: boolean): void {
    window.matchMedia = vi.fn().mockReturnValue({
        matches: reduced,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }) as unknown as typeof window.matchMedia;
}

function mockLayout(el: HTMLElement, client: number, total: number): void {
    Object.defineProperties(el, {
        clientWidth: { configurable: true, get: () => client },
        scrollWidth: { configurable: true, get: () => total },
    });
    el.scrollTo = vi.fn((options?: ScrollToOptions) => {
        if (typeof options?.left === "number") el.scrollLeft = options.left;
    }) as unknown as typeof el.scrollTo;
    el.scrollBy = vi.fn((options?: ScrollToOptions) => {
        if (typeof options?.left === "number") el.scrollLeft += options.left;
    }) as unknown as typeof el.scrollBy;
}

function current(): Rail {
    if (!api) throw new Error("hook não montou");
    return api;
}

beforeEach(() => {
    api = null;
    stubMotion(false);
    render(<Harness />);
});

afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
});

describe("useScrollRail", () => {
    it("mede páginas a partir do layout", async () => {
        mockLayout(screen.getByTestId("track"), 700, 2100);
        await waitFor(() => expect(current().pageCount).toBe(3));
        expect(current().page).toBe(0);
        expect(current().progress).toBe(0);
        expect(current().canPrev).toBe(false);
        expect(current().canNext).toBe(true);
    });

    it("atualiza página e progresso no scroll", async () => {
        const track = screen.getByTestId("track");
        mockLayout(track, 700, 2100);
        await waitFor(() => expect(current().pageCount).toBe(3));
        track.scrollLeft = 700;
        track.dispatchEvent(new Event("scroll"));
        await waitFor(() => expect(current().page).toBe(1));
        expect(current().progress).toBeCloseTo(0.5);
    });

    it("next/prev rolam uma página (instantâneo com reduced-motion)", async () => {
        const track = screen.getByTestId("track");
        mockLayout(track, 700, 2100);
        await waitFor(() => expect(current().pageCount).toBe(3));
        current().next();
        expect(track.scrollBy).toHaveBeenCalledWith({ left: 700, behavior: "smooth" });
        stubMotion(true);
        current().prev();
        expect(track.scrollBy).toHaveBeenCalledWith({ left: -700, behavior: "auto" });
    });

    it("goTo limita ao intervalo e reset volta ao início", async () => {
        const track = screen.getByTestId("track");
        mockLayout(track, 700, 2100);
        await waitFor(() => expect(current().pageCount).toBe(3));
        current().goTo(99);
        expect(track.scrollTo).toHaveBeenCalledWith({ left: 1400, behavior: "smooth" });
        track.scrollLeft = 1400;
        current().reset();
        expect(track.scrollTo).toHaveBeenCalledWith({ left: 0, behavior: "auto" });
    });
});
