import type { Industry } from "../types/content";

export interface IndustryWithNature extends Industry {
  badgeLabel: string;
  themeColor: string;
}

export const industries: IndustryWithNature[] = [
  {
    id: "software-development-industry",
    name: "FinTech, Banking & Payments",
    tagline: "Ultra-low latency, PCI-DSS compliance & high-volume transaction engines.",
    description:
      "We engineer fault-tolerant payment gateways, core banking integrations, algorithmic trading platforms, and automated risk scoring engines.",
    challenges: [
      "Rigorous SOC 2 & PCI-DSS regulatory compliance",
      "Sub-100ms API latency SLAs under peak transaction bursts",
      "Zero-tolerance data security and transaction auditability",
    ],
    solutions: [
      "Pre-vetted senior .NET Core, Java, and AWS engineers with FinTech experience",
      "Real-time event streaming architectures using Apache Kafka",
      "End-to-end encrypted microservice communication",
    ],
    relatedServiceIds: ["dedicated-crew", "on-demand-resources", "software-development"],
    relatedTechnologyIds: ["dotnet", "java", "python", "react", "aws"],
    badgeLabel: "FINANCIAL INFRASTRUCTURE",
    themeColor: "#FF462D",
  },
  {
    id: "data-ai",
    name: "Healthcare & Life Sciences",
    tagline: "HIPAA-compliant telehealth, clinical analytics & AI diagnostics.",
    description:
      "Empowering healthcare providers and medical device pioneers with secure patient portals, FHIR/HL7 data pipelines, and AI document parsing.",
    challenges: [
      "Strict HIPAA compliance and Protected Health Information (PHI) governance",
      "Legacy EHR/EMR system interoperability (HL7/FHIR)",
      "Clinical workflow complexity and physician onboarding",
    ],
    solutions: [
      "HIPAA-trained software squads and cloud security architects",
      "AI-driven medical document extraction and semantic search",
      "Cross-platform Flutter mobile apps for real-time doctor-patient interactions",
    ],
    relatedServiceIds: ["software-development", "ai-data-solutions", "mobile-app-development"],
    relatedTechnologyIds: ["python", "ai-data", "react", "azure", "mobile"],
    badgeLabel: "HEALTHCARE & PHI SYSTEMS",
    themeColor: "#24A148",
  },
  {
    id: "cloud-devops",
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
    relatedServiceIds: ["on-demand-resources", "cloud-consulting", "software-development"],
    relatedTechnologyIds: ["react", "nodejs", "aws", "azure", "devops"],
    badgeLabel: "OMNICHANNEL COMMERCE",
    themeColor: "#F1C21B",
  },
  {
    id: "saas-enterprise",
    name: "SaaS & Enterprise Platforms",
    tagline: "Multi-tenant architectures, RBAC & modern cloud-native product engineering.",
    description:
      "Partnering with B2B SaaS founders to accelerate feature roadmaps, build complex permission systems, and maintain 99.99% uptime.",
    challenges: [
      "Balancing rapid new feature velocity with core technical debt",
      "Multi-tenant data isolation and role-based access control (RBAC)",
      "Frequent release friction without automated CI/CD pipelines",
    ],
    solutions: [
      "Dedicated agile pods embedded into your Jira & sprint cadence",
      "Modern React/Node.js/Python microservices with automated testing",
      "GitOps and zero-downtime canary deployment pipelines",
    ],
    relatedServiceIds: ["dedicated-crew", "software-development", "devops-services"],
    relatedTechnologyIds: ["react", "nodejs", "python", "dotnet", "devops"],
    badgeLabel: "CLOUD B2B SAAS",
    themeColor: "#1192E8",
  },
  {
    id: "mobile-applications",
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
      "Offline-first mobile applications built with Flutter",
      "Scalable Kafka and time-series data pipelines in the cloud",
      "Real-time dispatch dashboards with interactive mapping",
    ],
    relatedServiceIds: ["mobile-app-development", "dedicated-crew", "on-demand-resources"],
    relatedTechnologyIds: ["mobile", "nodejs", "java", "aws", "devops"],
    badgeLabel: "LOGISTICS & TELEMETRY",
    themeColor: "#8A3FFC",
  },
  {
    id: "manufacturing-iot",
    name: "Manufacturing & Industrial Automation",
    tagline: "Smart factory telemetry, predictive maintenance & SCADA integration.",
    description:
      "Connecting industrial PLC hardware, predictive equipment failure models, and real-time plant floor monitoring dashboards.",
    challenges: [
      "Legacy industrial protocol integration (Modbus, OPC-UA, MQTT)",
      "High-frequency time-series vibration and thermal sensor streams",
      "Strict zero-downtime operational safety requirements",
    ],
    solutions: [
      "Edge-to-cloud IoT data ingestion gateways",
      "Predictive maintenance anomaly detection models",
      "Real-time plant operator web consoles and alarming",
    ],
    relatedServiceIds: ["software-development", "cloud-consulting", "dedicated-crew"],
    relatedTechnologyIds: ["python", "aws", "nodejs", "devops"],
    badgeLabel: "INDUSTRIAL AUTOMATION",
    themeColor: "#FF7561",
  },
];
