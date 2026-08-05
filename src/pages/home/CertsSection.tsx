import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FaAward } from "react-icons/fa6";

const certifications = [
    {
        title: "React — The Complete Guide",
        issuer: "Udemy (Academind)",
        year: "2024",
        description: "Curso completo: hooks, custom hooks, Context API, React Router, Redux, testes e deploy.",
    },
    {
        title: "TypeScript para Desenvolvedores",
        issuer: "Autodidata + Projetos Práticos",
        year: "2024",
        description: "Tipagem avançada, generics, interfaces, union types, narrowing e padrões de design em TypeScript.",
    },
    {
        title: "Electron — Desktop Apps",
        issuer: "Autodidata + Projetos Práticos",
        year: "2024-2025",
        description: "Domínio de Electron adquirido construindo o ALFA PDF Reader — IPC, instaladores NSIS, registro de sistema e integração com Windows.",
    },
];

export function CertsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section className="section certs-section">
            <FloatingParticles count={isMobile ? 10 : 25} />
            <div className="section-container">
                <h2 className="section-title">
                    <span className="highlight">Certificações</span>
                </h2>
                <p className="section-subtitle">
                    Cursos e formações que complementam a bagagem prática.
                </p>

                <div className="certs-grid">
                    {certifications.map((cert) => (
                        <div key={cert.title} className="cert-card">
                            <div className="cert-icon">
                                <FaAward />
                            </div>
                            <div className="cert-info">
                                <h4>{cert.title}</h4>
                                <span className="cert-issuer">{cert.issuer}</span>
                                <span className="cert-year">{cert.year}</span>
                                <p>{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}