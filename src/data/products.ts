import type { Product } from "../types/content";

/**
 * Illustrative upcoming SaaS products from PRANAYANSH Labs — no fabricated
 * metrics or pricing; status is clearly labeled as not yet generally available.
 */
export const products: Product[] = [
  {
    id: "pulse-delivery-ops",
    name: "Pulse",
    tagline: "Delivery operations cockpit for engineering leaders.",
    description:
      "A unified dashboard that pulls sprint health, cloud cost, and release reliability signals into one view for engineering and delivery leadership.",
    status: "in-development",
    category: "DevOps & Delivery Analytics",
  },
  {
    id: "atlas-ai-knowledge",
    name: "Atlas",
    tagline: "Enterprise knowledge copilot built on your own documents.",
    description:
      "A secure, Retrieval-Augmented Generation (RAG) assistant that lets teams query internal documentation, policies, and tickets in natural language.",
    status: "coming-soon",
    category: "Applied AI",
  },
];
