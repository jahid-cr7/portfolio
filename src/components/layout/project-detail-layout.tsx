import { Project } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { PageContainer } from "@/components/layout/page-container";
import { TechnologyList } from "@/components/ui/technology-list";
import { ProjectMeta } from "@/components/ui/project-meta";
import { ProjectNavigation } from "@/components/ui/project-navigation";
import { ExternalLink } from "@/components/ui/external-link";
import { AdjacentProjects } from "@/lib/projects";

interface ProjectDetailLayoutProps {
  project: Project;
  adjacent: AdjacentProjects;
}

export function ProjectDetailLayout({
  project,
  adjacent,
}: ProjectDetailLayoutProps) {
  return (
    <article className="flex flex-1 flex-col">
      {/* Hero image */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6">
        <div className="relative aspect-video w-full overflow-hidden border border-border bg-background-secondary">
          <ImageWithFallback
            src={project.heroImage ?? project.image}
            alt={`${project.title} project preview`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
            fallbackTitle={project.title}
          />
        </div>
      </div>

      <PageContainer className="flex flex-1 flex-col py-16 sm:py-24">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <header className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
                {project.number}
              </span>
              <span
                className="h-px w-6 bg-border"
                aria-hidden="true"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                {project.category}
              </span>
            </div>

            <h1 className="font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <ProjectMeta project={project} />
          </header>

          {/* Divider */}
          <div className="h-px w-full bg-border" aria-hidden="true" />

          {/* Description */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Overview
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                {project.shortDescription}
              </p>
            </div>

            <aside className="flex flex-col gap-6 lg:w-72">
              <div>
                <h2 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Technologies
                </h2>
                <TechnologyList technologies={project.technologies} />
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Links
                </h2>
                <span data-cursor="OPEN">
                  <ExternalLink
                    href={project.github}
                    className="font-mono text-xs text-foreground-muted"
                  >
                    GitHub Repository
                  </ExternalLink>
                </span>
                {project.liveDemo !== "#" && !project.liveDemo.startsWith("[EDITABLE") && (
                  <span data-cursor="OPEN">
                    <ExternalLink
                      href={project.liveDemo}
                      className="font-mono text-xs text-foreground-muted"
                    >
                      Live Demo
                    </ExternalLink>
                  </span>
                )}
              </div>
            </aside>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border" aria-hidden="true" />

          {/* Navigation */}
          <ProjectNavigation
            previous={adjacent.previous}
            next={adjacent.next}
          />
        </div>
      </PageContainer>
    </article>
  );
}
