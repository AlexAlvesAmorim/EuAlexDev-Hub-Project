import { type CSSProperties, type KeyboardEvent } from "react";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { useScrollRail } from "../../hooks/useScrollRail";
import { certsContent, siteCopy } from "../../content/loader";
import { FaAward, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const certifications = certsContent;
const railCopy = siteCopy.certs;

export function CertsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [revealRef, visible] = useReveal();
    const onSpotlight = useSpotlight();
    const { trackRef, page, pageCount, progress, canPrev, canNext, prev, next, goTo } =
        useScrollRail<HTMLDivElement>();

    const showControls = pageCount > 1;

    const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            prev();
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
        }
    };

    return (
        <section className="section certs-section" id="certificados">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal reveal-stagger${visible ? " is-visible" : ""}`}>
                <h2 className="section-title">
                    <span className="highlight">Certificações</span>
                </h2>
                <p className="section-subtitle">{railCopy.subtitle}</p>

                <div className="rail">
                    <div
                        ref={trackRef}
                        className="rail-track certs-rail-track"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label={railCopy.region}
                        tabIndex={0}
                        onKeyDown={onTrackKeyDown}
                    >
                        {certifications.map((cert, index) => (
                            <article
                                key={cert.title}
                                className="rail-item cert-card reveal-child spotlight"
                                onPointerMove={onSpotlight}
                                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                            >
                                <div className="cert-icon" aria-hidden="true">
                                    <FaAward />
                                </div>
                                <div className="cert-info">
                                    <h4>{cert.title}</h4>
                                    <span className="cert-issuer">{cert.issuer}</span>
                                    <span className="cert-year">{cert.year}</span>
                                    <p>{cert.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="rail-progress" aria-hidden="true">
                        <span style={{ transform: `scaleX(${progress})` }} />
                    </div>

                    {showControls && (
                        <div className="rail-controls">
                            <button
                                type="button"
                                className="rail-btn"
                                onClick={prev}
                                disabled={!canPrev}
                                aria-label={railCopy.prev}
                            >
                                <FaChevronLeft aria-hidden="true" />
                            </button>
                            <div className="rail-dots">
                                {Array.from({ length: pageCount }).map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`rail-dot${index === page ? " active" : ""}`}
                                        onClick={() => goTo(index)}
                                        aria-label={`${railCopy.goTo} ${index + 1}`}
                                        aria-current={index === page ? true : undefined}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="rail-btn"
                                onClick={next}
                                disabled={!canNext}
                                aria-label={railCopy.next}
                            >
                                <FaChevronRight aria-hidden="true" />
                            </button>
                        </div>
                    )}
                    <p className="rail-hint" aria-hidden="true">{railCopy.hint}</p>
                </div>
            </div>
        </section>
    );
}
