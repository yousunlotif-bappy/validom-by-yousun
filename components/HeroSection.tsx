"use client";

import { useState } from "react";
import { Globe2, Sparkles } from "lucide-react";

import { ValidationReport } from "@/types/validation";

/*
  HeroSection is the main input area.

  It lets users enter a domain and start the validation pipeline.
*/
type HeroSectionProps = {
  onReportGenerated: (report: ValidationReport) => void;
};

export default function HeroSection({ onReportGenerated }: HeroSectionProps) {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
    Judge-friendly example domains.

    These help judges test the app quickly without thinking too much.
  */
  const examples = [
    "validom.com",
    "startup.delivery",
    "studybuddy.io",
    "greenlease.com",
    "trustlaunch.ai",
  ];

  async function handleValidation(inputDomain?: string) {
    const targetDomain = inputDomain || domain;

    if (!targetDomain.trim()) {
      setError("Please enter a full domain like validom.com");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: targetDomain }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.issues?.join(" ") ||
            data.error ||
            "Could not analyze this domain. Please try a valid domain like validom.com."
        );
        return;
      }

      onReportGenerated(data);
      setDomain(targetDomain);
    } catch {
      setError("Network error. Please check your server and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-yellow-500/25 bg-gradient-to-br from-[#0b1b38] via-[#071827] to-[#062c25] p-6 shadow-2xl shadow-cyan-500/5 sm:p-8 lg:p-10">
      {/* Premium glow effects */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          {/* AI / contest badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">
            <Sparkles size={14} />
            AI-powered domain-first startup validation
          </div>

          <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Validate <span className="text-cyan-400">Smarter.</span> Build With{" "}
            <span className="text-cyan-400">Confidence.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            From domain to launch, Validom gives you trust signals, market
            proof, competitor insight, AI strategy, and a clear verdict before
            you build.
          </p>

          <p className="mt-3 text-sm font-medium text-yellow-300">
            Built for Domain Roulette: Domain → Idea → Research → Trust → Proof
            → Verdict → Launch
          </p>

          {/* Input and CTA */}
          <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-black/25 px-4 transition-all duration-200 focus-within:border-cyan-400/50 focus-within:bg-black/35 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
              <Globe2 size={20} className="shrink-0 text-slate-300" />

              <input
                type="text"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleValidation();
                  }
                }}
                className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                placeholder="Enter your domain or startup idea..."
              />
            </div>

            <button
              type="button"
              onClick={() => handleValidation()}
              disabled={loading}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 px-8 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Sparkles size={18} />
              {loading ? "Analyzing..." : "Start Validation"}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="mt-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          {/* Premium loading state */}
          {loading && (
            <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="mb-3 text-sm font-semibold text-cyan-200">
                Building Validom Report...
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                <LoadingStep text="Checking domain structure" />
                <LoadingStep text="Evaluating trust signals" />
                <LoadingStep text="Analyzing brand strength" />
                <LoadingStep text="Scanning competitor context" />
                <LoadingStep text="Generating AI startup insights" />
                <LoadingStep text="Preparing launch-ready verdict" />
              </div>
            </div>
          )}

          {/* Example domains */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Try examples:</span>

            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleValidation(example)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Premium V visual */}
        <div className="hidden items-center justify-center lg:flex">
          <div className="relative grid h-72 w-72 place-items-center rounded-full border border-cyan-400/10 bg-white/[0.03] shadow-2xl shadow-cyan-500/10">
            <div className="absolute inset-6 rounded-full border border-emerald-400/10" />

            <div className="bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-[170px] font-black leading-none text-transparent drop-shadow-2xl">
              V
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  One loading step row.
*/
function LoadingStep({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
      <span>{text}</span>
    </div>
  );
}


