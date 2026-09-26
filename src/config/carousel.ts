/**
 * Números mágicos do carrossel, centralizados.
 * Antes: 5000/2000ms em useProjectSlider.ts, depth/perspective/card
 * espalhados em banner.css + responsive.css.
 */

export const carouselConfig = {
  autoplayMs: 5000,
  captionLeadMs: 2000,
  touchResumeMs: 3000,
  desktop: {
    cardW: 215,
    cardH: 294,
    depth: 490,
    perspective: 1500,
    rotateX: -14,
    particles: 100,
  },
  mobile: {
    cardW: 108,
    cardH: 149,
    depth: 280,
    perspective: 900,
    rotateX: -14,
    particles: 30,
  },
  particles: {
    section: { desktop: 45, mobile: 18 },
    compact: { desktop: 30, mobile: 12 },
  },
} as const;

export type CarouselConfig = typeof carouselConfig;
