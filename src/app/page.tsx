import type { Metadata } from "next";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "Jahid — Full-Stack AI Developer",
  description:
    "Portfolio of Jahid, a Full-Stack AI Developer building practical AI, computer-vision and software products.",
  alternates: {
    canonical: "https://localhost:3000",
  },
};

export default function Home() {
  return <HomeContent />;
}
