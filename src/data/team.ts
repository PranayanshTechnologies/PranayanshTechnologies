export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Executive Leadership" | "Technical Architecture" | "Talent & Delivery";
  bio: string;
  avatarUrl: string;
  expertise: string[];
  location: string;
  linkedInUrl?: string;
  githubUrl?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "pranay-sharma",
    name: "Pranay Sharma",
    role: "Founder & Chief Executive Officer",
    department: "Executive Leadership",
    bio: "14+ years architecting enterprise software systems and scaling engineering operations. Passionate about eliminating friction in digital product delivery.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    expertise: ["Enterprise Strategy", "Distributed Systems", "Cloud Governance", "Global Delivery"],
    location: "New Delhi & Global",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "ananya-verma",
    name: "Ananya Verma",
    role: "Chief Technology Officer",
    department: "Executive Leadership",
    bio: "12+ years in full-stack architecture, microservices modernization, and high-concurrency cloud systems for enterprise SaaS and FinTech leaders.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    expertise: [".NET Core", "React / Next.js", "Microservices", "Event-Driven Architecture"],
    location: "Bangalore Hub",
    linkedInUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
  },
  {
    id: "vikramaditya-sen",
    name: "Vikramaditya Sen",
    role: "VP of Client Solutions & Delivery",
    department: "Executive Leadership",
    bio: "11+ years directing agile squad delivery, customer architecture reviews, and SLA governance across North America, EMEA, and India.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    expertise: ["Agile Squad Governance", "Client Roadmaps", "FinTech & Payments", "SLA Assurance"],
    location: "Mohali / NCR",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id: "siddharth-mehta",
    name: "Siddharth Mehta",
    role: "Principal Applied AI & Systems Architect",
    department: "Technical Architecture",
    bio: "9+ years specializing in enterprise RAG pipelines, LLM agent orchestration, high-throughput vector search, and asynchronous Python microservices.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    expertise: ["Applied AI / LLMs", "Vector Databases", "Python / PyTorch", "LangGraph"],
    location: "Hyderabad Hub",
    linkedInUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
  },
  {
    id: "rohan-kulkarni",
    name: "Rohan Kulkarni",
    role: "Principal Cloud & DevOps Architect",
    department: "Technical Architecture",
    bio: "8+ years in multi-cloud Kubernetes orchestration, automated GitOps CI/CD pipelines, Terraform infrastructure, and zero-downtime releases.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    expertise: ["AWS & Azure", "Kubernetes (EKS/AKS)", "Terraform", "GitOps / ArgoCD"],
    location: "Pune Hub",
    linkedInUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
  },
  {
    id: "pooja-nair",
    name: "Pooja Nair",
    role: "Director of Talent & Technical Vetting",
    department: "Talent & Delivery",
    bio: "10+ years establishing rigorous 5-stage developer vetting benchmarks, technical competency assessments, and 48-hour matching SLAs.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    expertise: ["Top 3% Vetting", "Technical Screening", "Talent Bench Governance", "Culture Fit"],
    location: "Bangalore Hub",
    linkedInUrl: "https://linkedin.com",
  },
];
