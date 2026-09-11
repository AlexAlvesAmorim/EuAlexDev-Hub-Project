import { ProjectSlider } from "../../components/ProjectSlider/ProjectSlider.tsx";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa6";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StatsSection } from "./StatsSection.tsx";
import { Timeline } from "./TimelineSection.tsx";
import { TechGrid } from "./TechGrid.tsx";
import { CertsSection } from "./CertsSection.tsx";
import { CurriculumDropdown } from "../../components/CurriculumMenu/CurriculumDropdown.tsx";

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
                        Nascido na Cidade de Deus, forjado no suporte, feito desenvolvedor na raça.
                    </p>

                    <div className="about">
                        <img src="/Hero.webp" alt="Foto do Alex" className="about-photo" width="340" height="453" loading="lazy" decoding="async" />

                        <div className="about-text">
                            <p>
                                Sou <strong>nascido e criado na Cidade de Deus</strong>, favela do Rio de Janeiro.
                                Onde eu cresci, computador não era ferramenta de estudo, era luxo dividido na lan house.
                                Aprendi a fuçar porque precisava: desmontar, formatar, fazer voltar a funcionar.
                                Ninguém me deu atalho. Aprendi tudo <strong>autodidata</strong>, de madrugada, entre um trampo e outro.
                            </p>
                            <p>
                                Passei 15 anos no suporte técnico, do N1 ao N3, olhando no olho de quem travava
                                num sistema ruim. Foi ali que virou a chave: eu não queria mais só consertar a tela dos outros,
                                eu queria construir a tela certa. Migrei pro Front-End sozinho — <strong>React</strong>, <strong>TypeScript</strong>, <strong>Electron</strong> —
                                construindo produto de verdade, não exercício de tutorial.
                            </p>
                            <p>
                                Meus projetos são a prova: o <strong>ALFA PDF Reader</strong> com 200+ usuários, a <strong>Fabulosa E-Commerce</strong> vendida
                                em negociação B2B, o <strong>99Food Analyser</strong> feito quase todo offline, e o <strong>Alfa Curriculum Maker</strong> gratuito
                                pra quem precisa de emprego. Sou Dev de Favela com orgulho — e o que me move é o mesmo do suporte:
                                resolver a dor de quem tá do outro lado da tela.
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

            <section id="agora" className="section">
                <FloatingParticles count={sectionParticles} />

                <div className="section-container">
                    <h2 className="section-title">
                        O que tá pegando <span className="highlight">agora</span>
                    </h2>
                    <p className="section-subtitle">
                        Sem assessoria de imprensa — atualizo quando a vida muda.
                    </p>

                    <ul className="now-list">
                        <li><span aria-hidden="true">💼</span> Open to work: buscando minha primeira vaga CLT/PJ full-stack — RJ ou remoto.</li>
                        <li><span aria-hidden="true">📚</span> Recém-saído do CS50x, agora tô estudando Next.js e checkout com pagamentos.</li>
                        <li><span aria-hidden="true">🔧</span> Mantendo o ALFA PDF Reader — 200+ usuários não se largam sozinhos.</li>
                        <li><span aria-hidden="true">🎬</span> Contando a jornada no canal @DevdeFavela, pra quem vem da quebrada também.</li>
                    </ul>
                </div>
            </section>

            <section id="contato" className="section">
                <FloatingParticles count={sectionParticles} />

                <div className="section-container">
                    <h2 className="section-title">
                        Entre em <span className="highlight">contato</span>
                    </h2>
                    <p className="section-subtitle">
                        Tem ideia, vaga ou perrengue técnico? Me chama.
                    </p>

                    <div className="contact-card">
                        <div className="contact-cta-badge">
                            Aberto a oportunidades
                        </div>
                        <h3>Bora construir algo que preste?</h3>
                        <p>
                            LinkedIn é o caminho mais rápido — mas pode chamar onde preferir.
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
                        </div>
                        <div className="mt-8 pt-6 border-t border-border/60">
                            <CurriculumDropdown variant="contact" />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>Feito com <span className="heart">♥</span> pelo Alex — Dev de Favela</p>
                <p className="colophon">Feito à mão com React + TypeScript — sem template, sem gerador. Foto em WebP de 36KB, café coado e teste em hardware real.</p>
            </footer>
        </main>
    )
}
