import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { siteConfig } from "../../config/site";
import { certsContent } from "../../content/loader";
import { FaAward } from "react-icons/fa6";

const certifications = certsContent;

export function CertsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [revealRef, visible] = useReveal();
    const onSpotlight = useSpotlight();

    return (
        <section className="section certs-section" id="certificados">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal${visible ? " is-visible" : ""}`}>
                <p className="section-eyebrow">{siteConfig.sectionEyebrow.certs}</p>
                <h2 className="section-title">
                    <span className="highlight">Certificações</span>
                </h2>
                <p className="section-subtitle">
                    Certificado abre porta. Produto mantém aberta.
                </p>

                <div className="certs-grid">
                    {certifications.map((cert) => (
                        <div key={cert.title} className="cert-card spotlight" onPointerMove={onSpotlight}>
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