import { projects } from "@/data/projects";
import { Project } from "@/types";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export interface AdjacentProjects {
  previous: Project | null;
  next: Project | null;
}

export function getAdjacentProjects(slug: string): AdjacentProjects {
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
