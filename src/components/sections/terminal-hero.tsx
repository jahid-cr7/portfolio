"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { terminalPhases } from "@/data/terminal-lines";
import { PageContainer } from "@/components/layout/page-container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const BOOT_DELAY = 300;
const TYPING_SPEED = 60;
const OUTPUT_DELAY = 150;
const CURSOR_BLINK = 530;

interface TerminalLineProps {
  children: React.ReactNode;
  className?: string;
}

function TerminalLine({ children, className }: TerminalLineProps) {
  return (
    <div className={`font-mono text-sm leading-relaxed sm:text-base ${className}`}>
      {children}
    </div>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block h-[1.1em] w-[0.6em] align-text-bottom bg-terminal-green"
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: CURSOR_BLINK / 1000,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

export function TerminalHero() {
  const [imgError, setImgError] = useState(false);

  // Terminal phase states
  const [bootIndex, setBootIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [outputIndex, setOutputIndex] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const bootLines = terminalPhases[0].lines;
  const commandLine = terminalPhases[1].lines[0];
  const outputLines = terminalPhases[2].lines;

  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reduced motion: reveal everything immediately
  useEffect(() => {
    if (!reducedMotion) return;
    const timer = setTimeout(() => {
      setBootIndex(bootLines.length);
      setShowPrompt(true);
      setTypedChars(commandLine.length);
      setTypingDone(true);
      setOutputIndex(outputLines.length);
      setAllDone(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [reducedMotion, bootLines.length, commandLine.length, outputLines.length]);

  // Boot sequence
  useEffect(() => {
    if (reducedMotion) return;
    if (bootIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, BOOT_DELAY);
      return () => clearTimeout(timer);
    }
    if (bootIndex === bootLines.length && !showPrompt) {
      const timer = setTimeout(() => setShowPrompt(true), BOOT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [bootIndex, showPrompt, reducedMotion, bootLines.length]);

  // Typing animation
  useEffect(() => {
    if (reducedMotion || !showPrompt || typingDone) return;

    if (typedChars < commandLine.length) {
      const timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setTypingDone(true), 0);
    return () => clearTimeout(timer);
  }, [typedChars, showPrompt, typingDone, reducedMotion, commandLine.length]);

  // Output reveal
  useEffect(() => {
    if (reducedMotion || !typingDone) return;

    if (outputIndex < outputLines.length) {
      const timer = setTimeout(() => {
        setOutputIndex((prev) => prev + 1);
      }, OUTPUT_DELAY);
      return () => clearTimeout(timer);
    }
    if (outputIndex === outputLines.length && !allDone) {
      const timer = setTimeout(() => setAllDone(true), OUTPUT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [outputIndex, typingDone, allDone, reducedMotion, outputLines.length]);

  const visibleBoot = bootLines.slice(0, bootIndex);
  const visibleOutput = outputLines.slice(0, outputIndex);
  const typedCommand = commandLine.slice(0, typedChars);

  return (
    <section className="relative flex min-h-[calc(100vh-72px)] flex-col justify-center overflow-hidden py-16 sm:py-20">
      <PageContainer>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
          {/* Left column */}
          <div className="flex flex-col gap-8 lg:w-[46%]">
            {/* Text content — first on mobile */}
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <Reveal direction="up" delay={0}>
                <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
                  [ FULL-STACK AI DEVELOPER ]
                </span>
              </Reveal>

              <Reveal direction="up" delay={0.08}>
                <h1 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                  I build practical AI and software products that solve real-world
                  problems.
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.16}>
                <p className="max-w-md text-base leading-relaxed text-foreground-muted">
                  I am Jahid, a Full-Stack AI Developer focused on artificial
                  intelligence, computer vision, backend systems and modern
                  full-stack applications.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.24}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-mono text-xs text-foreground-subtle">
                    Present: {siteConfig.presentAddress}
                  </span>
                  <span
                    className="hidden h-px w-6 bg-border sm:inline-block"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-foreground-subtle">
                    Permanent: {siteConfig.permanentAddress}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Profile image — second on mobile, first on desktop */}
            <Reveal direction="up" delay={0.1} className="order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden border border-border bg-background-secondary">
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

                {/* Subtle grid overlay */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
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
                    sizes="(max-width: 1024px) 280px, 320px"
                    onError={() => setImgError(true)}
                    priority
                  />
                )}
              </div>
            </Reveal>

            {/* Buttons — third */}
            <Stagger
              className="order-3 flex flex-wrap gap-3"
              staggerDelay={0.06}
            >
              <StaggerItem>
                <Link
                  href="/projects"
                  data-cursor="OPEN"
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
                  data-cursor="DOWNLOAD"
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

          {/* Right column — terminal */}
          <div className="order-4 lg:w-[54%]">
            <Reveal direction="up" delay={0.12}>
              <div className="overflow-hidden border border-terminal-border bg-terminal-bg shadow-[0_0_40px_rgba(0,255,65,0.04)]">
                {/* Title bar */}
                <div className="flex items-center gap-3 border-b border-terminal-border bg-terminal-titlebar px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="mx-auto font-mono text-[11px] text-terminal-dim">
                    jahid@portfolio
                  </span>
                  <div className="w-14" />
                </div>

                {/* Terminal body */}
                <div className="relative overflow-hidden p-5 sm:p-8">
                  {/* Scanline overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      boxShadow: "inset 0 0 80px rgba(0, 255, 65, 0.15)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative flex flex-col gap-1">
                    {/* Boot lines */}
                    <AnimatePresence>
                      {visibleBoot.map((line, i) => (
                        <motion.div
                          key={`boot-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TerminalLine className="text-terminal-green">
                            {line}
                          </TerminalLine>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Command prompt */}
                    <AnimatePresence>
                      {showPrompt && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.15 }}
                          className="mt-2"
                        >
                          <TerminalLine className="text-terminal-white">
                            <span className="text-terminal-amber">$ </span>
                            {typedCommand}
                            {!typingDone && <BlinkingCursor />}
                          </TerminalLine>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Output lines */}
                    <AnimatePresence>
                      {visibleOutput.map((line, i) => (
                        <motion.div
                          key={`out-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <TerminalLine className="text-terminal-green">
                            {line}
                          </TerminalLine>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Idle cursor */}
                    {allDone && (
                      <div className="mt-2">
                        <TerminalLine className="text-terminal-white">
                          <span className="text-terminal-amber">$ </span>
                          <BlinkingCursor />
                        </TerminalLine>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
