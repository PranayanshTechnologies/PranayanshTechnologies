import type { FaqEntry } from "../types/content";

/**
 * FAQ entries covering Dedicated Consulting, Software Development, Pricing, Onboarding, and Security (FR-012).
 */
export const faq: FaqEntry[] = [
  {
    id: "faq-hybrid-advantage",
    question: "How does Pranayansh combine dedicated engineering consulting and custom software development?",
    answer:
      "We offer maximum agility: you can engage specialized technical consultants to plug into your existing teams (Dedicated Consultants), contract a complete dedicated squad (Dedicated Crew), or hand over full project requirements for turnkey end-to-end development with milestone-based delivery.",
    topic: "staffing",
  },
  {
    id: "faq-vetting-standard",
    question: "What is your developer vetting and screening process?",
    answer:
      "Only the top 3% of applicants join our talent network. Every engineer undergoes a 5-step screening: resume and background audit, live coding/algorithmic tests, system design defense with a principal architect, English communication assessment, and a 2-week risk-free trial on your project.",
    topic: "staffing",
  },
  {
    id: "faq-speed-to-hire",
    question: "How fast can engineers start working with our team?",
    answer:
      "For specialized technical consultants and pre-vetted bench technologies (.NET, React, AWS, Python, Node.js), candidates are matched within 24 to 48 hours. Dedicated crews of 3-6 engineers are typically assembled and ready for sprint kickoff within 3 to 5 business days.",
    topic: "onboarding",
  },
  {
    id: "faq-trial-guarantee",
    question: "Is there a risk-free trial period?",
    answer:
      "Yes. Senior and lead engineers include a 14-Day Risk-Free Trial. Emerging developers and fresh engineering graduates include a comprehensive 45-Day Zero-Risk Trial Guarantee. If you are not 100% satisfied with performance within the trial window, you pay nothing or receive an immediate replacement at zero cost.",
    topic: "onboarding",
  },
  {
    id: "faq-ip-ownership",
    question: "Who owns the Intellectual Property (IP) and source code?",
    answer:
      "You own 100% of all intellectual property, source code, designs, and assets created by our engineers from day one. All contracts include strict non-disclosure agreements (NDAs) and full IP assignment governed by US and international standards.",
    topic: "security",
  },
  {
    id: "faq-timezone-alignment",
    question: "How do your engineers handle timezone overlap and communication?",
    answer:
      "Our engineers work with a guaranteed 4 to 8 hours of daily overlap with US (EST, CST, PST) and European business hours. They join your native communication channels (Slack, Microsoft Teams, Jira, GitHub) and attend your daily standups and sprint planning.",
    topic: "staffing",
  },
  {
    id: "faq-billing-pricing",
    question: "How does billing and invoicing work?",
    answer:
      "Dedicated consulting is billed on a transparent monthly cycle with detailed time tracking. Dedicated crews operate on a predictable monthly retainer. Turnkey software development projects are billed against predefined deliverable milestones with agreed acceptance criteria.",
    topic: "pricing",
  },
  {
    id: "faq-turnkey-deliverables",
    question: "What is included in a Turnkey Software Development contract?",
    answer:
      "Turnkey projects include full lifecycle execution: product discovery, clickable UI/UX Figma prototypes, cloud-native architecture, automated test suites, CI/CD pipelines, production deployment, documentation, and a post-launch warranty period with ongoing bug fixes.",
    topic: "development",
  },
  {
    id: "faq-scaling-flexibility",
    question: "Can we scale team size up or down as project needs change?",
    answer:
      "Absolutely. You can add more engineers with 48 hours notice or scale down with a standard 14-day notice, giving you complete financial flexibility to match your product roadmap and funding cycles.",
    topic: "pricing",
  },
];
