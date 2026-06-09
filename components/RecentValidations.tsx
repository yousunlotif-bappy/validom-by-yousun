"use client";

import { useEffect, useState } from "react";

import {
  formatHistoryTime,
  getValidationHistory,
} from "@/lib/validation-history";
import { ValidationHistoryItem } from "@/types/validation";

/*
  Dynamic recent validations table.

  This replaces the old static demo rows.
  It reads validation history from localStorage.
*/
export default function RecentValidations() {
  const [items, setItems] = useState<ValidationHistoryItem[]>([]);

  useEffect(() => {
    setItems(getValidationHistory());

    function handleFocus() {
      setItems(getValidationHistory());
    }

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-cyan-400/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">Recent Validations</h3>

        <button
          type="button"
          onClick={() => setItems(getValidationHistory())}
          className="text-xs font-medium text-slate-400 transition hover:text-cyan-300"
        >
          Refresh
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
          No recent validations yet. Run a domain analysis to build your
          validation history.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="py-2 font-medium">Domain / Idea</th>
                <th className="py-2 font-medium">Trust Score</th>
                <th className="py-2 font-medium">Verdict</th>
                <th className="py-2 font-medium">Updated</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={`${item.domain}-${item.updatedAt}`}
                  className="border-t border-white/10 transition hover:bg-white/[0.03]"
                >
                  <td className="py-3 font-medium text-slate-200">
                    {item.domain}
                  </td>

                  <td className="py-3 font-semibold text-emerald-300">
                    {item.trustScore}/100
                  </td>

                  <td className="py-3 font-medium text-yellow-300">
                    {item.verdict}
                  </td>

                  <td className="py-3 text-slate-400">
                    {formatHistoryTime(item.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


