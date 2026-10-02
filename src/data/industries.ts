import type { Industry } from "../types/content";

export interface IndustryWithNature extends Industry {
  badgeLabel: string;
  themeColor: string;
}

export const industries: IndustryWithNature[] = [
  {
    id: "fintech-banking-payments",
    name: "FinTech, Banking & Payments",
    tagline: "Ultra-low latency, PCI-DSS compliance & high-volume transaction engines.",
    description:
      "We engineer fault-tolerant payment gateways, core banking integrations, and automated risk scoring engines for FinTech companies and financial institutions.",
    challenges: [
      "Rigorous SOC 2 & PCI-DSS regulatory compliance",
      "Sub-100ms API latency SLAs under peak transaction bursts",
      "Zero-tolerance data security and transaction auditability",
    ],
    solutions: [
      "Senior .NET, Java, and cloud engineers with FinTech delivery experience",
      "Real-time event streaming architectures using Apache Kafka",
      "End-to-end encrypted microservice communication",
    ],
    relatedServiceIds: ["custom-software-development", "dedicated-development-teams", "cloud-consulting-migration"],
    relatedTechnologyIds: ["dotnet", "java", "python", "react", "aws"],
    badgeLabel: "FINANCIAL INFRASTRUCTURE",
    themeColor: "#5B47F5",
  },
  {
    id: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    tagline: "HIPAA-compliant telehealth, clinical analytics & AI diagnostics.",
    description:
      "Empowering healthcare organizations with secure patient portals, FHIR/HL7 data pipelines, and AI-driven document intelligence.",
    challenges: [
      "Strict HIPAA compliance and Protected Health Information (PHI) governance",
      "Legacy EHR/EMR system interoperability (HL7/FHIR)",
      "Clinical workflow complexity and physician onboarding",
    ],
    solutions: [
      "HIPAA-aware engineering teams and cloud security architecture",
      "AI-driven medical document extraction and semantic search",
      "Cross-platform mobile apps for real-time doctor-patient interactions",
    ],
    relatedServiceIds: ["custom-software-development", "ai-generative-ai-solutions", "mobile-app-development"],
    relatedTechnologyIds: ["python", "ai-data", "react", "azure", "mobile"],
    badgeLabel: "HEALTHCARE & PHI SYSTEMS",
    themeColor: "#16B981",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Property platforms, virtual tours & transaction management systems.",
    description:
      "We build listing platforms, CRM integrations, and virtual-tour-enabled portals that help real estate firms sell and manage property faster.",
    challenges: [
      "Fragmented listing, CRM, and transaction data across systems",
      "High-resolution media (virtual tours, 3D walkthroughs) performance at scale",
      "Lead routing and conversion tracking across multiple channels",
    ],
    solutions: [
      "Unified property management and CRM integration platforms",
      "Media-optimized, SEO-ready listing web applications",
      "Automated lead capture, scoring, and routing workflows",
    ],
    relatedServiceIds: ["web-application-development", "ui-ux-design", "seo-digital-marketing"],
    relatedTechnologyIds: ["react", "nodejs", "azure", "postgresql"],
    badgeLabel: "PROPTECH & LISTINGS",
    themeColor: "#F5A524",
  },
  {
    id: "ecommerce-retail",
    name: "E-Commerce & Omnichannel Retail",
    tagline: "High-concurrency storefronts, inventory sync & AI recommendations.",
    description:
      "Scaling omnichannel retail platforms through promotional traffic surges with headless architectures, edge caching, and sub-second checkout speeds.",
    challenges: [
      "10x traffic spikes during seasonal promotional campaigns",
      "Real-time inventory synchronization across multi-warehouse networks",
      "Cart abandonment caused by slow storefront rendering",
    ],
    solutions: [
      "Headless Next.js & React storefronts with edge SSR caching",
      "Auto-scaling Kubernetes cloud infrastructure on AWS/Azure",
      "AI-driven personalization and cart optimization engines",
    ],
    relatedServiceIds: ["web-application-development", "cloud-consulting-migration", "ai-generative-ai-solutions"],
    relatedTechnologyIds: ["react", "nodejs", "aws", "azure", "devops"],
    badgeLabel: "OMNICHANNEL COMMERCE",
    themeColor: "#0EA5E9",
  },
  {
    id: "logistics-supply-chain",
    name: "Logistics, Supply Chain & Fleet IoT",
    tagline: "Real-time fleet tracking, dispatch optimization & warehouse automation.",
    description:
      "Building mission-critical fleet management portals, IoT sensor ingestion pipelines, and driver mobile applications with offline-first sync.",
    challenges: [
      "High-frequency GPS and telemetry data ingestion",
      "Unreliable cellular connectivity in transit hubs and warehouses",
      "Complex route optimization algorithms",
    ],
    solutions: [
      "Offline-first mobile applications for drivers and warehouse staff",
      "Scalable streaming and time-series data pipelines in the cloud",
      "Real-time dispatch dashboards with interactive mapping",
    ],
    relatedServiceIds: ["mobile-app-development", "data-engineering", "dedicated-development-teams"],
    relatedTechnologyIds: ["mobile", "nodejs", "java", "aws", "devops"],
    badgeLabel: "LOGISTICS & TELEMETRY",
    themeColor: "#A855F7",
  },
  {
    id: "education",
    name: "Educational Institutions",
    tagline: "Learning management platforms, student portals & institutional analytics.",
    description:
      "We build learning management systems, student information portals, and analytics dashboards for schools, universities, and ed-tech providers.",
    challenges: [
      "Integrating disparate student information and LMS systems",
      "Accessibility compliance across diverse learner needs",
      "Scaling platforms for concurrent exam/assessment traffic",
    ],
    solutions: [
      "Custom LMS and student portal development",
      "WCAG-compliant, accessible interface design",
      "Cloud-scaled assessment and analytics infrastructure",
    ],
    relatedServiceIds: ["web-application-development", "ui-ux-design", "data-engineering"],
    relatedTechnologyIds: ["react", "dotnet", "azure", "postgresql"],
    badgeLabel: "EDTECH & LEARNING SYSTEMS",
    themeColor: "#7B74FF",
  },
];
