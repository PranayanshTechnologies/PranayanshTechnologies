import { useState } from "react";
import { Link } from "react-router-dom";

const BUILD_ITEMS = [
  {
    icon: "💻",
    title: "Web, Mobile & Custom Software",
    desc: "React, Next.js, .NET, Node.js, Flutter. Clean architecture and automated CI/CD.",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "Azure, AWS, Google Cloud, Kubernetes, Terraform. Zero-downtime migrations.",
  },
  {
    icon: "🧠",
    title: "AI & Data Engineering",
    desc: "Generative AI agents, enterprise RAG, chatbots, and reliable data pipelines.",
  },
];

const ENGAGE_ITEMS = [
  {
    icon: "⚡",
    title: "Project-Based Delivery",
    desc: "We own the full build against milestones, with a detailed proposal in 3 days.",
  },
  {
    icon: "🏢",
    title: "Dedicated Development Teams",
    desc: "A full-time embedded squad deployed remotely, on-premise, or hybrid.",
  },
  {
    icon: "🛡️",
    title: "Staff Augmentation",
    desc: "Senior specialists embedded into your team within 24-48 hours.",
  },
];

/** Full-width "How We Help" section: toggles between what we build and how we engage. */
export function CoreServicesEngagementSection() {
  const [activeTab, setActiveTab] = useState<"build" | "engage">("build");
  const items = activeTab === "build" ? BUILD_ITEMS : ENGAGE_ITEMS;

  return (
    <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-0 pb-16 sm:pt-2 sm:pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            How We Help
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F6]">
            Core Services &amp; Engagement Models
          </h2>
        </div>

        <div className="inline-flex rounded-lg bg-[#F4F4F4] p-1 dark:bg-[#262626] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("build")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "build"
                ? "bg-white text-[#5B47F5] shadow-xs dark:bg-[#121212] dark:text-[#9FA3FF]"
                : "text-[#525252] hover:text-[#161616] dark:text-[#A8A8A8] dark:hover:text-white"
            }`}
          >
            What We Build
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("engage")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "engage"
                ? "bg-white text-[#5B47F5] shadow-xs dark:bg-[#121212] dark:text-[#9FA3FF]"
                : "text-[#525252] hover:text-[#161616] dark:text-[#A8A8A8] dark:hover:text-white"
            }`}
          >
            How We Engage
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#121212]"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none">{item.icon}</span>
              <h3 className="font-heading text-base font-bold text-[#161616] dark:text-[#F4F4F6]">{item.title}</h3>
            </div>
            <p className="mt-3 text-sm text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
        <span className="text-xs text-[#525252] dark:text-[#A8A8A8] font-mono">
          100% IP Ownership • Enterprise Security • Long-Term Partnership
        </span>
        <Link
          to="/get-a-quote"
          state={{ serviceId: activeTab === "build" ? "custom-software-development" : "dedicated-development-teams" }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5B47F5] hover:text-[#3827AB] dark:text-[#7B74FF]"
        >
          Get a Custom Scope &amp; Quote →
        </Link>
      </div>
    </section>
  );
}
