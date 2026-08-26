import type { CSSProperties } from "react";
import type { Project } from "../../types/Project";

export interface ProjectCardProps {
    project: Project
    position: number
    active?: boolean
    onOpen: (project: Project, index: number) => void
    onActivate?: (project: Project, index: number) => void
}

export function ProjectCard({
    project,
    position,
    active = false,
    onOpen,
    onActivate,
}: ProjectCardProps) {

    const classes = ["item", active ? "item--active" : ""].filter(Boolean).join(" ")

    return (
        <div
            className={classes}
            role="button"
            tabIndex={0}
            onClick={() => onActivate?.(project, position - 1) || onOpen(project, position - 1)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onActivate?.(project, position - 1) || onOpen(project, position - 1)
                }
            }}
            style={{
                '--position': position,
            } as CSSProperties}
        >

            <img
                src={project.image}
                alt={project.title}
                loading="lazy" decoding="async"
            />

            <div className="item__caption">
                {project.title}
                {active && <span className="item__caption-hint">Ver detalhes</span>}
            </div>
        </div>
    )
}