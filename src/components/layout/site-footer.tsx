"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { PageContainer } from "@/components/layout/page-container";

import { ExternalLink } from "@/components/ui/external-link";
import { BackToTop } from "@/components/ui/back-to-top";
import { cn } from "@/lib/utils";

function isPlaceholder(value: string): boolean {
  return value.startsWith("[EDITABLE");
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      {/* Bottom CTA */}
      <PageContainer>
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border py-12 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
              [ LET&apos;S CONNECT ]
            </span>
            <p className="max-w-lg text-lg leading-relaxed text-foreground-muted">
              Have a project in mind? I am open to software, AI and technical
              opportunities.
            </p>
          </div>

          <Link
            href="/contact"
            data-cursor="SEND"
            className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-background transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Get in touch
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </PageContainer>

      {/* Footer content */}
      <PageContainer>
        <div className="flex flex-col gap-12 py-16 lg:flex-row lg:justify-between">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xl font-semibold tracking-tight text-foreground">
                JAHID
                <span className="text-accent">.</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground-muted">
                {siteConfig.role}
              </span>
            </div>
            <p className="font-mono text-[11px] text-foreground-subtle">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            {/* Sitemap */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Sitemap
              </span>
              <ul className="flex flex-col gap-2.5">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor="OPEN"
                      className="font-mono text-xs text-foreground-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Contact
              </span>
              <ul className="flex flex-col gap-2.5">
                <li data-cursor="OPEN">
                  <ExternalLink
                    href={siteConfig.github}
                    className="font-mono text-xs text-foreground-muted"
                  >
                    GitHub
                  </ExternalLink>
                </li>
                <li data-cursor="OPEN">
                  <ExternalLink
                    href={siteConfig.linkedin}
                    className="font-mono text-xs text-foreground-muted"
                  >
                    LinkedIn
                  </ExternalLink>
                </li>
                <li>
                  <a
                    href={
                      isPlaceholder(siteConfig.email)
                        ? "#"
                        : `mailto:${siteConfig.email}`
                    }
                    data-cursor="OPEN"
                    className={cn(
                      "inline-flex items-center gap-1 font-mono text-xs text-foreground-muted transition-colors hover:text-accent",
                      isPlaceholder(siteConfig.email) &&
                        "cursor-not-allowed opacity-60"
                    )}
                    onClick={(e) => {
                      if (isPlaceholder(siteConfig.email)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Email
                    {isPlaceholder(siteConfig.email) && (
                      <span className="ml-1 text-[10px] uppercase tracking-wider text-foreground-subtle">
                        [edit]
                      </span>
                    )}
                  </a>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Location
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                    Permanent
                  </span>
                  <span className="font-mono text-xs text-foreground-muted">
                    Nakla, Sherpur, Bangladesh
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                    Present
                  </span>
                  <span className="font-mono text-xs text-foreground-muted">
                    Chengdu, Sichuan, China
                  </span>
                </div>
              </div>
            </div>

            {/* Back to top */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Navigation
              </span>
              <BackToTop />
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
