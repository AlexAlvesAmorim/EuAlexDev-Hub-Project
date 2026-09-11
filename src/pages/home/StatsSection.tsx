import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { projects } from "../../data/project";
import { technologies } from "../../data/technologies";

const stats = [
    { value: "20+", label: "Anos em TI" },
    { value: String(projects.length), label: "Produtos entregues" },
    { value: String(technologies.length), label: "Techs no cinto" },
    { value: "1", label: "Venda B2B fechada" },
];

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
                    Conversa convence. Número prova.
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