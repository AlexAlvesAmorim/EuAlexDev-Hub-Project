import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { timelineContent } from "../../content/loader";

const milestones = timelineContent;

export function Timeline() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section id="jornada" className="section timeline-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div className="section-container">
                <h2 className="section-title">
                    Minha <span className="highlight">jornada</span>
                </h2>
                <p className="section-subtitle">
                    De lan house a produto rodando — ano a ano, sem pular etapa.
                </p>

                <div className="timeline">
                    {milestones.map((item, i) => (
                        <div key={item.year + item.title} className={`timeline-item ${i % 2 === 0 ? "timeline-left" : "timeline-right"}`}>
                            <div className="timeline-dot" />
                            <div className="timeline-card">
                                <span className="timeline-year">{item.year}</span>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}