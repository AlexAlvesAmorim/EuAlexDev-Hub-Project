import { ProjectsSchema, TechnologySchema, TimelineItemSchema, CertSchema } from "../schemas/content";
import projectsRaw from "./projects.json";
import technologiesRaw from "./technologies.json";
import timelineRaw from "./timeline.json";
import certsRaw from "./certs.json";
import siteCopy from "./site-copy.json";
import type { Project } from "../types/Project";

/**
 * Camada de compatibilidade v2:
 * - Valida o conteúdo com Zod (falha rápido em dev se JSON inválido).
 * - Expõe o formato novo (imagem objeto, subtitle, gallery) e
 *   converte para o tipo legado `Project` enquanto os componentes
 *   antigos ainda existem.
 */

const projectsParsed = ProjectsSchema.parse(projectsRaw);
const technologiesParsed = (technologiesRaw as unknown[]).map((t) => TechnologySchema.parse(t));
const timelineParsed = (timelineRaw as unknown[]).map((t) => TimelineItemSchema.parse(t));
const certsParsed = (certsRaw as unknown[]).map((c) => CertSchema.parse(c));

export const projectsContent = projectsParsed;
export const technologiesContent = technologiesParsed;
export const timelineContent = timelineParsed;
export const certsContent = certsParsed;
export { siteCopy };

/** Converte projeto content-driven -> tipo legado usado pelo ProjectModal. */
export function toLegacyProject(p: (typeof projectsParsed)[number]): Project {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    highlights: p.highlights,
    image: p.image.webp,
    technologies: p.technologies,
    github: p.github,
    demo: p.demo,
    problem: p.problem,
    solution: p.solution,
    challenges: p.challenges,
    results: p.results,
    v21Images: p.gallery?.v21Images,
    v12Images: p.gallery?.v12Images,
    comparison: p.gallery?.comparison,
    newVersion: p.gallery?.newVersion,
    oldVersion: p.gallery?.oldVersion,
  };
}

export const projectsLegacy: Project[] = projectsParsed.map(toLegacyProject);

/** Stats derivadas: mistura fixas + contagem real do conteúdo. */
export function buildStats() {
  return [
    { value: "20+", label: "Anos em TI" },
    { value: String(projectsParsed.length), label: "Produtos entregues" },
    { value: String(technologiesParsed.length), label: "Techs no cinto" },
    { value: "1", label: "Venda B2B fechada" },
  ];
}
