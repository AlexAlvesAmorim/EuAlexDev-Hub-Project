import { useEffect } from "react";
import { siteConfig } from "../config/site.ts";
import { projectsContent } from "../content/loader.ts";
import type { Route } from "./useHashRoute.ts";

export interface RouteMeta {
    title: string;
    description: string;
    url: string;
    image: string;
}

function absolute(path: string): string {
    return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

/**
 * Meta por rota (pura e testável): home usa o SEO global, cada case usa
 * título + descrição + URL canônica do próprio projeto.
 */
export function buildRouteMeta(route: Route): RouteMeta {
    if (route.name === "project") {
        const project = projectsContent.find((p) => p.id === route.id);
        if (!project) {
            return {
                title: `Projeto não encontrado — Alex Alves Amorim | Dev. de Favela Hub`,
                description: siteConfig.seo.description,
                url: `${siteConfig.url}/`,
                image: absolute(siteConfig.seo.ogImage),
            };
        }
        return {
            title: `${project.title} — Alex Alves Amorim | Dev. de Favela Hub`,
            description: project.description,
            url: `${siteConfig.url}/#/projeto/${project.id}`,
            image: absolute(project.image.webp),
        };
    }
    return {
        title: siteConfig.seo.title,
        description: siteConfig.seo.description,
        url: `${siteConfig.url}/`,
        image: absolute(siteConfig.seo.ogImage),
    };
}

function upsertMeta(attr: string, value: string, content: string): void {
    const selector = `meta[${attr}="${value}"]`;
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

/** Aplica o meta da rota atual no <head> (title, description, OG, canonical). */
export function useRouteMeta(route: Route): void {
    useEffect(() => {
        const meta = buildRouteMeta(route);
        document.title = meta.title;
        upsertMeta("name", "description", meta.description);
        upsertMeta("property", "og:title", meta.title);
        upsertMeta("property", "og:description", meta.description);
        upsertMeta("property", "og:url", meta.url);
        upsertMeta("property", "og:image", meta.image);
        upsertMeta("name", "twitter:title", meta.title);
        upsertMeta("name", "twitter:description", meta.description);
        upsertMeta("name", "twitter:image", meta.image);
        upsertCanonical(meta.url);
    }, [route]);
}
