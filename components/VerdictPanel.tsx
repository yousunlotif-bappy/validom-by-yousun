"use client";

import { useRouter } from "next/navigation";

/*
  VerdictPanel shows the final decision from the scoring engine.

  In Phase 3, the button now opens the full report page.
*/
type VerdictPanelProps = {
  verdict: string;
  summary: string;
  opportunityScore: number;
};

export default function VerdictPanel({
  verdict,
  summary,
  opportunityScore,
}: VerdictPanelProps) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-6 text-center shadow-xl shadow-yellow-500/5">
      <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
        Validom Verdict
      </p>

      <h3 className="mt-6 text-3xl font-bold tracking-tight text-yellow-100">
        {verdict}
      </h3>

      <div className="mx-auto mt-6 grid h-28 w-28 place-items-center rounded-full border-8 border-emerald-400/70 bg-black/20 text-3xl font-bold text-white">
        {opportunityScore}
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{summary}</p>

      <div className="my-6 text-5xl" aria-hidden="true">
        💎
      </div>

      <button
        type="button"
        onClick={() => router.push("/report")}
        className="w-full rounded-xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-200 transition-all duration-200 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-500/10"
      >
        View Full Report →
      </button>
    </div>
  );
}

