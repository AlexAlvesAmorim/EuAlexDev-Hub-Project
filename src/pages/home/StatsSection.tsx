import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const stats = [
    { value: "21+", label: "Anos em TI" },
    { value: "4", label: "Projetos no Hub" },
    { value: "7", label: "Tecnologias Core" },
    { value: "1", label: "E-commerce Vendido (B2B)" },
];

export function StatsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section id="estatisticas" className="section stats-section">
            <FloatingParticles count={isMobile ? 10 : 25} />
            <div className="section-container">
                <h2 className="section-title">
                    Números que <span className="highlight">contam</span>
                </h2>
                <p className="section-subtitle">
                    Porque métricas falam mais que currículo.
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