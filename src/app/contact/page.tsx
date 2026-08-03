import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { ExternalLink } from "@/components/ui/external-link";
import { EmailLink } from "@/components/ui/email-link";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Jahid",
  description:
    "Get in touch with Jahid, a Full-Stack AI Developer open to software, AI and technical opportunities.",
  alternates: {
    canonical: "https://localhost:3000/contact",
  },
  openGraph: {
    title: "Contact — Jahid",
    description:
      "Get in touch with Jahid, a Full-Stack AI Developer open to software, AI and technical opportunities.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="flex flex-col gap-12">
            {/* Page header */}
            <Reveal direction="up" delay={0}>
              <SectionHeading
                label="[ CONTACT / AVAILABLE ]"
                title="Let's work together."
              />
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                Open to meaningful software, AI and technical opportunities. Fill
                out the form or reach out directly.
              </p>
            </Reveal>

            {/* Two-column layout */}
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Form */}
              <div className="lg:col-span-3">
                <Reveal direction="up" delay={0.15}>
                  <ContactForm />
                </Reveal>
              </div>

              {/* Contact info */}
              <aside className="flex flex-col gap-8 lg:col-span-2">
                <Reveal direction="up" delay={0.2}>
                  <div className="flex flex-col gap-6 border border-border bg-surface p-6 sm:p-8">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                      Contact Information
                    </span>

                    <Stagger staggerDelay={0.06} className="flex flex-col gap-5">
                      <StaggerItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                            Email
                          </span>
                          <EmailLink email={siteConfig.email} />
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                            GitHub
                          </span>
                          <ExternalLink
                            href={siteConfig.github}
                            className="font-mono text-xs text-foreground-muted"
                          >
                            GitHub Profile
                          </ExternalLink>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                            LinkedIn
                          </span>
                          <ExternalLink
                            href={siteConfig.linkedin}
                            className="font-mono text-xs text-foreground-muted"
                          >
                            LinkedIn Profile
                          </ExternalLink>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                            Location
                          </span>
                          <span className="font-mono text-xs text-foreground-muted">
                            {siteConfig.location}
                          </span>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                            Availability
                          </span>
                          <span className="font-mono text-xs text-success">
                            Open to opportunities
                          </span>
                        </div>
                      </StaggerItem>
                    </Stagger>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
