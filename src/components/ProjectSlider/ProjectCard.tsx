import type { CSSProperties } from 'react'
import type { Project } from '../../types/Project'

export interface ProjectCardProps {
    project: Project
    position: number
}

export function ProjectCard({
    project,
    position,
}: ProjectCardProps) {
    return (
        <div
            className="item"
            style={
                {
                    '--position': position,
                } as CSSProperties
            }
        >
            <div className="w-full h-full bg-surface rounded-xl shadow-lg overflow-hidden border border-white/10">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover"
                />

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-text">
                        {project.title}
                    </h3>

                    <p className="text-sm text-text/80 mt-2 line-clamp-3">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs bg-primary/20 text-primary rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary/80 transition-colors"
                        >
                            GitHub
                        </a>

                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 text-sm bg-white/10 text-text rounded hover:bg-white/20 transition-colors"
                            >
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}