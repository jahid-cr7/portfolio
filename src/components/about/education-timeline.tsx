"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AnimatedDivider } from "@/components/motion/animated-divider";
import { siteConfig } from "@/data/site";

export function EducationTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Reveal direction="up" delay={0}>
          <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
            [ ACADEMIC BACKGROUND ]
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.08}>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Education Journey
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.16}>
          <p className="max-w-2xl text-base leading-relaxed text-foreground-muted">
            My education across Bangladesh and China has shaped my technical
            interests, language skills and international perspective.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <motion.div
          className="absolute left-[11px] top-0 hidden h-full w-px bg-border md:block"
          initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
          style={{ originY: 0 }}
        />

        <Stagger staggerDelay={0.1} className="flex flex-col gap-8 md:gap-10">
          {siteConfig.education.map((edu, i) => (
            <StaggerItem key={edu.institution}>
              <div className="relative flex flex-col gap-3 md:flex-row md:gap-8">
                {/* Timeline marker */}
                <div className="flex items-center gap-3 md:w-48 md:flex-shrink-0 md:flex-col md:items-start md:gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-accent font-mono text-[10px] font-semibold text-background">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-foreground-subtle md:hidden">
                      {edu.level}
                    </span>
                  </div>
                  <span className="hidden font-mono text-xs uppercase tracking-wider text-foreground-subtle md:block">
                    {edu.level}
                  </span>
                </div>

                {/* Entry content */}
                <div className="flex flex-col gap-2 md:flex-1 md:border-l md:border-border md:pl-8">
                  <h3 className="font-sans text-lg font-medium text-foreground">
                    {edu.institution}
                  </h3>
                  {edu.location && (
                    <span className="font-mono text-xs text-foreground-muted">
                      {edu.location}
                    </span>
                  )}
                  {edu.graduationYear && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                      Graduate {edu.graduationYear}
                    </span>
                  )}
                  {edu.level === "University" && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                      Chinese proficiency: {siteConfig.chineseLevel}
                    </span>
                  )}
                  {i < siteConfig.education.length - 1 && (
                    <div className="mt-4 h-px w-full bg-border md:hidden" />
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatedDivider accent />
    </div>
  );
}
