import { describe, expect, it } from "vitest";
import { siteConfig } from "../config/site.ts";
import { projectsContent } from "./loader.ts";
import { buildRouteMeta } from "../hooks/useRouteMeta.ts";

describe("buildRouteMeta", () => {
    it("home usa o SEO global", () => {
        const meta = buildRouteMeta({ name: "home" });
        expect(meta.title).toBe(siteConfig.seo.title);
        expect(meta.description).toBe(siteConfig.seo.description);
        expect(meta.url).toBe(`${siteConfig.url}/`);
    });

    it("case usa título, descrição e URL canônica do projeto", () => {
        const project = projectsContent[0];
        const meta = buildRouteMeta({ name: "project", id: project.id });
        expect(meta.title).toContain(project.title);
        expect(meta.description).toBe(project.description);
        expect(meta.url).toContain(`#/projeto/${project.id}`);
        expect(meta.image.length).toBeGreaterThan(0);
    });

    it("id desconhecido vira 404 sem quebrar", () => {
        const meta = buildRouteMeta({ name: "project", id: "nao-existe" });
        expect(meta.title).toMatch(/não encontrado/i);
        expect(meta.url).toBe(`${siteConfig.url}/`);
    });
});
