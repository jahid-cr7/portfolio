import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About — Jahid",
  description:
    "About Jahid, a Full-Stack AI Developer from Bangladesh. Education, skills and professional focus.",
  alternates: {
    canonical: "https://localhost:3000/about",
  },
  openGraph: {
    title: "About — Jahid",
    description:
      "About Jahid, a Full-Stack AI Developer from Bangladesh. Education, skills and professional focus.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
