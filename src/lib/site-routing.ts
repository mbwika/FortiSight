export type SitePage = "main" | "aiaf";

const AIAF_SUBDOMAIN_PREFIX = "aiaf.";

export function isAiafSubdomain(hostname: string) {
  return hostname.startsWith(AIAF_SUBDOMAIN_PREFIX);
}

function isLocalHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

function apexHostname(hostname: string) {
  return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
}

export function getSitePage(location: Pick<Location, "hostname" | "pathname">): SitePage {
  if (isAiafSubdomain(location.hostname)) {
    return "aiaf";
  }

  return "main";
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

export function getAiafPath(
  location: Pick<Location, "protocol" | "hostname" | "port">,
) {
  if (isAiafSubdomain(location.hostname)) {
    return "/";
  }
  if (isLocalHostname(location.hostname)) {
    return "/aiaf";
  }

  const origin = `${location.protocol}//${AIAF_SUBDOMAIN_PREFIX}${apexHostname(location.hostname)}${
    location.port ? `:${location.port}` : ""
  }`;
  return `${origin}/`;
}
