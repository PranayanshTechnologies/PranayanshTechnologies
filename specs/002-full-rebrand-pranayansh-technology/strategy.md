# PRANAYANSH Technology — Website Strategy (Rebrand to Full-Service Consulting Firm)

Companion strategy artifact for the `002-full-rebrand-pranayansh-technology` implementation (see [plan.md](../001-pranayansh-website-strategy/plan.md) for the prior staffing-first build this supersedes). Captures the non-code deliverables from the brand brief.

## 1. Sitemap (13 routes)

```
/                 Home
/services         All 12 Services
/ai-solutions     AI & Generative AI Solutions
/cloud-services   Cloud Consulting, Migration & DevOps
/industries       Industries (FinTech, Healthcare, Real Estate, E-Commerce, Logistics, Education)
/portfolio        Portfolio & Case Studies
/about            About (Vision, Mission, Values, Leadership)
/careers          Careers
/resources        Resources / Insights
/get-a-quote      Get a Quote
/contact          Contact
/faq              FAQ
/privacy-policy   Privacy Policy
```

## 2. Navigation Menu

- **Services** (dropdown): All Services, AI Solutions, Cloud Services
- Industries · Portfolio · About · Careers · Resources · Contact
- Primary CTA: **Get a Quote**

## 3. SEO Keyword Strategy (by page)

| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| Home | software engineering & IT consulting company | custom software development, cloud & AI consulting |
| Services | custom software development services | web app development, mobile app development, dedicated development team |
| AI Solutions | generative AI development company | AI agents, enterprise chatbots, document intelligence |
| Cloud Services | cloud consulting and migration | Azure/AWS/GCP migration, DevOps consulting |
| Industries | industry-specific software development | FinTech software, healthcare software, real estate software |
| Portfolio | software development case studies | cloud migration case study, AI case study |
| About | IT consulting company | software engineering partner, global delivery |
| Careers | software engineering jobs | remote developer jobs India |
| Resources | software engineering blog | cloud & AI insights |

**Homepage SEO Title:** `PRANAYANSH Technology | Software Engineering & IT Consulting Partner`
**Homepage SEO Description:** `PRANAYANSH Technology: global software engineering and IT consulting for custom software, cloud, AI, and digital transformation. Innovate. Build. Scale.`

## 4. Color Palette & Typography (implemented in `src/style.css`)

- Primary: Indigo `#5B47F5` (brand-500) scale 50–950
- Accents: Amber `#F5A524`, Emerald `#16B981`, Cyan `#0EA5E9`, Violet `#A855F7`
- Headings: Sora · Body: Inter · Mono/kicker labels: JetBrains Mono

## 5. Homepage Wireframe (section order)

1. Hero (tagline, dual CTA, services/engagement bento)
2. Why Choose Us (7 USPs)
3. 12 Core Services grid (top 8 + "View All")
4. Interactive scope/cost estimator
5. Featured Portfolio (2 case studies)
6. SaaS Product Showcase ("PRANAYANSH Labs")
7. Bottom CTA banner

## 6. MVP Launch Pages vs. Year-1 Roadmap

**MVP (launch now):** all 13 routes listed above, fully content-complete with illustrative placeholders where real client data doesn't yet exist.

**Year-1 roadmap:**
- Q1–Q2: Publish 2–3 real case studies/testimonials as client references are secured; expand Resources to a full editorial calendar.
- Q2–Q3: Launch first PRANAYANSH Labs SaaS product (early access); add dedicated landing pages per industry vertical.
- Q3–Q4: Add enterprise trust badges/certifications as compliance work completes; evaluate full blog engine with per-article routes if content volume justifies it.

## 7. Competitive Positioning Statement

Unlike pure IT staffing firms, PRANAYANSH Technology delivers full end-to-end product engineering. Unlike legacy IT consultancies, it takes an AI-first, cloud-native approach. The combination of enterprise-grade security/scalability with startup-speed delivery positions it as a premium, long-term technology partner for startups, SMBs, and enterprises that have outgrown generic vendors.

## 8. Tech Stack Confirmation

Reused existing stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom v7, with content as typed modules in `src/data/` (no CMS/backend), per the Minimal Dependencies and No Automated Testing constitution principles established in the prior build.
