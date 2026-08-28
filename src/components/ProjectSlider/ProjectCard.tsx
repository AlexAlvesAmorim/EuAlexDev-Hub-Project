import type { CSSProperties } from "react";
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
                {/* WebP otimizado (23–58KB vs 480KB PNG) */}
                <source srcSet={project.image} type="image/webp" />
                <img
                    src={project.image.replace(/\.webp$/i, ".png")}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width={430}
                    height={588}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
            </picture>
            <div className="item__caption">
                <span className="item__title">{project.title}</span>
                <span className="item__subtitle">{subtitleMap[project.id] ?? project.technologies[0]}</span>
            </div>
        </div>

    )
}