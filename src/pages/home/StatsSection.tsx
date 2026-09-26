import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { buildStats, siteCopy } from "../../content/loader";

const stats = buildStats();

export function StatsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section id="estatisticas" className="section stats-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div className="section-container">
                <h2 className="section-title">
                    Números que <span className="highlight">contam</span>
                </h2>
                <p className="section-subtitle">
                    {siteCopy.stats.subtitle}
                </p>

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}