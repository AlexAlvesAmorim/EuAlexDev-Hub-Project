import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, isThemeId, nextTheme, parseTheme, THEME_META, THEMES } from "./themes.ts";
import { siteCopy } from "../content/loader.ts";

describe("themes", () => {
    it("roxo é o padrão e o ciclo passa pelos 3", () => {
        expect(DEFAULT_THEME).toBe("roxo");
        expect(nextTheme("roxo")).toBe("light");
        expect(nextTheme("light")).toBe("dark");
        expect(nextTheme("dark")).toBe("roxo");
    });

    it("normaliza o localStorage (ids antigos continuam válidos)", () => {
        expect(parseTheme("light")).toBe("light");
        expect(parseTheme("dark")).toBe("dark");
        expect(parseTheme("roxo")).toBe("roxo");
        expect(parseTheme(null)).toBe("roxo");
        expect(parseTheme("banana")).toBe("roxo");
        expect(isThemeId("banana")).toBe(false);
    });

    it("todo tema tem theme-color e copy (zero hardcode no toggle)", () => {
        for (const id of THEMES) {
            expect(THEME_META[id].themeColor).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(siteCopy.theme[id].length).toBeGreaterThan(0);
        }
        expect(siteCopy.theme.current.length).toBeGreaterThan(0);
        expect(siteCopy.theme.switchTo.length).toBeGreaterThan(0);
    });
});
