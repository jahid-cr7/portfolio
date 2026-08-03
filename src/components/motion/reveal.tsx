"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "aside" | "span";
}

const directionOffset: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 18 },
  down: { y: -18 },
  left: { x: 18 },
  right: { x: -18 },
  none: {},
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const offset = directionOffset[direction];

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={cn(className)}
      initial={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 0, ...offset }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </Component>
  );
}
