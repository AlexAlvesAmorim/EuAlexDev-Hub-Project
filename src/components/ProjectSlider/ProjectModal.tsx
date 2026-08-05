import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FaGithub, FaXmark } from 'react-icons/fa6'
import { SiReact, SiTypescript, SiJavascript, SiElectron, SiVite, SiTailwindcss } from 'react-icons/si'
import { TbRouter } from 'react-icons/tb'
import { TbPdf } from 'react-icons/tb'
import type { Project } from '../../types/Project'
import type { IconType } from 'react-icons'

const techIconMap: Record<string, { Icon: IconType; color: string }> = {
    React: { Icon: SiReact, color: '#61dafb' },
    TypeScript: { Icon: SiTypescript, color: '#3178c6' },
    JavaScript: { Icon: SiJavascript, color: '#f7df1e' },
    Electron: { Icon: SiElectron, color: '#47848f' },
    Vite: { Icon: SiVite, color: '#bd34fe' },
    Tailwind: { Icon: SiTailwindcss, color: '#06b6d4' },
    'React Router': { Icon: TbRouter, color: '#f44250' },
    'PDF.js': { Icon: TbPdf, color: '#f40' },
}

interface ProjectModalProps {
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

                    <div className="project-modal__case-study">
                        {project.problem && (
                            <div className="case-study__block">
                                <h4 className="case-study__label case-study__label--problem">Problema</h4>
                                <p>{project.problem}</p>
                            </div>
                        )}
                        {project.solution && (
                            <div className="case-study__block">
                                <h4 className="case-study__label case-study__label--solution">Solução</h4>
                                <p>{project.solution}</p>
                            </div>
                        )}
                        {project.challenges && (
                            <div className="case-study__block">
                                <h4 className="case-study__label case-study__label--challenges">Desafios Técnicos</h4>
                                <p>{project.challenges}</p>
                            </div>
                        )}
                        {project.results && (
                            <div className="case-study__block">
                                <h4 className="case-study__label case-study__label--results">Resultados</h4>
                                <p>{project.results}</p>
                            </div>
                        )}
                    </div>

                    <div className="project-modal__section-title">Destaques</div>
                    <ul className="project-modal__highlights">
                        {project.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>

                    <div className="project-modal__section-title">Tecnologias</div>
                    <div className="project-modal__techs">
                        {project.technologies.map((tech) => {
                            const meta = techIconMap[tech]
                            return (
                                <span key={tech}>
                                    {meta ? <meta.Icon style={{ color: meta.color, fontSize: '1.1em' }} /> : null}
                                    {tech}
                                </span>
                            )
                        })}
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
