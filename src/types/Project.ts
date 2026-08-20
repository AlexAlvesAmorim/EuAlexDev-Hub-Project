export interface VersionComparison {
    feature: string
    from: string
    to: string
}

export interface Project {
    id: string
    title: string
    description: string
    story: string
    highlights: string[]
    image: string
    technologies: string[]
    github: string
    demo?: string
    problem?: string
    solution?: string
    challenges?: string
    results?: string
    v21Images?: string[]
    v12Images?: string[]
    comparison?: VersionComparison[]
}
