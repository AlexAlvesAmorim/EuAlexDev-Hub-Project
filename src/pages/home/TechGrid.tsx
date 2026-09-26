import { useState } from "react";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { TechIcon } from "../../components/TechIcon";
import { siteConfig } from "../../config/site";
import { technologiesContent } from "../../content/loader";

const TECH_CATEGORIES = [...new Set(technologiesContent.map((t) => t.category))];

export function TechGrid() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [active, setActive] = useState<string>(TECH_CATEGORIES[0]);
    const [revealRef, visible] = useReveal();
    const onSpotlight = useSpotlight();

    return (
        <section id="skills" className="section tech-grid-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal${visible ? " is-visible" : ""}`}>
                <p className="section-eyebrow">{siteConfig.sectionEyebrow.stack}</p>
                <h2 className="section-title">
                    Stack & <span className="highlight">Skills</span>
                </h2>
                <p className="section-subtitle">
                    Do front ao back: o que uso pra tirar produto do papel — e os fundamentos que sustentam tudo.
                </p>

                <div className="tech-tabs" role="tablist" aria-label="Categorias de tecnologias">
                    {TECH_CATEGORIES.map((category) => {
                        const count = technologiesContent.filter((tech) => tech.category === category).length;
                        const selected = active === category;
                        return (
                            <button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                className={`tech-tab${selected ? " active" : ""}`}
                                onClick={() => setActive(category)}
                            >
                                {category} <span className="tech-tab-count">{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div key={active} className="tech-grid-cards tech-grid-cards--animate" role="tabpanel">
                    {technologiesContent
                        .filter((tech) => tech.category === active)
                        .map((tech, index) => (
                            <div
                                key={tech.name}
                                className="tech-card tech-card--enter spotlight"
                                onPointerMove={onSpotlight}
                                style={{ animationDelay: `${index * 60}ms` }}
                            >
                                <span
                                    className="tech-card-icon"
                                    style={{
                                        background: `color-mix(in srgb, ${tech.color} 12%, transparent)`,
                                        borderColor: `color-mix(in srgb, ${tech.color} 38%, transparent)`,
                                    }}
                                >
                                    <TechIcon name={tech.icon} color={tech.color} />
                                </span>
                                <span className="tech-card-name">{tech.name}</span>
                                <span className="tech-card-level">{tech.level}</span>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
