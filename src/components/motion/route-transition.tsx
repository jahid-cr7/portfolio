"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { routeEnter } from "@/lib/motion";

function getRouteLabel(pathname: string): string {
  if (pathname === "/") return "HOME";
  if (pathname === "/projects") return "PROJECTS";
  if (pathname.startsWith("/projects/")) return "PROJECT";
  if (pathname === "/about") return "ABOUT";
  if (pathname === "/contact") return "CONTACT";
  return "";
}

function RouteIndicator({ pathname }: { pathname: string }) {
  const reducedMotion = useReducedMotion();
  const label = getRouteLabel(pathname);

  if (reducedMotion) return null;

  return (
    <>
      {/* Thin orange line traveling across top */}
      <motion.div
        className="pointer-events-none fixed left-0 top-[72px] z-[45] h-0.5 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.6, times: [0, 0.15, 0.7, 1] }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full bg-accent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Small route label */}
      {label && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-[84px] z-[45] -translate-x-1/2"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: [0, 1, 1, 0], y: [-4, 0, 0, -4] }}
          transition={{ duration: 0.7, times: [0, 0.15, 0.6, 1] }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const mounted = useRef(false);
  const isPopState = useRef(false);

  useEffect(() => {
    const handler = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={reducedMotion ? "animate" : "initial"}
        animate="animate"
        exit={reducedMotion ? undefined : "exit"}
        variants={routeEnter}
      >
        <RouteIndicator pathname={pathname} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
