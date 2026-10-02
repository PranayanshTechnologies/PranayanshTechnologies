/**
 * Analytics Domain Types & Window Augmentation
 * Strictly typed schemas for Google Analytics 4, Google Tag Manager,
 * UTM campaign attribution, and B2B lead generation tracking.
 */

// 1. UTM & Marketing Attribution Parameters
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Click Identifier for Google Ads ROI tracking
}

// 2. Lead Value & Conversion Tiers
export type LeadType = "quote_request" | "contact_inquiry" | "career_interest";

export interface LeadConversionPayload {
  leadType: LeadType;
  serviceId?: string;
  serviceName?: string;
  company?: string;
  timeframe?: string;
  seniorityLevel?: string;
  teamSize?: number;
  /** Estimated pipeline value for marketing ROI and Google Ads ROAS calculation */
  value?: number;
  currency?: string;
  contactMethod?: string;
}

// 3. CTA Click Parameters
export interface CtaClickPayload {
  ctaName: string;
  ctaLocation:
    | "hero"
    | "navbar"
    | "footer"
    | "sticky_bar"
    | "cta_banner"
    | "service_card"
    | "portfolio_card"
    | "pricing_estimator"
    | "quiz";
  ctaText: string;
  destinationUrl?: string;
}

// 4. Service Inquiry Parameters
export interface ServiceInquiryPayload {
  serviceId: string;
  serviceName: string;
  source: string;
}

// 5. Contact Click Parameters
export interface ContactClickPayload {
  type: "phone" | "email";
  value: string;
  location: "navbar" | "footer" | "contact_page" | "sticky_bar" | "body";
}

// 6. Interactive Widget Tracking Parameters (Estimator & Quiz)
export interface InteractiveToolPayload {
  toolName: "cost_estimator" | "engagement_quiz" | "tech_bench";
  action: "start" | "step" | "complete" | "reset";
  stepName?: string;
  stepNumber?: number;
  result?: string;
  estimatedValue?: number;
}

// 7. Google Consent Mode v2 State
export type ConsentStatus = "granted" | "denied";

export interface ConsentConfig {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
}

// 8. DataLayer Event Schema
export interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

// 9. Window Global Augmentation
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

