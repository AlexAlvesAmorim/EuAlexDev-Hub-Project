import { ProjectSlider } from "../../components/ProjectSlider/ProjectSlider.tsx";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa6";

export function Home() {
    return (
        <main className="w-full min-h-screen">
            <ProjectSlider />

            <section id="sobre" className="section">
                <div className="section-container">
                    <h2 className="section-title">
                        Sobre <span className="highlight">mim</span>
                    </h2>
                    <p className="section-subtitle">
                        Front-end que gosta de transformar ideia em interface que funciona.
                    </p>

                    <div className="about">
                        <img src="/Hero.png" alt="Foto do Alex" className="about-photo" />

                        <div className="about-text">
                            <p>
                                E aí! Sou o Alex Alves Amorim, desenvolvedor front-end. Criei este hub
                                pra reunir os projetos que vou construindo no caminho — a ideia é ir
                                lapidando cada um conforme vou aprendendo mais.
                            </p>
                            <p>
                                Gosto de React, TypeScript e de estudar aqueles detalhes que parecem
                                simples, mas que fazem diferença na hora de usar. Também tenho um
                                carinho especial por Electron pra brincar com apps de desktop.
                            </p>
                            <p>
                                A meta é crescer, codar todo dia e deixar tudo que eu faço com cara
                                de produto, não de exercício.
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

            <section id="contato" className="section">
                <div className="section-container">
                    <h2 className="section-title">
                        Fala <span className="highlight">comigo</span>
                    </h2>
                    <p className="section-subtitle">
                        Quer trocar uma ideia sobre algum projeto ou dar um feedback? Me chama!
                    </p>

                    <div className="contact-card">
                        <h3>Bora conversar?</h3>
                        <p>
                            Respondo mais rápido pelo GitHub, mas dá pra me achar nos links abaixo.
                        </p>

                        <div className="contact-links">
                            <a href="https://github.com/AlexAlvesAmorim" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> GitHub
                            </a>
                            <a href="mailto:alex.a.amorim@outlook.com">
                                <FaEnvelope /> E-mail
                            </a>
                            <a href="https://www.linkedin.com/in/alex-a-amorim/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin /> LinkedIn
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
