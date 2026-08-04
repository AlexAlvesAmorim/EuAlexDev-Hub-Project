import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FaGithub, FaXmark } from 'react-icons/fa6'
import type { Project } from '../../types/Project'

export interface ProjectModalProps {
    project: Project
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null
        closeButtonRef.current?.focus({ preventScroll: true })

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
            previouslyFocused?.focus()
        }
    }, [onClose])

    return createPortal(
        <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={onClose}
        >
            <div className="project-modal__card" onClick={(event) => event.stopPropagation()}>
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="project-modal__close"
                    aria-label="Fechar detalhes"
                    onClick={onClose}
                >
                    <FaXmark />
                </button>

                <img
                    src={project.image}
                    alt=""
                    decoding="async"
                    className="project-modal__image"
                />

                <div className="project-modal__body">
                    <h3 id="project-modal-title" className="project-modal__title">
                        {project.title}
                    </h3>
                    <p className="project-modal__description">
                        {project.description}
                    </p>

                    {project.story && (
                        <p className="project-modal__story">
                            {project.story}
                        </p>
                    )}

                    <ul className="project-modal__highlights">
                        {project.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>

                    <div className="project-modal__techs">
                        {project.technologies.map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="project-modal__footer">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Ver no GitHub
                    </a>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            Ver demo
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    )
}
