/**
 * High-Level Analytics Event Dispatchers
 * Production-ready typed functions adhering to GA4 recommended event standards
 * and Pranayansh Technologies lead generation taxonomy.
 */

import { ANALYTICS_EVENTS, DEFAULT_CURRENCY, ESTIMATED_LEAD_VALUES } from "./constants";
import { pushToDataLayer } from "./dataLayer";
import { getActiveAttribution } from "./attribution";
import type {
  CtaClickPayload,
  ContactClickPayload,
  InteractiveToolPayload,
  LeadConversionPayload,
  ServiceInquiryPayload,
} from "./types";

/**
 * 1. Track Single Page Application (SPA) virtual page views
 */
export function trackPageView(customParams?: {
  path?: string;
  title?: string;
  referrer?: string;
}): void {
  if (typeof window === "undefined") return;

  const path = customParams?.path ?? window.location.pathname + window.location.search;
  const title = customParams?.title ?? document.title;
  const referrer = customParams?.referrer ?? document.referrer;
  const attribution = getActiveAttribution();

  pushToDataLayer({
    event: ANALYTICS_EVENTS.PAGE_VIEW,
    page_path: path,
    page_title: title,
    page_location: window.location.href,
    page_referrer: referrer,
    ...attribution,
  });

  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
      page_referrer: referrer,
      ...attribution,
    });
  }
}

/**
 * 2. Track Form Interaction: Start
 */
export function trackFormStart(formId: string, formName: string, formType: string): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.FORM_START,
    form_id: formId,
    form_name: formName,
    form_type: formType,
  });
}

/**
 * 3. Track Form Interaction: Step Progress (e.g. Multi-step Quote Form)
 */
export function trackFormStep(formId: string, stepNumber: number, stepName: string): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.FORM_STEP_COMPLETE,
    form_id: formId,
    step_number: stepNumber,
    step_name: stepName,
  });
}

/**
 * 4. Track Form Submission Failure / Validation Error
 */
export function trackFormFailure(formId: string, errorMessage: string): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.FORM_SUBMIT_FAILURE,
    form_id: formId,
    error_message: errorMessage,
  });
}

/**
 * 5. Track Primary Conversion: Lead Generation (Quote, Contact, Career)
 * Includes monetary estimation for Marketing ROI & Google Ads ROAS calculation.
 */
export function trackLeadGeneration(payload: LeadConversionPayload): void {
  const attribution = getActiveAttribution();
  const value =
    payload.value ??
    (payload.leadType in ESTIMATED_LEAD_VALUES
      ? ESTIMATED_LEAD_VALUES[payload.leadType]
      : 0);

  const eventData = {
    event: ANALYTICS_EVENTS.GENERATE_LEAD,
    lead_type: payload.leadType,
    service_id: payload.serviceId ?? "unspecified",
    service_name: payload.serviceName ?? "General",
    company: payload.company ?? "undisclosed",
    timeframe: payload.timeframe ?? "immediate",
    seniority_level: payload.seniorityLevel ?? "standard",
    team_size: payload.teamSize ?? 1,
    value,
    currency: payload.currency ?? DEFAULT_CURRENCY,
    contact_method: payload.contactMethod ?? "form",
    ...attribution,
  };

  pushToDataLayer(eventData);

  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      currency: payload.currency ?? DEFAULT_CURRENCY,
      value,
      lead_type: payload.leadType,
      service_id: payload.serviceId,
      ...attribution,
    });
  }
}

/**
 * 6. Track Call-to-Action (CTA) Button Clicks
 */
export function trackCtaClick(payload: CtaClickPayload): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.CTA_CLICK,
    cta_name: payload.ctaName,
    cta_location: payload.ctaLocation,
    cta_text: payload.ctaText,
    destination_url: payload.destinationUrl ?? "",
  });
}

/**
 * 7. Track Specific Service Inquiries (e.g. Clicking service card or deep link)
 */
export function trackServiceInquiry(payload: ServiceInquiryPayload): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.SERVICE_INQUIRY,
    service_id: payload.serviceId,
    service_name: payload.serviceName,
    source_section: payload.source,
  });
}

/**
 * 8. Track Phone and Email Direct Contact Clicks
 */
export function trackContactClick(payload: ContactClickPayload): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.CONTACT_CLICK,
    contact_type: payload.type,
    contact_value: payload.value,
    location: payload.location,
  });
}

/**
 * 9. Track External Outbound Link Clicks
 */
export function trackOutboundClick(url: string, linkText?: string): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.OUTBOUND_CLICK,
    destination_url: url,
    link_text: linkText ?? "",
  });
}

/**
 * 10. Track File Downloads (Whitepapers, Resumes, Case Study PDFs)
 */
export function trackFileDownload(fileUrl: string, fileName?: string): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.FILE_DOWNLOAD,
    file_url: fileUrl,
    file_name: fileName ?? fileUrl.split("/").pop() ?? "",
  });
}

/**
 * 11. Track Interactive Tools (Cost Estimator, Engagement Quiz, Tech Bench)
 */
export function trackInteractiveTool(payload: InteractiveToolPayload): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.INTERACTIVE_TOOL,
    tool_name: payload.toolName,
    action: payload.action,
    step_name: payload.stepName ?? "",
    step_number: payload.stepNumber ?? 1,
    result: payload.result ?? "",
    estimated_value: payload.estimatedValue ?? 0,
  });
}

