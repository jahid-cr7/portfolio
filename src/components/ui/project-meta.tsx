import { Project } from "@/types";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
          Category
        </span>
        <span className="font-mono text-xs text-foreground-muted">
          {project.category}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
          Status
        </span>
        <span className="font-mono text-xs text-foreground-muted">
          {project.status}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
          Year
        </span>
        <span className="font-mono text-xs text-foreground-muted">
          {project.year ?? new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
