import { useState, type CSSProperties } from "react";
import type { Project } from "../../types/Project";

export interface ProjectCardProps {
    project: Project
    position: number
    active?: boolean
    onOpen: (project: Project, index: number) => void
}

const subtitleMap: Record<string, string> = {
  "alfa-pdf": "Leitor Desktop • Multi-abas",
  "fabulosa-e-commerce": "E-commerce • Moda",
  "99food-analyser": "Dashboard • Analytics",
  "alfa-curriculum-maker": "Currículos • PDF & Word",
  "dev-hub": "Portfólio • Carrossel 3D",
};

export function ProjectCard({
    project,
    position,
    active = false,
    onOpen,
}: ProjectCardProps) {

    const classes = ["item", active ? "item--active" : ""].filter(Boolean).join(" ")
    const isLCP = position === 1
    const [imageError, setImageError] = useState(false)

    return (
        <div
            className={classes}
            role="button"
            tabIndex={0}
            aria-label={`Ver detalhes de ${project.title}`}
            onClick={() => onOpen(project, position - 1)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onOpen(project, position - 1)
                }
            }}
            style={
                {
                    "--position": position,
                } as CSSProperties
            }
        >

            <picture>
                <source srcSet={project.image} type="image/webp" />
                {!imageError ? (
                    <img
                        src={project.image.replace(/\.webp$/i, ".png")}
                        alt={project.title}
                        loading={isLCP ? "eager" : "lazy"}
                        fetchPriority={isLCP ? "high" : "auto"}
                        decoding="async"
                        width={430}
                        height={588}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="item__fallback" role="img" aria-label={project.title}>
                        <span className="item__fallback-icon" aria-hidden="true">◇</span>
                        <span className="item__fallback-text">{project.title}</span>
                        <span className="item__fallback-hint">imagem indisponível</span>
                    </div>
                )}
            </picture>
            <div className="item__caption">
                <span className="item__title">{project.title}</span>
                <span className="item__subtitle">{subtitleMap[project.id] ?? project.technologies[0]}</span>
            </div>
        </div>

    )
}