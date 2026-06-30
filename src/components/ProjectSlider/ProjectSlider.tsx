import type { CSSProperties } from 'react'
import { projects } from '../../data/project'
import { ProjectCard } from './ProjectCard'

export function ProjectSlider() {
    return (
        <section className="banner">

            <div className="banner-content">
                <h1 className="banner-title">PROJETOS</h1>

                <div className="banner-profile">
                    <h2 className="banner-profile-name">Alex Alves</h2>
                    <p className="banner-profile-role">
                        Front-end Developer
                    </p>
                    <p className="banner-profile-bio">
                        React • TypeScript • Electron
                    </p>
                </div>

                <div className="banner-model">
                    <span className="text-text/40 text-sm">MINHA FOTO</span>
                </div>
            </div>

            <div
                className="slider"
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
        </section>
    )
}