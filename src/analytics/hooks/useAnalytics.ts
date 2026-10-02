/**
 * Component-Level Analytics Hook
 * Returns typed tracking helpers for components and interactive widgets.
 */

import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  trackCtaClick,
  trackFormStart,
  trackFormStep,
  trackFormFailure,
  trackLeadGeneration,
  trackServiceInquiry,
  trackContactClick,
  trackInteractiveTool,
} from "../events";
import type {
  CtaClickPayload,
  ContactClickPayload,
  InteractiveToolPayload,
  LeadConversionPayload,
  ServiceInquiryPayload,
} from "../types";

export function useAnalytics() {
  const location = useLocation();

  const trackCta = useCallback(
    (payload: CtaClickPayload) => {
      trackCtaClick(payload);
    },
    [],
  );

  const trackService = useCallback(
    (payload: Omit<ServiceInquiryPayload, "source"> & { source?: string }) => {
      trackServiceInquiry({
        serviceId: payload.serviceId,
        serviceName: payload.serviceName,
        source: payload.source ?? location.pathname,
      });
    },
    [location.pathname],
  );

  const trackLead = useCallback(
    (payload: LeadConversionPayload) => {
      trackLeadGeneration(payload);
    },
    [],
  );

  const trackTool = useCallback(
    (payload: InteractiveToolPayload) => {
      trackInteractiveTool(payload);
    },
    [],
  );

  const trackContact = useCallback(
    (payload: ContactClickPayload) => {
      trackContactClick(payload);
    },
    [],
  );

  return {
    trackCta,
    trackService,
    trackLead,
    trackTool,
    trackContact,
    trackFormStart,
    trackFormStep,
    trackFormFailure,
  };
}

