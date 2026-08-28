import { ProjectSlider } from "../../components/ProjectSlider/ProjectSlider.tsx";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { FaGithub, FaEnvelope, FaLinkedin, FaFilePdf } from "react-icons/fa6";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StatsSection } from "./StatsSection.tsx";
import { Timeline } from "./TimelineSection.tsx";
import { TechGrid } from "./TechGrid.tsx";
import { CertsSection } from "./CertsSection.tsx";

export function Home() {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const sectionParticles = isMobile ? 18 : 45

    return (
        <main className="w-full min-h-screen">
            <ProjectSlider />

            <section id="sobre" className="section">
                <FloatingParticles count={sectionParticles} />

                <div className="section-container">
                    <h2 className="section-title">
                        Sobre <span className="highlight">mim</span>
                    </h2>
                    <p className="section-subtitle">
                        De suporte técnico a front-end — uma jornada construída com código.
                    </p>

                    <div className="about">
                        <img src="/Hero.png" alt="Foto do Alex" className="about-photo" width="340" height="453" loading="lazy" decoding="async" />

                        <div className="about-text">
                            <p>
                                Minha jornada com tecnologia não começou com um "Hello World". Começou em frente a
                                pessoas frustradas com sistemas que deveriam ajudar, mas só complicavam. Passei anos
                                em suporte técnico olhando nos olhos de quem dependia de um software pra trabalhar
                                — e foi ali que entendi que tecnologia boa não é a que tem mais recursos, é a que
                                resolve sem atrapalhar.
                            </p>
                            <p>
                                Essa vivência moldou como eu programo hoje. Migrei pro Front-End quando percebi que
                                eu podia ser a pessoa que constrói a interface que falta — a que é direta, fluida e
                                pensada de verdade no humano do outro lado.
                            </p>
                            <p>
                                Trabalho com <strong>React</strong>, <strong>TypeScript</strong> e <strong>Electron</strong> — com um aplicativo desktop em produção para mais de 200 usuários —
                                e quanto a estudar cada detalhe que parece simples, mas faz toda a diferença
                                na hora de usar, aprendi na prática. Cada projeto aqui foi lapidado com o cuidado de
                                quem sabe o peso de uma experiência ruim — e escolheu entregar o oposto.
                            </p>

                            <div className="about-badges">
                                <span>React</span>
                                <span>TypeScript</span>
                                <span>Tailwind</span>
                                <span>Electron</span>
                                <span>Vite</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StatsSection />

            <Timeline />

            <TechGrid />

            <CertsSection />

            <section id="contato" className="section">
                <FloatingParticles count={sectionParticles} />

                <div className="section-container">
                    <h2 className="section-title">
                        Entre em <span className="highlight">contato</span>
                    </h2>
                    <p className="section-subtitle">
                        Interessado em colaborar ou discutir um projeto? Vamos conversar.
                    </p>

                    <div className="contact-card">
                        <div className="contact-cta-badge">
                            Aberto a oportunidades
                        </div>
                        <h3>Vamos construir algo relevante?</h3>
                        <p>
                            Respondo com mais agilidade pelo LinkedIn. Você também pode me encontrar nos canais abaixo.
                        </p>

                        <div className="contact-links">
                            <a href="https://www.linkedin.com/in/alex-a-amorim/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a href="https://github.com/AlexAlvesAmorim" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> GitHub
                            </a>
                            <a href="mailto:alex.a.amorim@outlook.com">
                                <FaEnvelope /> E-mail
                            </a>
                            <a href="/curriculo-alex-alves-amorim.pdf" download>
                                <FaFilePdf /> Currículo
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>Feito com <span className="heart">♥</span> pelo Alex — Dev de Favela</p>
            </footer>
        </main>
    )
}
