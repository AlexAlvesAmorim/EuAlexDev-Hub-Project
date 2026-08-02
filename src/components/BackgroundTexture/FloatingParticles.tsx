import { useMemo } from "react";

interface Particle {
    id: number
    size: number
    left: number
    duration: number
    delay: number
}

function mulberry32(seed: number) {
    return () => {
        seed |= 0
        seed = (seed + 0x6D2B79F5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

export function FloatingParticles({ count = 100 }: {
    count?: number
}) {
    const particles = useMemo<Particle[]>(() => {
        const rand = mulberry32(count)
        return Array.from({ length: count }, (_, id) => ({
            id,
            size: rand() * 4 + 2,
            left: rand() * 100,
            duration: rand() * 10 + 10,
            delay: rand() * 10,
        }))
    }, [count])

    return (
        <div className="particles-container">
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${-p.delay}s`,
                    }}
                />
            ))}
        </div>
    )

}
