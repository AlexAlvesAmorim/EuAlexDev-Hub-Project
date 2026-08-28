import { type CSSProperties, useCallback, useState } from 'react'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { FloatingParticles } from '../BackgroundTexture/FloatingParticles'
import { SiReact, SiTypescript, SiElectron } from 'react-icons/si'
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa6'
import { useProjectSlider } from '../../hooks/useProjectSlider'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { Project } from '../../types/Project'

export function ProjectSlider() {

    const { sliderRef, handleMouseEnter, handleMouseLeave, handleSelect, selectedIndex, handleTouchStart, handleTouchEnd, autoRotate, toggleAutoRotate } = useProjectSlider(projects.length)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const currentProject = projects[selectedIndex]
    const [openedProject, setOpenedProject] = useState<Project | null>(null)

    const closeModal = useCallback(() => setOpenedProject(null), [])

    const openProjectDetails = useCallback((project: Project, index: number) => {
        handleSelect(index)
        setOpenedProject({ ...project })
    }, [handleSelect])

    const goPrev = useCallback(() => {
        handleSelect((selectedIndex - 1 + projects.length) % projects.length)
    }, [handleSelect, selectedIndex])

    const goNext = useCallback(() => {
        handleSelect((selectedIndex + 1) % projects.length)
    }, [handleSelect, selectedIndex])

    const onCarouselKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goPrev()
        } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            goNext()
        }
    }, [goPrev, goNext])


    return (
        <section className="banner" id="projetos" role="region"
            aria-label="Carrossel de Projetos"
            aria-roledescription="carousel"
            onKeyDown={onCarouselKeyDown}
            tabIndex={-1}>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
                Projeto {selectedIndex + 1} de {projects.length}: {currentProject.title}
            </span>
            <FloatingParticles count={isMobile ? 30 : 100} />
            <div className="background-text" aria-hidden="true">PROJETOS</div>

            <div
                ref={sliderRef}
                className="slider"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
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
                    />
                ))}
            </div>

            <div className="carousel-glow" aria-hidden="true" />

            {/* POLISH: controles antes invisíveis agora montados (P1) */}
            <div className="carousel-controls" aria-hidden={false}>
                <button type="button" className="carousel-btn" aria-label="Projeto anterior" onClick={goPrev}>
                    <FaChevronLeft aria-hidden="true" />
                </button>
                <button type="button" className="carousel-btn" aria-label="Próximo projeto" onClick={goNext}>
                    <FaChevronRight aria-hidden="true" />
                </button>
            </div>

            <div className="carousel-dots" role="tablist" aria-label="Navegação do carrossel">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={index === selectedIndex}
                        aria-label={`Ir para projeto ${index + 1} de ${projects.length}: ${projects[index].title}`}
                        className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
                        onClick={() => handleSelect(index)}
                    />
                ))}
            </div>

            <button
                type="button"
                className="carousel-pause"
                aria-label={autoRotate ? 'Pausar rotação automática' : 'Retomar rotação automática'}
                aria-pressed={!autoRotate}
                onClick={toggleAutoRotate}
                title={autoRotate ? 'Pausar' : 'Retomar'}
            >
                {autoRotate ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
            </button>

            <div className="center-model" aria-hidden="true" />

            <div className="author">
                <h2>Alex Alves Amorim | Dev. de Favela</h2>
                <p>Desenvolvedor Front-End</p>

                <div className="tech-stack">
                    <span><SiReact className="tech-icon react" /> React</span>
                    <span><SiTypescript className="tech-icon typescript" /> TypeScript</span>
                    <span><SiElectron className="tech-icon electron" /> Electron</span>
                </div>
            </div>

            <div className="project-caption" aria-live="polite" aria-atomic="true">
                <span className="tag">Em destaque</span>
                <h3>{currentProject.title}</h3>
            </div>

            {openedProject && (
                <ProjectModal
                    project={openedProject}
                    onClose={closeModal}
                    v21Images={openedProject.v21Images}
                    v12Images={openedProject.v12Images}
                    comparison={openedProject.comparison}
                />
            )}
        </section>
    )
}
