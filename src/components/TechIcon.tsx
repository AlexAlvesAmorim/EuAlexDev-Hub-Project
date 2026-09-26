import type { IconType } from "react-icons";
import {
  SiReact, SiTypescript, SiTailwindcss, SiElectron, SiVite, SiJavascript,
  SiNodedotjs, SiFastify, SiPostgresql, SiPrisma, SiRedis, SiDocker, SiGit,
  SiVitest, SiPython, SiC, SiFlask, SiZod, SiGithubactions, SiTestinglibrary,
} from "react-icons/si";
import { FaDatabase, FaFilePdf, FaFileWord, FaCube } from "react-icons/fa6";
import { TbRouter, TbPdf } from "react-icons/tb";

/**
 * Mapa único ícone-por-nome.
 * Antes: techIconMap duplicado/divergente dentro do ProjectModal.
 * O content usa `icon: "SiReact"` — aqui resolvemos pro componente.
 */
const registry: Record<string, IconType> = {
  SiReact, SiTypescript, SiTailwindcss, SiElectron, SiVite, SiJavascript,
  SiNodedotjs, SiFastify, SiPostgresql, SiPrisma, SiRedis, SiDocker, SiGit,
  SiVitest, SiPython, SiC, SiFlask, SiZod, SiGithubactions, SiTestinglibrary,
  TbRouter, FaDatabase,
};

export function TechIcon({ name, ...props }: { name: string; className?: string; color?: string }) {
  if (name === "jsPDF") return <FaFilePdf {...props} />;
  if (name === "docx") return <FaFileWord {...props} />;
  if (name === "PDF.js") return <TbPdf {...props} />;
  if (name === "ONNX/WASM") return <FaCube {...props} />;
  const Icon = registry[name] ?? FaCube;
  return <Icon {...props} />;
}
