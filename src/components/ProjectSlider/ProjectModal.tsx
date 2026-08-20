import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaGithub, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { SiReact, SiTypescript, SiJavascript, SiElectron, SiVite, SiTailwindcss } from 'react-icons/si'
import { TbRouter } from 'react-icons/tb'
import { TbPdf } from 'react-icons/tb'
import type { Project } from '../../types/Project'
import type { IconType } from 'react-icons'

interface VersionComparison {
    feature: string
    from: string
    to: string
}

const NEW_VERSION = 'v2.1.1'
const OLD_VERSION = 'v2.0'

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
    v21Images?: string[]
    v12Images?: string[]
    comparison?: VersionComparison[]
}

export function ProjectModal({ project, onClose, v21Images = [], v12Images = [], comparison = [] }: ProjectModalProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const [showV2, setShowV2] = useState(false)
    const [rotate, setRotate] = useState(false)
    const [currentV21Index, setCurrentV21Index] = useState(0)
    const [currentV12Index, setCurrentV12Index] = useState(0)
    const [activeTab, setActiveTab] = useState<'v21' | 'comparison'>('v21')

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

    const handleUpdateClick = () => {
        setRotate(true)
        setTimeout(() => {
            setShowV2(true)
            setRotate(false)
        }, 500)
    }

    const goToPrevV21 = () => {
        setCurrentV21Index((prev) => (prev === 0 ? v21Images.length - 1 : prev - 1))
    }

    const goToNextV21 = () => {
        setCurrentV21Index((prev) => (prev === v21Images.length - 1 ? 0 : prev + 1))
    }

    const goToPrevV12 = () => {
        setCurrentV12Index((prev) => (prev === 0 ? v12Images.length - 1 : prev - 1))
    }

    const goToNextV12 = () => {
        setCurrentV12Index((prev) => (prev === v12Images.length - 1 ? 0 : prev + 1))
    }

    if (showV2 && (v21Images.length > 0 || v12Images.length > 0 || comparison.length > 0)) {
        return createPortal(
            <div className="project-modal-template" role="dialog" aria-modal="true" aria-labelledby="project-modal-v2-title" onClick={onClose}>
                <div className="project-modal-template__card" onClick={(event) => event.stopPropagation()}>
                    <button
                        type="button"
                        className="project-modal-template__close"
                        aria-label="Fechar detalhes"
                        onClick={onClose}
                    >
                        <FaXmark />
                    </button>

                    <div className="project-modal-template__gallery">
                        <div className="project-modal-template__gallery-title">
                            <h3 id="project-modal-v2-title">{project.title} {NEW_VERSION}</h3>
                            <button
                                className="project-modal-template__back-btn"
                                onClick={() => setShowV2(false)}
                                aria-label="Voltar às informações do projeto"
                            >
                                &larr; Voltar
                            </button>
                        </div>

                        <div className="project-modal-template__tabs">
                            <button
                                className={`project-modal-template__tab ${activeTab === 'v21' ? 'active' : ''}`}
                                onClick={() => setActiveTab('v21')}
                                aria-selected={activeTab === 'v21'}
                            >
                                Novidades {NEW_VERSION}
                            </button>
                            {comparison.length > 0 && (
                                <button
                                    className={`project-modal-template__tab ${activeTab === 'comparison' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('comparison')}
                                    aria-selected={activeTab === 'comparison'}
                                >
                                    Comparativo {OLD_VERSION} → {NEW_VERSION}
                                </button>
                            )}
                        </div>

                        {activeTab === 'v21' && v21Images.length > 0 && (
                            <div className="project-modal-template__carousel">
                                <button
                                    className="project-modal-template__carousel-btn project-modal-template__carousel-btn--prev"
                                    onClick={goToPrevV21}
                                    aria-label="Imagem anterior"
                                >
                                    <FaChevronLeft />
                                </button>
                                <div className="project-modal-template__carousel-track">
                                    <img
                                        src={v21Images[currentV21Index]}
                                        alt={`${project.title} ${NEW_VERSION} - Novidade ${currentV21Index + 1}`}
                                        loading="lazy"
                                        className="project-modal-template__carousel-image"
                                    />
                                </div>
                                <button
                                    className="project-modal-template__carousel-btn project-modal-template__carousel-btn--next"
                                    onClick={goToNextV21}
                                    aria-label="Próxima imagem"
                                >
                                    <FaChevronRight />
                                </button>
                                <div className="project-modal-template__carousel-indicators">
                                    {v21Images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`project-modal-template__indicator ${index === currentV21Index ? 'active' : ''}`}
                                            onClick={() => setCurrentV21Index(index)}
                                            aria-label={`Ir para imagem ${index + 1}`}
                                            aria-current={index === currentV21Index ? 'true' : 'false'}
                                        />
                                    ))}
                                </div>
                                <p className="project-modal-template__carousel-caption">
                                    {currentV21Index + 1} de {v21Images.length}
                                </p>
                            </div>
                        )}

                        {activeTab === 'v21' && v12Images.length > 0 && (
                            <>
                                <div className="project-modal-template__section-title">Versão 1.2 (Anterior)</div>
                                <div className="project-modal-template__carousel">
                                <button
                                    className="project-modal-template__carousel-btn project-modal-template__carousel-btn--prev"
                                    onClick={goToPrevV12}
                                    aria-label="Imagem anterior v1.2"
                                >
                                    <FaChevronLeft />
                                </button>
                                <div className="project-modal-template__carousel-track">
                                    <img
                                        src={v12Images[currentV12Index]}
                                        alt={`${project.title} v1.2 - Print ${currentV12Index + 1}`}
                                        loading="lazy"
                                        className="project-modal-template__carousel-image"
                                    />
                                </div>
                                <button
                                    className="project-modal-template__carousel-btn project-modal-template__carousel-btn--next"
                                    onClick={goToNextV12}
                                    aria-label="Próxima imagem v1.2"
                                >
                                    <FaChevronRight />
                                </button>
                                <div className="project-modal-template__carousel-indicators">
                                    {v12Images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`project-modal-template__indicator ${index === currentV12Index ? 'active' : ''}`}
                                            onClick={() => setCurrentV12Index(index)}
                                            aria-label={`Ir para imagem v1.2 ${index + 1}`}
                                            aria-current={index === currentV12Index ? 'true' : 'false'}
                                        />
                                    ))}
                                </div>
                                <p className="project-modal-template__carousel-caption">
                                    {currentV12Index + 1} de {v12Images.length}
                                </p>
                            </div>
                            </>
                        )}

                        {activeTab === 'comparison' && comparison.length > 0 && (
                            <div className="project-modal-template__comparison">
                                <table className="project-modal-template__comparison-table">
                                    <thead>
                                        <tr>
                                            <th>Recurso</th>
                                            <th>{OLD_VERSION}</th>
                                            <th>{NEW_VERSION}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.feature}</td>
                                                <td className="comparison-old">{item.from}</td>
                                                <td className="comparison-new">{item.to}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>,
            document.body,
        )
    }

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

                    {v21Images.length > 0 && (
                        <button
                            className={`project-modal-template__update-btn ${rotate ? 'rotating' : ''}`}
                            onClick={handleUpdateClick}
                            aria-label={`Ver novidades do ${project.title} ${NEW_VERSION}`}
                        >
                            Ver novidades {NEW_VERSION}
                        </button>
                    )}

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