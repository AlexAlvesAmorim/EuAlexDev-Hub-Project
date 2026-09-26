import { z } from "zod";

export const VersionComparisonSchema = z.object({
  feature: z.string(),
  from: z.string(),
  to: z.string(),
});

export const ProjectImageSchema = z.object({
  webp: z.string(),
  png: z.string(),
  alt: z.string(),
});

export const ExtendedGallerySchema = z.object({
  v21Images: z.array(z.string()).default([]),
  v12Images: z.array(z.string()).default([]),
  comparison: z.array(VersionComparisonSchema).default([]),
  newVersion: z.string().optional(),
  oldVersion: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  image: ProjectImageSchema,
  technologies: z.array(z.string()),
  github: z.string().url(),
  demo: z.string().url().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  challenges: z.string().optional(),
  results: z.string().optional(),
  gallery: ExtendedGallerySchema.optional(),
});

export const ProjectsSchema = z.array(ProjectSchema);

export const TechnologySchema = z.object({
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  level: z.string(),
  category: z.string(),
});

export const TimelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
});

export const CertSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  year: z.string(),
  description: z.string(),
});

export type ProjectContent = z.infer<typeof ProjectSchema>;
