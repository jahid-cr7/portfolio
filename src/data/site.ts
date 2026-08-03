import { NavigationItem, SocialLink, Education } from "@/types";

export interface SiteConfig {
  name: string;
  displayName: string;
  role: string;
  location: string;
  permanentAddress: string;
  presentAddress: string;
  university: string;
  graduationYear: number;
  chineseLevel: string;
  email: string;
  github: string;
  linkedin: string;
  resumePath: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  education: Education[];
}

export const siteConfig: SiteConfig = {
  name: "Jahid",
  displayName: "JAHID.",
  role: "Full-Stack AI Developer",
  location: "Chengdu, Sichuan, China",
  permanentAddress: "Nakla, Sherpur, Mymensingh, Bangladesh",
  presentAddress: "Chengdu, Sichuan, China",
  university: "Sichuan University",
  graduationYear: 2026,
  chineseLevel: "HSK Level 3",
  email: "jahidhasan4911@gmail.com",
  github: "https://github.com/jahid-cr7",
  linkedin: "https://linkedin.com/in/jahid4911",
  resumePath: "/Resume.pdf",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { platform: "GitHub", href: "https://github.com/jahid-cr7", label: "GitHub profile" },
    { platform: "LinkedIn", href: "https://linkedin.com/in/jahid4911", label: "LinkedIn profile" },
  ],
  education: [
    {
      level: "High School",
      institution: "Nakla Pilot Model High School",
      location: "Nakla, Sherpur",
      graduationYear: 2019,
    },
    {
      level: "Intermediate College",
      institution: "Notre Dame College Mymensingh",
      location: "Barera, Mymensingh Sadar, Mymensingh",
      graduationYear: 2021,
    },
    {
      level: "University",
      institution: "Sichuan University",
      location: "Chengdu, Sichuan, China",
      graduationYear: 2026,
    },
  ],
};
