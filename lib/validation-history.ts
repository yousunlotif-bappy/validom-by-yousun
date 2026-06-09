import {
  ValidationHistoryItem,
  ValidationReport,
} from "@/types/validation";

/*
  Browser-side validation history.

  This fixes the static Recent Validations issue for the MVP.
  Later, this can be moved to Supabase/PostgreSQL.
*/

const HISTORY_KEY = "validom_validation_history";
const MAX_ITEMS = 8;

export function addValidationHistory(report: ValidationReport) {
  if (typeof window === "undefined") return;

  const newItem: ValidationHistoryItem = {
    domain: report.domainAnalysis.domain,
    verdict: report.verdict,
    opportunityScore: report.scores.opportunityScore,
    trustScore: report.scores.trustScore,
    updatedAt: new Date().toISOString(),
  };

  const existing = getValidationHistory();

  const withoutDuplicate = existing.filter(
    (item) => item.domain !== newItem.domain
  );

  const updated = [newItem, ...withoutDuplicate].slice(0, MAX_ITEMS);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getValidationHistory(): ValidationHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(HISTORY_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved) as ValidationHistoryItem[];
  } catch {
    return [];
  }
}

export function formatHistoryTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

