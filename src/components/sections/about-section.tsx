import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

export function AboutSection() {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <PageContainer>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <Reveal direction="up" delay={0}>
              <SectionHeading label="[ ABOUT ]" title="Jahid." />
            </Reveal>

            <div className="flex flex-col gap-4">
              <Reveal direction="up" delay={0.08}>
                <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  I am a Full-Stack AI Developer from Bangladesh, currently
                  studying Computer Science and Technology at Sichuan University.
                  I build software that solves real problems — from AI-powered
                  diagnostics and computer-vision tools to full-stack web
                  applications and streaming platforms.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.16}>
                <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  My work spans machine learning, backend architecture, system
                  design and modern frontend development. I focus on writing clean,
                  maintainable code and shipping products that are reliable and
                  useful.
                </p>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.24}>
              <Link
                href="/about"
                data-cursor="OPEN"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
              >
                More about me
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:w-80">
            <Reveal direction="up" delay={0.12}>
              <div className="flex flex-col gap-4 border border-border bg-surface p-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Quick Info
                </span>
                <Stagger staggerDelay={0.06} className="flex flex-col gap-3">
                  <StaggerItem>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                        Location
                      </span>
                      <span className="font-mono text-xs text-foreground-muted">
                        Bangladesh
                      </span>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                        Education
                      </span>
                      <span className="font-mono text-xs text-foreground-muted">
                        Sichuan University
                      </span>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                        Languages
                      </span>
                      <span className="font-mono text-xs text-foreground-muted">
                        English, Bangla, Chinese
                      </span>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                        Availability
                      </span>
                      <span className="font-mono text-xs text-success">
                        Open to opportunities
                      </span>
                    </div>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}
