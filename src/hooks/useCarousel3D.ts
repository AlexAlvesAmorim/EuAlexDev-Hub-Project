import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./useMediaQuery";
import { carouselConfig } from "../config/carousel";

/**
 * Evolução do useProjectSlider:
 * - Mesma matemática do cilindro (fonte única = ângulo, índice derivado).
 * - Números vêm de config/carousel.ts, não mais mágicos.
 * - Cleanup correto do timeout de touch + drag manual por pointer.
 * - Respeita prefers-reduced-motion via framer-motion + media query.
 */
export function useCarousel3D(total: number) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userAutoRotate, setUserAutoRotate] = useState(true);

  const mqReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const fmReduced = useReducedMotion();
  const reducedMotion = mqReduced || fmReduced === true;
  const autoRotate = userAutoRotate && !reducedMotion;

  const degreesPerCard = 360 / Math.max(total, 1);
  const degreesPerSecond = degreesPerCard / (carouselConfig.autoplayMs / 1000);
  const captionLeadAngle = degreesPerSecond * (carouselConfig.captionLeadMs / 1000);

  const rotationRef = useRef(0);
  const indexRef = useRef(0);
  const lastTsRef = useRef(0);
  const touchTimer = useRef<number | null>(null);
  const dragging = useRef<{ startX: number; startRot: number } | null>(null);

  useEffect(() => {
    return () => {
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    if (typeof requestAnimationFrame === "undefined") return;
    let raf = 0;
    const tick = (ts: number) => {
      const prev = lastTsRef.current || ts;
      lastTsRef.current = ts;
      rotationRef.current += degreesPerSecond * ((ts - prev) / 1000);
      sliderRef.current?.style.setProperty("--rotation", `${rotationRef.current}deg`);
      const k =
        Math.floor((rotationRef.current + captionLeadAngle) / degreesPerCard) % total;
      const nextIndex = (((total - k) % total) + total) % total;
      if (nextIndex !== indexRef.current) {
        indexRef.current = nextIndex;
        setSelectedIndex(nextIndex);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lastTsRef.current = 0;
    };
  }, [autoRotate, total, degreesPerSecond, degreesPerCard, captionLeadAngle]);

  const applyRotation = useCallback(
    (deg: number) => {
      rotationRef.current = deg;
      sliderRef.current?.style.setProperty("--rotation", `${deg}deg`);
      const k = Math.floor((deg + captionLeadAngle) / degreesPerCard) % total;
      const nextIndex = (((total - k) % total) + total) % total;
      indexRef.current = nextIndex;
      setSelectedIndex(nextIndex);
    },
    [captionLeadAngle, degreesPerCard, total]
  );

  const handleSelect = useCallback(
    (index: number) => {
      const targetK = (((total - index) % total) + total) % total;
      applyRotation(targetK * degreesPerCard);
    },
    [applyRotation, degreesPerCard, total]
  );

  const handleMouseEnter = useCallback(() => setUserAutoRotate(false), []);
  const handleMouseLeave = useCallback(() => setUserAutoRotate(true), []);
  const handleTouchStart = useCallback(() => {
    if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    setUserAutoRotate(false);
  }, []);
  const handleTouchEnd = useCallback(() => {
    if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(
      () => setUserAutoRotate(true),
      carouselConfig.touchResumeMs
    );
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = { startX: e.clientX, startRot: rotationRef.current };
    setUserAutoRotate(false);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = dragging.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      applyRotation(d.startRot + dx * 0.35);
    },
    [applyRotation]
  );
  const onPointerUp = useCallback(() => {
    dragging.current = null;
    if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(
      () => setUserAutoRotate(true),
      carouselConfig.touchResumeMs
    );
  }, []);

  const toggleAutoRotate = useCallback(() => setUserAutoRotate((v) => !v), []);

  return {
    sliderRef,
    selectedIndex,
    autoRotate,
    userAutoRotate,
    handleSelect,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    toggleAutoRotate,
    setUserAutoRotate,
  };
}
