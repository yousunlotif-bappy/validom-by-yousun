import { DomainAnalysis } from "@/types/validation";

const supportedTlds = [
  "com",
  "net",
  "org",
  "io",
  "ai",
  "app",
  "co",
  "dev",
  "tech",
  "xyz",
  "site",
  "online",
  "me",
  "us",
  "uk",
];

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split("?")[0]
    .split("#")[0];
}

export function analyzeDomain(input: string): DomainAnalysis {
  const issues: string[] = [];
  const domain = normalizeDomain(input);

  const parts = domain.split(".");
  const extensionRaw = parts.length > 1 ? parts[parts.length - 1] : "";
  const name = parts.length > 1 ? parts.slice(0, -1).join(".") : domain;

  const cleanName = name.replace(/\./g, "");
  const length = cleanName.length;
  const hasHyphen = name.includes("-");
  const hasNumber = /\d/.test(name);
  const wordCount = name.split(/[-.]/).filter(Boolean).length;

  const domainRegex = /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/;
  const isValidFormat = domainRegex.test(domain);
  const isSupportedTld = supportedTlds.includes(extensionRaw);

  if (!input.trim()) {
    issues.push("Domain input is empty.");
  }

  if (!isValidFormat) {
    issues.push("Domain format is not valid.");
  }

  if (extensionRaw && !isSupportedTld) {
    issues.push("Domain extension is uncommon for this MVP scoring engine.");
  }

  if (length > 20) {
    issues.push("Domain name is long and may be harder to remember.");
  }

  if (hasHyphen) {
    issues.push("Hyphen may reduce trust and brand quality.");
  }

  if (hasNumber) {
    issues.push("Numbers may reduce readability and credibility.");
  }

  return {
    originalInput: input,
    domain,
    name,
    extension: extensionRaw ? `.${extensionRaw}` : "",
    length,
    hasHyphen,
    hasNumber,
    wordCount,
    isValid: isValidFormat && Boolean(extensionRaw),
    issues,
  };
}

export function extractDomainMeaning(name: string): string {
  const lower = name.toLowerCase();

  const knownMeanings: Record<string, string> = {
    validom: "Valid + Domain",
    trustdomain: "Trust + Domain",
    veridom: "Verify + Domain",
    safedom: "Safe + Domain",
    airesume: "AI + Resume",
    studybuddy: "Study + Buddy",
    habitmate: "Habit + Mate",
    greenlease: "Green + Lease",
    mindfulai: "Mindful + AI",
  };

  if (knownMeanings[lower]) {
    return knownMeanings[lower];
  }

  if (lower.includes("ai")) return "AI-powered product direction";
  if (lower.includes("trust")) return "Trust and credibility direction";
  if (lower.includes("safe")) return "Safety and protection direction";
  if (lower.includes("green")) return "Sustainability direction";
  if (lower.includes("study")) return "Education and learning direction";
  if (lower.includes("health")) return "Health and wellness direction";
  if (lower.includes("pay")) return "Finance or payment direction";
  if (lower.includes("shop")) return "Commerce direction";
  if (lower.includes("launch")) return "Startup launch direction";
  if (lower.includes("proof")) return "Proof and verification direction";
  if (lower.includes("brand")) return "Brand validation direction";

  return "Brandable startup name with flexible product direction";
}

