# PRANAYANSH Technology

[![Website](https://img.shields.io/badge/Official_Website-pranayansh.com-5B47F5?style=flat-square&logo=google-chrome&logoColor=white)](https://pranayansh.com)
[![Global Delivery](https://img.shields.io/badge/Markets-India_%7C_USA_%7C_Middle_East_%7C_Europe-161616?style=flat-square)](https://pranayansh.com/about)
[![Services](https://img.shields.io/badge/Core_Services-12-emerald?style=flat-square)](https://pranayansh.com/services)
[![IP Ownership](https://img.shields.io/badge/IP_Ownership-100%25_Direct-blue?style=flat-square)](https://pranayansh.com)

> **Innovate. Build. Scale.**
> A global software engineering and IT consulting partner for custom software, cloud, AI, and digital transformation — serving startups, SMBs, and enterprises.

---

## About Us — Who We Are

**PRANAYANSH Technology** is a next-generation software engineering and IT consulting company. We help startups, SMBs, and enterprises turn ideas into scalable digital products through world-class engineering, strategic consulting, and modern technology expertise.

**Vision**: To become a globally trusted technology partner recognized for innovation, engineering excellence, and customer success.

**Mission**: To empower organizations with modern digital solutions through software engineering, cloud transformation, AI innovation, and expert consulting.

**Core Values**: Customer First • Innovation Driven • Quality Focused • Integrity & Transparency • Continuous Learning • Long-Term Partnerships

---

## Our 12 Core Services

Every service below is an equally-weighted, first-class capability — not a secondary add-on:

1. Custom Software Development
2. Web Application Development
3. Mobile Application Development
4. Cloud Consulting & Migration
5. DevOps & Platform Engineering
6. AI & Generative AI Solutions
7. UI/UX Design
8. Data Engineering
9. Digital Transformation Consulting
10. Dedicated Development Teams
11. Managed IT Services
12. SEO & Digital Marketing

### How We Engage

| Model | Description | Best Suited For |
|---|---|---|
| **Project-Based Delivery** | Full lifecycle ownership against agreed milestones, with a detailed proposal in 3 days. | New product builds, fixed-scope initiatives. |
| **Dedicated Development Teams** | A full-time embedded squad (Tech Lead, senior engineers, QA), deployed remotely, on-premise, or hybrid. | Ongoing roadmaps needing a stable, high-velocity team. |
| **Staff Augmentation** | Senior specialists embedded into your existing team within 24–48 hours. | Fast capacity or specialist skill gaps. |

---

## Technology Expertise

```
Frontend    : React • Next.js • Angular • Vue • TypeScript
Backend     : .NET / ASP.NET Core / C# • Node.js / NestJS • Java Spring Boot • Python FastAPI
Cloud       : Microsoft Azure • AWS • Google Cloud Platform
Databases   : SQL Server • PostgreSQL • MySQL • MongoDB • Cosmos DB
DevOps      : Docker • Kubernetes • Terraform • Azure DevOps • GitHub Actions
AI          : OpenAI • Azure OpenAI • Claude • Gemini • AI Agents • Chatbots • Document Intelligence
```

---

## Global Markets

- **Primary**: India • USA • Middle East • Europe
- **Secondary**: Global remote delivery

---

## PRANAYANSH Labs

Alongside client engagements, we incubate our own SaaS products. See the "What We're Building Next" section on the [homepage](https://pranayansh.com) for an early look at upcoming releases.

---

## This Repository

This repo contains the PRANAYANSH Technology marketing website: a single-page application with 13 routes (Home, Services, AI Solutions, Cloud Services, Industries, Portfolio, About, Careers, Resources, Get a Quote, Contact, FAQ, Privacy Policy).

### Tech Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (custom indigo/violet design system — see `src/style.css`), typography via Sora (headings), Inter (body), JetBrains Mono (kicker labels)
- **react-router-dom** for client-side routing
- Content modeled as typed data modules under `src/data/` (no CMS/backend)
- No automated test suite, per the project constitution (`.specify/memory/constitution.md`)

### Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Route definitions + shared layout shell
├── types/content.ts         # Shared entity interfaces
├── data/                    # Typed content modules (services, industries, technologies, etc.)
├── components/
│   ├── layout/               # Navbar, Footer, PageMeta, BrandLogo, ThemeToggle
│   ├── forms/                 # Quote, Contact, Career forms + ConsentCheckbox
│   ├── cards/                  # ServiceCard, CaseStudyDetailCard, DeveloperProfileCard, TestimonialCard
│   ├── cta/                     # CtaBanner, StickyContactBar
│   └── interactive/              # HeroBento, CoreServicesEngagementSection, CostEstimatorWizard, EngagementModelQuiz, TechBenchExplorer, PersonaSwitcher
├── pages/                    # 13 route-level page components
└── style.css                  # Tailwind directives + design tokens
```

### Local Development

```bash
npm install
npm run dev      # start local dev server
npm run build     # type-check (tsc) + production build
```

---

## Corporate Inquiries & Contact

- **Website**: [https://pranayansh.com](https://pranayansh.com)
- **Email**: [contact@pranayansh.com](mailto:contact@pranayansh.com)
- **Phone**: +91 92202 29272 / +91-120-4428444
- **Get a Quote**: [https://pranayansh.com/get-a-quote](https://pranayansh.com/get-a-quote)

---

&copy; 2026 **PRANAYANSH Technology**. All rights reserved.

