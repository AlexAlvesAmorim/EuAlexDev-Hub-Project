import { useState } from "react";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { technologies, TECH_CATEGORIES, type TechCategory } from "../../data/technologies";

export function TechGrid() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [active, setActive] = useState<TechCategory>("Front-end");

    return (
        <section id="skills" className="section tech-grid-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div className="section-container">
                <h2 className="section-title">
                    Stack & <span className="highlight">Skills</span>
                </h2>
                <p className="section-subtitle">
                    Do front ao back: o que uso pra tirar produto do papel — e os fundamentos que sustentam tudo.
                </p>

                <div className="tech-tabs" role="tablist" aria-label="Categorias de tecnologias">
                    {TECH_CATEGORIES.map((category) => {
                        const count = technologies.filter((tech) => tech.category === category).length;
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
                    {technologies
                        .filter((tech) => tech.category === active)
                        .map((tech, index) => (
                            <div
                                key={tech.name}
                                className="tech-card tech-card--enter"
                                style={{ animationDelay: `${index * 60}ms` }}
                            >
                                <tech.Icon style={{ color: tech.color }} />
                                <span className="tech-card-name">{tech.name}</span>
                                <span className="tech-card-level">{tech.level}</span>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
