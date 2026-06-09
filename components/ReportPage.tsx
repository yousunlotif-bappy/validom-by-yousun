"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ReportSection from "./ReportSection";
import DownloadReportButton from "./DownloadReportButton";
import LiveSignalsPanel from "./LiveSignalsPanel";
import CompetitorPanel from "./CompetitorPanel";

import { getSavedReport } from "@/lib/report-storage";
import { ValidationReport } from "@/types/validation";

import {
  BadgeCheck,
  BarChart3,
  Globe2,
  Rocket,
  Target,
} from "lucide-react";

/*
  ReportPage shows the complete Validom validation report.

  It loads the latest report from localStorage.

  This page includes:
  - domain overview
  - score breakdown
  - live technical signals
  - competitor intelligence
  - AI strategic analysis
  - startup concepts
  - Domain Roulette alignment
  - recommendations
  - print/export and PDF download
*/
export default function ReportPage() {
  const [report, setReport] = useState<ValidationReport | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedReport = getSavedReport();
    setReport(savedReport);
  }, []);

  if (!report) {
    return (
      <main className="min-h-screen bg-[#05070c] text-white">
        <Sidebar />

        <section className="min-h-screen p-4 sm:p-5 lg:ml-[280px]">
          <Topbar />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-2xl font-bold">No report found</h1>

            <p className="mt-3 text-slate-400">
              Please validate a domain first to generate a full report.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 px-6 py-3 font-semibold text-white"
            >
              Go to Dashboard
            </button>
          </div>
        </section>
      </main>
    );
  }

  const { domainAnalysis, scores } = report;

  return (
    <main className="min-h-screen bg-[#05070c] text-white">
      <Sidebar />

      <section className="min-h-screen p-4 sm:p-5 lg:ml-[280px]">
        <Topbar />

        {/* Report hero header */}
        <div className="mb-6 rounded-3xl border border-yellow-500/25 bg-gradient-to-br from-[#0b1b38] via-[#071827] to-[#062c25] p-8 shadow-2xl shadow-cyan-500/5">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
            Full Validom Report
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
            {domainAnalysis.domain}
          </h1>

          <p className="mt-3 max-w-3xl text-slate-300">
            Complete AI-powered domain-first startup validation report including
            trust, brand strength, market signals, proof quality, live technical
            signals, competitor intelligence, domain fit, and launch readiness.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              {report.verdict}
            </span>

            <span className="rounded-full bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              Opportunity Score: {scores.opportunityScore}/100
            </span>

            <span className="rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              Domain Fit: {scores.domainFitScore}/100
            </span>
          </div>

          {/* Export actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Export / Print Report
            </button>

            <DownloadReportButton report={report} />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {/* 1. Domain overview */}
            <ReportSection
              title="1. Domain Overview"
              subtitle="Basic domain structure and brand foundation."
            >
              <div className="grid gap-4 md:grid-cols-4">
                <InfoCard
                  label="Domain"
                  value={domainAnalysis.domain}
                  icon={Globe2}
                />

                <InfoCard
                  label="Name"
                  value={domainAnalysis.name}
                  icon={BadgeCheck}
                />

                <InfoCard
                  label="Extension"
                  value={domainAnalysis.extension}
                  icon={Target}
                />

                <InfoCard
                  label="Length"
                  value={`${domainAnalysis.length} chars`}
                  icon={BarChart3}
                />
              </div>

              {domainAnalysis.issues.length > 0 ? (
                <div className="mt-5 rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                  <p className="font-semibold text-yellow-200">
                    Detected Notes
                  </p>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-100/90">
                    {domainAnalysis.issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-300">
                  No major structural issues detected.
                </div>
              )}
            </ReportSection>

            {/* 2. Score breakdown */}
            <ReportSection
              title="2. Score Breakdown"
              subtitle="Combined result from Validom's scoring engine and live signal adjustments."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <ScoreBox title="Trust Score" score={scores.trustScore} />
                <ScoreBox title="Brand Score" score={scores.brandScore} />
                <ScoreBox title="Market Score" score={scores.marketScore} />
                <ScoreBox title="Proof Score" score={scores.proofScore} />
                <ScoreBox title="Domain Fit" score={scores.domainFitScore} />
                <ScoreBox title="Opportunity" score={scores.opportunityScore} />
              </div>
            </ReportSection>

            {/* 3. Live technical signals */}
            {report.liveSignals && (
              <ReportSection
                title="3. Live Technical Signals"
                subtitle="DNS, SSL, website reachability, security headers, and social profile signals."
              >
                <LiveSignalsPanel signals={report.liveSignals} />
              </ReportSection>
            )}

            {/* 4. Competitor intelligence */}
            {report.competitorInsight && (
              <ReportSection
                title="4. Competitor Intelligence"
                subtitle="Live or fallback competitor context for the domain idea."
              >
                <CompetitorPanel competitorInsight={report.competitorInsight} />
              </ReportSection>
            )}

            {/* 5. AI strategic analysis */}
            {report.aiInsights && (
              <ReportSection
                title="5. AI Strategic Analysis"
                subtitle="Generated by Validom's AI insight engine."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <AIInsightCard
                    title="Trust Analysis"
                    content={report.aiInsights.trustAnalysis}
                  />

                  <AIInsightCard
                    title="Brand Analysis"
                    content={report.aiInsights.brandAnalysis}
                  />

                  <AIInsightCard
                    title="Market Analysis"
                    content={report.aiInsights.marketAnalysis}
                  />

                  <AIInsightCard
                    title="Competitor Analysis"
                    content={report.aiInsights.competitorAnalysis}
                  />

                  <AIInsightCard
                    title="Proof Analysis"
                    content={report.aiInsights.proofAnalysis}
                  />

                  <AIInsightCard
                    title="Domain Fit Analysis"
                    content={report.aiInsights.domainFitAnalysis}
                  />
                </div>
              </ReportSection>
            )}

            {/* 6. Startup concepts */}
            <ReportSection
              title="6. Startup Concepts"
              subtitle="Product directions generated from the domain."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {report.concepts.map((concept) => (
                  <div
                    key={concept.title}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="font-semibold text-white">{concept.title}</p>

                    <p className="mt-2 min-h-14 text-sm leading-6 text-slate-400">
                      {concept.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        {concept.status}
                      </span>

                      <span className="text-xl font-bold text-emerald-300">
                        {concept.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ReportSection>

            {/* 7. Contest alignment */}
            <ReportSection
              title="7. Domain Roulette Alignment"
              subtitle="This section directly explains why Validom fits the contest challenge."
            >
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                <p className="leading-7 text-slate-200">
                  {report.domainRouletteAlignment}
                </p>
              </div>
            </ReportSection>

            {/* 8. Recommendations */}
            <ReportSection
              title="8. Recommendations"
              subtitle="Next steps to make this domain launch-ready."
            >
              <div className="space-y-3">
                {report.recommendations.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </ReportSection>
          </div>

          {/* Right summary panel */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
                Final Verdict
              </p>

              <h2 className="mt-4 text-2xl font-bold text-yellow-100">
                {report.verdict}
              </h2>

              <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full border-8 border-emerald-400/70 bg-black/20 text-3xl font-bold">
                {scores.opportunityScore}
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
                {report.summary}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold text-white">Validation Signals</h3>

              <div className="mt-4 space-y-3 text-sm">
                <Signal label="Risk Level" value={report.riskLevel} />
                <Signal label="Market Signal" value={report.marketSignal} />
                <Signal label="Competition" value={report.competitionLevel} />
                <Signal label="Proof Quality" value={report.proofQuality} />
              </div>
            </div>

            {report.liveSignals && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">
                <h3 className="font-semibold text-emerald-200">
                  Live Signal Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <Signal
                    label="DNS Active"
                    value={report.liveSignals.dns.hasARecords ? "Yes" : "No"}
                  />
                  <Signal
                    label="SSL Valid"
                    value={report.liveSignals.ssl.valid ? "Yes" : "No"}
                  />
                  <Signal
                    label="Website Reachable"
                    value={
                      report.liveSignals.http.reachable ? "Yes" : "No"
                    }
                  />
                  <Signal
                    label="Security Headers"
                    value={
                      report.liveSignals.http.hasSecurityHeaders ? "Yes" : "No"
                    }
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => router.push("/launch-kit")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 px-5 py-4 font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:scale-[1.01]"
            >
              <Rocket size={18} />
              Generate Launch Kit
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

/*
  Small reusable info card used in the domain overview section.
*/
function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <Icon size={18} className="mb-3 text-emerald-300" />

      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

/*
  ScoreBox displays a score with a progress bar.
*/
function ScoreBox({ title, score }: { title: string; score: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="font-bold text-emerald-300">{score}/100</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/*
  AI insight card used in the AI Strategic Analysis section.
*/
function AIInsightCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
      <p className="font-semibold text-cyan-200">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{content}</p>
    </div>
  );
}

/*
  Simple label/value row for sidebar summary panels.
*/
function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-black/20 px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}



