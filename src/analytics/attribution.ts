/**
 * Marketing Campaign Attribution (UTM & Click ID Tracking)
 * Captures, persists, and enriches analytics events with first-touch and last-touch
 * campaign parameters for end-to-end Marketing ROI and ROAS measurement.
 */

import type { UTMParameters } from "./types";

const UTM_SESSION_KEY = "pranayansh_attribution_utm";

const UTM_PARAM_NAMES: (keyof UTMParameters)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
];

export function extractUrlCampaignParams(searchString: string = window.location.search): UTMParameters {
  const params = new URLSearchParams(searchString);
  const result: UTMParameters = {};

  for (const key of UTM_PARAM_NAMES) {
    const val = params.get(key);
    if (val) {
      result[key] = val;
    }
  }

  return result;
}

export function initOrUpdateAttribution(): UTMParameters {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return {};
  }

  const urlParams = extractUrlCampaignParams();

  if (Object.keys(urlParams).length > 0) {
    try {
      window.sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(urlParams));
      return urlParams;
    } catch {
      return urlParams;
    }
  }

  try {
    const stored = window.sessionStorage.getItem(UTM_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored) as UTMParameters;
    }
  } catch {
    // Ignore storage parse errors
  }

  return {};
}

export function getActiveAttribution(): UTMParameters {
  return initOrUpdateAttribution();
}

