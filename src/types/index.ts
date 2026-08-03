export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export type ProjectCategory =
  | "AI"
  | "Web"
  | "Mobile"
  | "Desktop"
  | "Streaming"
  | "Education"
  | "Deep Learning / Computer Vision"
  | "Reinforcement Learning"
  | "Data Engineering / Geospatial Analysis";

export type ProjectStatus =
  | "live"
  | "development"
  | "prototype"
  | "archived"
  | "Completed Thesis Project"
  | "Completed Team Project"
  | "Completed Project";

export interface Technology {
  name: string;
}

export interface Education {
  level: string;
  institution: string;
  location?: string;
  period?: string;
  graduationYear?: number;
  description?: string;
}

export type AnimationDirection = "up" | "down" | "left" | "right" | "none";

export interface Project {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: Technology[];
  image: string;
  heroImage?: string;
  github: string;
  liveDemo: string;
  featured: boolean;
}
