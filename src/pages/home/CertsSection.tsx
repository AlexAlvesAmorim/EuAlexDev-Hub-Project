import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FaAward } from "react-icons/fa6";

const certifications = [
    {
        title: "Curso de Informática — Formação Completa",
        issuer: "M. J. M. Informática LTDA. (MDATA)",
        year: "2007-2008",
        description: "300h teóricas e práticas. Média final 9,0. Sistemas Operacionais, Pacote Office, Corel Draw, Photoshop, HTML, Dreamweaver, Flash, Hardware e Manutenção.",
    },
    {
        title: "Curso de React para Iniciantes",
        issuer: "Felipe Rocha • Full Stack Club",
        year: "2025",
        description: "Prática focada em desenvolvimento completo — criação de um sistema de Gestão de Treinos do zero até o deploy em 1 semana.",
    },
    {
        title: "Aprendendo React do Zero",
        issuer: "DevClub | Programação",
        year: "2024",
        description: "Do básico até integração completa frontend + backend, incluindo consumo de APIs REST.",
    },
    {
        title: "Curso de React",
        issuer: "Matheus Battisti - Hora de Codar",
        year: "2024",
        description: "Curso estruturado passo a passo: fundamentos, create-react-app, componentes, props, estado e configuração do ambiente React.",
    },
    {
        title: "TypeScript para Desenvolvedores",
        issuer: "Alura",
        year: "2024",
        description: "Tipagem avançada, generics, interfaces, union types, narrowing e padrões de design em TypeScript.",
    },
    {
        title: "Electron — Desktop Apps",
        issuer: "Autodidata + Projetos Práticos",
        year: "2024-2025",
        description: "Domínio de Electron aplicado no ALFA PDF Reader — leitor desktop com 200+ usuários, IPC, instaladores NSIS, registro de sistema e integração nativa com Windows.",
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