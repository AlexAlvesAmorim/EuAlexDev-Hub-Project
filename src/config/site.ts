/**
 * Single source of truth do site.
 * Antes: URLs, nav, contato e SEO espalhados em Header.tsx, home.tsx e index.html.
 * Agora: tudo aqui, tipado e importado pelos componentes.
 */

export interface NavItem {
  href: string;
  label: string;
  icon: "projects" | "about" | "metrics" | "journey" | "stack" | "certs" | "contact";
}

export interface CurriculumOption {
  id: "minimal" | "full";
  label: string;
  file: string;
}

export const siteConfig = {
  name: "Dev. de Favela Hub",
  tagline: "Portfólio & Projetos",
  author: "Alex Alves Amorim",
  role: "Desenvolvedor Front-End",
  locale: "pt-BR",
  url: "https://eualexdev.vercel.app",
  heroProjectId: "alfa-pdf",
  themeColor: "#f7f4ed",
  seo: {
    title: "Alex Alves Amorim — Desenvolvedor Full-Stack | Dev. de Favela Hub",
    description:
      "Portfólio de Alex Alves Amorim (Dev de Favela) — Desenvolvedor Full-Stack com 20+ anos em TI. Projetos com React, TypeScript, Node.js, Electron. Carrossel 3D interativo.",
    keywords:
      "desenvolvedor full-stack, react, typescript, node.js, electron, portfólio, dev de favela",
    ogImage: "/Hero.webp",
    twitterImage: "/Hero.png",
  },
  social: {
    github: "https://github.com/AlexAlvesAmorim",
    linkedin: "https://www.linkedin.com/in/alex-a-amorim/",
    email: "mailto:alex.a.amorim@outlook.com",
  },
  nav: [
    { href: "#projetos", label: "Projetos", icon: "projects" },
    { href: "#sobre", label: "Sobre mim", icon: "about" },
    { href: "#estatisticas", label: "Métricas", icon: "metrics" },
    { href: "#jornada", label: "Jornada", icon: "journey" },
    { href: "#skills", label: "Stack", icon: "stack" },
    { href: "#certificados", label: "Certificações", icon: "certs" },
    { href: "#contato", label: "Contato", icon: "contact" },
  ] as NavItem[],
  curriculum: [
    { id: "minimal", label: "Currículo Minimal", file: "/curriculo-minimal.pdf" },
    { id: "full", label: "Currículo Completo", file: "/curriculo-completo.pdf" },
  ] as CurriculumOption[],
  /** Kickers acima dos títulos — uma fonte só, sem espalhar copy no JSX. */
  sectionEyebrow: {
    sobre: "Quem sou",
    stats: "Prova em números",
    journey: "A jornada",
    stack: "A stack",
    certs: "Estudo contínuo",
    now: "Agora",
    contact: "Contato",
  },
} as const;

export type SiteConfig = typeof siteConfig;
