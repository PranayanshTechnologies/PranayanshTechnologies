import type { CaseStudy } from "../types/content";

/**
 * High-impact case studies with architectural details, tech stack tags,
 * and measurable client results.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "fintech-core-modernization",
    title: "Real-Time Payment Engine Modernization & Scalability",
    clientType: "FinTech Scaleup (Series B)",
    summary:
      "Modernized a high-volume payment processing monolith into event-driven .NET Core microservices with AWS Serverless fallback, processing 8.5M monthly transactions.",
    challenge:
      "Legacy monolithic architecture suffered 400ms latency spikes during peak transaction windows and lacked automated compliance audit logging required for SOC 2.",
    solution:
      "Deployed a 5-person Dedicated Crew (.NET Core, AWS, Kafka, Terraform). Redesigned transaction state machines, migrated to AWS EKS with autoscaling, and implemented event streaming.",
    results: [
      { metric: "68%", label: "Reduction in API P99 Latency (400ms → 128ms)" },
      { metric: "99.99%", label: "Transaction Processing Uptime Achieved" },
      { metric: "48h", label: "Initial Squad Onboarding Speed" },
    ],
    technologies: [".NET Core", "C#", "AWS EKS", "Kafka", "PostgreSQL", "Terraform"],
    engagementType: "Dedicated Engineering Crew (5 Engineers)",
    relatedServiceId: "dedicated-crew",
    relatedIndustryId: "software-development-industry",
    isPlaceholder: false,
  },
  {
    id: "cloud-migration-ecommerce",
    title: "Multi-Region Cloud Migration & 42% Cost Optimization",
    clientType: "Global E-Commerce Enterprise",
    summary:
      "Migrated on-premise infrastructure to Microsoft Azure with zero customer downtime, containerizing 24 services and slashing infrastructure spend.",
    challenge:
      "On-prem datacenter contract expiration forced a hard 90-day migration deadline while maintaining 100% storefront uptime through Black Friday traffic surges.",
    solution:
      "Embedded 3 On-Demand Cloud & DevOps specialists. Built automated Terraform pipelines, orchestrated Azure Kubernetes Service (AKS), and configured Azure Front Door CDN.",
    results: [
      { metric: "42%", label: "Direct Monthly Cloud Cost Savings" },
      { metric: "0 min", label: "Storefront Downtime During Cutover" },
      { metric: "3.5x", label: "Faster CI/CD Release Cycles" },
    ],
    technologies: ["Microsoft Azure", "AKS", "Terraform", "Docker", "Node.js", "Redis"],
    engagementType: "Staff Augmentation (3 Senior Cloud Engineers)",
    relatedServiceId: "on-demand-resources",
    relatedIndustryId: "cloud-devops",
    isPlaceholder: false,
  },
  {
    id: "ai-rag-document-intelligence",
    title: "Enterprise AI Document Intelligence & Search Engine",
    clientType: "HealthTech & Clinical Research Platform",
    summary:
      "Engineered an enterprise GenAI document analysis assistant that parses clinical trials, indexes medical records, and provides grounded answers with source citations.",
    challenge:
      "Medical researchers spent 18+ hours weekly manually reviewing dense clinical PDF reports, creating a critical bottleneck in study onboarding.",
    solution:
      "Turnkey Custom Software delivery: Designed end-to-end Python/FastAPI microservices, vector embeddings using Pinecone, and custom LangChain orchestration with HIPAA-compliant safeguards.",
    results: [
      { metric: "80%", label: "Reduction in Document Analysis Time" },
      { metric: "99.2%", label: "Citation & Grounding Accuracy Score" },
      { metric: "10 Weeks", label: "From MVP Discovery to Enterprise Rollout" },
    ],
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI", "Pinecone", "React"],
    engagementType: "Turnkey Custom Software Development",
    relatedServiceId: "software-development",
    relatedIndustryId: "data-ai",
    isPlaceholder: false,
  },
  {
    id: "mobile-banking-cross-platform",
    title: "Cross-Platform Mobile App Launch for 450K Users",
    clientType: "Digital Banking & Wealth Management",
    summary:
      "Architected and shipped a unified iOS and Android Flutter application with biometric login, instant transfers, and interactive portfolio analytics.",
    challenge:
      "Maintaining two separate native codebases (Swift & Kotlin) doubled engineering costs and caused feature desynchronization between iOS and Android.",
    solution:
      "Assembled a dedicated mobile squad (Flutter, Dart, Node.js). Unified codebases into a single 60fps Flutter architecture with 90% shared code and automated Fastlane CI/CD.",
    results: [
      { metric: "4.8★", label: "App Store & Google Play User Rating" },
      { metric: "50%", label: "Lower Ongoing Mobile Maintenance Costs" },
      { metric: "450K+", label: "Monthly Active Mobile Users" },
    ],
    technologies: ["Flutter", "Dart", "Node.js", "GraphQL", "Firebase", "Fastlane"],
    engagementType: "Dedicated Mobile Crew (4 Engineers)",
    relatedServiceId: "mobile-app-development",
    relatedIndustryId: "mobile-apps",
    isPlaceholder: false,
  },
];
