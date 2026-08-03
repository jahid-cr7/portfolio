interface SkillTagProps {
  name: string;
}

export function SkillTag({ name }: SkillTagProps) {
  return (
    <span className="border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
      {name}
    </span>
  );
}
