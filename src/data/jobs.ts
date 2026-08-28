export interface JobListing {
  id: string;
  title: string;
  department: "Engineering" | "Cloud & DevOps" | "AI & Data" | "Mobile";
  location:
    | "India (IST Timezone) / Remote"
    | "India (IST Timezone) / New Delhi (NCR)"
    | "India (IST Timezone) / Mohali (Chandigarh Region)"
    | "India (IST Timezone) / Bangalore Hybrid"
    | "India (IST Timezone) / Hyderabad"
    | "India (IST Timezone) / Pune"
    | "Remote (US / EU Timezone)"
    | "Remote (Worldwide)"
    | "On-Premise (Client HQ)";
  type: "Full-Time Dedicated" | "Contract Pod" | "Hourly Augmentation" | "Emerging Talent Track";
  experienceLevel: "Junior / Emerging (0-2y)" | "Mid-Level (3-5y)" | "Senior (5-8y)" | "Lead / Principal (8y+)";
  salaryRange: string;
  technologies: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  featured?: boolean;
}

export const jobListings: JobListing[] = [
  // --- LEAD & SENIOR ROLES ---
  {
    id: "lead-dotnet-react-us",
    title: "Lead Full-Stack .NET Core & React Architect",
    department: "Engineering",
    location: "Remote (US / EU Timezone)",
    type: "Full-Time Dedicated",
    experienceLevel: "Lead / Principal (8y+)",
    salaryRange: "$45,000 - $70,000 / yr ($35 - $55/hr)",
    technologies: [".NET 8/9", "C# 12", "React 19", "TypeScript", "Next.js", "PostgreSQL", "Kafka", "AWS EKS", "Terraform", "GitHub Actions"],
    description:
      "Direct the end-to-end technical architecture and delivery of mission-critical SaaS platforms. You will lead a dedicated pod of 4-6 senior engineers and serve as primary architecture liaison to client engineering directors.",
    responsibilities: [
      "Architect clean, modular event-driven microservices using ASP.NET Core WebAPI, MediatR, and Entity Framework Core.",
      "Design high-performance web frontends with React 19, TypeScript, Tailwind CSS, and state machines.",
      "Establish automated testing (xUnit, Playwright), CI/CD pipelines, and zero-downtime canary deployment practices.",
      "Participate actively in client architectural reviews with guaranteed US/EU business hours overlap.",
    ],
    requirements: [
      "8+ years of production experience in enterprise C# / .NET Core and modern React.",
      "Demonstrated track record architecting high-throughput distributed systems (>10,000 RPS).",
      "Exceptional technical leadership, system design documentation, and English communication skills.",
    ],
    postedDate: "2026-08-20",
    featured: true,
  },
  {
    id: "senior-dotnet-delhi",
    title: "Senior Full-Stack .NET Core & Angular Engineer",
    department: "Engineering",
    location: "India (IST Timezone) / New Delhi (NCR)",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$28,000 - $44,000 / yr (₹24L - ₹38L CTC)",
    technologies: [".NET 8", "C#", "Angular 18/19", "TypeScript", "RxJS", "SQL Server", "Redis", "Azure DevOps", "Docker", "REST APIs"],
    description:
      "Develop enterprise financial, compliance, and enterprise workflow solutions with strict security, high transaction integrity, and modern cloud deployment from the New Delhi NCR tech hub.",
    responsibilities: [
      "Design and implement secure RESTful microservices and API gateways using .NET 8 WebAPI.",
      "Build reactive, modular frontend applications with Angular 18/19, RxJS, and NgRx state management.",
      "Optimize relational database schemas, query performance, and indexing in SQL Server / PostgreSQL.",
      "Collaborate in daily agile sprints with seamless integration into client Jira and GitHub workflows.",
    ],
    requirements: [
      "5+ years of software engineering in C#, ASP.NET Core, and modern Angular.",
      "Strong background in dependency injection, asynchronous programming, and RESTful API standards.",
      "Solid understanding of containerization (Docker) and CI/CD automation in Azure DevOps.",
    ],
    postedDate: "2026-08-21",
    featured: true,
  },
  {
    id: "senior-qa-mohali",
    title: "Senior QA Automation & Performance Engineer",
    department: "Engineering",
    location: "India (IST Timezone) / Mohali (Chandigarh Region)",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$22,000 - $35,000 / yr (₹18L - ₹30L CTC)",
    technologies: ["Playwright", "Cypress", "TypeScript", "Python", "Postman", "k6", "JMeter", "Docker", "GitHub Actions"],
    description:
      "Establish automated end-to-end testing frameworks, API contract validation, and performance load test harnesses for high-concurrency client platforms from our Mohali engineering center.",
    responsibilities: [
      "Architect and maintain scalable UI test automation suites using Playwright and TypeScript.",
      "Implement automated API contract, integration, and security regression tests in CI/CD pipelines.",
      "Execute performance, stress, and load testing using k6 / JMeter to detect throughput bottlenecks.",
      "Collaborate closely with developers to establish test-driven development (TDD) best practices.",
    ],
    requirements: [
      "5+ years in QA automation engineering with strong proficiency in TypeScript and Python.",
      "Hands-on expertise embedding automated test suites into GitHub Actions, GitLab CI, or Azure DevOps.",
      "Solid knowledge of web architecture, REST APIs, network requests, and browser rendering lifecycles.",
    ],
    postedDate: "2026-08-22",
  },
  {
    id: "senior-react-node-india",
    title: "Senior Full-Stack React & Node.js Engineer",
    department: "Engineering",
    location: "India (IST Timezone) / Bangalore Hybrid",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$28,000 - $42,000 / yr (₹24L - ₹36L CTC)",
    technologies: ["React 19", "Next.js 15", "Node.js", "TypeScript", "Fastify", "GraphQL", "PostgreSQL", "Prisma", "Redis", "Tailwind CSS"],
    description:
      "Build high-performance web applications, collaborative real-time dashboards, and micro-frontend architectures for enterprise clients across India and global markets from our Bangalore tech hub.",
    responsibilities: [
      "Develop responsive, accessible 60fps web applications using React 19, Next.js 15 App Router, and Tailwind.",
      "Design scalable REST & GraphQL backend services using Node.js, Fastify/Express, and TypeScript.",
      "Implement real-time WebSocket communication, state caching with Redis, and database queries with Prisma.",
      "Collaborate directly with product managers and UX designers in IST working hours.",
    ],
    requirements: [
      "5+ years of full-stack engineering with deep mastery of React, TypeScript, and Node.js.",
      "Strong background in state management, SSR caching, Core Web Vitals optimization, and database tuning.",
      "Excellent problem solving, code review discipline, and agile sprint collaboration skills.",
    ],
    postedDate: "2026-08-23",
    featured: true,
  },
  {
    id: "senior-cloud-devops-india",
    title: "Senior Cloud Infrastructure & DevOps Specialist",
    department: "Cloud & DevOps",
    location: "India (IST Timezone) / Remote",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$30,000 - $46,000 / yr (₹25L - ₹38L CTC)",
    technologies: ["AWS", "Kubernetes (EKS)", "Terraform", "Docker", "Helm", "ArgoCD", "Prometheus", "Grafana", "Linux", "GitHub Actions"],
    description:
      "Design resilient multi-region cloud infrastructure, Kubernetes orchestration, and automated GitOps deployment pipelines with zero-downtime canary releases for enterprise clients.",
    responsibilities: [
      "Provision, scale, and secure production Kubernetes clusters (EKS/GKE) using Terraform infrastructure-as-code.",
      "Implement automated GitOps deployment pipelines with ArgoCD and Helm charts.",
      "Configure centralized telemetry, distributed tracing, and automated alerting with Prometheus, Grafana, and OpenTelemetry.",
      "Conduct cloud security audits, automated vulnerability scanning, and disaster recovery drills.",
    ],
    requirements: [
      "5+ years of dedicated DevOps/SRE experience on AWS or Azure.",
      "Deep expertise in Kubernetes administration, networking (CNI/Ingress), and infrastructure-as-code (Terraform).",
      "Certified Kubernetes Administrator (CKA) or AWS Solutions Architect Professional certification preferred.",
    ],
    postedDate: "2026-08-24",
    featured: true,
  },
  {
    id: "principal-ai-systems-hyderabad",
    title: "Principal Applied AI & LLM Systems Engineer",
    department: "AI & Data",
    location: "India (IST Timezone) / Hyderabad",
    type: "Full-Time Dedicated",
    experienceLevel: "Lead / Principal (8y+)",
    salaryRange: "$40,000 - $62,000 / yr (₹34L - ₹52L CTC)",
    technologies: ["Python 3.12", "PyTorch", "LangChain", "LangGraph", "Qdrant / Pinecone", "FastAPI", "OpenAI / Gemini APIs", "vLLM", "Docker"],
    description:
      "Architect enterprise Retrieval-Augmented Generation (RAG) engines, vector embeddings search, and autonomous multi-agent systems integrated with production databases and enterprise knowledge graphs.",
    responsibilities: [
      "Build high-accuracy semantic search, citation-backed RAG pipelines, and automated multi-agent reasoning graphs.",
      "Fine-tune lightweight embedding models, optimize vector index sharding, and reduce inference latency.",
      "Implement prompt evaluation harnesses, guardrails, and automated grounding validation for production compliance.",
      "Direct technical AI roadmap discussions with enterprise client CTOs and engineering directors.",
    ],
    requirements: [
      "7+ years of software engineering with 3+ years dedicated to NLP/LLM production deployments.",
      "Strong background in vector databases (Qdrant, Pinecone, pgvector), LangGraph, and async Python.",
      "Demonstrated experience deploying production AI serving architectures at enterprise scale.",
    ],
    postedDate: "2026-08-25",
    featured: true,
  },
  {
    id: "senior-flutter-mobile-pune",
    title: "Senior Cross-Platform Mobile Engineer (Flutter)",
    department: "Mobile",
    location: "India (IST Timezone) / Pune",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$24,000 - $38,000 / yr (₹20L - ₹32L CTC)",
    technologies: ["Flutter 3.x", "Dart", "Riverpod / BLoC", "iOS / Swift", "Android / Kotlin", "GraphQL", "Firebase", "Fastlane", "REST APIs"],
    description:
      "Deliver fluid 60fps mobile applications for enterprise logistics, healthcare, and consumer FinTech with offline-first caching, biometric security, and real-time syncing.",
    responsibilities: [
      "Develop responsive, pixel-perfect UIs with custom physics-based animations and Riverpod state management.",
      "Bridge native platform channels for biometrics, Bluetooth BLE, push notifications, and background geolocation.",
      "Manage automated CI/CD deployment pipelines using Fastlane, TestFlight, and Google Play Console.",
      "Optimize memory allocation, frame render performance, and offline SQLite synchronization.",
    ],
    requirements: [
      "4+ years of production Flutter development with multiple published apps in the App Store and Google Play.",
      "Solid understanding of clean architecture, dependency injection, and comprehensive unit/widget testing in Dart.",
    ],
    postedDate: "2026-08-26",
  },
  {
    id: "senior-go-backend-global",
    title: "Senior Backend Distributed Systems Engineer (Go)",
    department: "Engineering",
    location: "On-Premise (Client HQ)",
    type: "Full-Time Dedicated",
    experienceLevel: "Senior (5-8y)",
    salaryRange: "$36,000 - $55,000 / yr ($30 - $45/hr)",
    technologies: ["Go (Golang 1.23)", "gRPC", "Protocol Buffers", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Linux Internals"],
    description:
      "Build high-throughput transaction processing engines, microsecond-latency microservices, and distributed state consensus machines deployed on-premise for institutional enterprise clients.",
    responsibilities: [
      "Write idiomatic, high-concurrency Go services capable of 20,000+ requests per second.",
      "Design fault-tolerant event streams with Apache Kafka and distributed consensus protocols.",
      "Station on-premise at client engineering facilities with enterprise security clearance.",
      "Profile memory allocation, CPU pprof metrics, and goroutine synchronization under peak load.",
    ],
    requirements: [
      "5+ years backend engineering with 3+ years intensive Go in high-concurrency production environments.",
      "Deep understanding of memory profiling, garbage collection tuning, channels/mutexes, and network protocols (TCP/HTTP2/gRPC).",
    ],
    postedDate: "2026-08-27",
  },

  // --- MID-LEVEL ROLES (3-5 YEARS) ---
  {
    id: "mid-dotnet-react-pune",
    title: "Mid-Level Full-Stack .NET & React Engineer",
    department: "Engineering",
    location: "India (IST Timezone) / Pune",
    type: "Full-Time Dedicated",
    experienceLevel: "Mid-Level (3-5y)",
    salaryRange: "$18,000 - $28,000 / yr (₹15L - ₹23L CTC)",
    technologies: [".NET 8", "C#", "React", "TypeScript", "SQL Server", "Entity Framework", "Docker", "REST APIs"],
    description:
      "Build and maintain business-critical web applications, workflow automation modules, and API integrations using C# .NET Core and modern React.",
    responsibilities: [
      "Develop clean, well-tested API controllers and business logic in ASP.NET Core.",
      "Create reusable UI components in React with TypeScript and responsive styling.",
      "Write automated unit tests (xUnit / Jest) and participate actively in sprint code reviews.",
    ],
    requirements: [
      "3-5 years of full-stack experience in .NET Core and React.",
      "Strong understanding of object-oriented design, async patterns, and relational SQL queries.",
    ],
    postedDate: "2026-08-27",
    featured: true,
  },
  {
    id: "mid-mobile-flutter-bangalore",
    title: "Mid-Level Mobile Engineer (Flutter & Dart)",
    department: "Mobile",
    location: "India (IST Timezone) / Bangalore Hybrid",
    type: "Full-Time Dedicated",
    experienceLevel: "Mid-Level (3-5y)",
    salaryRange: "$16,000 - $26,000 / yr (₹13.5L - ₹21.5L CTC)",
    technologies: ["Flutter", "Dart", "Riverpod", "REST APIs", "SQLite", "Firebase", "Git"],
    description:
      "Develop fluid, reliable cross-platform mobile apps for logistics, healthcare, and consumer SaaS products from our Bangalore engineering facility.",
    responsibilities: [
      "Build responsive screen layouts and smooth navigation flows with Riverpod state management.",
      "Integrate RESTful and GraphQL backend APIs with offline SQLite caching.",
      "Conduct automated widget testing and prepare releases for app store review.",
    ],
    requirements: [
      "3-5 years of mobile development with at least 2+ years dedicated to Flutter.",
      "Experience with asynchronous Dart programming, state management, and push notification integrations.",
    ],
    postedDate: "2026-08-27",
  },
  {
    id: "mid-nodejs-delhi",
    title: "Mid-Level Backend Node.js & TypeScript Engineer",
    department: "Engineering",
    location: "India (IST Timezone) / New Delhi (NCR)",
    type: "Full-Time Dedicated",
    experienceLevel: "Mid-Level (3-5y)",
    salaryRange: "$17,000 - $27,000 / yr (₹14L - ₹22.5L CTC)",
    technologies: ["Node.js", "TypeScript", "Express / Fastify", "PostgreSQL", "Redis", "Docker", "Jest"],
    description:
      "Engineer secure, high-throughput microservices, data ingestion workers, and third-party integrations using Node.js and TypeScript.",
    responsibilities: [
      "Design database schemas, perform migrations, and optimize queries in PostgreSQL.",
      "Build robust RESTful API endpoints with validation, logging, and error handling.",
      "Collaborate with frontend engineers on API contracts and Swagger/OpenAPI documentation.",
    ],
    requirements: [
      "3-5 years of backend engineering experience with strong TypeScript and Node.js proficiency.",
      "Good working knowledge of relational databases, caching with Redis, and containerized Docker development.",
    ],
    postedDate: "2026-08-27",
  },
  {
    id: "mid-cloud-devops-remote",
    title: "Mid-Level Cloud & Infrastructure Reliability Engineer",
    department: "Cloud & DevOps",
    location: "India (IST Timezone) / Remote",
    type: "Full-Time Dedicated",
    experienceLevel: "Mid-Level (3-5y)",
    salaryRange: "$19,000 - $29,000 / yr (₹16L - ₹24L CTC)",
    technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Linux", "Grafana"],
    description:
      "Manage cloud infrastructure provisioning, CI/CD pipeline automation, and telemetry monitoring for client production environments.",
    responsibilities: [
      "Write and maintain Terraform modules for AWS services (VPC, ECS, RDS, S3).",
      "Automate build, test, and container deployment pipelines in GitHub Actions.",
      "Set up CloudWatch and Grafana dashboards for metric alerting and uptime monitoring.",
    ],
    requirements: [
      "3-5 years of hands-on experience in AWS cloud operations and infrastructure as code.",
      "Proficient in shell scripting, Linux administration, and Docker container workflows.",
    ],
    postedDate: "2026-08-27",
  },

  // --- FRESHERS & EMERGING TALENT (0-2 YEARS) ---
  {
    id: "junior-emerging-india",
    title: "Emerging Software Developer (Accelerated Talent Track)",
    department: "Engineering",
    location: "India (IST Timezone) / Remote",
    type: "Emerging Talent Track",
    experienceLevel: "Junior / Emerging (0-2y)",
    salaryRange: "$8,000 - $14,000 / yr (₹6.5L - ₹11.5L CTC)",
    technologies: ["TypeScript", "JavaScript (ES6+)", "React 19", "Node.js", "Python", "PostgreSQL", "Git", "REST APIs", "Tailwind CSS"],
    description:
      "An accelerated talent track for exceptional computer science graduates and junior engineers in India. Selected developers receive direct technical mentorship from principal architects while contributing to production client codebases.",
    responsibilities: [
      "Implement clean UI components and REST/GraphQL API endpoints under senior code review.",
      "Write comprehensive automated unit and integration tests for all new feature code.",
      "Participate actively in daily standups, code walkthroughs, and technical engineering workshops.",
      "Learn and apply modern clean architecture, secure coding standards, and Git branching workflows.",
    ],
    requirements: [
      "B.Tech / M.Tech / B.E. / M.C.A. in Computer Science or demonstrable portfolio of full-stack projects on GitHub.",
      "Strong foundational knowledge of data structures, algorithms, object-oriented design, and SQL.",
      "High eagerness to learn, analytical mindset, and excellent written/verbal English proficiency.",
    ],
    postedDate: "2026-08-27",
    featured: true,
  },
  {
    id: "fresher-frontend-react-delhi",
    title: "Graduate Associate Frontend Developer (React & TypeScript)",
    department: "Engineering",
    location: "India (IST Timezone) / New Delhi (NCR)",
    type: "Emerging Talent Track",
    experienceLevel: "Junior / Emerging (0-2y)",
    salaryRange: "$8,000 - $13,000 / yr (₹6.5L - ₹10.5L CTC)",
    technologies: ["React", "JavaScript / ES6+", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "Git", "REST APIs"],
    description:
      "Entry-level position for passionate freshers with strong frontend web development fundamentals. Work directly alongside lead UI engineers to build responsive web interfaces.",
    responsibilities: [
      "Convert Figma design mockups into pixel-perfect, responsive React components.",
      "Integrate backend REST APIs and manage local component state.",
      "Write clean, readable code and follow modern JavaScript/TypeScript linting standards.",
    ],
    requirements: [
      "Recent graduate in Computer Science / IT or self-taught developer with strong project portfolio.",
      "Solid grasp of JavaScript, React basics (hooks, props, state), and semantic HTML/CSS.",
      "Passionate about UI aesthetics, modern web standards, and continuous learning.",
    ],
    postedDate: "2026-08-27",
    featured: true,
  },
  {
    id: "fresher-devops-mohali",
    title: "Associate Cloud & DevOps Support Engineer",
    department: "Cloud & DevOps",
    location: "India (IST Timezone) / Mohali (Chandigarh Region)",
    type: "Emerging Talent Track",
    experienceLevel: "Junior / Emerging (0-2y)",
    salaryRange: "$9,000 - $14,000 / yr (₹7.5L - ₹11.5L CTC)",
    technologies: ["Linux", "Docker", "AWS Basics", "Bash / Shell", "Python", "Git", "CI/CD Concepts"],
    description:
      "Trainee cloud role for fresh graduates interested in cloud infrastructure, containerization, and automation from our Mohali technology center.",
    responsibilities: [
      "Assist senior DevOps engineers in monitoring server health, container deployments, and log files.",
      "Write shell scripts and Python utilities for routine operational automation.",
      "Learn and configure Docker containers and basic CI/CD pipeline triggers.",
    ],
    requirements: [
      "B.Tech / B.E. / BCA / MCA with strong fundamentals in Linux OS, networking, and shell commands.",
      "Familiarity with basic AWS services (EC2, S3, IAM) and Docker fundamentals.",
      "Good analytical problem-solving and documentation skills.",
    ],
    postedDate: "2026-08-27",
  },
  {
    id: "fresher-qa-bangalore",
    title: "Junior QA & Automation Test Engineer Trainee",
    department: "Engineering",
    location: "India (IST Timezone) / Bangalore Hybrid",
    type: "Emerging Talent Track",
    experienceLevel: "Junior / Emerging (0-2y)",
    salaryRange: "$8,500 - $13,500 / yr (₹7.0L - ₹11.0L CTC)",
    technologies: ["JavaScript / TypeScript", "Playwright Basics", "Postman", "Manual Testing", "SQL", "Git", "Jira"],
    description:
      "Launch your career in software testing and quality engineering. Receive hands-on training in automated browser testing, API validation, and bug tracking.",
    responsibilities: [
      "Execute functional, UI, and regression test cases across staging environments.",
      "Learn to write automated end-to-end test scripts using Playwright and TypeScript.",
      "Log detailed defect tickets in Jira with clear reproduction steps and screenshots.",
    ],
    requirements: [
      "Computer Science / Engineering graduate with a strong eye for detail and software quality.",
      "Basic understanding of web technologies (HTML/CSS/JS) and relational database SQL queries.",
      "Strong communication and structured analytical thinking.",
    ],
    postedDate: "2026-08-27",
  },
  {
    id: "fresher-ai-data-hyderabad",
    title: "Junior Data & Applied AI Associate",
    department: "AI & Data",
    location: "India (IST Timezone) / Hyderabad",
    type: "Emerging Talent Track",
    experienceLevel: "Junior / Emerging (0-2y)",
    salaryRange: "$9,500 - $15,000 / yr (₹8.0L - ₹12.5L CTC)",
    technologies: ["Python", "Pandas", "SQL", "FastAPI", "OpenAI API", "Git", "Jupyter Notebooks"],
    description:
      "Entry-level AI and data engineering position for freshers excited about large language models, data transformation pipelines, and API integrations.",
    responsibilities: [
      "Assist in preprocessing, cleaning, and indexing unstructured documents for vector search.",
      "Build data extraction scripts and test prompt generation harnesses with senior AI engineers.",
      "Write unit tests and perform benchmark evaluation on LLM query responses.",
    ],
    requirements: [
      "Degree in Computer Science, Data Science, or Mathematics with strong Python programming skills.",
      "Hands-on project experience with Python data libraries (Pandas, NumPy) and SQL.",
      "High curiosity for Generative AI, embeddings, and prompt engineering.",
    ],
    postedDate: "2026-08-27",
    featured: true,
  },
];
