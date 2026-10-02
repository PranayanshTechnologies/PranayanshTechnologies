/**
 * Standardized Analytics Event Names & Constants
 * Following Google Analytics 4 recommended events and custom B2B lead generation taxonomy.
 */

export const ANALYTICS_EVENTS = {
  // GA4 Standard Events
  PAGE_VIEW: "page_view",
  GENERATE_LEAD: "generate_lead",
  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  VIEW_ITEM: "view_item",
  SELECT_CONTENT: "select_content",
  SEARCH: "search",

  // Custom B2B Lead Gen & Engagement Events
  FORM_STEP_COMPLETE: "form_step_complete",
  FORM_SUBMIT_FAILURE: "form_submit_failure",
  CTA_CLICK: "cta_click",
  SERVICE_INQUIRY: "service_inquiry",
  CONTACT_CLICK: "contact_click",
  OUTBOUND_CLICK: "outbound_click",
  FILE_DOWNLOAD: "file_download",
  INTERACTIVE_TOOL: "interactive_tool_usage",
} as const;

export const DEFAULT_CURRENCY = "USD";

/**
 * Baseline pipeline valuation estimates per lead type to calculate marketing ROI,
 * customer acquisition cost (CAC) efficiency, and ROAS in Google Ads & Looker Studio.
 */
export const ESTIMATED_LEAD_VALUES = {
  quote_request: 25000,
  contact_inquiry: 5000,
  career_interest: 0,
} as const;

