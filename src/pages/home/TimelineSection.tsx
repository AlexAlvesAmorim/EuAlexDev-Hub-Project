import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const milestones = [
    {
        year: "2005",
        title: "Início em Suporte Técnico (N1)",
        description: "Primeiro contato com TI no Galacticus CyberCaffé — configuração de redes, instalação de sistemas operacionais e atendimento presencial."
    },
    {
        year: "2007",
        title: "Gestão e Infraestrutura (N2)",
        description: "Administração na Bronze LanHouse/Papelaria: operações, infraestrutura de redes, manutenção de alta disponibilidade. Paralelamente, formação na MDATA (300h)."
    },
    {
        year: "2013",
        title: "TI + Web Design (N2)",
        description: "Na TecInfo TemTudo, uni suporte técnico com criação visual — materiais gráficos, identidades visuais e soluções completas."
    },
    {
        year: "2016",
        title: "Suporte Avançado (N3)",
        description: "InfoStarter: reparos de placas lógicas, diagnósticos complexos em hardware/software para clientes corporativos e residenciais."
    },
    {
        year: "2022",
        title: "Técnico N3 + Freelancer Dev",
        description: "InfoMorais.com com redução significativa no tempo de resolução de chamados. Em paralelo, iniciei transição para desenvolvimento front-end."
    },
    {
        year: "2023",
        title: "Desenvolvedor Front-End Freelancer",
        description: "Migrei de vez pro desenvolvimento. React, TypeScript, Electron viraram minha stack principal. Fundei a ALVS — construindo produtos, não exercícios."
    },
    {
        year: "2024",
        title: "E-Commerce Vendido (B2B)",
        description: "Primeiro projeto vendido: Fabulosa E-Commerce. Validação real no mercado. Mesmo ano: ALFA PDF Reader como app desktop completo."
    },
    {
        year: "2025",
        title: "Dashboard & Portfólio 3D",
        description: "99Food Analyser (dashboard off-grid) e Dev. de Favela Hub (carrossel 3D autoral). Ambos construídos com foco em entrega de produto."
    },
];

export function Timeline() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section id="jornada" className="section timeline-section">
            <FloatingParticles count={isMobile ? 10 : 25} />
            <div className="section-container">
                <h2 className="section-title">
                    Minha <span className="highlight">jornada</span>
                </h2>
                <p className="section-subtitle">
                    Marcos importantes na transição de suporte para desenvolvimento.
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