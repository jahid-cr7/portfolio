"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
  fallbackTitle,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-background-secondary">
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
          PROJECT IMAGE
        </span>
        {fallbackTitle && (
          <span className="font-mono text-xs text-foreground-muted">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}
