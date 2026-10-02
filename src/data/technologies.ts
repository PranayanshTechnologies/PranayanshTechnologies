import type { Technology } from "../types/content";

/**
 * Technology expertise referenced across Services, Industries, Careers,
 * and the interactive TechBenchExplorer — grouped by Frontend, Backend,
 * Cloud, Database, DevOps, and AI per the brief's key technology expertise.
 */
export const technologies: Technology[] = [
  // Frontend
  {
    id: "react",
    name: "React & Next.js",
    category: "framework",
    benchCount: 14,
    avgExperience: "6+ Years",
    tagline: "High-performance SPAs, design systems, and SSR web apps.",
    popularPairings: ["TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
  },
  {
    id: "angular",
    name: "Angular",
    category: "framework",
    benchCount: 7,
    avgExperience: "6+ Years",
    tagline: "Large-scale enterprise dashboards and complex workflow frontends.",
    popularPairings: ["TypeScript", "RxJS", ".NET Core", "Azure"],
  },
  {
    id: "vue",
    name: "Vue",
    category: "framework",
    benchCount: 5,
    avgExperience: "5+ Years",
    tagline: "Lightweight, composable frontends for fast-moving product teams.",
    popularPairings: ["TypeScript", "Nuxt", "Node.js"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    benchCount: 20,
    avgExperience: "6+ Years",
    tagline: "Type-safe frontend and backend development across the stack.",
    popularPairings: ["React", "Node.js", "NestJS"],
  },

  // Backend
  {
    id: "dotnet",
    name: ".NET / ASP.NET Core / C#",
    category: "language",
    benchCount: 10,
    avgExperience: "7+ Years",
    tagline: "Enterprise backends, cloud-native APIs, and legacy system modernization.",
    popularPairings: ["Azure", "SQL Server", "Microservices", "Angular"],
  },
  {
    id: "nodejs",
    name: "Node.js & NestJS",
    category: "framework",
    benchCount: 12,
    avgExperience: "5+ Years",
    tagline: "Scalable microservices, REST/GraphQL APIs, and event-driven backends.",
    popularPairings: ["PostgreSQL", "Redis", "TypeScript", "Docker"],
  },
  {
    id: "java",
    name: "Java & Spring Boot",
    category: "language",
    benchCount: 9,
    avgExperience: "8+ Years",
    tagline: "High-throughput financial engines and enterprise distributed systems.",
    popularPairings: ["Spring Cloud", "Kafka", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "python",
    name: "Python & FastAPI",
    category: "language",
    benchCount: 11,
    avgExperience: "5+ Years",
    tagline: "Data pipelines, AI/LLM integrations, and high-speed APIs.",
    popularPairings: ["FastAPI", "PostgreSQL", "PyTorch", "AWS"],
  },

  // Cloud
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "cloud",
    benchCount: 8,
    avgExperience: "6+ Years",
    tagline: "Enterprise cloud migrations, AKS, Azure DevOps, and hybrid cloud setups.",
    popularPairings: [".NET Core", "Azure DevOps", "SQL Azure", "Bicep"],
  },
  {
    id: "aws",
    name: "AWS Cloud & Serverless",
    category: "cloud",
    benchCount: 15,
    avgExperience: "6+ Years",
    tagline: "Cloud architecture, Lambda, ECS/EKS, Terraform, and cost optimization.",
    popularPairings: ["Terraform", "Docker", "Python", "Kubernetes"],
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    category: "cloud",
    benchCount: 5,
    avgExperience: "4+ Years",
    tagline: "BigQuery analytics, GKE workloads, and data/ML pipelines.",
    popularPairings: ["BigQuery", "GKE", "Python"],
  },

  // Databases
  {
    id: "sql-server",
    name: "SQL Server",
    category: "database",
    tagline: "Enterprise relational data platforms and reporting.",
    popularPairings: [".NET", "Azure", "Power BI"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    tagline: "High-integrity relational storage for modern applications.",
    popularPairings: ["Node.js", "Python", "AWS"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    tagline: "Proven relational storage for web and SaaS platforms.",
    popularPairings: ["PHP", "Node.js", "WordPress"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    tagline: "Flexible document storage for fast-evolving product schemas.",
    popularPairings: ["Node.js", "Mongoose", "Atlas"],
  },
  {
    id: "cosmos-db",
    name: "Cosmos DB",
    category: "database",
    tagline: "Globally distributed, multi-model data for Azure-native apps.",
    popularPairings: ["Azure", ".NET", "Node.js"],
  },

  // DevOps
  {
    id: "devops",
    name: "Docker, Kubernetes & Terraform",
    category: "practice",
    benchCount: 10,
    avgExperience: "7+ Years",
    tagline: "Zero-downtime deployment pipelines, GitOps, observability, and security.",
    popularPairings: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  },
  {
    id: "azure-devops",
    name: "Azure DevOps & GitHub Actions",
    category: "practice",
    tagline: "CI/CD pipelines, release automation, and infrastructure-as-code.",
    popularPairings: ["Terraform", "Bicep", "Kubernetes"],
  },

  // Mobile
  {
    id: "mobile",
    name: "Flutter & React Native",
    category: "mobile",
    benchCount: 8,
    avgExperience: "5+ Years",
    tagline: "Cross-platform iOS and Android apps with a native feel.",
    popularPairings: ["TypeScript", "Dart", "Firebase", "Node.js"],
  },

  // AI
  {
    id: "ai-data",
    name: "Generative AI, LLM Agents & Chatbots",
    category: "ai-data",
    benchCount: 6,
    avgExperience: "4+ Years",
    tagline: "RAG architectures, agentic workflows, embeddings, and document intelligence.",
    popularPairings: ["OpenAI", "Azure OpenAI", "Claude", "Gemini"],
  },
];

