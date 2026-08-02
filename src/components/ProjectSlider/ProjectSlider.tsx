import type { CSSProperties } from 'react'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'
import { FloatingParticles } from '../BackgroundTexture/FloatingParticles'
import { SiReact, SiTypescript, SiElectron } from 'react-icons/si'


export function ProjectSlider() {
    return (
        <section className="banner">
            <FloatingParticles />
            <div className="background-text z-0">PROJETOS</div>

            <div className="slider z-2"
                style={
                    {
                        '--equality': projects.length,
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

            <div className="center-model z-3" />

            <div className="author z-3">
                <h2>Alex Alves Amorim | Dev. de Favela</h2>
                <p>Desenvolvedor Front-End</p>

                <div className="tech-stack">
                    <span><SiReact className="tech-icon react" /> React</span>
                    <span><SiTypescript className="tech-icon typescript" /> TypeScript</span>
                    <span><SiElectron className="tech-icon electron" /> Electron</span>
                </div>
            </div>
        </section>
    )
}

