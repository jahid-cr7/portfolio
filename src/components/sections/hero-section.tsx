"use client";

import { motion } from "motion/react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-72px)] flex-col justify-center overflow-hidden py-24">
      <PageContainer>
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <span
              className="inline-block h-2 w-2 bg-accent"
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
              {siteConfig.role}
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="flex max-w-4xl flex-col gap-2">
            <motion.h1
              className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Building practical
            </motion.h1>
            <motion.h1
              className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              AI &amp; software
            </motion.h1>
            <motion.h1
              className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              products
              <span className="text-accent">.</span>
            </motion.h1>
          </div>

          {/* Sub-description */}
          <motion.p
            className="max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            Full-Stack AI Developer focused on building practical, reliable and
            scalable systems. Experienced in machine learning, computer vision,
            backend architecture and modern web interfaces.
          </motion.p>

          {/* Location / university */}
          <motion.div
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
          >
            <span className="font-mono text-xs text-foreground-subtle">
              {siteConfig.location}
            </span>
            <span
              className="hidden h-px w-8 bg-border sm:inline-block"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-foreground-subtle">
              {siteConfig.university}
            </span>
            <span
              className="hidden h-px w-8 bg-border sm:inline-block"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-foreground-subtle">
              {siteConfig.chineseLevel}
            </span>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
