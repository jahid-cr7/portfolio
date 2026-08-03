import { Technology } from "@/types";

interface TechnologyListProps {
  technologies: Technology[];
}

export function TechnologyList({ technologies }: TechnologyListProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {technologies.map((tech) => (
        <li
          key={tech.name}
          className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle"
        >
          {tech.name}
        </li>
      ))}
    </ul>
  );
}
