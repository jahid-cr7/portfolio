"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  email: string;
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const placeholder = isPlaceholder(email);

  const handleCopy = useCallback(async () => {
    if (placeholder) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: try execCommand
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore
      }
      document.body.removeChild(textarea);
    }
  }, [email, placeholder]);

  if (placeholder) {
    return (
      <span className="font-mono text-xs text-foreground-subtle">
        ADD EMAIL
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-cursor="COPY"
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
        copied ? "text-success" : "text-foreground-muted hover:text-accent"
      )}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" aria-hidden="true" />
          COPIED
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" aria-hidden="true" />
          COPY
        </>
      )}
    </button>
  );
}
