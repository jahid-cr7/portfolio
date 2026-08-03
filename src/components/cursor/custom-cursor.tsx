"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const SPRING_CONFIG = { damping: 28, stiffness: 280, mass: 0.6 };
const ROTATION_SPRING = { damping: 22, stiffness: 180 };

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const prevX = useRef(-100);
  const prevY = useRef(-100);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const arrowRotation = useSpring(
    useTransform(() => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) return 0;
      return (Math.atan2(vy, vx) * 180) / Math.PI;
    }),
    ROTATION_SPRING
  );

  // Trail springs — called unconditionally at top level
  const trailX1 = useSpring(-100, { ...SPRING_CONFIG, damping: 26 });
  const trailY1 = useSpring(-100, { ...SPRING_CONFIG, damping: 26 });
  const trailX2 = useSpring(-100, { ...SPRING_CONFIG, damping: 25 });
  const trailY2 = useSpring(-100, { ...SPRING_CONFIG, damping: 25 });
  const trailX3 = useSpring(-100, { ...SPRING_CONFIG, damping: 24 });
  const trailY3 = useSpring(-100, { ...SPRING_CONFIG, damping: 24 });
  const trailX4 = useSpring(-100, { ...SPRING_CONFIG, damping: 23 });
  const trailY4 = useSpring(-100, { ...SPRING_CONFIG, damping: 23 });
  const trailX5 = useSpring(-100, { ...SPRING_CONFIG, damping: 22 });
  const trailY5 = useSpring(-100, { ...SPRING_CONFIG, damping: 22 });
  const trailX6 = useSpring(-100, { ...SPRING_CONFIG, damping: 21 });
  const trailY6 = useSpring(-100, { ...SPRING_CONFIG, damping: 21 });
  const trailX7 = useSpring(-100, { ...SPRING_CONFIG, damping: 20 });
  const trailY7 = useSpring(-100, { ...SPRING_CONFIG, damping: 20 });
  const trailX8 = useSpring(-100, { ...SPRING_CONFIG, damping: 19 });
  const trailY8 = useSpring(-100, { ...SPRING_CONFIG, damping: 19 });
  const trailX9 = useSpring(-100, { ...SPRING_CONFIG, damping: 18 });
  const trailY9 = useSpring(-100, { ...SPRING_CONFIG, damping: 18 });
  const trailX10 = useSpring(-100, { ...SPRING_CONFIG, damping: 17 });
  const trailY10 = useSpring(-100, { ...SPRING_CONFIG, damping: 17 });
  const trailX11 = useSpring(-100, { ...SPRING_CONFIG, damping: 16 });
  const trailY11 = useSpring(-100, { ...SPRING_CONFIG, damping: 16 });
  const trailX12 = useSpring(-100, { ...SPRING_CONFIG, damping: 15 });
  const trailY12 = useSpring(-100, { ...SPRING_CONFIG, damping: 15 });

  const trail = useMemo(
    () => [
      { x: trailX1, y: trailY1 },
      { x: trailX2, y: trailY2 },
      { x: trailX3, y: trailY3 },
      { x: trailX4, y: trailY4 },
      { x: trailX5, y: trailY5 },
      { x: trailX6, y: trailY6 },
      { x: trailX7, y: trailY7 },
      { x: trailX8, y: trailY8 },
      { x: trailX9, y: trailY9 },
      { x: trailX10, y: trailY10 },
      { x: trailX11, y: trailY11 },
      { x: trailX12, y: trailY12 },
    ],
    [trailX1, trailY1, trailX2, trailY2, trailX3, trailY3, trailX4, trailY4, trailX5, trailY5, trailX6, trailY6, trailX7, trailY7, trailX8, trailY8, trailX9, trailY9, trailX10, trailY10, trailX11, trailY11, trailX12, trailY12]
  );

  useEffect(() => {
    const mqTouch = window.matchMedia("(pointer: coarse)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);

    mqTouch.addEventListener("change", onTouchChange);
    mqMotion.addEventListener("change", onMotionChange);

    return () => {
      mqTouch.removeEventListener("change", onTouchChange);
      mqMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    let rafId: number;
    const t = trail;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target
        .closest("[data-cursor]")
        ?.getAttribute("data-cursor");
      if (cursorAttr) {
        setHoverLabel(cursorAttr);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor]")) {
        setHoverLabel(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const tick = () => {
      const cx = cursorX.get();
      const cy = cursorY.get();

      velocityX.set(cx - prevX.current);
      velocityY.set(cy - prevY.current);
      prevX.current = cx;
      prevY.current = cy;

      t[0].x.set(cx);
      t[0].y.set(cy);

      for (let i = 1; i < t.length; i++) {
        t[i].x.set(t[i - 1].x.get());
        t[i].y.set(t[i - 1].y.get());
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, reducedMotion, cursorX, cursorY, velocityX, velocityY, trail]);

  if (isTouch) {
    return null;
  }

  if (reducedMotion) {
    return (
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: cursorX, y: cursorY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <ArrowIcon
          color={hoverLabel ? "var(--accent)" : "var(--foreground)"}
          scale={isClicking ? 0.85 : 1}
        />
        {hoverLabel && (
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-wider text-accent">
            {hoverLabel}
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[9998] h-full w-full"
        aria-hidden="true"
      >
        <TrailPath trail={trail} hoverLabel={hoverLabel} isClicking={isClicking} />
      </svg>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          rotate: arrowRotation,
        }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isClicking ? 0.85 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <ArrowIcon
          color={hoverLabel ? "var(--accent)" : "var(--foreground)"}
          scale={1}
        />
        {hoverLabel && (
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-wider text-accent">
            {hoverLabel}
          </span>
        )}
      </motion.div>
    </>
  );
}

function ArrowIcon({ color, scale }: { color: string; scale: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{
        transform: `translate(-1px, -1px) scale(${scale})`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <path
        d="M1 1L17 9L9 17L7.5 10.5L1 9L1 1Z"
        fill={color}
        style={{ transition: "fill 0.2s ease-out" }}
      />
    </svg>
  );
}

function TrailPath({
  trail,
  hoverLabel,
  isClicking,
}: {
  trail: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> }[];
  hoverLabel: string | null;
  isClicking: boolean;
}) {
  const [d, setD] = useState("");

  useEffect(() => {
    let raf: number;
    const update = () => {
      const points = trail.map((p) => ({ x: p.x.get(), y: p.y.get() }));
      if (points.length < 2) {
        raf = requestAnimationFrame(update);
        return;
      }

      let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      setD(path);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [trail]);

  const baseColor = hoverLabel ? "var(--accent)" : "var(--foreground-muted)";
  const strokeWidth = isClicking ? 1 : 1.5;

  return (
    <path
      d={d}
      fill="none"
      stroke={baseColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.45}
      style={{ transition: "stroke-width 0.15s ease-out, stroke 0.2s ease-out" }}
    />
  );
}
