export interface TerminalPhase {
  type: "boot" | "prompt" | "typing" | "output" | "cursor";
  lines: string[];
}

export const terminalPhases: TerminalPhase[] = [
  {
    type: "boot",
    lines: [
      "[ OK ] Portfolio system initialized",
      "[ OK ] Loading developer profile...",
      "[ OK ] Connected to showcase module",
      "[ OK ] Ready.",
    ],
  },
  {
    type: "prompt",
    lines: ["$ ./showcase --developer=jahid"],
  },
  {
    type: "output",
    lines: [
      "Role: Full-Stack AI Developer",
      "Present Address: Chengdu, Sichuan, China",
      "Education: Sichuan University — 2026",
      "Focus: AI, Computer Vision, Full-Stack Development",
      "Status: Available for suitable opportunities",
    ],
  },
];
