import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { certsContent } from "../../content/loader";
import { FaAward } from "react-icons/fa6";

const certifications = certsContent;

export function CertsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section className="section certs-section" id="certificados">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div className="section-container">
                <h2 className="section-title">
                    <span className="highlight">Certificações</span>
                </h2>
                <p className="section-subtitle">
                    Certificado abre porta. Produto mantém aberta.
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