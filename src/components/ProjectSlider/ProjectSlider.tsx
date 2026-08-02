import { useMemo, type CSSProperties } from 'react'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'
import { FloatingParticles } from '../BackgroundTexture/FloatingParticles'
import { SiReact, SiTypescript, SiElectron } from 'react-icons/si'
import { useProjectSlider } from '../../hooks/useProjectSlider.ts'

export function ProjectSlider() {

    const { handleMouseEnter, handleMouseLeave, selectedIndex } = useProjectSlider(projects.length)

    const isMobile = useMemo(
        () => window.matchMedia('(max-width: 768px)').matches,
        [])

    const currentProject = projects[selectedIndex]

    return (
        <section className="banner" id="projetos" role="region"
            aria-label="Carrossel de Projetos"
            aria-roledescription="carousel">
            <FloatingParticles count={isMobile ? 25 : 80} />
            <div className="background-text">PROJETOS</div>

            <div className="slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                style={
                    {
                        '--quantity': projects.length,
                    } as CSSProperties
                }
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        position={index + 1}
                    />
                ))}
            </div>

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
        </section>
    )
}
