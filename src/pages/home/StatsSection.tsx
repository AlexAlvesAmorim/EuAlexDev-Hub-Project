import { type CSSProperties } from "react";
import { FloatingParticles } from "../../components/BackgroundTexture/FloatingParticles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useCountUp } from "../../hooks/useCountUp";
import { useReveal } from "../../hooks/useReveal";
import { buildStats, siteCopy } from "../../content/loader";

const stats = buildStats();

function parseStat(value: string) {
    const match = value.match(/^(\d+)(.*)$/);
    return { target: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

function StatMetric({ value, label, active, index }: { value: string; label: string; active: boolean; index: number }) {
    const { target, suffix } = parseStat(value);
    const current = useCountUp(target, active);
    return (
        <div
            className="stat-metric reveal-child"
            style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
        >
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
            <div ref={revealRef} className={`section-container reveal reveal-stagger${visible ? " is-visible" : ""}`}>
                <h2 className="section-title">
                    Números que <span className="highlight">contam</span>
                </h2>
                <p className="section-subtitle">
                    {siteCopy.stats.subtitle}
                </p>

                <div className="stats-strip">
                    {stats.map((stat, index) => (
                        <StatMetric key={stat.label} value={stat.value} label={stat.label} active={visible} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
