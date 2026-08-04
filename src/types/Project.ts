export interface Project {
    id: string
    title: string
    description: string
    /** A história por trás do projeto — por que ele existe. */
    story: string
    /** Destaques / funcionalidades-chave exibidos no modal. */
    highlights: string[]
    image: string
    technologies: string[]
    github: string
    demo?: string
}
