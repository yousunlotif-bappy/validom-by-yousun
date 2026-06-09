"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import HeroSection from "./HeroSection";
import ValidationStepper from "./ValidationStepper";
import ScoreCard from "./ScoreCard";
import VerdictPanel from "./VerdictPanel";
import StartupConcepts from "./StartupConcepts";
import LaunchKit from "./LaunchKit";
import RecentValidations from "./RecentValidations";
import JudgeMode from "./JudgeMode";
import LiveSignalsPanel from "./LiveSignalsPanel";
import CompetitorPanel from "./CompetitorPanel";

import {
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { saveReport } from "@/lib/report-storage";
import { defaultReport } from "@/lib/sample-data";
import { addValidationHistory } from "@/lib/validation-history";
import { ValidationReport } from "@/types/validation";

/*
  Dashboard is the main screen of Validom.

  It handles:
  - domain validation input
  - dynamic score cards
  - latest report state
  - saving report to localStorage
  - adding recent validation history
  - showing live DNS/SSL/HTTP signals
  - showing competitor intelligence
  - showing Judge Mode for contest alignment
*/
export default function Dashboard() {
  const [report, setReport] = useState<ValidationReport>(defaultReport);

  /*
    Save the default/latest report when the dashboard loads.

    This helps the Report Page and Launch Kit Page work even if the user
    directly opens /report or /launch-kit after visiting the dashboard.
  */
  useEffect(() => {
    saveReport(report);
  }, [report]);

  /*
    This function runs when HeroSection receives a new report
    from the /api/analyze-domain route.
  */
  function handleReportGenerated(newReport: ValidationReport) {
    setReport(newReport);
    saveReport(newReport);
    addValidationHistory(newReport);
  }

  return (
    <main className="min-h-screen bg-[#05070c] text-white">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile / tablet header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#080d14]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Validom logo"
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
            priority
          />

          <div className="flex items-baseline gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              <span className="text-cyan-400">V</span>alidom
            </h1>

            <span className="text-xs font-semibold text-yellow-400">
              by Yousun
            </span>
          </div>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          AI MVP
        </span>
      </div>

      {/* Main content area */}
      <section className="min-h-screen p-4 sm:p-5 lg:ml-[280px]">
        <Topbar />

        <HeroSection onReportGenerated={handleReportGenerated} />

        <ValidationStepper />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {/* Dynamic score cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
              <ScoreCard
                title="Trust Score"
                value={`${report.scores.trustScore}/100`}
                subtitle={`${report.riskLevel} across visible trust signals.`}
                footer="Trust validation complete"
                icon={ShieldCheck}
              />

              <ScoreCard
                title="Market Signals"
                value={report.marketSignal}
                subtitle="Demand and audience potential."
                footer={`${report.scores.marketScore}/100 market score`}
                icon={BarChart3}
              />

              <ScoreCard
                title="Competitor Snapshot"
                value={
                  report.competitorInsight
                    ? `${report.competitorInsight.count}`
                    : "8"
                }
                subtitle={
                  report.competitorInsight?.source === "serpapi"
                    ? "Live competitor signals detected."
                    : "Fallback competitor context."
                }
                footer={report.competitionLevel}
                icon={Users}
              />

              <ScoreCard
                title="Proof Verification"
                value={`${Math.round(report.scores.proofScore / 12.5)}/8`}
                subtitle="Evidence verified."
                footer={report.proofQuality}
                icon={BadgeCheck}
              />

              <ScoreCard
                title="Opportunity Score"
                value={`${report.scores.opportunityScore}/100`}
                subtitle="Startup readiness potential."
                footer={report.verdict}
                icon={Target}
              />
            </div>

            {/* Current domain analysis */}
            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-cyan-200">
                  Current Domain Analysis
                </h3>

                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {report.domainAnalysis.isValid ? "Valid Domain" : "Needs Fix"}
                </span>
              </div>

              <div className="mt-4 grid gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-slate-400">Domain</p>
                  <p className="font-semibold text-white">
                    {report.domainAnalysis.domain}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Name</p>
                  <p className="font-semibold text-white">
                    {report.domainAnalysis.name}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Extension</p>
                  <p className="font-semibold text-white">
                    {report.domainAnalysis.extension}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Domain Fit</p>
                  <p className="font-semibold text-white">
                    {report.scores.domainFitScore}/100
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">
                  Domain Roulette Alignment
                </p>

                <p className="mt-2 leading-6">
                  {report.domainRouletteAlignment}
                </p>
              </div>

              {report.domainAnalysis.issues.length > 0 && (
                <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm">
                  <p className="font-semibold text-yellow-200">
                    Notes from analysis
                  </p>

                  <ul className="mt-2 list-inside list-disc space-y-1 text-yellow-100/90">
                    {report.domainAnalysis.issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Real live technical signals */}
            <div className="mt-5">
              <LiveSignalsPanel signals={report.liveSignals} />
            </div>

            {/* Competitor intelligence */}
            <div className="mt-5">
              <CompetitorPanel competitorInsight={report.competitorInsight} />
            </div>

            {/* Contest explanation section */}
            <div className="mt-5">
              <JudgeMode />
            </div>

            {/* Concepts and launch kit */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
              <StartupConcepts concepts={report.concepts} />
              <LaunchKit />
            </div>

            {/* Dynamic recent validation history */}
            <div className="mt-5">
              <RecentValidations />
            </div>
          </div>

          {/* Right-side verdict panel */}
          <div className="min-w-0">
            <VerdictPanel
              verdict={report.verdict}
              summary={report.summary}
              opportunityScore={report.scores.opportunityScore}
            />
          </div>
        </div>
      </section>
    </main>
  );
}


