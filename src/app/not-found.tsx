import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <PageContainer className="flex flex-1 flex-col items-start justify-center py-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-technical-blue">
              [ ERROR / 404 ]
            </span>
            <h1 className="font-sans text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              404
            </h1>
          </div>

          <p className="max-w-md text-lg leading-relaxed text-foreground-muted">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="h-px w-full max-w-sm bg-border" aria-hidden="true" />

          <Link
            href="/"
            data-cursor="HOME"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to homepage
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
