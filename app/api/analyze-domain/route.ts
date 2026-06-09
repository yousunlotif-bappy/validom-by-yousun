import { NextRequest, NextResponse } from "next/server";

import { generateAIInsights } from "@/lib/ai-insights";
import { getCompetitorInsight } from "@/lib/competitor-search";
import { analyzeDomain, extractDomainMeaning } from "@/lib/domain-utils";
import { getLiveDomainSignals } from "@/lib/live-signals";
import { enhanceScoresWithLiveSignals } from "@/lib/live-score-adjustments";
import {
  calculateAllScores,
  generateStartupConcepts,
  getCompetitionLevel,
  getMarketSignal,
  getProofQuality,
  getRiskLevel,
  getVerdict,
} from "@/lib/scoring";

import { ValidationReport } from "@/types/validation";

/*
  This route uses Node.js runtime because live DNS and TLS checks
  need Node APIs.
*/
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
  POST /api/analyze-domain

  Final improved flow:
  1. Clean and validate domain
  2. Run base scoring engine
  3. Fetch live DNS / SSL / HTTP signals
  4. Fetch optional competitor results
  5. Enhance scores using live signals
  6. Generate AI insights
  7. Return a full report
*/
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = body?.domain;

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Domain is required. Example: validom.com" },
        { status: 400 }
      );
    }

    const domainAnalysis = analyzeDomain(input);

    if (!domainAnalysis.isValid) {
      return NextResponse.json(
        {
          error:
            "Invalid domain format. Please enter a full domain like validom.com.",
          issues: domainAnalysis.issues,
        },
        { status: 400 }
      );
    }

    const baseScores = calculateAllScores(domainAnalysis);
    const concepts = generateStartupConcepts(domainAnalysis);

    const [liveSignals, competitorInsight] = await Promise.all([
      getLiveDomainSignals(domainAnalysis.domain),
      getCompetitorInsight(domainAnalysis),
    ]);

    const scores = enhanceScoresWithLiveSignals(
      baseScores,
      liveSignals,
      competitorInsight
    );

    const meaning = extractDomainMeaning(domainAnalysis.name);
    const verdict = getVerdict(scores.opportunityScore);

    const aiInsights = await generateAIInsights({
      domainAnalysis,
      scores,
      concepts,
      verdict,
    });

    const report: ValidationReport = {
      domainAnalysis,
      scores,
      verdict,
      riskLevel: getRiskLevel(scores.trustScore),
      marketSignal: getMarketSignal(scores.marketScore),
      competitionLevel:
        competitorInsight.source === "serpapi"
          ? `${competitorInsight.count} live competitor signals`
          : getCompetitionLevel(scores.marketScore),
      proofQuality: getProofQuality(scores.proofScore),
      concepts,
      summary: aiInsights.finalVerdictExplanation,
      domainRouletteAlignment: `${domainAnalysis.name} can be interpreted as "${meaning}". This makes the project domain-first: the selected domain is not just a name, it directly shapes the product strategy, validation workflow, and startup positioning.`,
      recommendations: aiInsights.improvedRecommendations,
      aiInsights,
      liveSignals,
      competitorInsight,
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error("Domain analysis failed:", error);

    return NextResponse.json(
      { error: "Something went wrong while analyzing the domain." },
      { status: 500 }
    );
  }
}


