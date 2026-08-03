import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Jahid",
  description:
    "Selected projects by Jahid: AI, full-stack and software systems built to solve practical problems.",
  alternates: {
    canonical: "https://localhost:3000/projects",
  },
  openGraph: {
    title: "Projects — Jahid",
    description:
      "Selected projects by Jahid: AI, full-stack and software systems built to solve practical problems.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="flex flex-col gap-12">
            <Reveal direction="up" delay={0}>
              <SectionHeading
                label="[ PROJECTS / ARCHIVE ]"
                title="Selected Projects"
              />
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                AI, full-stack and software systems built to solve practical
                problems.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
