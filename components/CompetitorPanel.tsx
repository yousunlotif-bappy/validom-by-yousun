import { CompetitorInsight } from "@/types/validation";

/*
  CompetitorPanel shows competitor context.

  User-facing language avoids "fallback" or "mock" wording.
  It uses professional labels like:
  - Live search context
  - Baseline competitor context
*/
type CompetitorPanelProps = {
  competitorInsight?: CompetitorInsight;
};

export default function CompetitorPanel({
  competitorInsight,
}: CompetitorPanelProps) {
  if (!competitorInsight) {
    return null;
  }

  const sourceLabel =
    competitorInsight.source === "serpapi"
      ? "Live search context"
      : "Baseline competitor context";

  return (
    <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-blue-200">
          Competitor Intelligence
        </h3>

        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
          {sourceLabel}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-400">
        Query: {competitorInsight.query}
      </p>

      <div className="mt-4 space-y-3">
        {competitorInsight.competitors.map((competitor, index) => (
          <div
            key={`${competitor.title}-${index}`}
            className="rounded-xl border border-white/10 bg-black/20 p-4"
          >
            <p className="font-semibold text-white">{competitor.title}</p>

            {competitor.snippet && (
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {competitor.snippet}
              </p>
            )}

            {competitor.link && (
              <p className="mt-2 break-all text-xs text-cyan-300">
                {competitor.link}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

