import { type CSSProperties, useCallback, useState } from 'react'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { FloatingParticles } from '../BackgroundTexture/FloatingParticles'
import { SiReact, SiTypescript, SiElectron } from 'react-icons/si'
import { useProjectSlider } from '../../hooks/useProjectSlider'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { Project } from '../../types/Project'

export function ProjectSlider() {

    const { sliderRef, handleMouseEnter, handleMouseLeave, handleSelect, selectedIndex } = useProjectSlider(projects.length)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const currentProject = projects[selectedIndex]
    const [openedProject, setOpenedProject] = useState<Project | null>(null)

    const closeModal = useCallback(() => setOpenedProject(null), [])

    const openProjectDetails = useCallback((project: Project, index: number) => {
        handleSelect(index)
        setOpenedProject({ ...project })
    }, [handleSelect])

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

            <div className="project-caption">
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