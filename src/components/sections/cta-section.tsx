"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { AnimatedDivider } from "@/components/motion/animated-divider";
import { Reveal } from "@/components/motion/reveal";

export function CTASection() {
  return (
    <section className="border-t border-border py-24">
      <PageContainer>
        <div className="flex flex-col gap-8">
          <AnimatedDivider accent />

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <Reveal direction="up" delay={0}>
                <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
                  [ AVAILABLE / OPEN ]
                </span>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <p className="max-w-lg text-lg leading-relaxed text-foreground-muted">
                  Open to meaningful software, AI and technical opportunities.
                  Based in Bangladesh.
                </p>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.16}>
              <Link
                href="/contact"
                data-cursor="SEND"
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                Get in touch
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
