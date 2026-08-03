"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      data-cursor="TOP"
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center border border-border transition-all group-hover:-translate-y-0.5 group-hover:border-accent">
        <ArrowUp
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px"
          aria-hidden="true"
        />
      </span>
      Back to Top
    </button>
  );
}
