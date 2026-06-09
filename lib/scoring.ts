import {
  DomainAnalysis,
  StartupConcept,
  ValidationScores,
} from "@/types/validation";

import { extractDomainMeaning } from "./domain-utils";

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculateTrustScore(domain: DomainAnalysis): number {
  let score = 85;

  if (!domain.isValid) score -= 35;
  if (domain.length <= 10) score += 8;
  if (domain.length > 20) score -= 12;
  if (domain.hasHyphen) score -= 10;
  if (domain.hasNumber) score -= 8;

  if (domain.extension === ".com") score += 5;
  if ([".ai", ".io", ".app", ".dev", ".co"].includes(domain.extension)) {
    score += 3;
  }

  if (domain.issues.length === 0) score += 4;

  return clampScore(score);
}

export function calculateBrandScore(domain: DomainAnalysis): number {
  let score = 75;

  if (domain.length >= 5 && domain.length <= 10) score += 15;
  if (domain.length > 14) score -= 10;
  if (!domain.hasHyphen) score += 5;
  if (!domain.hasNumber) score += 5;
  if (domain.wordCount <= 2) score += 5;

  if ([".com", ".ai", ".io", ".app", ".dev", ".co"].includes(domain.extension)) {
    score += 5;
  }

  const meaning = extractDomainMeaning(domain.name);

  if (!meaning.includes("flexible")) {
    score += 8;
  }

  return clampScore(score);
}

export function calculateDomainFitScore(domain: DomainAnalysis): number {
  let score = 70;

  const name = domain.name.toLowerCase();
  const meaning = extractDomainMeaning(domain.name);

  const strongWords = [
    "valid",
    "domain",
    "trust",
    "safe",
    "verify",
    "proof",
    "launch",
    "build",
    "brand",
    "founder",
    "market",
    "idea",
    "ai",
  ];

  if (!meaning.includes("flexible")) {
    score += 15;
  }

  if (strongWords.some((word) => name.includes(word))) {
    score += 10;
  }

  if (domain.length <= 12) score += 5;
  if (domain.hasHyphen) score -= 8;
  if (domain.hasNumber) score -= 6;

  return clampScore(score);
}

export function calculateMarketScore(domain: DomainAnalysis): number {
  let score = 72;
  const name = domain.name.toLowerCase();

  const highDemandWords = [
    "ai",
    "trust",
    "safe",
    "health",
    "study",
    "resume",
    "green",
    "pay",
    "launch",
    "domain",
    "brand",
    "proof",
  ];

  if (highDemandWords.some((word) => name.includes(word))) {
    score += 15;
  }

  if ([".ai", ".app", ".dev", ".io", ".com"].includes(domain.extension)) {
    score += 5;
  }

  return clampScore(score);
}

export function calculateProofScore(domain: DomainAnalysis): number {
  let score = 78;

  if (domain.isValid) score += 5;
  if (domain.issues.length === 0) score += 7;
  if (domain.issues.length >= 2) score -= 8;
  if (domain.length <= 12) score += 5;

  return clampScore(score);
}

export function calculateOpportunityScore(
  scores: Omit<ValidationScores, "opportunityScore">
): number {
  const opportunity =
    scores.domainFitScore * 0.3 +
    scores.trustScore * 0.2 +
    scores.brandScore * 0.2 +
    scores.marketScore * 0.15 +
    scores.proofScore * 0.15;

  return clampScore(opportunity);
}

export function calculateAllScores(domain: DomainAnalysis): ValidationScores {
  const trustScore = calculateTrustScore(domain);
  const brandScore = calculateBrandScore(domain);
  const marketScore = calculateMarketScore(domain);
  const proofScore = calculateProofScore(domain);
  const domainFitScore = calculateDomainFitScore(domain);

  const opportunityScore = calculateOpportunityScore({
    trustScore,
    brandScore,
    marketScore,
    proofScore,
    domainFitScore,
  });

  return {
    trustScore,
    brandScore,
    marketScore,
    proofScore,
    domainFitScore,
    opportunityScore,
  };
}

export function getVerdict(score: number): string {
  if (score >= 85) return "High-Confidence Opportunity";
  if (score >= 70) return "Promising";
  if (score >= 50) return "Needs More Proof";
  return "Not Ready";
}

export function getRiskLevel(trustScore: number): string {
  if (trustScore >= 80) return "Low Risk";
  if (trustScore >= 60) return "Medium Risk";
  return "High Risk";
}

export function getMarketSignal(marketScore: number): string {
  if (marketScore >= 85) return "Strong";
  if (marketScore >= 70) return "Promising";
  if (marketScore >= 50) return "Early";
  return "Weak";
}

export function getProofQuality(proofScore: number): string {
  if (proofScore >= 85) return "High-quality proof";
  if (proofScore >= 70) return "Moderate proof";
  if (proofScore >= 50) return "Needs more validation";
  return "Weak proof";
}

export function getCompetitionLevel(marketScore: number): string {
  if (marketScore >= 85) return "Moderate competition";
  if (marketScore >= 70) return "Emerging competition";
  return "Low visible competition";
}

export function generateStartupConcepts(domain: DomainAnalysis): StartupConcept[] {
  const name = domain.name.toLowerCase();
  const meaning = extractDomainMeaning(name);

  if (
    name.includes("valid") ||
    name.includes("domain") ||
    name.includes("trust")
  ) {
    return [
      {
        title: "AI Domain Trust Validator",
        description:
          "Validate domain trust, brand strength, and startup readiness.",
        score: 94,
        status: "High Potential",
      },
      {
        title: "Startup Name Validation Tool",
        description:
          "Help founders test whether a domain is brandable and market-ready.",
        score: 88,
        status: "Strong",
      },
      {
        title: "Website Credibility Report",
        description:
          "Generate simple trust reports for small business websites.",
        score: 82,
        status: "Strong",
      },
    ];
  }

  if (name.includes("study") || name.includes("learn")) {
    return [
      {
        title: "AI Study Companion",
        description: "Personalized learning assistant for students.",
        score: 90,
        status: "High Potential",
      },
      {
        title: "Quiz & Notes Generator",
        description: "Turn study materials into quizzes and summaries.",
        score: 84,
        status: "Strong",
      },
      {
        title: "Peer Learning Platform",
        description: "Match learners with study partners.",
        score: 76,
        status: "Moderate",
      },
    ];
  }

  if (name.includes("green") || name.includes("eco")) {
    return [
      {
        title: "CarbonTrack",
        description: "Track personal or business carbon footprint.",
        score: 89,
        status: "High Potential",
      },
      {
        title: "Eco Action Planner",
        description: "Recommend daily sustainability actions.",
        score: 82,
        status: "Strong",
      },
      {
        title: "Green Business Badge",
        description: "Validate eco-friendly claims for small businesses.",
        score: 78,
        status: "Moderate",
      },
    ];
  }

  return [
    {
      title: `${domain.name} Startup Copilot`,
      description: `A startup concept generated from the domain meaning: ${meaning}.`,
      score: 84,
      status: "Strong",
    },
    {
      title: `${domain.name} Trust Page`,
      description:
        "Create credibility pages and launch assets for new domains.",
      score: 78,
      status: "Moderate",
    },
    {
      title: `${domain.name} Launch Kit`,
      description: "Turn the domain into a launch-ready product package.",
      score: 74,
      status: "Moderate",
    },
  ];
}


