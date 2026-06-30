import type { Project } from '../types/Project'

export const projects: Project[] = [
    {
        id:'alfa-pdf',
        title: 'ALFA PDF Reader',
        description: 'Leitor de PDF Desktop desenvolvido com Electron.',
        image: 'https://picsum.photos/id/10/300/400',
        technologies: ['React', 'Typescript', 'Electron'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id:'fabulosa-e-commerce',
        title: 'Fabulosa E-Commerce',
        description: 'Loja virtual para loja focada em moda feminina e masculina.',
        image: 'https://picsum.photos/id/10/300/400',
        technologies: ['React', 'Javascript', 'Vite', 'Tailwind'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id:'99food-analyser',
        title: '99Food Analyser',
        description: 'Dashboard analítico baseado no analytics do 99food.',
        image: 'https://picsum.photos/id/10/300/400',
        technologies: ['React', 'Typescript', 'Vite', 'Tailwind'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Site pessoal/portfólio responsivo.',
    image: 'https://picsum.photos/id/50/300/400',
    technologies: ['React', 'CSS', 'Vite'],
    github: 'https://github.com/AlexAlvesAmorim',
  },
]