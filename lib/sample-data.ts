import { ValidationReport } from "@/types/validation";

export const defaultReport: ValidationReport = {
  domainAnalysis: {
    originalInput: "validom.com",
    domain: "validom.com",
    name: "validom",
    extension: ".com",
    length: 7,
    hasHyphen: false,
    hasNumber: false,
    wordCount: 1,
    isValid: true,
    issues: [],
  },
  scores: {
    trustScore: 92,
    brandScore: 90,
    marketScore: 84,
    proofScore: 87,
    domainFitScore: 95,
    opportunityScore: 90,
  },
  verdict: "High-Confidence Opportunity",
  riskLevel: "Low Risk",
  marketSignal: "Strong",
  competitionLevel: "Moderate competition",
  proofQuality: "High-quality proof",
  concepts: [
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
  ],
  summary:
    "Strong domain-product fit, clear market demand, and credible proof signals suggest this idea is ready to move from validation to build.",
  domainRouletteAlignment:
    "Validom was built from the domain first. The name combines valid and domain, so the product direction naturally connects to validation, trust, and startup readiness.",
  recommendations: [
    "Build a focused landing page around the strongest product concept.",
    "Use the domain meaning as the foundation of the product story.",
    "Collect more proof from users, competitors, and market signals.",
    "Prepare a Devpost launch kit with pitch, demo script, and screenshots.",
  ],
};


