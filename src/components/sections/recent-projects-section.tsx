"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Project } from "@/types";

interface RecentProjectsSectionProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function RecentProjectsSection({
  projects,
  onProjectClick,
}: RecentProjectsSectionProps) {
  return (
    <section className="py-24">
      <PageContainer>
        <div className="flex flex-col gap-12">
          {/* Section header */}
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal direction="up" delay={0}>
              <SectionHeading
                label="[ RECENT / WORK ]"
                title="Selected Projects"
              />
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <Link
                href="/projects"
                data-cursor="VIEW"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
              >
                View all projects
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          {/* Project cards grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onClick={
                  onProjectClick ? () => onProjectClick(project) : undefined
                }
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
