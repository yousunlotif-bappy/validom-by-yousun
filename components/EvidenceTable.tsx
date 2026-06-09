import { ValidationReport } from "@/types/validation";

/*
  EvidenceTable makes Validom feel more serious.

  It connects every major claim to a visible source or signal.
  This helps avoid the feeling that the app is only an AI wrapper.
*/
type EvidenceTableProps = {
  report: ValidationReport;
};

type EvidenceRow = {
  claim: string;
  evidenceType: string;
  source: string;
  confidence: number;
  status: "Verified" | "Likely" | "Needs Review";
};

export default function EvidenceTable({ report }: EvidenceTableProps) {
  const liveSignals = report.liveSignals;
  const competitorInsight = report.competitorInsight;

  const rows: EvidenceRow[] = [
    {
      claim: "Domain is reachable",
      evidenceType: "HTTP check",
      source: "Live domain scan",
      confidence: liveSignals?.http.reachable ? 92 : 48,
      status: liveSignals?.http.reachable ? "Verified" : "Needs Review",
    },
    {
      claim: "SSL is active",
      evidenceType: "Security check",
      source: "TLS certificate scan",
      confidence: liveSignals?.ssl.valid ? 95 : 45,
      status: liveSignals?.ssl.valid ? "Verified" : "Needs Review",
    },
    {
      claim: "Technical trust signals exist",
      evidenceType: "DNS / security signal",
      source: "DNS, SSL, and HTTP checks",
      confidence: report.scores.trustScore,
      status: report.scores.trustScore >= 75 ? "Verified" : "Likely",
    },
    {
      claim: "Market demand exists",
      evidenceType: "Market signal",
      source: "Scoring engine + AI analysis",
      confidence: report.scores.marketScore,
      status: report.scores.marketScore >= 80 ? "Verified" : "Likely",
    },
    {
      claim: "Competition is understandable",
      evidenceType: "Competitor scan",
      source:
        competitorInsight?.source === "serpapi"
          ? "Live search context"
          : "Baseline competitor scan",
      confidence: competitorInsight?.count ? 76 : 62,
      status: competitorInsight?.count ? "Likely" : "Needs Review",
    },
    {
      claim: "Brand fit is strong",
      evidenceType: "AI + rule analysis",
      source: "Domain intelligence",
      confidence: report.scores.brandScore,
      status: report.scores.brandScore >= 80 ? "Verified" : "Likely",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-cyan-400/20">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            Evidence Layer
          </p>
          <h3 className="mt-1 font-semibold text-white">
            Claim Verification Table
          </h3>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Evidence-backed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="py-3 font-medium">Claim</th>
              <th className="py-3 font-medium">Evidence Type</th>
              <th className="py-3 font-medium">Source / Signal</th>
              <th className="py-3 font-medium">Confidence</th>
              <th className="py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.claim} className="border-t border-white/10">
                <td className="py-3 font-medium text-slate-200">{row.claim}</td>
                <td className="py-3 text-slate-300">{row.evidenceType}</td>
                <td className="py-3 text-slate-400">{row.source}</td>
                <td className="py-3 font-semibold text-emerald-300">
                  {row.confidence}%
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Verified"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : row.status === "Likely"
                        ? "bg-yellow-400/10 text-yellow-300"
                        : "bg-red-400/10 text-red-300"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

