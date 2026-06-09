import dns from "node:dns/promises";
import tls from "node:tls";

import { LiveDomainSignals } from "@/types/validation";

/*
  Live Signals Engine

  This file collects real technical signals from a domain:
  - DNS records
  - SSL certificate
  - HTTP reachability
  - security headers
  - social/profile links

  The code is defensive. If any check fails, Validom will still continue.
*/

function safeArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

async function safeResolve<T>(resolver: () => Promise<T[]>): Promise<T[]> {
  try {
    return await resolver();
  } catch {
    return [];
  }
}

/*
  Convert unknown certificate fields into a clean string.

  This prevents TypeScript errors when certificate issuer fields
  are not guaranteed to be normal strings.
*/
function toSafeString(value: unknown, fallback = "Unknown"): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return fallback;
}

/*
  Collect DNS signals.
*/
async function getDnsSignals(domain: string): Promise<LiveDomainSignals["dns"]> {
  const aRecords = await safeResolve(() => dns.resolve4(domain));
  const aaaaRecords = await safeResolve(() => dns.resolve6(domain));
  const mxRecordsRaw = await safeResolve(() => dns.resolveMx(domain));
  const nsRecords = await safeResolve(() => dns.resolveNs(domain));
  const caaRecords = await safeResolve(() => dns.resolveCaa(domain));
  const txtRecords = await safeResolve(() => dns.resolveTxt(domain));
  const dmarcRecords = await safeResolve(() =>
    dns.resolveTxt(`_dmarc.${domain}`)
  );

  const flattenedTxt = txtRecords.flat().join(" ").toLowerCase();
  const flattenedDmarc = dmarcRecords.flat().join(" ").toLowerCase();

  return {
    hasARecords: aRecords.length > 0,
    hasAAAARecords: aaaaRecords.length > 0,
    hasMxRecords: mxRecordsRaw.length > 0,
    hasNsRecords: nsRecords.length > 0,
    hasSpfRecord: flattenedTxt.includes("v=spf1"),
    hasDmarcRecord: flattenedDmarc.includes("v=dmarc1"),
    hasCaaRecord: caaRecords.length > 0,
    aRecords: safeArray(aRecords).slice(0, 5),
    mxRecords: safeArray(mxRecordsRaw)
      .map((record) => record.exchange)
      .slice(0, 5),
    nsRecords: safeArray(nsRecords).slice(0, 5),
  };
}

/*
  Collect SSL certificate signals.

  This runs only on the server-side API route.
*/
function getSslSignal(domain: string): Promise<LiveDomainSignals["ssl"]> {
  return new Promise((resolve) => {
    let resolved = false;

    function finish(result: LiveDomainSignals["ssl"]) {
      if (resolved) return;
      resolved = true;
      resolve(result);
    }

    const socket = tls.connect({
      host: domain,
      port: 443,
      servername: domain,
      rejectUnauthorized: false,
      timeout: 6000,
    });

    socket.once("secureConnect", () => {
      const certificate = socket.getPeerCertificate();

      const validTo = toSafeString(certificate?.valid_to, "");
      const validFrom = toSafeString(certificate?.valid_from, "");

      /*
        Important fix:
        issuer is forced into a clean string so TypeScript does not complain.
      */
      const issuerName =
        toSafeString(certificate?.issuer?.O, "") ||
        toSafeString(certificate?.issuer?.CN, "") ||
        "Unknown";

      let daysRemaining: number | null = null;

      if (validTo) {
        const expireTime = new Date(validTo).getTime();
        const now = Date.now();

        if (!Number.isNaN(expireTime)) {
          daysRemaining = Math.ceil(
            (expireTime - now) / (1000 * 60 * 60 * 24)
          );
        }
      }

      const result: LiveDomainSignals["ssl"] = {
        checked: true,
        valid: Boolean(validTo && daysRemaining !== null && daysRemaining > 0),
        authorized: Boolean(socket.authorized),
        issuer: issuerName,
        validFrom,
        validTo,
        daysRemaining,
      };

      socket.end();
      finish(result);
    });

    socket.once("timeout", () => {
      socket.destroy();

      finish({
        checked: true,
        valid: false,
        authorized: false,
        issuer: "Unavailable",
        validFrom: "",
        validTo: "",
        daysRemaining: null,
      });
    });

    socket.once("error", () => {
      finish({
        checked: true,
        valid: false,
        authorized: false,
        issuer: "Unavailable",
        validFrom: "",
        validTo: "",
        daysRemaining: null,
      });
    });
  });
}

/*
  Extract text from HTML using a simple regex pattern.
*/
function extractBetween(html: string, pattern: RegExp): string {
  const match = html.match(pattern);

  return match?.[1]?.trim().replace(/\s+/g, " ") || "";
}

/*
  Extract common social/profile links from homepage HTML.
*/
function extractSocialLinks(html: string): string[] {
  const links = new Set<string>();
  const urlMatches = html.match(/https?:\/\/[^"'<> ]+/g) || [];

  for (const url of urlMatches) {
    const lower = url.toLowerCase();

    if (
      lower.includes("linkedin.com") ||
      lower.includes("twitter.com") ||
      lower.includes("x.com") ||
      lower.includes("facebook.com") ||
      lower.includes("instagram.com") ||
      lower.includes("youtube.com") ||
      lower.includes("github.com")
    ) {
      links.add(url);
    }
  }

  return Array.from(links).slice(0, 8);
}

/*
  Fetch with timeout so the API does not hang.
*/
async function fetchWithTimeout(url: string, timeoutMs = 7000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "ValidomBot/1.0",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/*
  Collect HTTP and website-level signals.
*/
async function getHttpSignals(
  domain: string
): Promise<LiveDomainSignals["http"]> {
  try {
    const response = await fetchWithTimeout(`https://${domain}`);
    const html = await response.text();

    const securityHeaderNames = [
      "strict-transport-security",
      "content-security-policy",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
    ];

    const presentHeaders = securityHeaderNames.filter((header) =>
      response.headers.has(header)
    );

    /*
      Safe title regex.

      We avoid the /s flag and use [\\s\\S] instead.
      This works better across TypeScript targets.
    */
    const title = extractBetween(
      html,
      /<title[^>]*>([\s\S]*?)<\/title>/i
    );

    const description =
      extractBetween(
        html,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
      ) ||
      extractBetween(
        html,
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
      );

    return {
      reachable: true,
      status: response.status,
      finalUrl: response.url,
      title,
      description,
      hasSecurityHeaders: presentHeaders.length >= 2,
      securityHeaders: presentHeaders,
      socialLinks: extractSocialLinks(html),
    };
  } catch {
    return {
      reachable: false,
      status: null,
      finalUrl: "",
      title: "",
      description: "",
      hasSecurityHeaders: false,
      securityHeaders: [],
      socialLinks: [],
    };
  }
}

/*
  Main exported function.

  Runs DNS, SSL, and HTTP checks in parallel.
*/
export async function getLiveDomainSignals(
  domain: string
): Promise<LiveDomainSignals> {
  const [dnsSignals, sslSignals, httpSignals] = await Promise.all([
    getDnsSignals(domain),
    getSslSignal(domain),
    getHttpSignals(domain),
  ]);

  return {
    checkedAt: new Date().toISOString(),
    dns: dnsSignals,
    ssl: sslSignals,
    http: httpSignals,
  };
}



