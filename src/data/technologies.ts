import type { IconType } from "react-icons";
import { SiReact, SiTypescript, SiTailwindcss, SiElectron, SiVite, SiJavascript, SiNodedotjs, SiFastify, SiPostgresql, SiPrisma, SiRedis, SiDocker, SiGit, SiVitest, SiPython, SiC, SiFlask, SiZod, SiGithubactions, SiTestinglibrary } from "react-icons/si";
import { FaDatabase } from "react-icons/fa6";
import { TbRouter } from "react-icons/tb";

export type TechCategory = "Front-end" | "Back-end & Dados" | "Ferramentas & Qualidade" | "Fundamentos · CS50x";

export const TECH_CATEGORIES: TechCategory[] = ["Front-end", "Back-end & Dados", "Ferramentas & Qualidade", "Fundamentos · CS50x"];

export const technologies: { name: string; Icon: IconType; color: string; level: string; category: TechCategory }[] = [
    { name: "React", Icon: SiReact, color: "#61dafb", level: "Avançado", category: "Front-end" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6", level: "Intermediário-Avançado", category: "Front-end" },
    { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e", level: "Avançado", category: "Front-end" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "#06b6d4", level: "Avançado", category: "Front-end" },
    { name: "Electron", Icon: SiElectron, color: "#47848f", level: "Avançado", category: "Front-end" },
    { name: "Vite", Icon: SiVite, color: "#bd34fe", level: "Avançado", category: "Front-end" },
    { name: "React Router", Icon: TbRouter, color: "#f44250", level: "Intermediário-Avançado", category: "Front-end" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#339933", level: "Intermediário-Avançado", category: "Back-end & Dados" },
    { name: "Fastify", Icon: SiFastify, color: "#e5e7eb", level: "Intermediário", category: "Back-end & Dados" },
    { name: "Zod", Icon: SiZod, color: "#3e67ff", level: "Intermediário", category: "Back-end & Dados" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791", level: "Intermediário", category: "Back-end & Dados" },
    { name: "Prisma", Icon: SiPrisma, color: "#5a67d8", level: "Intermediário", category: "Back-end & Dados" },
    { name: "Redis", Icon: SiRedis, color: "#dc382d", level: "Intermediário", category: "Back-end & Dados" },
    { name: "Docker", Icon: SiDocker, color: "#2496ed", level: "Intermediário", category: "Ferramentas & Qualidade" },
    { name: "Git & GitHub", Icon: SiGit, color: "#f05032", level: "Avançado", category: "Ferramentas & Qualidade" },
    { name: "Vitest", Icon: SiVitest, color: "#fcc72b", level: "Intermediário", category: "Ferramentas & Qualidade" },
    { name: "Testing Library", Icon: SiTestinglibrary, color: "#e33332", level: "Intermediário", category: "Ferramentas & Qualidade" },
    { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff", level: "Intermediário", category: "Ferramentas & Qualidade" },
    { name: "Python", Icon: SiPython, color: "#3776ab", level: "Intermediário", category: "Fundamentos · CS50x" },
    { name: "C", Icon: SiC, color: "#a8b9cc", level: "Fundamentos", category: "Fundamentos · CS50x" },
    { name: "SQL", Icon: FaDatabase, color: "#38bdf8", level: "Intermediário", category: "Fundamentos · CS50x" },
    { name: "Flask", Icon: SiFlask, color: "#e5e7eb", level: "Intermediário", category: "Fundamentos · CS50x" },
];
