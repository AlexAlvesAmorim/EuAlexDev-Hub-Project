import { FaArrowLeft, FaArrowRight, FaGithub, FaYoutube } from "react-icons/fa6";
import { projectsContent, technologiesContent } from "../../content/loader";
import { TechIcon } from "../../components/TechIcon";

/**
 * Página de case por rota (`#/projeto/<id>`): a história completa que no
 * carrossel aparece resumida no modal. Reusa o vocabulário visual do modal
 * (techs, highlights, blocos de case, tabela de comparação).
 */
export function CasePage({ id }: { id: string }) {
    const total = projectsContent.length;
    const index = projectsContent.findIndex((p) => p.id === id);

    if (index < 0) {
        return (
            <main className="case-page">
                <div className="case-container">
                    <p className="section-eyebrow">404</p>
                    <h1 className="case-title">Projeto não encontrado</h1>
                    <p className="case-lede">
                        Esse case não existe (ou mudou de nome). Volta pra vitrine que tem coisa boa lá.
                    </p>
                    <a className="case-btn case-btn--primary" href="#projetos">
                        Ver projetos
                    </a>
                </div>
            </main>
        );
    }

    const project = projectsContent[index];
    const prev = projectsContent[(index - 1 + total) % total];
    const next = projectsContent[(index + 1) % total];

    const story: { label: string; modifier: string; text: string }[] = [
        project.problem ? { label: "Problema", modifier: "problem", text: project.problem } : null,
        project.solution ? { label: "Solução", modifier: "solution", text: project.solution } : null,
        project.challenges ? { label: "Perrengues", modifier: "challenges", text: project.challenges } : null,
        project.results ? { label: "Resultado", modifier: "results", text: project.results } : null,
    ].filter((s): s is { label: string; modifier: string; text: string } => s !== null);

    return (
        <main className="case-page">
            <div className="case-container">
                <a className="case-back" href="#projetos">
                    <FaArrowLeft aria-hidden="true" /> Todos os projetos
                </a>

                <p className="section-eyebrow section-eyebrow--left">{project.subtitle}</p>
                <h1 className="case-title">{project.title}</h1>
                <p className="case-lede">{project.description}</p>

                <div className="case-actions">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="case-btn case-btn--ghost">
                        <FaGithub aria-hidden="true" /> Ver no GitHub
                    </a>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="case-btn case-btn--ghost">
                            <FaYoutube aria-hidden="true" /> Ver demo
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
                    <div className="project-modal__case-study">
                        {story.map((block) => (
                            <div key={block.modifier} className="case-study__block">
                                <h2 className={`case-study__label case-study__label--${block.modifier}`}>
                                    {block.label}
                                </h2>
                                <p>{block.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {project.highlights.length > 0 && (
                    <>
                        <h2 className="case-section-title">Destaques</h2>
                        <ul className="project-modal__highlights">
                            {project.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </>
                )}

                {project.gallery && project.gallery.v21Images.length > 0 && (
                    <>
                        <h2 className="case-section-title">
                            Galeria{project.gallery.newVersion ? ` — ${project.gallery.newVersion}` : ""}
                        </h2>
                        <div className="case-gallery">
                            {project.gallery.v21Images.map((src) => (
                                <img key={src} src={src} alt={`Captura do ${project.title}`} loading="lazy" decoding="async" />
                            ))}
                        </div>
                    </>
                )}

                {project.gallery && project.gallery.v12Images.length > 0 && (
                    <>
                        <h2 className="case-section-title">
                            Versão anterior{project.gallery.oldVersion ? ` — ${project.gallery.oldVersion}` : ""}
                        </h2>
                        <div className="case-gallery">
                            {project.gallery.v12Images.map((src) => (
                                <img key={src} src={src} alt={`Captura antiga do ${project.title}`} loading="lazy" decoding="async" />
                            ))}
                        </div>
                    </>
                )}

                {project.gallery && project.gallery.comparison.length > 0 && (
                    <>
                        <h2 className="case-section-title">O que mudou</h2>
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
                                    {project.gallery.comparison.map((row) => (
                                        <tr key={row.feature}>
                                            <td>{row.feature}</td>
                                            <td className="comparison-old">{row.from}</td>
                                            <td className="comparison-new">{row.to}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <nav className="case-pager" aria-label="Navegar entre projetos">
                    <a href={`#/projeto/${prev.id}`}>
                        <FaArrowLeft aria-hidden="true" />
                        <span>
                            <small>Anterior</small>
                            {prev.title}
                        </span>
                    </a>
                    <a href={`#/projeto/${next.id}`}>
                        <span>
                            <small>Próximo</small>
                            {next.title}
                        </span>
                        <FaArrowRight aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </main>
    );
}
