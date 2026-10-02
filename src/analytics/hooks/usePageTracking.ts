/**
 * React Router Virtual Pageview Tracking Hook
 * Listens to route changes in react-router-dom, captures UTM campaign parameters,
 * handles virtual pageviews with updated document.title, and maintains SPA referrer history.
 */

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../events";
import { initOrUpdateAttribution } from "../attribution";

export function usePageTracking(): void {
  const location = useLocation();
  const previousPathRef = useRef<string>(document.referrer || "");

  useEffect(() => {
    // 1. Capture any new campaign attribution parameters from URL query string
    initOrUpdateAttribution();

    // 2. Allow PageMeta component's useEffect to update document.title first
    const timerId = window.setTimeout(() => {
      const fullPath = location.pathname + location.search + location.hash;

      trackPageView({
        path: fullPath,
        title: document.title,
        referrer: previousPathRef.current,
      });

      // Update referrer to current path for subsequent route changes
      previousPathRef.current = window.location.href;
    }, 50);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [location.pathname, location.search, location.hash]);
}

