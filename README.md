# Validom by Yousun

**Validom by Yousun** is an AI-powered domain-first startup validation engine that turns random domains into evidence-backed, trust-scored, launch-ready startup opportunities.

Validom helps builders move from:

```text
Domain → Idea → Research → Trust → Proof → Verdict → Launch
```

Live Demo: https://validom-by-yousun.vercel.app/  
GitHub: https://github.com/yousunlotif-bappy/validom-by-yousun

---

## Problem

Most founders, hackathon builders, and domain buyers start with a domain or idea, but they do not know whether it is trustworthy, marketable, or worth building.

A random domain alone does not answer:

- Is this domain brandable?
- Is the domain technically trustworthy?
- Is there a clear startup direction?
- Is there real market potential?
- Are there competitors?
- Is there enough proof to build?
- Should the team build, pivot, or avoid?

**Validom solves this problem by turning a domain into a structured validation report and launch kit.**

---

## Solution

Validom analyzes a domain and generates a complete startup validation report using scoring logic, live domain signals, competitor context, AI strategic analysis, and launch-ready content.

Instead of simply checking whether a domain exists, Validom asks:

> Can this domain become a real startup opportunity?

---

## What Validom Does

Validom generates:

- Domain structure analysis
- Brand quality scoring
- Trust and risk scoring
- Market signal evaluation
- Competitor intelligence
- Live DNS / SSL / HTTP checks
- Evidence and claim verification
- AI strategic analysis
- Startup concept generation
- Build / Pivot / Avoid style verdict
- Full validation report
- Devpost-ready launch kit
- Demo video script
- Downloadable PDF report

---

## Why It Fits Domain Roulette

Domain Roulette reverses the normal startup process.

Usually, founders start with an idea and then search for a domain. In Domain Roulette, builders start with a random domain and must create a product around it.

Validom is built exactly for that challenge.

It takes any random domain and turns it into a validated startup opportunity through:

- Domain analysis
- Market research
- Trust scoring
- Competitor context
- Proof verification
- AI strategy
- Launch kit generation

The domain is not just a name. In Validom, the domain becomes the starting point, strategy layer, validation engine, and final launch story.

**Best pitch line:**

> Validom does not just use a domain; it turns the domain into the product strategy.

---

## Core Workflow

```text
1. Enter a domain
2. Analyze domain structure
3. Check trust and risk signals
4. Scan technical domain health
5. Evaluate market opportunity
6. Review competitor context
7. Verify evidence and claims
8. Generate startup concepts
9. Calculate opportunity score
10. Produce Build / Pivot / Avoid verdict
11. Generate full report
12. Create launch kit
```

---

## Main Features

### 1. Domain Analyzer

Validom extracts and evaluates:

- Domain name
- Extension
- Length
- Brand clarity
- Startup fit
- Structural issues
- Domain Roulette alignment

---

### 2. Scoring Engine

Validom calculates key scores:

- Trust Score
- Brand Score
- Market Score
- Proof Score
- Domain Fit Score
- Opportunity Score

The scoring model is explainable through a built-in **How Scoring Works** section.

---

### 3. Live Technical Signals

Validom checks real technical signals such as:

- DNS records
- SSL certificate status
- HTTP reachability
- Security headers
- Website metadata
- Social links when available

These signals help make the validation feel more evidence-based and less like a simple AI text generator.

---

### 4. Competitor Intelligence

Validom provides competitor context using search-based or baseline competitor scanning.

It helps users understand:

- Existing market players
- Competition level
- Market positioning
- Possible opportunity gaps

---

### 5. Evidence / Claim Verification

Validom includes a claim verification table that connects major claims to visible signals.

Example:

| Claim | Evidence Type | Source / Signal | Confidence | Status |
|---|---|---|---:|---|
| Domain is reachable | HTTP check | Live domain scan | 92% | Verified |
| SSL is active | Security check | TLS scan | 95% | Verified |
| Market demand exists | Market signal | AI + scoring engine | 84% | Likely |
| Brand fit is strong | Rule + AI analysis | Domain intelligence | 88% | Verified |

This helps judges understand why Validom’s verdict is not random.

---

### 6. AI Strategic Analysis

Validom uses AI to generate:

- Trust analysis
- Brand analysis
- Market analysis
- Competitor analysis
- Proof analysis
- Domain fit analysis
- Final verdict explanation
- Improved recommendations

---

### 7. Judge Mode

Validom includes a judge-focused explanation panel showing:

- Problem
- Solution
- Why it matters
- Challenge fit
- Demo path

This makes the project easier to understand during judging.

---

### 8. Agent Workflow

Validom is structured as a validation pipeline:

