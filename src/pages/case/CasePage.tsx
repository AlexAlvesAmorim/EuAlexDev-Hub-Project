import { useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaGithub, FaYoutube } from "react-icons/fa6";
import { projectsContent, technologiesContent, siteCopy } from "../../content/loader";
import { TechIcon } from "../../components/TechIcon";
import { CompareSlider, type ComparePair } from "../../components/CompareSlider/CompareSlider";
import { useActiveIds } from "../../hooks/useActiveIds";
import { useReadingProgress } from "../../hooks/useReadingProgress";

/**
 * Página de case por rota (`#/projeto/<id>`): a história completa que no
 * carrossel aparece resumida no modal. Reusa o vocabulário visual do modal
 * (techs, highlights, blocos de case, tabela de comparação).
 * Imersivo: sumário sticky com seção ativa + fio de progresso de leitura,
 * comparador antes/depois quando a galeria tem as duas versões.
 */
export function CasePage({ id }: { id: string }) {
    const total = projectsContent.length;
    const index = projectsContent.findIndex((p) => p.id === id);
    const project = index >= 0 ? projectsContent[index] : null;
    const layoutRef = useRef<HTMLDivElement>(null);
    useReadingProgress(layoutRef);

    const copy = siteCopy.case;
    const labels = copy.storyLabels;

    const story: { label: string; modifier: string; text: string }[] = project
        ? [
              project.problem ? { label: labels.problem, modifier: "problem", text: project.problem } : null,
              project.solution ? { label: labels.solution, modifier: "solution", text: project.solution } : null,
              project.challenges ? { label: labels.challenges, modifier: "challenges", text: project.challenges } : null,
              project.results ? { label: labels.results, modifier: "results", text: project.results } : null,
          ].filter((s): s is { label: string; modifier: string; text: string } => s !== null)
        : [];

    const v21 = project?.gallery?.v21Images ?? [];
    const v12 = project?.gallery?.v12Images ?? [];
    const pairCount = Math.min(v21.length, v12.length);
    const pairs: ComparePair[] = Array.from({ length: pairCount }, (_, i) => ({
        before: v12[i],
        after: v21[i],
    }));
    const comparison = project?.gallery?.comparison ?? [];
    const newVersion = project?.gallery?.newVersion;
    const oldVersion = project?.gallery?.oldVersion;

    const toc: { anchor: string; label: string }[] = project
        ? [
              story.length > 0 ? { anchor: "case-historia", label: copy.sections.story } : null,
              project.highlights.length > 0 ? { anchor: "case-destaques", label: copy.sections.highlights } : null,
              pairs.length > 0 ? { anchor: "case-evolucao", label: copy.sections.evolution } : null,
              v21.length > 0 ? { anchor: "case-galeria", label: copy.sections.gallery } : null,
              v12.length > 0 ? { anchor: "case-anterior", label: copy.sections.previous } : null,
              comparison.length > 0 ? { anchor: "case-mudancas", label: copy.sections.changes } : null,
          ].filter((t): t is { anchor: string; label: string } => t !== null)
        : [];

    const activeToc = useActiveIds(toc.map((t) => t.anchor));

    if (!project) {
        const notFound = copy.notFound;
        return (
            <main className="case-page">
                <div className="case-container">
                    <p className="section-eyebrow">{notFound.eyebrow}</p>
                    <h1 className="case-title">{notFound.title}</h1>
                    <p className="case-lede">{notFound.lede}</p>
                    <a className="case-btn case-btn--primary" href="#projetos">
                        {notFound.cta}
                    </a>
                </div>
            </main>
        );
    }

    const prev = projectsContent[(index - 1 + total) % total];
    const next = projectsContent[(index + 1) % total];

    return (
        <main className="case-page">
            <div ref={layoutRef} className="case-layout">
                <div className="case-container case-article">
                    <a className="case-back" href="#projetos">
                        <FaArrowLeft aria-hidden="true" /> {copy.back}
                    </a>

                    <p className="section-eyebrow section-eyebrow--left">{project.subtitle}</p>
                    <h1 className="case-title">{project.title}</h1>
                    <p className="case-lede">{project.description}</p>

                    <div className="case-actions">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="case-btn case-btn--ghost">
                            <FaGithub aria-hidden="true" /> {copy.actions.github}
                        </a>
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="case-btn case-btn--ghost">
                                <FaYoutube aria-hidden="true" /> {copy.actions.demo}
                            </a>
                        )}
                    </div>

                    <div className="project-modal__techs case-techs">
                        {project.technologies.map((tech) => {
                            const meta = technologiesContent.find((t) => t.name === tech);
                            return (
                                <span key={tech}>
                                    <TechIcon name={meta?.icon ?? tech} color={meta?.color ?? "#b45309"} />
                                    {tech}
                                </span>
                            );
                        })}
                    </div>

                    <picture className="case-cover">
                        <source srcSet={project.image.webp} type="image/webp" />
                        <img src={project.image.png} alt={project.image.alt} loading="eager" decoding="async" />
                    </picture>

                    {story.length > 0 && (
                        <section id="case-historia" className="project-modal__case-study" aria-label={copy.sections.story}>
                            {story.map((block) => (
                                <div key={block.modifier} className="case-study__block">
                                    <h2 className={`case-study__label case-study__label--${block.modifier}`}>
                                        {block.label}
                                    </h2>
                                    <p>{block.text}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {project.highlights.length > 0 && (
                        <section id="case-destaques" aria-label={copy.sections.highlights}>
                            <h2 className="case-section-title">{copy.sections.highlights}</h2>
                            <ul className="project-modal__highlights">
                                {project.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {pairs.length > 0 && (
                        <section id="case-evolucao" aria-label={copy.sections.evolution}>
                            <h2 className="case-section-title">
                                {copy.sections.evolution}
                                {newVersion && oldVersion ? ` — ${oldVersion} → ${newVersion}` : ""}
                            </h2>
                            <CompareSlider
                                pairs={pairs}
                                beforeLabel={oldVersion ?? ""}
                                afterLabel={newVersion ?? ""}
                                alt={project.title}
                            />
                        </section>
                    )}

                    {v21.length > 0 && (
                        <section id="case-galeria" aria-label={copy.sections.gallery}>
                            <h2 className="case-section-title">
                                {copy.sections.gallery}{newVersion ? ` — ${newVersion}` : ""}
                            </h2>
                            <div className="case-gallery">
                                {v21.map((src) => (
                                    <img key={src} src={src} alt={`Captura do ${project.title}`} loading="lazy" decoding="async" />
                                ))}
                            </div>
                        </section>
                    )}

                    {v12.length > 0 && (
                        <section id="case-anterior" aria-label={copy.sections.previous}>
                            <h2 className="case-section-title">
                                {copy.sections.previous}{oldVersion ? ` — ${oldVersion}` : ""}
                            </h2>
                            <div className="case-gallery">
                                {v12.map((src) => (
                                    <img key={src} src={src} alt={`Captura antiga do ${project.title}`} loading="lazy" decoding="async" />
                                ))}
                            </div>
                        </section>
                    )}

                    {comparison.length > 0 && (
                        <section id="case-mudancas" aria-label={copy.sections.changes}>
                            <h2 className="case-section-title">{copy.sections.changes}</h2>
                            <div className="project-modal-template__comparison">
                                <table className="project-modal-template__comparison-table">
                                    <thead>
                                        <tr>
                                            <th>Recurso</th>
                                            <th>Antes</th>
                                            <th>Depois</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.map((row) => (
                                            <tr key={row.feature}>
                                                <td>{row.feature}</td>
                                                <td className="comparison-old">{row.from}</td>
                                                <td className="comparison-new">{row.to}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    <nav className="case-pager" aria-label="Navegar entre projetos">
                        <a href={`#/projeto/${prev.id}`}>
                            <FaArrowLeft aria-hidden="true" />
                            <span>
                                <small>{copy.pager.prev}</small>
                                {prev.title}
                            </span>
                        </a>
                        <a href={`#/projeto/${next.id}`}>
                            <span>
                                <small>{copy.pager.next}</small>
                                {next.title}
                            </span>
                            <FaArrowRight aria-hidden="true" />
                        </a>
                    </nav>
                </div>

                {toc.length > 1 && (
                    <aside className="case-toc" aria-label={copy.toc.title}>
                        <div className="case-toc__rail" aria-hidden="true" />
                        <p className="case-toc__title">{copy.toc.title}</p>
                        <ul>
                            {toc.map((item) => (
                                <li key={item.anchor}>
                                    <a
                                        href={`#/projeto/${project.id}#${item.anchor}`}
                                        className={`case-toc__link${activeToc === item.anchor ? " case-toc__link--active" : ""}`}
                                        aria-current={activeToc === item.anchor ? "true" : undefined}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                                            document
                                                .getElementById(item.anchor)
                                                ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
            </div>
        </main>
    );
}
