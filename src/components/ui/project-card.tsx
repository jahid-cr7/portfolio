"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

type ProjectCardDirection = "up" | "left" | "right";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: () => void;
  direction?: ProjectCardDirection;
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

const directionInitial: Record<ProjectCardDirection, { x?: number; y?: number }> = {
  up: { y: 18 },
  left: { x: 16 },
  right: { x: -16 },
};

export function ProjectCard({ project, index = 0, onClick, direction = "up" }: ProjectCardProps) {
  const offset = directionInitial[direction];

  return (
    <motion.article
      className="group flex flex-col border border-border bg-surface transition-colors hover:border-border-strong"
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      {/* Thumbnail */}
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          data-cursor="VIEW"
          className="relative aspect-[16/10] w-full overflow-hidden bg-background-secondary text-left"
          aria-label={`View ${project.title} project details`}
        >
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          data-cursor="VIEW"
          className="relative aspect-[16/10] overflow-hidden bg-background-secondary"
          aria-label={`View ${project.title} project details`}
        >
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Top row: category + number */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-technical-blue">
            {project.category}
          </span>
          <span className="font-mono text-xs text-foreground-subtle">
            {project.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground-muted">
          {project.shortDescription}
        </p>

        {/* Technology tags */}
        <Stagger className="flex flex-wrap gap-2" staggerDelay={0.05}>
          {project.technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                {tech.name}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Bottom row: view details + links */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          {onClick ? (
            <button
              type="button"
              onClick={onClick}
              data-cursor="VIEW"
              className="font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
            >
              View details
            </button>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="VIEW"
              className="font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
            >
              View details
            </Link>
          )}

          <div className="flex items-center gap-4">
            <a
              href={isPlaceholder(project.github) ? "#" : project.github}
              target={
                isPlaceholder(project.github) ? undefined : "_blank"
              }
              rel={
                isPlaceholder(project.github)
                  ? undefined
                  : "noopener noreferrer"
              }
              data-cursor="OPEN"
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider text-foreground-subtle transition-colors hover:text-accent",
                isPlaceholder(project.github) &&
                  "cursor-not-allowed opacity-50"
              )}
              onClick={(e) => {
                if (isPlaceholder(project.github)) {
                  e.preventDefault();
                }
              }}
            >
              GitHub
            </a>
            <a
              href={isPlaceholder(project.liveDemo) ? "#" : project.liveDemo}
              target={
                isPlaceholder(project.liveDemo) ? undefined : "_blank"
              }
              rel={
                isPlaceholder(project.liveDemo)
                  ? undefined
                  : "noopener noreferrer"
              }
              data-cursor="OPEN"
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider text-foreground-subtle transition-colors hover:text-accent",
                isPlaceholder(project.liveDemo) &&
                  "cursor-not-allowed opacity-50"
              )}
              onClick={(e) => {
                if (isPlaceholder(project.liveDemo)) {
                  e.preventDefault();
                }
              }}
            >
              Live
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
