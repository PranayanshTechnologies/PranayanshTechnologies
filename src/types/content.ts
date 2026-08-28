// Shared TypeScript interfaces for all structured content, interactive tools,
// and form-submission payloads used across Pranayansh Technologies.

/** A staffing engagement model or software development service line. */
export interface ServiceOffering {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  status: "core" | "emerging";
  category: "staffing" | "development" | "advisory";
  ctaLabel: string;
  features?: string[];
  startingRate?: string;
  turnaround?: string;
  icon?: string;
}

/** A target industry vertical, linked to relevant services and technologies. */
export interface Industry {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  icon?: string;
  challenges?: string[];
  solutions?: string[];
  relatedServiceIds: string[];
  relatedTechnologyIds: string[];
}

/** A named technology skill area with bench readiness metadata. */
export interface Technology {
  id: string;
  name: string;
  category: "language" | "framework" | "cloud" | "mobile" | "ai-data" | "practice";
  benchCount?: number;
  avgExperience?: string;
  tagline?: string;
  popularPairings?: string[];
}

/** Vetted sample developer profile on the talent bench. */
export interface DeveloperProfile {
  id: string;
  roleTitle: string;
  seniority: "Senior" | "Lead / Principal" | "Staff Architect";
  experienceYears: number;
  location: string;
  timezone: string;
  availability: "Available Immediately" | "Available in 2 Weeks";
  rating: number;
  completedEngagements: number;
  primarySkills: string[];
  secondarySkills: string[];
  summary: string;
  domainExpertise: string[];
  sampleProject: string;
}

/** Detailed engagement model specifications for the comparison and quiz. */
export interface EngagementModel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  bestFor: string;
  managementResponsibility: "Client Directed" | "Shared Governance" | "Pranayansh Owned";
  billingStructure: "Hourly / Time & Material" | "Monthly Retainer / Pod" | "Fixed Milestone";
  onboardingTime: "24 - 48 Hours" | "3 - 5 Days" | "1 - 2 Weeks";
  flexibility: "High" | "Maximum" | "Milestone-Bound";
  keyBenefits: string[];
  typicalRoles: string[];
}

/** Interactive quiz diagnostic option. */
export interface QuizOption {
  id: string;
  label: string;
  description: string;
  modelAffinity: "dedicated-crew" | "on-demand-resources" | "software-development" | "cloud-consulting";
}

/** Interactive quiz question structure. */
export interface QuizQuestion {
  id: string;
  step: number;
  question: string;
  context: string;
  options: QuizOption[];
}

/** Get a Quote & Proposal form submission payload. */
export interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  serviceId: string;
  technologyNeed: string;
  timeframe: string;
  rolesNeeded?: string[];
  seniorityLevel?: string;
  teamSize?: number;
  estimatedBudget?: string;
  projectDescription?: string;
  preferredContactMethod?: "email" | "phone" | "discovery-call";
  consentAccepted: boolean;
}

/** Contact page general inquiry form submission payload. */
export interface ContactInquiry {
  name: string;
  email: string;
  subject?: string;
  message: string;
  consentAccepted: boolean;
}

/** Careers / Join Our Network candidate interest form submission payload. */
export interface CandidateInterestSubmission {
  name: string;
  email: string;
  phone?: string;
  linkedInOrGithub?: string;
  yearsOfExperience?: string;
  technologyBackground: string[];
  preferredEngagementType: "dedicated" | "on-demand" | "pay-per-hour" | "any";
  consentAccepted: boolean;
}

/** Case study with architecture and measurable ROI metrics. */
export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  technologies: string[];
  engagementType: string;
  relatedServiceId?: string;
  relatedIndustryId?: string;
  isPlaceholder: boolean;
}

/** A resource/blog article. */
export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  metaDescription: string;
  body: string;
  publishedDate: string;
}

/** Frequently asked questions grouped by clear category. */
export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  topic: "staffing" | "development" | "pricing" | "onboarding" | "security";
}
