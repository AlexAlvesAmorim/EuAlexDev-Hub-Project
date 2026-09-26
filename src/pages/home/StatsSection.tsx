import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useCountUp } from "../../hooks/useCountUp";
import { useReveal } from "../../hooks/useReveal";
import { useSpotlight } from "../../hooks/useSpotlight";
import { siteConfig } from "../../config/site";
import { buildStats, siteCopy } from "../../content/loader";

const stats = buildStats();

function parseStat(value: string) {
    const match = value.match(/^(\d+)(.*)$/);
    return { target: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

function StatCard({ value, label, active }: { value: string; label: string; active: boolean }) {
    const { target, suffix } = parseStat(value);
    const current = useCountUp(target, active);
    const onPointerMove = useSpotlight();
    return (
        <div className="stat-card spotlight" onPointerMove={onPointerMove}>
            <span className="stat-value">{current}{suffix}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

export function StatsSection() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [revealRef, visible] = useReveal();

    return (
        <section id="estatisticas" className="section stats-section">
            <FloatingParticles count={isMobile ? 12 : 30} />
            <div ref={revealRef} className={`section-container reveal${visible ? " is-visible" : ""}`}>
                <p className="section-eyebrow">{siteConfig.sectionEyebrow.stats}</p>
                <h2 className="section-title">
                    Números que <span className="highlight">contam</span>
                </h2>
                <p className="section-subtitle">
                    {siteCopy.stats.subtitle}
                </p>

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} value={stat.value} label={stat.label} active={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}