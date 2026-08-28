import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

const SITE_NAME = "Pranayansh Technologies";

/**
 * Sets a unique document title and meta description on mount for the current
 * page (FR-017). No external head-management library is used, per
 * research.md §3 and the Minimal Dependencies principle.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${SITE_NAME}`;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);

  return null;
}
