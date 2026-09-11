import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { technologies, TECH_CATEGORIES } from "../../data/technologies";

export function TechGrid() {
    const isMobile = useMediaQuery('(max-width: 768px)');

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

                {TECH_CATEGORIES.map((category) => (
                    <div key={category} className="tech-category">
                        <h3 className="tech-category-title">{category}</h3>
                        <div className="tech-grid-cards">
                            {technologies
                                .filter((tech) => tech.category === category)
                                .map((tech) => (
                                    <div key={tech.name} className="tech-card">
                                        <tech.Icon style={{ color: tech.color }} />
                                        <span className="tech-card-name">{tech.name}</span>
                                        <span className="tech-card-level">{tech.level}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
