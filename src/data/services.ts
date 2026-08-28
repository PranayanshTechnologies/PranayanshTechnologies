import type { ServiceOffering } from "../types/content";

/**
 * Core software development capabilities and flexible tech staffing solutions.
 */
export const services: ServiceOffering[] = [
  // --- Part 1: Software Development & Product Engineering (Core Focus) ---
  {
    id: "software-development",
    name: "Full-Cycle Software & Web Engineering",
    tagline: "From architectural blueprint to production-grade SaaS and enterprise platforms.",
    description:
      "We design, build, and deploy custom software products with modern cloud-native architectures, rigorous QA automation, and beautiful user interfaces.",
    idealFor: "Startups and enterprises needing end-to-end product delivery with guaranteed milestone SLAs.",
    status: "emerging",
    category: "development",
    ctaLabel: "Start a Project",
    turnaround: "Detailed proposal in 3 days",
    startingRate: "Fixed Milestone or T&M",
    features: [
      "Custom SaaS & Web Application Development (React, Next.js, .NET, Node.js)",
      "High-throughput REST, GraphQL & event-driven microservices",
      "Enterprise database design (PostgreSQL, MongoDB, SQL Server)",
      "Automated CI/CD & 99.9% uptime delivery guarantee",
    ],
  },
  {
    id: "cloud-consulting",
    name: "Cloud Architecture, DevOps & Modernization",
    tagline: "Scalable AWS & Azure cloud infrastructure with zero downtime.",
    description:
      "Modernize legacy monoliths into resilient, containerized microservices on AWS and Azure with automated GitOps pipelines and 30-40% cloud cost reduction.",
    idealFor: "Companies scaling infrastructure, containerizing workloads, or planning multi-cloud migrations.",
    status: "emerging",
    category: "development",
    ctaLabel: "Scope Cloud Project",
    turnaround: "Audit in 48 hours",
    startingRate: "Project Scope / Retainer",
    features: [
      "Kubernetes (EKS / AKS) cluster design and automation",
      "Infrastructure-as-Code with Terraform and Bicep",
      "Zero-downtime canary deployment pipelines",
      "Cloud FinOps & continuous cost optimization",
    ],
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Engineering (iOS, Android & Flutter)",
    tagline: "High-performance native and cross-platform mobile apps.",
    description:
      "We build fluid, 60fps mobile applications with offline-first synchronization, biometric authentication, and smooth App Store / Google Play publishing.",
    idealFor: "Businesses launching new customer-facing apps or upgrading existing mobile products.",
    status: "emerging",
    category: "development",
    ctaLabel: "Build Mobile App",
    turnaround: "Scope in 48 hours",
    startingRate: "Milestone-based",
    features: [
      "Cross-platform Flutter & React Native development",
      "Native iOS (Swift) & Android (Kotlin) development",
      "Real-time sync, push notifications, and payment gateways",
      "App Store submission & continuous maintenance",
    ],
  },
  {
    id: "ai-data-solutions",
    name: "Applied AI & Intelligent Data Systems",
    tagline: "Production-ready Generative AI, RAG, and custom LLM agents.",
    description:
      "Transform business data into automated workflows, intelligent conversational assistants, and semantic search platforms with enterprise privacy compliance.",
    idealFor: "Companies embedding custom AI capabilities, vector search, and automated data pipelines.",
    status: "emerging",
    category: "development",
    ctaLabel: "Explore AI Solutions",
    turnaround: "Discovery call in 24h",
    startingRate: "Custom Proof of Concept / Pod",
    features: [
      "Retrieval-Augmented Generation (RAG) & Vector Databases",
      "Autonomous AI Agents & automated workflow orchestration",
      "SOC-2 / HIPAA compliant data privacy safeguards",
      "Custom model fine-tuning and evaluation pipelines",
    ],
  },
  {
    id: "managed-services",
    name: "Managed Engineering & DevOps Services",
    tagline: "Ongoing platform care, observability, and delivery support.",
    description:
      "A growing capability for teams that need dependable release operations, monitoring, and continuous engineering support after launch.",
    idealFor: "Organizations exploring a long-term managed engineering or DevOps partnership.",
    status: "emerging",
    category: "advisory",
    ctaLabel: "Register Interest",
    turnaround: "Discovery call in 24h",
    startingRate: "Custom Retainer",
    features: [
      "Release operations and deployment guidance",
      "Observability and incident-readiness planning",
      "Cloud cost and reliability reviews",
    ],
  },
  {
    id: "devops-services",
    name: "DevOps Enablement",
    tagline: "A practical path from manual delivery to repeatable deployment.",
    description:
      "A growing capability focused on CI/CD foundations, infrastructure automation, and delivery workflows tailored to your engineering team.",
    idealFor: "Teams that need a clearer, more reliable path to shipping software.",
    status: "emerging",
    category: "advisory",
    ctaLabel: "Register Interest",
    turnaround: "Assessment in 48 hours",
    startingRate: "Custom Assessment",
    features: [
      "CI/CD workflow design",
      "Infrastructure-as-code guidance",
      "Environment and release process assessment",
    ],
  },

  // --- Part 2: Dedicated Engineering Squads & Technology Consulting (Remote & On-Premise) ---
  {
    id: "dedicated-crew",
    name: "Dedicated Engineering Pods",
    tagline: "Full-time dedicated teams deployed Remotely or On-Premise.",
    description:
      "A committed, co-located engineering squad (Tech Lead, Senior Developers, QA) embedded directly into your sprints. Available for remote collaboration or on-site deployment.",
    idealFor: "Companies scaling product roadmaps who need an accountable, stable engineering team.",
    status: "core",
    category: "staffing",
    ctaLabel: "Deploy Dedicated Pod",
    turnaround: "Kickoff in 3 - 5 days",
    startingRate: "Predictable Monthly Retainer",
    features: [
      "Deployment Options: 100% Remote, On-Premise (Client HQ), or Hybrid",
      "Includes Tech Lead, Senior Engineers, and QA Automation",
      "Full alignment with your timezone, Jira, and Slack channels",
      "14-Day Risk-Free Trial Guarantee with zero upfront risk",
    ],
  },
  {
    id: "on-demand-resources",
    name: "Specialized Technical Consultants (Hourly / Sprints)",
    tagline: "Senior pre-vetted consultants deployed in 24 to 48 hours.",
    description:
      "Plug vetted senior specialists (.NET, React, Python, AWS, Flutter) into your in-house team to surge sprint velocity or close niche skill gaps.",
    idealFor: "Engineering leaders needing fast capacity, specialist skills, or seasonal project surge.",
    status: "core",
    category: "staffing",
    ctaLabel: "Engage Consultants in 48h",
    turnaround: "Fast match in 24 - 48h",
    startingRate: "Flexible Hourly / Sprint",
    features: [
      "Deployment Options: Remote or On-Premise Surge Support",
      "Top 3% pre-vetted senior engineering talent",
      "Scale up or down with 7 days notice",
      "100% direct code and IP assignment from day one",
    ],
  },
];
