import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectNavigationProps {
  previous: Project | null;
  next: Project | null;
}

export function ProjectNavigation({
  previous,
  next,
}: ProjectNavigationProps) {
  return (
    <nav
      className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Project navigation"
    >
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          data-cursor="NAVIGATE"
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="text-[10px] text-foreground-subtle">Previous</span>
            <span>{previous.title}</span>
          </div>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="NAVIGATE"
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent sm:text-right"
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-foreground-subtle">Next</span>
            <span>{next.title}</span>
          </div>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