```text
Domain Decoder Agent
↓
Idea Architect Agent
↓
Market Research Agent
↓
Trust & Risk Agent
↓
Proof Verifier Agent
↓
Verdict Agent
↓
Launch Kit Agent
```

Each agent handles one part of the domain-first startup validation process.

---

### 9. Full Report Page

The full report includes:

- Domain overview
- Score breakdown
- Scoring transparency
- Evidence verification
- Live technical signals
- Competitor intelligence
- AI strategic analysis
- Startup concepts
- Domain Roulette alignment
- Agent workflow
- Recommendations

---

### 10. Launch Kit Generator

Validom generates copy-ready launch material:

- Project name
- Elevator pitch
- Inspiration
- Problem
- Solution
- MVP features
- Built with
- Challenges
- What’s next
- Demo video script
- Devpost-ready pitch content

---

## Built With

- Next.js
- TypeScript
- Tailwind CSS
- Gemini API
- DNS / SSL / HTTP checks
- SerpAPI-ready competitor search
- jsPDF
- Vercel

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=
SERPAPI_API_KEY=
```

### Required

```env
GEMINI_API_KEY=
```

Used for AI strategic insights.

### Optional

```env
SERPAPI_API_KEY=
```

Used for enhanced competitor search.

If API keys are not available, Validom can still run with safe baseline insights for demo reliability.

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

---

## Build Test

Before deployment, run:

```bash
npm run build
```

If the build passes, the app is ready for deployment.

---

## Deployment

The project is deployed on Vercel:

```text
https://validom-by-yousun.vercel.app/
```

---

## Demo Flow

Use this flow during judging:

```text
1. Open the dashboard
2. Enter a domain like startup.delivery
3. Click Start Validation
4. Show the loading validation steps
5. Review score cards
6. Open How Scoring Works
7. Show live signals
8. Show competitor intelligence
9. Show evidence verification table
10. Show Judge Mode
11. Open the full report
12. Generate the launch kit
13. End with the final pitch line
```

Final demo line:

> Validom does not just use a domain; it turns the domain into the product strategy.

---

## Example Domains To Test

```text
validom.com
startup.delivery
studybuddy.io
greenlease.com
trustlaunch.ai
```

---

## Project Structure

```text
app/
  api/
    analyze-domain/
      route.ts
  launch-kit/
    page.tsx
  report/
    page.tsx
  layout.tsx
  page.tsx

components/
  AgentWorkflow.tsx
  CompetitorPanel.tsx
  Dashboard.tsx
  DownloadReportButton.tsx
  EvidenceTable.tsx
  HeroSection.tsx
  JudgeMode.tsx
  LaunchKit.tsx
  LaunchKitPage.tsx
  LiveSignalsPanel.tsx
  RecentValidations.tsx
  ReportPage.tsx
  ReportSection.tsx
  ScoreCard.tsx
  ScoringExplainer.tsx
  Sidebar.tsx
  StartupConcepts.tsx
  Topbar.tsx
  ValidationStepper.tsx
  VerdictPanel.tsx

lib/
  ai-insights.ts
  competitor-search.ts
  domain-utils.ts
  launch-kit-generator.ts
  live-score-adjustments.ts
  live-signals.ts
  report-storage.ts
  sample-data.ts
  scoring.ts
  validation-history.ts

types/
  validation.ts
```

---

## What Makes Validom Different

Most tools only check domains or generate startup ideas.

Validom combines both.

It turns the domain itself into the starting point for:

- Product strategy
- Market reasoning
- Trust analysis
- Proof verification
- Launch planning

That makes it especially useful for hackathons, indie builders, and domain-first startup exploration.

---

## Limitations

Validom is an early-stage validation assistant, not a final investment or legal decision tool.

Current limitations:

- WHOIS/domain age analysis is not included yet
- Competitor intelligence depends on available search context
- Scoring formula is custom and designed for early-stage validation
- Recent validation history uses browser storage
- User accounts and team workspaces are not included yet

These are planned areas for future improvement.

---

## Future Roadmap

Planned improvements:

- WHOIS and domain age analysis
- Deeper live web extraction
- Trend and keyword demand data
- Team workspaces
- Saved cloud reports
- Investor-ready report export
- Domain monitoring
- Stronger competitor benchmarking
- Shareable public report links
- Premium pitch deck generator

---

## Hackathon Pitch

Validom by Yousun is an AI-powered domain-first startup validation engine.

It helps builders turn random domains into evidence-backed startup opportunities by analyzing domain fit, trust signals, market potential, competitor context, proof quality, and launch readiness.

The final output is not just a score. Validom produces a full validation report, startup concepts, a verdict, and a Devpost-ready launch kit.

---

## Author

Built by **Yousun**

Project: **Validom by Yousun**

---

## License

This project is created for hackathon and educational purposes.

