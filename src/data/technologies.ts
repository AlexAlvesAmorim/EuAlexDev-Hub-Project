import type { IconType } from "react-icons";
import { SiReact, SiTypescript, SiTailwindcss, SiElectron, SiVite, SiJavascript } from "react-icons/si";

export const technologies: { name: string; Icon: IconType; color: string; level: string }[] = [
    { name: "React", Icon: SiReact, color: "#61dafb", level: "Avançado" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6", level: "Intermediário-Avançado" },
    { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e", level: "Avançado" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "#06b6d4", level: "Avançado" },
    { name: "Electron", Icon: SiElectron, color: "#47848f", level: "Avançado" },
    { name: "Vite", Icon: SiVite, color: "#bd34fe", level: "Avançado" },
];