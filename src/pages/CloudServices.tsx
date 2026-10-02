import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";

const CLOUD_PLATFORMS = [
  { name: "Microsoft Azure", desc: "AKS, Azure DevOps, SQL Azure, Bicep-based infrastructure-as-code." },
  { name: "AWS", desc: "EKS, Lambda, serverless architectures, and Terraform automation." },
  { name: "Google Cloud", desc: "GKE workloads, BigQuery analytics, and data/ML pipelines." },
];

const MIGRATION_STEPS = [
  { step: "1. Assess", desc: "Audit current infrastructure, cost, and risk within 48 hours." },
  { step: "2. Design", desc: "Target architecture, IaC templates, and migration runbook." },
  { step: "3. Migrate", desc: "Phased, zero-downtime migration with rollback safeguards." },
  { step: "4. Optimize", desc: "Continuous cost (FinOps) and reliability tuning post-migration." },
];

export default function CloudServices() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="Cloud Consulting, Migration & DevOps"
        description="PRANAYANSH Technology delivers zero-downtime Azure, AWS & Google Cloud migrations, Kubernetes platform engineering, and DevOps enablement."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            Cloud Services
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Cloud Consulting, Migration & Platform Engineering
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            Scalable, cost-optimized cloud infrastructure on Azure, AWS, and Google Cloud — with zero-downtime migrations and self-service platform tooling for engineering teams.
          </p>
        </div>

        {/* Platforms */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#161616] dark:text-[#F4F4F4]">Platforms We Operate</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CLOUD_PLATFORMS.map((p) => (
              <div key={p.name} className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
                <h3 className="font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">{p.name}</h3>
                <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Migration process */}
        <section className="mt-16 rounded-2xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-8 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
          <h2 className="font-heading text-xl font-bold text-[#161616] dark:text-[#F4F4F4]">Our Migration Process</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
            {MIGRATION_STEPS.map((m) => (
              <div key={m.step}>
                <p className="font-heading font-bold text-sm text-[#5B47F5] dark:text-[#7B74FF]">{m.step}</p>
                <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DevOps & Platform Engineering */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#161616] dark:text-[#F4F4F4]">DevOps & Platform Engineering</h2>
          <p className="mt-3 text-sm text-[#525252] dark:text-[#A8A8A8] max-w-2xl">
            CI/CD pipelines with Azure DevOps and GitHub Actions, containerization with Docker and Kubernetes, and internal developer platform tooling that lets your teams ship faster and safer.
          </p>
        </section>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() =>
              navigate("/get-a-quote", {
                state: { serviceId: "cloud-consulting-migration", projectDescription: "Inquiring about Cloud Consulting & Migration." },
              })
            }
            className="rounded-lg bg-[#5B47F5] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#4634D6] transition"
          >
            Scope a Cloud Project →
          </button>
        </div>

        <CtaBanner
          heading="Planning a cloud migration or platform overhaul?"
          body="We'll audit your current infrastructure and return a migration roadmap within 48 hours."
          ctaLabel="Get a Quote"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
