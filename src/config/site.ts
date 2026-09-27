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
  url: "https://eu-alex-dev-hub-project.vercel.app",
  heroProjectId: "alfa-pdf",
  themeColor: "#16171d",
  seo: {
    title: "Alex Alves Amorim — Desenvolvedor Full-Stack | Dev. de Favela Hub",
    description:
      "Portfólio de Alex Alves Amorim (Dev de Favela) — Desenvolvedor Full-Stack com 20+ anos em TI. Projetos com React, TypeScript, Node.js, Electron. Carrossel 3D interativo.",
    keywords:
      "desenvolvedor full-stack, react, typescript, node.js, electron, portfólio, dev de favela",
    ogImage: "https://eu-alex-dev-hub-project.vercel.app/Hero.webp",
    twitterImage: "https://eu-alex-dev-hub-project.vercel.app/Hero.webp",
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
} as const;

export type SiteConfig = typeof siteConfig;
