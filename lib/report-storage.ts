import { ValidationReport } from "@/types/validation";

/*
  This key is used to store the latest generated report in the browser.

  We are using localStorage for Phase 3 because we do not have a database yet.
  Later, this can be replaced with Supabase, Firebase, PostgreSQL, or any backend.
*/
const STORAGE_KEY = "validom_latest_report";

/*
  Saves the latest validation report to localStorage.

  Important:
  localStorage only exists in the browser.
  That is why we check typeof window first.
*/
export function saveReport(report: ValidationReport) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
  } catch (error) {
    console.error("Failed to save Validom report:", error);
  }
}

/*
  Reads the latest validation report from localStorage.

  If there is no saved report or the saved data is broken,
  this function safely returns null.
*/
export function getSavedReport(): ValidationReport | null {
  if (typeof window === "undefined") return null;

  try {
    const savedReport = localStorage.getItem(STORAGE_KEY);

    if (!savedReport) {
      return null;
    }

    return JSON.parse(savedReport) as ValidationReport;
  } catch (error) {
    console.error("Failed to read Validom report:", error);
    return null;
  }
}


