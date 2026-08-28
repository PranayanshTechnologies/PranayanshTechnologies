import type { DeveloperProfile } from "../types/content";

/**
 * Anonymized representative sample of vetted senior talent on the
 * Pranayansh Technologies bench ready for immediate or 2-week deployment.
 */
export const developerProfiles: DeveloperProfile[] = [
  {
    id: "dev-01",
    roleTitle: "Lead Full-Stack .NET & React Engineer",
    seniority: "Lead / Principal",
    experienceYears: 9,
    location: "United States / Remote",
    timezone: "EST (UTC-5) / Central",
    availability: "Available Immediately",
    rating: 4.98,
    completedEngagements: 14,
    primarySkills: [".NET Core", "C#", "React", "TypeScript", "Azure"],
    secondarySkills: ["GraphQL", "SQL Server", "Microservices", "Docker", "Redis"],
    summary:
      "Architected high-throughput financial trading portals and enterprise cloud platforms. Specializes in modernizing legacy monoliths to event-driven .NET & React architectures.",
    domainExpertise: ["FinTech", "HealthTech", "Enterprise SaaS"],
    sampleProject: "Engineered sub-50ms real-time portfolio analytics engine processing \$1.2B in daily asset transactions.",
  },
  {
    id: "dev-02",
    roleTitle: "Senior Cloud & DevOps / SRE Architect",
    seniority: "Staff Architect",
    experienceYears: 10,
    location: "Canada / Remote",
    timezone: "EST / PST Overlap",
    availability: "Available Immediately",
    rating: 5.0,
    completedEngagements: 19,
    primarySkills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Docker"],
    secondarySkills: ["Prometheus", "Grafana", "Python", "ArgoCD", "Azure"],
    summary:
      "Expert in designing multi-region zero-downtime Kubernetes deployments and automated GitOps delivery pipelines. Cut cloud spend by 42% across 3 enterprise migrations.",
    domainExpertise: ["Cloud Infrastructure", "E-Commerce", "SaaS"],
    sampleProject: "Designed self-healing EKS cluster topology with automated canary deployments scaling to 150k RPS.",
  },
  {
    id: "dev-03",
    roleTitle: "Senior Python, AI & Distributed Systems Engineer",
    seniority: "Senior",
    experienceYears: 7,
    location: "United States / Remote",
    timezone: "CST (UTC-6) / PST",
    availability: "Available Immediately",
    rating: 4.95,
    completedEngagements: 11,
    primarySkills: ["Python", "FastAPI", "LangChain", "PostgreSQL", "AWS"],
    secondarySkills: ["PyTorch", "Redis", "Vector DBs", "Docker", "Kafka"],
    summary:
      "Builds enterprise-grade Generative AI agents, low-latency retrieval-augmented generation (RAG) pipelines, and high-performance async backends.",
    domainExpertise: ["AI & Data", "LegalTech", "Healthcare"],
    sampleProject: "Built multi-tenant enterprise RAG document assistant with citations and semantic caching reducing LLM costs by 65%.",
  },
  {
    id: "dev-04",
    roleTitle: "Senior Mobile Engineer (Flutter & iOS Native)",
    seniority: "Senior",
    experienceYears: 6,
    location: "Latin America / Remote",
    timezone: "EST Overlap (100%)",
    availability: "Available in 2 Weeks",
    rating: 4.92,
    completedEngagements: 9,
    primarySkills: ["Flutter", "Dart", "Swift", "React Native", "TypeScript"],
    secondarySkills: ["Firebase", "GraphQL", "Biometrics", "CI/CD Fastlane"],
    summary:
      "Crafts pixel-perfect, 60fps mobile experiences for iOS and Android with strict offline sync, biometric security, and native platform channels.",
    domainExpertise: ["FinTech", "E-Commerce", "Consumer Apps"],
    sampleProject: "Shipped consumer banking app with 4.8-star App Store rating and over 450,000 active monthly users.",
  },
  {
    id: "dev-05",
    roleTitle: "Senior Java / Spring Boot Microservices Specialist",
    seniority: "Senior",
    experienceYears: 8,
    location: "United States / Remote",
    timezone: "EST / UTC-5",
    availability: "Available Immediately",
    rating: 4.96,
    completedEngagements: 12,
    primarySkills: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Kubernetes"],
    secondarySkills: ["Hibernate", "AWS", "Elasticsearch", "gRPC", "JUnit"],
    summary:
      "Enterprise backend specialist focused on high-concurrency event-driven microservices, distributed transaction management, and resilient APIs.",
    domainExpertise: ["Supply Chain", "FinTech", "Enterprise Logistics"],
    sampleProject: "Refactored payment gateway core to handle 10,000 transactions/second with 99.99% fault-tolerant delivery.",
  },
];

