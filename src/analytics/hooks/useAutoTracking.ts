/**
 * Global Automatic Event Tracking Hook
 * Uses event delegation on document.body to automatically capture:
 * - Phone number clicks (`tel:`)
 * - Email clicks (`mailto:`)
 * - Outbound link clicks
 * - File downloads (.pdf, .zip, .csv, etc.)
 * - Declarative CTA elements via `data-analytics-cta` attribute
 */

import { useEffect } from "react";
import {
  trackContactClick,
  trackFileDownload,
  trackOutboundClick,
  trackCtaClick,
} from "../events";
import type { CtaClickPayload } from "../types";

const DOWNLOAD_EXTENSIONS = /\.(pdf|xlsx?|docx?|pptx?|zip|rar|tar|gz|csv)$/i;

export function useAutoTracking(): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // 1. Check for declarative data-analytics-cta element or its parents
      const ctaElement = target.closest<HTMLElement>("[data-analytics-cta]");
      if (ctaElement) {
        const ctaName = ctaElement.getAttribute("data-analytics-cta") || "unnamed_cta";
        const ctaLocation =
          (ctaElement.getAttribute("data-analytics-location") as CtaClickPayload["ctaLocation"]) ||
          "cta_banner";
        const ctaText = ctaElement.innerText?.trim() || ctaElement.getAttribute("aria-label") || "";
        const destinationUrl =
          ctaElement.getAttribute("href") ||
          ctaElement.getAttribute("data-analytics-destination") ||
          undefined;

        trackCtaClick({
          ctaName,
          ctaLocation,
          ctaText,
          destinationUrl,
        });
      }

      // 2. Check for anchor tag interactions
      const anchor = target.closest<HTMLAnchorElement>("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href")?.trim();
      if (!href) return;

      // 2a. Mailto tracking
      if (href.startsWith("mailto:")) {
        const email = href.replace(/^mailto:/i, "").split("?")[0];
        trackContactClick({
          type: "email",
          value: email,
          location: anchor.closest("header")
            ? "navbar"
            : anchor.closest("footer")
            ? "footer"
            : "body",
        });
        return;
      }

      // 2b. Tel tracking
      if (href.startsWith("tel:")) {
        const phone = href.replace(/^tel:/i, "").split("?")[0];
        trackContactClick({
          type: "phone",
          value: phone,
          location: anchor.closest("header")
            ? "navbar"
            : anchor.closest("footer")
            ? "footer"
            : "body",
        });
        return;
      }

      // 2c. File Download tracking
      const cleanUrl = href.split("?")[0].split("#")[0];
      if (DOWNLOAD_EXTENSIONS.test(cleanUrl)) {
        trackFileDownload(href, anchor.innerText?.trim() || cleanUrl.split("/").pop());
        return;
      }

      // 2d. Outbound link tracking
      try {
        const url = new URL(href, window.location.origin);
        if (
          url.protocol.startsWith("http") &&
          url.hostname !== window.location.hostname
        ) {
          trackOutboundClick(url.href, anchor.innerText?.trim() || url.hostname);
        }
      } catch {
        // Not a standard URL, skip
      }
    }

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);
}

