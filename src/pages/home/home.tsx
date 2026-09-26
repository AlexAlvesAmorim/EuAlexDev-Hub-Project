import { ProjectSlider } from "../../components/ProjectSlider/ProjectSlider.tsx";
import { FeaturedCases } from "./FeaturedCases.tsx";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa6";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { StatsSection } from "./StatsSection.tsx";
import { Timeline } from "./TimelineSection.tsx";
import { TechGrid } from "./TechGrid.tsx";
import { CertsSection } from "./CertsSection.tsx";
import { CurriculumDropdown } from "../../components/CurriculumMenu/CurriculumDropdown.tsx";
import { siteConfig } from "../../config/site";
import { siteCopy } from "../../content/loader";

export function Home() {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const sectionParticles = isMobile ? 18 : 45
    const [sobreRef, sobreVisible] = useReveal();
    const [agoraRef, agoraVisible] = useReveal();
    const [contatoRef, contatoVisible] = useReveal();
    const onSpotlight = useSpotlight();

    return (
        <main className="w-full min-h-screen">
            <ProjectSlider />

            <FeaturedCases />

            <section id="sobre" className="section">
                <FloatingParticles count={sectionParticles} />

                <div ref={sobreRef} className={`section-container reveal${sobreVisible ? " is-visible" : ""}`}>
                    <p className="section-eyebrow">{siteConfig.sectionEyebrow.sobre}</p>
                    <h2 className="section-title">
                        Sobre <span className="highlight">mim</span>
                    </h2>
                    <p className="section-subtitle">
                        {siteCopy.about.subtitle}
                    </p>

                    <div className="about">
                        <img src={siteCopy.about.photo.src} alt={siteCopy.about.photo.alt} className="about-photo" width={siteCopy.about.photo.width} height={siteCopy.about.photo.height} loading="lazy" decoding="async" />

                        <div className="about-text">
                            {siteCopy.about.paragraphs.map((p, i) => (
                                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                            ))}

                            <div className="about-badges">
                                {siteCopy.about.badges.map((b) => (
                                    <span key={b}>{b}</span>
                                ))}
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

                <div ref={agoraRef} className={`section-container reveal${agoraVisible ? " is-visible" : ""}`}>
                    <p className="section-eyebrow">{siteConfig.sectionEyebrow.now}</p>
                    <h2 className="section-title">
                        O que tá pegando <span className="highlight">agora</span>
                    </h2>
                    <p className="section-subtitle">
                        {siteCopy.now.subtitle}
                    </p>

                    <ul className="now-list">
                        {siteCopy.now.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="contato" className="section">
                <FloatingParticles count={sectionParticles} />

                <div ref={contatoRef} className={`section-container reveal${contatoVisible ? " is-visible" : ""}`}>
                    <p className="section-eyebrow">{siteConfig.sectionEyebrow.contact}</p>
                    <h2 className="section-title">
                        Entre em <span className="highlight">contato</span>
                    </h2>
                    <p className="section-subtitle">
                        {siteCopy.contact.subtitle}
                    </p>

                    <div className="contact-card spotlight" onPointerMove={onSpotlight}>
                        <div className="contact-cta-badge">
                            {siteCopy.contact.badge}
                        </div>
                        <h3>{siteCopy.contact.heading}</h3>
                        <p>
                            {siteCopy.contact.hint}
                        </p>

                        <div className="contact-links">
                            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> GitHub
                            </a>
                            <a href={siteConfig.social.email}>
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
                <p>
                    {siteCopy.footer.madeWith.split("♥").map((part, i, arr) =>
                        i < arr.length - 1 ? (
                            <span key={i}>
                                {part}
                                <span className="heart">♥</span>
                            </span>
                        ) : (
                            part
                        )
                    )}
                </p>
                <p className="colophon">{siteCopy.footer.colophon}</p>
            </footer>
        </main>
    )
}
