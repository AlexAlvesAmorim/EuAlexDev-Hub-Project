import type { Project } from '../types/Project'

export const projects: Project[] = [
    {
        id: 'alfa-pdf',
        title: 'ALFA PDF Reader',
        description: 'Leitor de PDF desktop desenvolvido com Electron.',
        image: '/projects/alfa-pdf.webp',
        technologies: ['React', 'TypeScript', 'Electron'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id: 'fabulosa-e-commerce',
        title: 'Fabulosa E-Commerce',
        description: 'Loja virtual para loja focada em moda feminina e masculina.',
        image: '/projects/fabulosa-e-commerce.webp',
        technologies: ['React', 'JavaScript', 'Vite', 'Tailwind'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id: '99food-analyser',
        title: '99Food Analyser',
        description: 'Dashboard analítico baseado no analytics do 99food.',
        image: '/projects/99food-analyser.webp',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        description: 'Site pessoal/portfólio responsivo.',
        image: '/projects/portfolio.webp',
        technologies: ['React', 'CSS', 'Vite'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
]
