import {
  CompetitorInsight,
  LiveDomainSignals,
  ValidationScores,
} from "@/types/validation";

/*
  This file adjusts the existing scoring engine with real live signals.

  The original scoring engine is still useful.
  These adjustments make the result more credible and less static.
*/

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function enhanceScoresWithLiveSignals(
  baseScores: ValidationScores,
  liveSignals: LiveDomainSignals,
  competitorInsight: CompetitorInsight
): ValidationScores {
  let trustScore = baseScores.trustScore;
  let proofScore = baseScores.proofScore;
  let marketScore = baseScores.marketScore;

  if (liveSignals.dns.hasARecords) trustScore += 4;
  if (liveSignals.dns.hasMxRecords) trustScore += 2;
  if (liveSignals.dns.hasSpfRecord) trustScore += 3;
  if (liveSignals.dns.hasDmarcRecord) trustScore += 3;
  if (liveSignals.dns.hasCaaRecord) trustScore += 2;

  if (liveSignals.ssl.valid) trustScore += 6;
  if (liveSignals.ssl.daysRemaining !== null && liveSignals.ssl.daysRemaining < 15) {
    trustScore -= 8;
  }

  if (liveSignals.http.reachable) proofScore += 5;
  if (liveSignals.http.hasSecurityHeaders) trustScore += 4;
  if (liveSignals.http.title) proofScore += 2;
  if (liveSignals.http.description) proofScore += 2;
  if (liveSignals.http.socialLinks.length > 0) proofScore += 3;

  if (competitorInsight.count >= 3) marketScore += 4;
  if (competitorInsight.source === "serpapi") marketScore += 3;

  const domainFitScore = baseScores.domainFitScore;
  const brandScore = baseScores.brandScore;

  const opportunityScore = clampScore(
    domainFitScore * 0.3 +
      trustScore * 0.2 +
      brandScore * 0.2 +
      marketScore * 0.15 +
      proofScore * 0.15
  );

  return {
    trustScore: clampScore(trustScore),
    brandScore: clampScore(brandScore),
    marketScore: clampScore(marketScore),
    proofScore: clampScore(proofScore),
    domainFitScore: clampScore(domainFitScore),
    opportunityScore,
  };
}


