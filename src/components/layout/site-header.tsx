"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BrandMark } from "@/components/ui/brand-mark";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

const navItems = siteConfig.navigation;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

function isPlaceholder(href: string): boolean {
  return href.startsWith("[EDITABLE");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const resumeUrl = isPlaceholder(siteConfig.resumePath)
    ? "#"
    : siteConfig.resumePath;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors",
          scrolled
            ? "border-border bg-background/95 shadow-sm backdrop-blur-sm"
            : "border-transparent bg-background/60"
        )}
        initial={false}
        animate={{
          paddingTop: scrolled ? 16 : 20,
          paddingBottom: scrolled ? 16 : 20,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.3, ease: "easeInOut" }
        }
      >
        <PageContainer>
          <div className="flex items-center justify-between">
            <BrandMark />

            {/* Desktop navigation */}
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor="OPEN"
                    className={cn(
                      "relative px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                      active
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px bg-accent"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { duration: 0.25, ease: "easeInOut" }
                        }
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CV button */}
            <a
              href={resumeUrl}
              target={resumeUrl === "#" ? undefined : "_blank"}
              rel={
                resumeUrl === "#" ? undefined : "noopener noreferrer"
              }
              data-cursor="DOWNLOAD"
              className={cn(
                "hidden items-center gap-2 bg-accent px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover md:inline-flex",
                resumeUrl === "#" && "pointer-events-none opacity-50"
              )}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download CV
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-accent md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </PageContainer>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background grid-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: "easeInOut" }
            }
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24 sm:px-10">
              <nav className="flex flex-1 flex-col gap-2" aria-label="Mobile primary">
                {navItems.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  const number = String(index + 1).padStart(2, "0");
                  return (
                    <motion.div
                      key={item.href}
                      initial={
                        reducedMotion
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 0.3, delay: index * 0.05 }
                      }
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        data-cursor="OPEN"
                        className={cn(
                          "flex items-baseline gap-4 border-b border-border py-4 transition-colors",
                          active
                            ? "text-foreground"
                            : "text-foreground-muted hover:text-foreground"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="font-mono text-xs text-foreground-subtle">
                          {number}
                        </span>
                        <span className="font-sans text-2xl font-medium tracking-tight">
                          {item.label}
                        </span>
                        {active && (
                          <span className="ml-auto h-2 w-2 bg-accent" aria-hidden="true" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-6 pt-6">
                <a
                  href={resumeUrl}
                  target={resumeUrl === "#" ? undefined : "_blank"}
                  rel={
                    resumeUrl === "#" ? undefined : "noopener noreferrer"
                  }
                  data-cursor="DOWNLOAD"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 bg-accent px-4 py-3 font-mono text-xs uppercase tracking-wider text-background transition-all hover:bg-accent-hover",
                    resumeUrl === "#" && "pointer-events-none opacity-50"
                  )}
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download CV
                </a>

                <div className="flex flex-col gap-3 border-t border-border pt-6">
                  {siteConfig.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={isPlaceholder(link.href) ? "#" : link.href}
                      target={isPlaceholder(link.href) ? undefined : "_blank"}
                      rel={
                        isPlaceholder(link.href)
                          ? undefined
                          : "noopener noreferrer"
                      }
                      data-cursor="OPEN"
                      className={cn(
                        "font-mono text-xs text-foreground-muted transition-colors hover:text-accent",
                        isPlaceholder(link.href) &&
                          "cursor-not-allowed opacity-60"
                      )}
                      onClick={(e) => {
                        if (isPlaceholder(link.href)) {
                          e.preventDefault();
                        } else {
                          setMenuOpen(false);
                        }
                      }}
                    >
                      {link.platform}
                      {isPlaceholder(link.href) && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-foreground-subtle">
                          [edit link]
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
