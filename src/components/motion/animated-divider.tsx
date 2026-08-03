"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedDividerProps {
  className?: string;
  delay?: number;
  accent?: boolean;
}

export function AnimatedDivider({
  className,
  delay = 0,
  accent = false,
}: AnimatedDividerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative h-px w-full overflow-hidden", className)}>
      {accent && (
        <motion.div
          className="absolute left-0 top-0 h-full w-8 bg-accent"
          initial={
            reducedMotion
              ? { scaleX: 1, originX: 0 }
              : { scaleX: 0, originX: 0 }
          }
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            delay: reducedMotion ? 0 : delay,
            ease: "easeOut",
          }}
        />
      )}
      <motion.div
        className="h-full w-full bg-border"
        initial={
          reducedMotion
            ? { scaleX: 1, originX: 0 }
            : { scaleX: 0, originX: 0 }
        }
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          delay: reducedMotion ? 0 : delay + (accent ? 0.15 : 0),
          ease: "easeOut",
        }}
      />
    </div>
  );
}
