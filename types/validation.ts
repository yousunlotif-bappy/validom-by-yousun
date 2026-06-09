/*
  Shared TypeScript types for the whole Validom app.

  Phase 4.5 adds:
  - live domain signals
  - competitor insight
  - validation history
  - optional AI insight
*/

export type DomainAnalysis = {
  originalInput: string;
  domain: string;
  name: string;
  extension: string;
  length: number;
  hasHyphen: boolean;
  hasNumber: boolean;
  wordCount: number;
  isValid: boolean;
  issues: string[];
};

export type StartupConcept = {
  title: string;
  description: string;
  score: number;
  status: "High Potential" | "Strong" | "Moderate" | "Needs Proof";
};

export type ValidationScores = {
  trustScore: number;
  brandScore: number;
  marketScore: number;
  proofScore: number;
  domainFitScore: number;
  opportunityScore: number;
};

export type AIInsights = {
  trustAnalysis: string;
  brandAnalysis: string;
  marketAnalysis: string;
  competitorAnalysis: string;
  proofAnalysis: string;
  domainFitAnalysis: string;
  finalVerdictExplanation: string;
  improvedRecommendations: string[];
};

export type LiveDomainSignals = {
  checkedAt: string;

  dns: {
    hasARecords: boolean;
    hasAAAARecords: boolean;
    hasMxRecords: boolean;
    hasNsRecords: boolean;
    hasSpfRecord: boolean;
    hasDmarcRecord: boolean;
    hasCaaRecord: boolean;
    aRecords: string[];
    mxRecords: string[];
    nsRecords: string[];
  };

  ssl: {
    checked: boolean;
    valid: boolean;
    authorized: boolean;
    issuer: string;
    validFrom: string;
    validTo: string;
    daysRemaining: number | null;
  };

  http: {
    reachable: boolean;
    status: number | null;
    finalUrl: string;
    title: string;
    description: string;
    hasSecurityHeaders: boolean;
    securityHeaders: string[];
    socialLinks: string[];
  };
};

export type CompetitorInsight = {
  source: "serpapi" | "fallback";
  query: string;
  count: number;
  competitors: {
    title: string;
    link: string;
    snippet: string;
  }[];
};

export type ValidationReport = {
  domainAnalysis: DomainAnalysis;
  scores: ValidationScores;
  verdict: string;
  riskLevel: string;
  marketSignal: string;
  competitionLevel: string;
  proofQuality: string;
  concepts: StartupConcept[];
  summary: string;
  domainRouletteAlignment: string;
  recommendations: string[];

  aiInsights?: AIInsights;
  liveSignals?: LiveDomainSignals;
  competitorInsight?: CompetitorInsight;
};

export type ValidationHistoryItem = {
  domain: string;
  verdict: string;
  opportunityScore: number;
  trustScore: number;
  updatedAt: string;
};


