export type SitePage = "main" | "aiaf";

const AIAF_SUBDOMAIN_PREFIX = "aiaf.";

export function isAiafSubdomain(hostname: string) {
  return hostname.startsWith(AIAF_SUBDOMAIN_PREFIX);
}

export function getSitePage(location: Pick<Location, "hostname" | "pathname">): SitePage {
  if (isAiafSubdomain(location.hostname)) {
    return "aiaf";
  }

  return location.pathname === "/aiaf" || location.pathname === "/aiaf/" ? "aiaf" : "main";
}

export function buildMainSiteUrl(
  location: Pick<Location, "protocol" | "hostname" | "port">,
  section?: string,
) {
  const hostname = isAiafSubdomain(location.hostname)
    ? location.hostname.slice(AIAF_SUBDOMAIN_PREFIX.length)
    : location.hostname;
  const origin = `${location.protocol}//${hostname}${location.port ? `:${location.port}` : ""}`;

  return section ? `${origin}/#${section}` : `${origin}/`;
}

export function getAiafPath(location: Pick<Location, "hostname">) {
  return isAiafSubdomain(location.hostname) ? "/" : "/aiaf";
}
