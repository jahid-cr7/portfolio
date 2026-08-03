"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

function isPlaceholder(href: string): boolean {
  return href.startsWith("[EDITABLE") || href === "#";
}

export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: ExternalLinkProps) {
  const placeholder = isPlaceholder(href);

  return (
    <a
      href={placeholder ? "#" : href}
      target={placeholder ? undefined : "_blank"}
      rel={placeholder ? undefined : "noopener noreferrer"}
      className={cn(
        "inline-flex items-center gap-1 transition-colors hover:text-accent",
        placeholder && "cursor-not-allowed opacity-60",
        className
      )}
      onClick={(e) => {
        if (placeholder) {
          e.preventDefault();
        }
      }}
    >
      {children}
      {showIcon && !placeholder && (
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      )}
      {placeholder && (
        <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
          [edit]
        </span>
      )}
    </a>
  );
}
