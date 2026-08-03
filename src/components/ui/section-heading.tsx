import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {label && (
        <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
          {label}
        </span>
      )}
      <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
