import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { IconType } from "react-icons";
import { SiReact, SiTypescript, SiTailwindcss, SiElectron, SiVite, SiJavascript } from "react-icons/si";

const technologies: { name: string; Icon: IconType; color: string; level: string }[] = [
    { name: "React", Icon: SiReact, color: "#61dafb", level: "Avançado" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6", level: "Intermediário-Avançado" },
    { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e", level: "Avançado" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "#06b6d4", level: "Avançado" },
    { name: "Electron", Icon: SiElectron, color: "#47848f", level: "Avançado" },
    { name: "Vite", Icon: SiVite, color: "#bd34fe", level: "Avançado" },
];

export function TechGrid() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section id="skills" className="section tech-grid-section">
            <FloatingParticles count={isMobile ? 10 : 25} />
            <div className="section-container">
                <h2 className="section-title">
                    Stack & <span className="highlight">Skills</span>
                </h2>
                <p className="section-subtitle">
                    Tecnologias que uso no dia a dia para construir interfaces.
                </p>

                <div className="tech-grid-cards">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="tech-card">
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