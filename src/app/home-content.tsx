"use client";

import { useState } from "react";
import { TerminalHero } from "@/components/sections/terminal-hero";
import { AboutSection } from "@/components/sections/about-section";
import { RecentProjectsSection } from "@/components/sections/recent-projects-section";
import { CTASection } from "@/components/sections/cta-section";
import { ProjectModal } from "@/components/ui/project-modal";
import { Reveal } from "@/components/motion/reveal";
import { Project } from "@/types";
import { projects } from "@/data/projects";

export function HomeContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const recentProjects = projects;

  return (
    <>
      <Reveal direction="up">
        <TerminalHero />
      </Reveal>
      <AboutSection />
   
      <RecentProjectsSection
        projects={recentProjects}
        onProjectClick={setSelectedProject}
      />
      <CTASection />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
