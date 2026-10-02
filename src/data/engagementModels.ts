import type { EngagementModel, QuizQuestion } from "../types/content";

/**
 * How we engage: three flexible delivery models that sit alongside (not instead
 * of) the 12 core services — clients choose the model that fits their roadmap.
 */
export const engagementModels: EngagementModel[] = [
  {
    id: "custom-software-development",
    name: "Project-Based Delivery",
    subtitle: "Full Product Lifecycle & Milestone Delivery",
    description:
      "PRANAYANSH Technology takes full ownership of UI/UX design, architecture, engineering, QA, and deployment with guaranteed milestone delivery and warranty.",
    bestFor: "Startups, scaleups, and enterprises looking for a dedicated engineering partner to build a new product or modernize existing systems.",
    managementResponsibility: "PRANAYANSH Owned",
    billingStructure: "Fixed Milestone",
    onboardingTime: "3 - 5 Days",
    flexibility: "Milestone-Bound",
    keyBenefits: [
      "Guaranteed scope, timeline, and deliverables with SLA",
      "UI/UX design, architecture, automated testing, and CI/CD included",
      "Post-launch warranty and continuous maintenance",
      "Zero management burden on your internal leadership",
    ],
    typicalRoles: ["Product Manager", "Solutions Architect", "Senior Full-Stack Devs", "QA Automation Lead"],
  },
  {
    id: "dedicated-development-teams",
    name: "Dedicated Development Teams",
    subtitle: "Full-Time Team (Remote or On-Premise)",
    description:
      "A complete, autonomous engineering squad (Tech Lead, Senior Engineers, QA) embedded directly into your product roadmap.",
    bestFor: "Companies with ongoing roadmaps needing a stable, high-velocity engineering squad without recruiting overhead.",
    managementResponsibility: "Shared Governance",
    billingStructure: "Monthly Retainer / Pod",
    onboardingTime: "3 - 5 Days",
    flexibility: "High",
    keyBenefits: [
      "Deployment choice: 100% remote, on-premise at your HQ, or hybrid",
      "100% focused on your product — no context switching",
      "Includes Tech Lead, senior devs, QA, and delivery oversight",
      "Flexible scale up/down as your roadmap evolves",
    ],
    typicalRoles: ["Tech Lead", "Senior Backend (.NET/Python/Node)", "Senior Frontend (React)", "QA Engineer"],
  },
  {
    id: "staff-augmentation",
    name: "Staff Augmentation",
    subtitle: "Fast Specialist Scaling (Remote or On-Premise)",
    description:
      "Pre-vetted individual senior engineers embedded directly into your in-house team to close skill gaps and surge sprint velocity.",
    bestFor: "Engineering teams with internal management needing fast specialist capacity (.NET, React, Azure, Python, Flutter) in 24 to 48 hours.",
    managementResponsibility: "Client Directed",
    billingStructure: "Hourly / Time & Material",
    onboardingTime: "24 - 48 Hours",
    flexibility: "Maximum",
    keyBenefits: [
      "Plug-and-play into your sprints within 48 hours",
      "Scale capacity up or down with 7 days notice",
      "Direct daily task management and code reviews by your leads",
      "Zero recruitment and payroll overhead",
    ],
    typicalRoles: ["Senior React Specialist", "Backend .NET/Java Specialist", "Cloud & DevOps Engineer"],
  },
];

/**
 * 3-step interactive quiz questions to help visitors determine their ideal engagement model.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q-primary-need",
    step: 1,
    question: "What is your primary technical objective?",
    context: "This helps determine whether project-based delivery or team augmentation is the best match.",
    options: [
      {
        id: "build-product",
        label: "Build or modernize an entire software product from scratch.",
        description: "We need end-to-end architecture, UI/UX design, development, and deployment.",
        modelAffinity: "custom-software-development",
      },
      {
        id: "dedicated-pod",
        label: "Add a full, dedicated engineering team to our existing roadmap.",
        description: "We need an autonomous squad (Lead + Devs + QA) working exclusively on our backlog.",
        modelAffinity: "dedicated-development-teams",
      },
      {
        id: "staff-surge",
        label: "Quickly engage 1-3 specialized technical consultants.",
        description: "We have internal leads and need fast hands-on engineering capacity in 48 hours.",
        modelAffinity: "staff-augmentation",
      },
    ],
  },
  {
    id: "q-deployment-mode",
    step: 2,
    question: "What is your preferred team deployment format?",
    context: "We support fully remote teams, on-premise deployment at your offices, or hybrid setups.",
    options: [
      {
        id: "remote-squad",
        label: "100% Remote with full timezone overlap.",
        description: "Seamless collaboration via Slack, Jira, GitHub, and daily video standups.",
        modelAffinity: "dedicated-development-teams",
      },
      {
        id: "on-premise-surge",
        label: "On-Premise or Hybrid (Engineers on-site at our location).",
        description: "Engineers working directly at your corporate headquarters or facility.",
        modelAffinity: "dedicated-development-teams",
      },
      {
        id: "milestone-delivery",
        label: "Deliverable-based (project milestones managed by PRANAYANSH).",
        description: "Focus on delivered software features and SLAs rather than location.",
        modelAffinity: "custom-software-development",
      },
    ],
  },
  {
    id: "q-timeline",
    step: 3,
    question: "What is your target kickoff timeline?",
    context: "Speed requirements define matching vs squad assembly workflows.",
    options: [
      {
        id: "immediate",
        label: "Immediately (Within 24 to 48 hours).",
        description: "We have pressing sprint deadlines and need vetted engineers right now.",
        modelAffinity: "staff-augmentation",
      },
      {
        id: "next-sprint",
        label: "Within 1 to 2 weeks for structured squad kickoff.",
        description: "We want to review candidate profiles and launch together seamlessly.",
        modelAffinity: "dedicated-development-teams",
      },
      {
        id: "scoped-plan",
        label: "After detailed architectural scoping and project discovery.",
        description: "We want architecture discovery, UI prototypes, and milestone signoff first.",
        modelAffinity: "custom-software-development",
      },
    ],
  },
];

