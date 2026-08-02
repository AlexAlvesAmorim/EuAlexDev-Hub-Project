import type { CSSProperties } from "react";
import type { Project } from "../../types/Project";

export interface ProjectCardProps {
    project: Project
    position: number
}

export function ProjectCard({
    project,
    position,
}: ProjectCardProps) {

    // clique abre o repositório do projeto no GitHub
    const openProject = () => {
        window.open(project.github, "_blank", "noopener,noreferrer")
    }

    return (
        <div
            className="item"
            role="button"
            tabIndex={0}
            onClick={openProject}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    openProject()
                }
            }}
            style={
                {
                    '--position': position,
                } as CSSProperties
            }
        >

            <img
                src={project.image}
                alt={project.title}
                loading="lazy" decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end p-3 pointer-events-none">
                <span className="text-white text-sm font-medium leading-tight drop-shadow-lg">
                    {project.title}
                </span>
            </div>
        </div>

    )
}
