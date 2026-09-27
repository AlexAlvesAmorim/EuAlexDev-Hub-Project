import { describe, expect, it } from "vitest";
import {
    buildStats,
    certsContent,
    projectsContent,
    siteCopy,
    technologiesContent,
} from "./loader.ts";

const ROUTE_ID = /^[\w-]+$/;

describe("content (JSON + Zod)", () => {
    it("tem projetos válidos com ids únicos e roteáveis", () => {
        expect(projectsContent.length).toBeGreaterThan(0);
        const ids = projectsContent.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) expect(id).toMatch(ROUTE_ID);
    });

    it("só destaca projetos que existem", () => {
        const ids = new Set(projectsContent.map((p) => p.id));
        for (const p of projectsContent.filter((p) => p.featured)) {
            expect(ids.has(p.id)).toBe(true);
        }
    });

    it("techs dos projetos existem no registry de tecnologias", () => {
        // TechIcon resolve estes por fallback dedicado (sem entrada no JSON).
        const fallbacks = new Set(["PDF.js", "jsPDF", "docx", "ONNX/WASM"]);
        const known = new Set(technologiesContent.map((t) => t.name));
        for (const p of projectsContent) {
            for (const tech of p.technologies) {
                const ok = known.has(tech) || fallbacks.has(tech);
                expect(ok, `${p.id} usa tech desconhecida: ${tech}`).toBe(true);
            }
        }
    });

    it("tecnologias têm categoria, cor e nível", () => {
        expect(technologiesContent.length).toBeGreaterThan(0);
        for (const t of technologiesContent) {
            expect(t.name.length).toBeGreaterThan(0);
            expect(t.category.length).toBeGreaterThan(0);
            expect(t.color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
        }
    });

    it("stats derivadas batem com o conteúdo", () => {
        const stats = buildStats();
        const produtos = stats.find((s) => s.label === "Produtos entregues");
        const techs = stats.find((s) => s.label === "Techs no cinto");
        expect(produtos?.value).toBe(String(projectsContent.length));
        expect(techs?.value).toBe(String(technologiesContent.length));
    });

    it("certificações têm título, emissor, ano e descrição", () => {
        expect(certsContent.length).toBeGreaterThan(0);
        for (const c of certsContent) {
            expect(c.title.length).toBeGreaterThan(0);
            expect(c.issuer.length).toBeGreaterThan(0);
            expect(c.year.length).toBeGreaterThan(0);
        }
    });

    it("copy dos rails está completa (zero hardcode no JSX)", () => {
        for (const section of [siteCopy.stack, siteCopy.certs] as const) {
            for (const key of ["subtitle", "prev", "next", "goTo", "region", "hint"] as const) {
                expect(section[key].length).toBeGreaterThan(0);
            }
        }
    });
});
