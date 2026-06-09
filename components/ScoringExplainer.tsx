"use client";

import { useState } from "react";
import { Calculator, X } from "lucide-react";

/*
  ScoringExplainer

  Purpose:
  Judges and users may ask:
  "How is the score calculated?"

  This component makes Validom more trustworthy by showing:
  - Opportunity Score formula
  - Trust Score formula
  - What the score means
  - Honest disclaimer that Validom is an early-stage validation assistant,
    not a final investment or safety decision tool.
*/
export default function ScoringExplainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/15 hover:text-cyan-100"
      >
        <Calculator size={16} />
        How scoring works
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#080d14] p-6 text-white shadow-2xl shadow-cyan-500/10">
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Validom Scoring Model
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Explainable domain-first validation
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Validom combines domain structure, live technical signals,
                  market context, proof quality, and AI-assisted strategy to
                  estimate whether a domain is worth building around.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close scoring explanation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Formula Cards */}
            <div className="grid gap-5 lg:grid-cols-2">
              <FormulaCard
                title="Overall Opportunity Score"
                description="Measures whether the domain can become a strong startup opportunity."
                items={[
                  ["Domain Fit", 25],
                  ["Trust & Risk Score", 20],
                  ["Market Signals", 20],
                  ["Competitor Gap", 15],
                  ["Proof Verification", 10],
                  ["Launch Readiness", 10],
                ]}
              />

              <FormulaCard
                title="Trust Score"
                description="Measures visible credibility, technical health, and risk signals."
                items={[
                  ["Domain technical health", 30],
                  ["SSL / HTTP / security signals", 25],
                  ["Brand clarity", 20],
                  ["Negative-risk signal check", 15],
                  ["Social / proof consistency", 10],
                ]}
              />
            </div>

            {/* Meaning of verdict */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="font-semibold text-white">
                Verdict Interpretation
              </h3>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <VerdictItem
                  label="85–100"
                  title="High-Confidence Opportunity"
                  text="The domain has strong fit, trust, and launch potential."
                />

                <VerdictItem
                  label="70–84"
                  title="Promising"
                  text="The domain is usable, but more proof or market clarity may be needed."
                />

                <VerdictItem
                  label="50–69"
                  title="Needs More Proof"
                  text="The domain may work, but the idea needs stronger evidence before building."
                />

                <VerdictItem
                  label="0–49"
                  title="Not Ready"
                  text="The domain has weak signals or unclear startup direction."
                />
              </div>
            </div>

            {/* Honest note */}
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm leading-6 text-yellow-100">
              <span className="font-semibold text-yellow-200">
                Honest scoring note:
              </span>{" "}
              Validom does not claim a domain is 100% safe or guaranteed to
              succeed. It is an early-stage validation assistant that combines
              visible signals, technical checks, custom scoring logic, and AI
              explanation to help builders decide whether to build, pivot, or
              avoid.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/*
  FormulaCard

  Reusable card for showing score formulas.
*/
function FormulaCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: [string, number][];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <div className="mt-5 space-y-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-300">{label}</span>

              <span className="font-semibold text-emerald-300">
                {value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
  VerdictItem

  Small reusable block for explaining score ranges.
*/
function VerdictItem({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
          {label}
        </span>
      </div>

      <p className="font-semibold text-white">{title}</p>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

