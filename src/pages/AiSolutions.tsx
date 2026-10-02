import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { CtaBanner } from "../components/cta/CtaBanner";
import { technologies } from "../data/technologies";

const AI_OFFERINGS = [
  {
    title: "AI Agents & Automation",
    desc: "Autonomous agents that execute multi-step workflows, reducing manual operational overhead.",
    icon: "🤖",
  },
  {
    title: "Enterprise Chatbots",
    desc: "Conversational assistants for customer support, internal knowledge, and sales enablement.",
    icon: "💬",
  },
  {
    title: "Document Intelligence",
    desc: "Automated extraction, classification, and summarization of unstructured documents.",
    icon: "📄",
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    desc: "Grounded, citation-backed answers over your own enterprise knowledge base.",
    icon: "🔎",
  },
];

const USE_CASES = [
  { industry: "FinTech", useCase: "Automated risk scoring narratives and fraud-pattern summarization." },
  { industry: "Healthcare", useCase: "Clinical document intelligence and patient-intake triage assistants." },
  { industry: "E-Commerce", useCase: "AI-driven product recommendations and customer support copilots." },
  { industry: "Logistics", useCase: "Natural-language dispatch assistants over live fleet telemetry." },
];

export default function AiSolutions() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="AI & Generative AI Solutions"
        description="PRANAYANSH Technologies builds AI agents, enterprise chatbots, and document intelligence using OpenAI, Azure OpenAI, Claude, and Gemini."
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="kicker-mono text-xs font-bold text-[#5B47F5] dark:text-[#9FA3FF]">
            AI Solutions
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#161616] dark:text-[#F4F4F4]">
            Production-Ready AI & Generative AI Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] dark:text-[#C6C6C6] leading-relaxed font-sans">
            We take an AI-first approach to engineering — embedding agents, chatbots, and document intelligence into your products with enterprise governance, not just demos.
          </p>
        </div>

        {/* Offerings */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#161616] dark:text-[#F4F4F4]">What We Build</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AI_OFFERINGS.map((o) => (
              <div key={o.title} className="clean-card rounded-xl border border-[#E0E0E0] bg-white p-6 shadow-xs dark:border-[#2D2D2D] dark:bg-[#161616]">
                <span className="text-2xl">{o.icon}</span>
                <h3 className="mt-3 font-heading text-sm font-bold text-[#161616] dark:text-[#F4F4F4]">{o.title}</h3>
                <p className="mt-2 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Model & platform coverage */}
        <section className="mt-16 rounded-2xl border border-[#E0E0E0] bg-[#F4F4F4]/60 p-8 dark:border-[#2D2D2D] dark:bg-[#1F1F1F]/50">
          <h2 className="font-heading text-xl font-bold text-[#161616] dark:text-[#F4F4F4]">Model & Platform Coverage</h2>
          <p className="mt-2 text-sm text-[#525252] dark:text-[#A8A8A8]">
            We build on OpenAI, Azure OpenAI, Claude, and Gemini, selecting the right model and architecture for your latency, cost, and compliance requirements.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies
              .filter((t) => t.id === "ai-data")
              .flatMap((t) => t.popularPairings ?? [])
              .map((p) => (
                <span key={p} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5B47F5] shadow-xs dark:bg-[#121212] dark:text-[#9FA3FF]">
                  {p}
                </span>
              ))}
          </div>
        </section>

        {/* Industry use cases */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#161616] dark:text-[#F4F4F4]">Use Cases by Industry</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <div key={u.industry} className="rounded-xl border border-[#E0E0E0] bg-white p-5 dark:border-[#2D2D2D] dark:bg-[#161616]">
                <p className="kicker-mono text-[11px] font-bold text-[#5B47F5] dark:text-[#9FA3FF]">{u.industry}</p>
                <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A8A8A8] leading-relaxed font-sans">{u.useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() =>
              navigate("/get-a-quote", {
                state: { serviceId: "ai-generative-ai-solutions", projectDescription: "Inquiring about AI & Generative AI Solutions." },
              })
            }
            className="rounded-lg bg-[#5B47F5] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#4634D6] transition"
          >
            Explore AI Solutions →
          </button>
        </div>

        <CtaBanner
          heading="Have an AI use case in mind?"
          body="Tell us about your workflow or data, and we'll scope a pragmatic path to production."
          ctaLabel="Get a Quote"
          to="/get-a-quote"
        />
      </div>
    </>
  );
}
