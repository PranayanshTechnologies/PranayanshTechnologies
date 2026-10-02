/**
 * Core DataLayer & Script Initialization Module
 * Provides type-safe interaction with window.dataLayer, Google Tag Manager,
 * Google Analytics 4, and Google Consent Mode v2.
 */

import { ANALYTICS_CONFIG } from "./config";
import type { ConsentConfig, DataLayerEvent } from "./types";

let isInitialized = false;

function ensureDataLayer(): unknown[] {
  if (typeof window === "undefined") return [];
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  return window.dataLayer;
}

export function pushToDataLayer(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;

  ensureDataLayer();

  window.dataLayer?.push({
    ...payload,
  });

  if (ANALYTICS_CONFIG.debugMode) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(
      `%c[Analytics DataLayer] %c${payload.event}`,
      "color: #5B47F5; font-weight: bold;",
      "color: #161616; font-weight: normal;",
    );
    // eslint-disable-next-line no-console
    console.log("Payload:", payload);
    // eslint-disable-next-line no-console
    console.log("Current dataLayer state:", window.dataLayer);
    // eslint-disable-next-line no-console
    console.groupEnd();
  }
}

export function updateConsent(consent: Partial<ConsentConfig>): void {
  if (typeof window === "undefined") return;
  ensureDataLayer();

  if (window.gtag) {
    window.gtag("consent", "update", consent);
  }

  pushToDataLayer({
    event: "consent_update",
    ...consent,
  });
}

function injectGtm(containerId: string): void {
  if (typeof document === "undefined" || document.getElementById("gtm-script")) return;

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}

function injectGa4(measurementId: string): void {
  if (typeof document === "undefined" || document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  document.head.appendChild(script);

  if (window.gtag) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false, // Page views are tracked manually for SPA routing
    });
  }
}

export function initAnalytics(): void {
  if (isInitialized || typeof window === "undefined") return;

  ensureDataLayer();

  // 1. Configure Consent Mode v2 defaults prior to loading tags
  if (window.gtag) {
    window.gtag("consent", "default", ANALYTICS_CONFIG.defaultConsent);
  }

  // 2. Load Google Tag Manager if container ID is present
  if (ANALYTICS_CONFIG.gtmContainerId) {
    injectGtm(ANALYTICS_CONFIG.gtmContainerId);
    pushToDataLayer({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  }

  // 3. Load direct GA4 if measurement ID is present
  if (ANALYTICS_CONFIG.ga4MeasurementId) {
    injectGa4(ANALYTICS_CONFIG.ga4MeasurementId);
  }

  isInitialized = true;

  if (ANALYTICS_CONFIG.debugMode) {
    // eslint-disable-next-line no-console
    console.log(
      "%c[Analytics Initialized]",
      "color: #16B981; font-weight: bold;",
      {
        gtm: ANALYTICS_CONFIG.gtmContainerId ?? "Not configured (DataLayer only)",
        ga4: ANALYTICS_CONFIG.ga4MeasurementId ?? "Not configured (DataLayer only)",
        debug: ANALYTICS_CONFIG.debugMode,
      },
    );
  }
}

