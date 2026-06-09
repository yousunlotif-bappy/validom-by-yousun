import { ValidationReport } from "@/types/validation";

/*
  LaunchKit is the Devpost-ready content package.
*/
export type LaunchKit = {
  projectName: string;
  elevatorPitch: string;
  inspiration: string;
  whatItDoes: string;
  howWeBuiltIt: string;
  challenges: string;
  accomplishments: string;
  whatsNext: string;
  demoVideoScript: string;
  landingPageCopy: string;
};

/*
  Generates a launch kit from the latest Validom report.

  Phase 4 upgrade:
  - uses AI insight if available
  - makes the Devpost story stronger
*/
export function generateLaunchKit(report: ValidationReport): LaunchKit {
  const domain = report.domainAnalysis.domain;
  const topConcept = report.concepts[0];
  const ai = report.aiInsights;

  return {
    projectName: "Validom by Yousun",

    elevatorPitch: `Validom by Yousun turns a random domain like ${domain} into a validated startup opportunity by analyzing trust signals, brand strength, market demand, proof quality, competitor context, AI strategic insights, and launch readiness.`,

    inspiration: `Domain Roulette flips the normal startup process. Instead of starting with an idea and searching for a domain later, the builder starts with a domain first. We built Validom to support that exact domain-first workflow. The domain ${domain} becomes the foundation for product direction, validation logic, market positioning, and launch strategy.`,

    whatItDoes: `Validom takes a domain and generates a complete validation report. It analyzes domain structure, trust score, brand score, market signals, proof quality, competitor context, startup concepts, opportunity score, and a final Validom Verdict. When AI insights are available, Validom also generates strategic explanations for trust, market, proof, competitors, and domain-product fit.`,

    howWeBuiltIt: `We built Validom using Next.js, TypeScript, Tailwind CSS, Lucide icons, a custom scoring engine, local report storage, and an AI insight layer. The system normalizes domain input, analyzes the domain, calculates validation scores, generates startup concepts, adds AI strategic analysis, and turns the result into a full report and launch kit.`,

    challenges: `The biggest challenge was making Validom deeply connected to Domain Roulette instead of becoming a generic domain checker. We solved this by designing a domain-first workflow: Domain → Idea → Research → Trust → Proof → Verdict → Launch.`,

    accomplishments: `We created a working prototype that transforms a random domain into a structured startup validation report and launch kit. Validom combines a scoring engine with AI-generated strategic insights. Validom does not just use a domain; it turns the domain into the product strategy.`,

    whatsNext: `Next, we plan to add live WHOIS/domain-age checks, AI-powered web research, competitor search, downloadable PDF reports, team collaboration, and domain purchase recommendations.`,

    demoVideoScript: `Most startups begin with an idea and search for a domain later. Domain Roulette flips that process.

We built Validom by Yousun, a domain-first startup validation platform.

A user enters a random domain such as ${domain}. Validom analyzes domain meaning, trust signals, brand strength, market demand, competitors, proof quality, and startup potential.

It then generates AI strategic analysis explaining why this domain fits the product, what market signals matter, and what proof is still needed.

For ${domain}, the current verdict is ${report.verdict} with an opportunity score of ${report.scores.opportunityScore}/100.

Finally, Validom creates a Devpost-ready Launch Kit including elevator pitch, inspiration, what it does, how we built it, and a demo video script.

Validom turns Domain Roulette from random guessing into validated startup building.`,

    landingPageCopy: `Validate smarter. Build with confidence.

Validom by Yousun helps founders, hackathon builders, and domain buyers validate a domain before they trust, buy, or build.

Enter a domain like ${domain} and get trust signals, brand strength, market insight, proof quality, AI strategy, opportunity score, startup concepts, and a launch-ready verdict.

Selected concept: ${topConcept?.title || "Domain-first startup concept"}
${topConcept?.description || "A startup direction generated from the analyzed domain."}

AI insight:
${ai?.domainFitAnalysis || report.domainRouletteAlignment}`,
  };
}


