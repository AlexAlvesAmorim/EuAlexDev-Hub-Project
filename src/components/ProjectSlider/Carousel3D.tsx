import { type CSSProperties, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "../BackgroundTexture/FloatingParticles";
import { SiReact, SiTypescript, SiElectron } from "react-icons/si";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa6";
import { useCarousel3D } from "../../hooks/useCarousel3D";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ProjectModal } from "./ProjectModal";
import { projectsContent, toLegacyProject } from "../../content/loader";
import { carouselConfig } from "../../config/carousel";
import type { Project } from "../../types/Project";

/**
 * Visão v2 do carrossel — mesma identidade, motor melhor:
 * - Dados vêm de content/projects.json (subtitle + imagem objeto).
 * - Física: rAF com cleanup + drag por pointer + spring na legenda.
 * - A11y: tablist, aria-live, teclado, reduced-motion.
 */
export function Carousel3D() {
  const total = projectsContent.length;
  const {
    sliderRef, handleMouseEnter, handleMouseLeave, handleSelect, selectedIndex,
    handleTouchStart, handleTouchEnd, autoRotate, toggleAutoRotate,
    onPointerDown, onPointerMove, onPointerUp,
  } = useCarousel3D(total);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const current = projectsContent[selectedIndex];
  const [openedProject, setOpenedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setOpenedProject(null), []);

  const openDetails = useCallback(
    (index: number) => {
      handleSelect(index);
      setOpenedProject(toLegacyProject(projectsContent[index]));
    },
    [handleSelect]
  );

  const goPrev = useCallback(
    () => handleSelect((selectedIndex - 1 + total) % total),
    [handleSelect, selectedIndex, total]
  );
  const goNext = useCallback(
    () => handleSelect((selectedIndex + 1) % total),
    [handleSelect, selectedIndex, total]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const particles = isMobile
    ? carouselConfig.mobile.particles
    : carouselConfig.desktop.particles;

  return (
    <section
      className="banner"
      id="projetos"
      role="region"
      aria-label="Carrossel de Projetos"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Projeto {selectedIndex + 1} de {total}: {current.title}
      </span>
      <FloatingParticles count={particles} />
      <div className="background-text" aria-hidden="true">PROJETOS</div>

      <div
        ref={sliderRef}
        className="slider"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ "--quantity": total } as CSSProperties}
      >
        {projectsContent.map((project, index) => (
          <div
            key={project.id}
            className={`item ${index === selectedIndex ? "item--active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`Ver detalhes de ${project.title}`}
            onClick={() => openDetails(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDetails(index);
              }
            }}
            style={{ "--position": index + 1 } as CSSProperties}
          >
            <picture>
              <source srcSet={project.image.webp} type="image/webp" />
              <img
                src={project.image.png}
                alt={project.image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                width={430}
                height={588}
              />
            </picture>
            <div className="item__caption">
              <span className="item__title">{project.title}</span>
              <span className="item__subtitle">{project.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-glow" aria-hidden="true" />

      <div className="carousel-controls">
        <button type="button" className="carousel-btn" aria-label="Projeto anterior" onClick={goPrev}>
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="carousel-btn" aria-label="Próximo projeto" onClick={goNext}>
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Navegação do carrossel">
        {projectsContent.map((p, index) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Ir para projeto ${index + 1} de ${total}: ${p.title}`}
            className={`carousel-dot ${index === selectedIndex ? "active" : ""}`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel-pause"
        aria-label={autoRotate ? "Pausar rotação automática" : "Retomar rotação automática"}
        aria-pressed={!autoRotate}
        onClick={toggleAutoRotate}
        title={autoRotate ? "Pausar" : "Retomar"}
      >
        {autoRotate ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
      </button>

      <div className="center-model" aria-hidden="true" />

      <div className="author">
        <h2>Alex Alves Amorim | Dev. de Favela</h2>
        <p>Desenvolvedor Front-End</p>
        <div className="tech-stack">
          <span><SiReact className="tech-icon react" /> React</span>
          <span><SiTypescript className="tech-icon typescript" /> TypeScript</span>
          <span><SiElectron className="tech-icon electron" /> Electron</span>
        </div>
      </div>

      <div className="project-caption" aria-live="polite" aria-atomic="true">
        <span className="tag">Em destaque</span>
        <AnimatePresence mode="wait">
          <motion.h3
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            {current.title}
          </motion.h3>
        </AnimatePresence>
      </div>

      {openedProject && (
        <ProjectModal
          project={openedProject}
          onClose={closeModal}
          v21Images={openedProject.v21Images}
          v12Images={openedProject.v12Images}
          comparison={openedProject.comparison}
        />
      )}
    </section>
  );
}
