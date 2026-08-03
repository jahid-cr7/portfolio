"use client";

import { cn } from "@/lib/utils";

interface EmailLinkProps {
  email: string;
  className?: string;
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

export function EmailLink({ email, className }: EmailLinkProps) {
  const placeholder = isPlaceholder(email);

  return (
    <a
      href={placeholder ? "#" : `mailto:${email}`}
      className={cn(
        "font-mono text-xs text-foreground-muted transition-colors hover:text-accent",
        placeholder && "cursor-not-allowed opacity-60",
        className
      )}
      onClick={(e) => {
        if (placeholder) {
          e.preventDefault();
        }
      }}
    >
      {placeholder ? "[EDITABLE: your-email@example.com]" : email}
    </a>
  );
}
