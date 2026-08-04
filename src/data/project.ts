import type { Project } from '../types/Project'

export const projects: Project[] = [
    {
        id: 'alfa-pdf',
        title: 'ALFA PDF Reader',
        description: 'Leitor de PDF desktop desenvolvido com Electron.',
        story: 'Surgiu da vivência em suporte técnico: muita gente não queria (nem sabia usar) o Adobe Acrobat Reader — pesado, lento e cheio de popups de assinatura e upgrade. Faltava um leitor direto ao ponto: abrir o PDF e ler. O ALFA virou um produto desktop real, distribuído como instalador .exe para Windows, com cara de aplicação comercial e fluxo de impressão integrado ao sistema.',
        highlights: [
            'Leitor de PDF multi-abas — vários documentos ao mesmo tempo',
            'Suporte a PDFs protegidos por senha, com validação via PDF.js',
            'Impressão silenciosa integrada ao Windows (testada com EPSON L3150)',
            'Registrado como aplicativo padrão para abrir arquivos .pdf',
            'Instalador NSIS com identidade visual própria',
        ],
        image: '/projects/AlfaPDFCard.png',
        technologies: ['React', 'TypeScript', 'Electron', 'PDF.js', 'Vite'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id: 'fabulosa-e-commerce',
        title: 'Fabulosa E-Commerce',
        description: 'Loja virtual para loja focada em moda feminina e masculina.',
        story: 'Foi o primeiro projeto que saiu de "exercício" e virou negócio: uma loja virtual de moda feminina e masculina que foi vendida para uma empresa em um acordo B2B. O site precisava passar confiança, mostrar os produtos com bom destaque e converter visitantes em clientes — e serviu de base para o 99Food Analyser, que nasceu como uma refatoração dele.',
        highlights: [
            'E-commerce vendido em negociação B2B para uma empresa',
            'Catálogo de moda feminina e masculina',
            'Design responsivo com identidade de moda',
            'Ponto de partida para a refatoração que virou o 99Food Analyser',
        ],
        image: '/projects/fabulosa-e-commerce.png',
        technologies: ['React', 'JavaScript', 'Vite', 'Tailwind'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
    {
        id: '99food-analyser',
        title: '99Food Analyser',
        description: 'Dashboard analítico baseado no analytics do 99food.',
        story: 'Dashboard para visualizar os dados operacionais do ecossistema 99food: receita, pedidos, ticket médio e comportamento de pagamento. Boa parte do desenvolvimento aconteceu sem conexão com a internet — uma prova real de resolver problemas com o que já se sabe, sem depender de consulta constante a documentação.',
        highlights: [
            'KPIs: receita, pedidos, ticket médio e entregues',
            'Receita por dia e por método de pagamento (Pix, crédito, débito)',
            'Insights automáticos: melhor dia e forma de pagamento mais usada',
            'Gestão de status de pedidos via Context API',
            'Desenvolvido em grande parte sem internet',
        ],
        image: '/projects/99foodAnalyticsCard.png',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind', 'React Router'],
        github: 'https://github.com/AlexAlvesAmorim',
    },
]
