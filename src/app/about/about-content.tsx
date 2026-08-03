"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillTag } from "@/components/ui/skill-tag";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AnimatedDivider } from "@/components/motion/animated-divider";
import { EducationTimeline } from "@/components/about/education-timeline";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const skills = [
  "Python",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "Node.js",
  "OpenCV",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Git",
  "GitHub",
  "Ubuntu",
  "Windows",
];

const focusAreas = [
  {
    title: "Artificial Intelligence",
    description:
      "Integrating AI models and intelligent workflows into practical software products.",
  },
  {
    title: "Computer Vision",
    description:
      "Building applications that analyze images, video, posture, speech and visual information.",
  },
  {
    title: "Full-Stack Development",
    description:
      "Creating responsive interfaces, APIs, databases and complete application workflows.",
  },
  {
    title: "Reliable Engineering",
    description:
      "Using testing, documentation, modular architecture and deployment tools to improve software quality.",
  },
];

const languages = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Working and professional development" },
  { name: "Chinese", level: siteConfig.chineseLevel },
];

const values = [
  {
    title: "Practical problem solving",
    description: "I focus on real user needs and measurable outcomes.",
  },
  {
    title: "Continuous learning",
    description: "I regularly explore new tools, techniques and domains.",
  },
  {
    title: "Clear communication",
    description: "I explain technical concepts in understandable language.",
  },
  {
    title: "Reliable implementation",
    description: "I build systems that are tested, documented and maintainable.",
  },
];

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

export function AboutContent() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      {/* Page intro */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-6">
            <Reveal direction="up" delay={0}>
              <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
                [ DEVELOPER / PROFILE ]
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 className="max-w-3xl font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                About Jahid.
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                Full-Stack AI Developer focused on building practical AI,
                computer-vision and software products.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.24}>
              <AnimatedDivider accent />
            </Reveal>
          </div>
        </PageContainer>
      </section>

      {/* Main profile */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Left — profile image + metadata */}
            <div className="flex flex-col gap-6 lg:w-80 lg:flex-shrink-0">
              <Reveal direction="up" delay={0}>
                <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden border border-border bg-background-secondary">
                  {/* Corner marks */}
                  <span
                    className="absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-accent"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute right-0 top-0 z-10 h-3 w-3 border-r-2 border-t-2 border-accent"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b-2 border-l-2 border-accent"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b-2 border-r-2 border-accent"
                    aria-hidden="true"
                  />
                  {/* Subtle overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                    aria-hidden="true"
                  />
                  {imgError ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground-subtle">
                        ADD PROFILE PHOTO
                      </span>
                    </div>
                  ) : (
                    <Image
                      src="/images/profile/jahid-profile.jpg"
                      alt="Jahid profile photo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                      onError={() => setImgError(true)}
                      priority
                    />
                  )}
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <div className="flex flex-col gap-3 border border-border bg-surface p-5">
                  {[
                    { label: "Name", value: siteConfig.name },
                    { label: "Role", value: siteConfig.role },
                    { label: "Present", value: siteConfig.presentAddress },
                    { label: "Permanent", value: siteConfig.permanentAddress },
                    { label: "University", value: siteConfig.university },
                    { label: "Graduation", value: String(siteConfig.graduationYear) },
                    { label: "Language", value: `Chinese, ${siteConfig.chineseLevel}` },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-foreground-muted">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — introduction */}
            <div className="flex flex-col gap-6 lg:flex-1">
              <Reveal direction="up" delay={0.08}>
                <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  I am a Full-Stack AI Developer interested in building practical
                  software using artificial intelligence, computer vision, backend
                  systems and modern web technologies.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.16}>
                <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  I enjoy transforming complex technical ideas into reliable and
                  understandable products. My work includes intelligent IT
                  diagnostics, AI interview coaching, education-management software
                  and streaming-platform development.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.24}>
                <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  My goal is to continue improving as an AI and software engineer
                  while building products that solve real-world problems.
                </p>
              </Reveal>

              <Stagger staggerDelay={0.06} className="flex flex-wrap gap-3 pt-2">
                <StaggerItem>
                  <Link
                    href="/projects"
                    data-cursor="VIEW"
                    className="inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                  >
                    View Projects
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </StaggerItem>
                <StaggerItem>
                  <a
                    href={siteConfig.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className={cn(
                      "inline-flex h-11 items-center gap-2 border border-border bg-surface px-5 font-mono text-xs uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong",
                      isPlaceholder(siteConfig.resumePath) &&
                        "pointer-events-none opacity-50"
                    )}
                  >
                    Download CV
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Current focus */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-10">
            <Reveal direction="up" delay={0}>
              <SectionHeading label="[ FOCUS ]" title="What I Focus On" />
            </Reveal>

            <Stagger staggerDelay={0.07} className="grid gap-6 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <StaggerItem key={area.title}>
                  <div className="flex flex-col gap-3 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 bg-accent"
                        aria-hidden="true"
                      />
                      <h3 className="font-sans text-base font-medium text-foreground">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {area.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </PageContainer>
      </section>

      {/* Education timeline */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <EducationTimeline />
        </PageContainer>
      </section>

      {/* Skills */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-8">
            <Reveal direction="up" delay={0}>
              <SectionHeading label="[ TOOLS ]" title="Tools I Work With" />
            </Reveal>
            <Stagger staggerDelay={0.04} className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <StaggerItem key={skill}>
                  <SkillTag name={skill} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </PageContainer>
      </section>

      {/* Languages */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-8">
            <Reveal direction="up" delay={0}>
              <SectionHeading label="[ LANGUAGES ]" title="Languages" />
            </Reveal>
            <Stagger staggerDelay={0.06} className="grid gap-6 sm:grid-cols-3">
              {languages.map((lang) => (
                <StaggerItem key={lang.name}>
                  <div className="flex flex-col gap-2 border border-border bg-surface p-5">
                    <span className="font-sans text-base font-medium text-foreground">
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-foreground-muted">
                      {lang.level}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </PageContainer>
      </section>

      {/* Personal values */}
      <section className="border-b border-border py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-8">
            <Reveal direction="up" delay={0}>
              <SectionHeading
                label="[ VALUES ]"
                title="How I Approach Work"
              />
            </Reveal>
            <Stagger staggerDelay={0.06} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val) => (
                <StaggerItem key={val.title}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 bg-accent"
                        aria-hidden="true"
                      />
                      <h3 className="font-sans text-sm font-medium text-foreground">
                        {val.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {val.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </PageContainer>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="flex flex-col gap-8">
            <AnimatedDivider accent />
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-3">
                <Reveal direction="up" delay={0}>
                  <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
                    [ NEXT / SELECTED WORK ]
                  </span>
                </Reveal>
                <Reveal direction="up" delay={0.08}>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    See the products I have built.
                  </h2>
                </Reveal>
              </div>

              <Stagger staggerDelay={0.06} className="flex flex-wrap gap-3">
                <StaggerItem>
                  <Link
                    href="/projects"
                    data-cursor="VIEW"
                    className="inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                  >
                    Explore Projects
                    <ArrowRight
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </StaggerItem>
                <StaggerItem>
                  <Link
                    href="/contact"
                    data-cursor="CONTACT"
                    className="inline-flex h-11 items-center gap-2 border border-border bg-surface px-5 font-mono text-xs uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong"
                  >
                    Contact Me
                  </Link>
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
