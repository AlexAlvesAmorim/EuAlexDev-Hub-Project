import { type CSSProperties, useCallback, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa6'
import { SiReact, SiTypescript, SiElectron } from 'react-icons/si'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { FloatingParticles } from '../BackgroundTexture/FloatingParticles'
import { useProjectSlider } from '../../hooks/useProjectSlider'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { Project } from '../../types/Project'

export function ProjectSlider() {

    const { sliderRef, handleMouseEnter, handleMouseLeave, rotateBy, isPaused, togglePaused, selectedIndex } = useProjectSlider(projects.length)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const currentProject = projects[selectedIndex]
    const [openedProject, setOpenedProject] = useState<Project | null>(null)

    const closeModal = useCallback(() => setOpenedProject(null), [])

    /** Decide o comportamento do clique no card:
     *  - card da frente (ativo): abre o modal
     *  - outro card: seleciona (rotação para frente) */
    const handleCardActivate = useCallback((project: Project, index: number) => {
        if (index === selectedIndex) {
            setOpenedProject({ ...project })
        } else {
            rotateBy(1)
        }
    }, [rotateBy, selectedIndex])

    const openProjectDetails = useCallback((project: Project, index: number) => {
        rotateBy(1)
        setOpenedProject({ ...project })
    }, [rotateBy])

    return (
        <section className="banner" id="projetos" role="region"
            aria-label="Carrossel de Projetos"
            aria-roledescription="carousel">
            <FloatingParticles count={isMobile ? 25 : 80} />
            <div className="background-text">PROJETOS</div>

            <div
                ref={sliderRef}
                className="slider"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    '--quantity': projects.length,
                } as CSSProperties}
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        position={index + 1}
                        active={index === selectedIndex}
                        onOpen={openProjectDetails}
                        onActivate={handleCardActivate}
                    />
                ))}
            </div>

            <div className="carousel-glow" />

            <div className="center-model" />

            <div className="author">
                <h2>Alex Alves Amorim | Dev. de Favela</h2>
                <p>Desenvolvedor Front-End</p>

                <div className="tech-stack">
                    <span><SiReact className="tech-icon react" /> React</span>
                    <span><SiTypescript className="tech-icon typescript" /> TypeScript</span>
                    <span><SiElectron className="tech-icon electron" /> Electron</span>
                </div>
            </div>

            <div className="project-caption" aria-live="polite">
                <span className="tag">Em destaque</span>
                <h3>{currentProject.title}</h3>
            </div>

            {/* Controles do carrossel */}
            <div className="slider-controls">
                <button className="slider-arrow slider-arrow--prev" aria-label="Anterior" onClick={() => rotateBy(-1)}><FaChevronLeft /></button>
                <button className="slider-arrow slider-arrow--next" aria-label="Próximo" onClick={() => rotateBy(1)}><FaChevronRight /></button>
                <div className="slider-dots">
                    {projects.map((project, i) => (
                        <button
                            key={i}
                            className="slider-dot"
                            aria-label={`Ir para ${project.title}`}
                            aria-current={selectedIndex === i ? "true" : "false"}
                            onClick={() => {
                                const steps = Math.round(rotationRef.current / (360 / projects.length)) + (selectedIndex - i)
                                // Simplified: just setSelectedIndex directly; re-applyRotation will handle modulo
                                // Actually use selectedIndex change via a callback—simplify:
                                rotateBy(selectedIndex - i > 0 ? -1 : 1)
                            }}
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="5 19 12 12 19 5"></polyline>
                            </svg>
                        </button>
                    ))}
                </div>
                <button className="slider-pause" aria-label={isPaused ? "Retomar rotação" : "Pausar rotação"} onClick={togglePaused}>
                    {isPaused ? <FaPlay /> : <FaPause />}
                </button>
            </div>
        </section>
    )
}