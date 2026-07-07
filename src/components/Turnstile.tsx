import { useEffect, useRef } from "react";

// Cloudflare Turnstile site key (public). Domain allow-list is configured in
// the Cloudflare dashboard for this key.
const SITE_KEY = "0x4AAAAAADFj512HLSo6yLMY";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Explicitly-rendered Cloudflare Turnstile widget.
 *
 * Implicit rendering (auto-scanning for `.cf-turnstile` on script load) is
 * unreliable in a React SPA: the widget elements are mounted by React after
 * `api.js` has already scanned the DOM, so the challenge often never renders
 * and form submission fails with "please complete the CAPTCHA". This component
 * instead calls `turnstile.render()` when it mounts (polling until the script
 * is ready), and removes the widget on unmount so it works with conditionally
 * rendered views. Turnstile injects the `cf-turnstile-response` hidden input
 * inside the widget, so enclosing `<form>`s pick the token up via FormData.
 */
export function Turnstile({ action }: { action?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | null = null;
    let interval: number | undefined;

    const tryRender = (): boolean => {
      if (!containerRef.current || !window.turnstile) return false;
      // Guard against double-render (e.g. React 18 StrictMode double-invoke).
      if (containerRef.current.childElementCount > 0) return true;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        action,
      });
      return true;
    };

    if (!tryRender()) {
      interval = window.setInterval(() => {
        if (tryRender() && interval) window.clearInterval(interval);
      }, 200);
      // Stop polling after 15s even if the script never loads.
      window.setTimeout(() => interval && window.clearInterval(interval), 15000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          /* widget already gone */
        }
      }
    };
  }, [action]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
