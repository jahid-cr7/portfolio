import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { PageWrapper } from "@/components/motion/route-transition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000"),
  title: "Jahid — Full-Stack AI Developer",
  description:
    "Portfolio of Jahid, a Full-Stack AI Developer building practical AI, computer-vision and software products.",
  keywords: [
    "Jahid",
    "Full-Stack AI Developer",
    "AI Developer",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Bangladesh",
    "Sichuan University",
  ],
  authors: [{ name: "Jahid" }],
  creator: "Jahid",
  openGraph: {
    title: "Jahid — Full-Stack AI Developer",
    description:
      "Portfolio of Jahid, a Full-Stack AI Developer building practical AI, computer-vision and software products.",
    siteName: "Jahid Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Jahid — Full-Stack AI Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jahid — Full-Stack AI Developer",
    description:
      "Portfolio of Jahid, a Full-Stack AI Developer building practical AI, computer-vision and software products.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans cursor-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex flex-1 flex-col pt-[72px]">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <SiteFooter />
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
