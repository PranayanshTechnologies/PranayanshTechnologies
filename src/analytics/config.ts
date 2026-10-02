/**
 * Analytics Configuration
 * Centralized configuration parsed from Vite environment variables.
 */

import type { ConsentConfig } from "./types";

const GA4_ID_REGEX = /^G-[A-Z0-9]+$/;
const GTM_ID_REGEX = /^GTM-[A-Z0-9]+$/;

const rawGa4Id = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
const rawGtmId = (import.meta.env.VITE_GTM_CONTAINER_ID as string | undefined)?.trim();

export const ANALYTICS_CONFIG = {
  /** Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX) */
  ga4MeasurementId: rawGa4Id && GA4_ID_REGEX.test(rawGa4Id) ? rawGa4Id : undefined,

  /** Google Tag Manager Container ID (e.g. GTM-XXXXXXX) */
  gtmContainerId: rawGtmId && GTM_ID_REGEX.test(rawGtmId) ? rawGtmId : undefined,

  /** Enables console debugging of all dataLayer pushes */
  debugMode:
    import.meta.env.VITE_ANALYTICS_DEBUG === "true" ||
    (import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG !== "false"),

  /**
   * Google Consent Mode v2 default configuration.
   * Defaulting to granted for analytics and denied for ad targeting until user explicitly opts in.
   */
  defaultConsent: {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  } as ConsentConfig,
};

