import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { useScrollRail } from "../../hooks/useScrollRail";
import { TechIcon } from "../../components/TechIcon";
import { siteCopy, technologiesContent } from "../../content/loader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TECH_CATEGORIES = [...new Set(technologiesContent.map((t) => t.category))];
const railCopy = siteCopy.stack;

export function TechGrid() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [active, setActive] = useState<string>(TECH_CATEGORIES[0]);
    const [revealRef, visible] = useReveal();
    const onSpotlight = useSpotlight();
    const { trackRef, page, pageCount, canPrev, canNext, prev, next, goTo, reset } =
        useScrollRail<HTMLDivElement>();

    const items = technologiesContent.filter((tech) => tech.category === active);
    const showControls = pageCount > 1;

    const selectCategory = (category: string) => {
        setActive(category);
        reset();
    };

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
        <section id="skills" className="section tech-grid-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal${visible ? " is-visible" : ""}`}>
                <h2 className="section-title tech-grid-heading">
                    Stack & <span className="highlight">Skills</span>
                </h2>
                <p className="section-subtitle">{railCopy.subtitle}</p>

                <div className="tech-tabs" role="tablist" aria-label="Categorias de tecnologias">
                    {TECH_CATEGORIES.map((category) => {
                        const count = technologiesContent.filter((tech) => tech.category === category).length;
                        const selected = active === category;
                        return (
                            <button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                className={`tech-tab${selected ? " active" : ""}`}
                                onClick={() => selectCategory(category)}
                            >
                                {category} <span className="tech-tab-count">{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="rail">
                    <div
                        ref={trackRef}
                        className="rail-track tech-rail-track"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label={railCopy.region}
                        tabIndex={0}
                        onKeyDown={onTrackKeyDown}
                    >
                        <div key={active} className="rail-page" role="tabpanel">
                            {items.map((tech, index) => (
                                <div
                                    key={tech.name}
                                    className="rail-item tech-card tech-card--enter spotlight"
                                    onPointerMove={onSpotlight}
                                    style={{
                                        animationDelay: `${index * 60}ms`,
                                        '--tech-color': tech.color,
                                    } as CSSProperties}
                                >
                                    <span
                                        className="tech-card-icon"
                                        style={{
                                            background: `color-mix(in srgb, ${tech.color} 18%, transparent)`,
                                            borderColor: `color-mix(in srgb, ${tech.color} 45%, transparent)`,
                                        }}
                                    >
                                        <TechIcon name={tech.icon} color={tech.color} />
                                    </span>
                                    <span className="tech-card-name">{tech.name}</span>
                                    <span className="tech-card-level">{tech.level}</span>
                                </div>
                            ))}
                        </div>
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
