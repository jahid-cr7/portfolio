"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Project } from "@/types";
import { TechnologyList } from "@/components/ui/technology-list";
import { ExternalLink } from "@/components/ui/external-link";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto border border-border bg-surface shadow-xl sm:max-h-[85vh]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex items-center justify-end border-b border-border bg-surface px-4 py-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center text-foreground-muted transition-colors hover:text-accent"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-secondary">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-3">
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

                <h2
                  id="project-modal-title"
                  className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                >
                  {project.title}
                </h2>
              </div>

              <p className="text-base leading-relaxed text-foreground-muted">
                {project.shortDescription}
              </p>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Technologies
                </span>
                <TechnologyList technologies={project.technologies} />
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Links
                </span>
                <div className="flex flex-wrap gap-4">
                  <ExternalLink
                    href={project.github}
                    className="font-mono text-xs text-foreground-muted"
                  >
                    GitHub Repository
                  </ExternalLink>
                  <ExternalLink
                    href={project.liveDemo}
                    className="font-mono text-xs text-foreground-muted"
                  >
                    Live Demo
                  </ExternalLink>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Status: {project.status}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
