import { type CSSProperties } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { siteConfig } from "../../config/site";
import { projectsContent, siteCopy } from "../../content/loader";

/**
 * Cases em destaque: teaser editorial dos projetos com `featured: true`,
 * linkando pras páginas de case (#/projeto/<id>). Fica logo após o carrossel.
 */
export function FeaturedCases() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [revealRef, visible] = useReveal();
    const featured = projectsContent.filter((p) => p.featured);

    if (featured.length === 0) return null;

    return (
        <section id="destaques" className="section featured-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal reveal-stagger${visible ? " is-visible" : ""}`}>
                <p className="section-eyebrow">{siteConfig.sectionEyebrow.destaques}</p>
                <h2 className="section-title">
                    {siteCopy.featured.titleA} <span className="highlight">{siteCopy.featured.titleHighlight}</span>
                </h2>
                <p className="section-subtitle">{siteCopy.featured.subtitle}</p>

                <div className="featured-rows">
                    {featured.map((project, index) => (
                        <article
                            key={project.id}
                            className={`featured-row reveal-child${index % 2 === 1 ? " featured-row--flip" : ""}`}
                            style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
                        >
                            <a
                                className="featured-media"
                                href={`#/projeto/${project.id}`}
                                aria-label={`Ler o case ${project.title}`}
                            >
                                <picture>
                                    <source srcSet={project.image.webp} type="image/webp" />
                                    <img
                                        src={project.image.png}
                                        alt={project.image.alt}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </picture>
                            </a>
                            <div className="featured-body">
                                <p className="featured-kicker">{project.subtitle}</p>
                                <h3>{project.title}</h3>
                                <p className="featured-desc">{project.description}</p>
                                {project.results && (
                                    <p className="featured-result">
                                        <strong>Resultado:</strong> {project.results}
                                    </p>
                                )}
                                <a className="featured-link" href={`#/projeto/${project.id}`}>
                                    Ler case completo <FaArrowRight aria-hidden="true" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
