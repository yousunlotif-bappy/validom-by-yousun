import {
  Bot,
  Brain,
  Globe2,
  Search,
  ShieldCheck,
  BadgeCheck,
  Rocket,
} from "lucide-react";

/*
  AgentWorkflow explains Validom's system design.

  This is useful for hackathon judges because it shows the product
  is not only a dashboard. It has a modular validation pipeline.
*/
const agents = [
  {
    title: "Domain Decoder Agent",
    description: "Analyzes words, extension, tone, and brand fit.",
    icon: Globe2,
  },
  {
    title: "Idea Architect Agent",
    description: "Generates safe, creative, and startup-ready concepts.",
    icon: Brain,
  },
  {
    title: "Market Research Agent",
    description: "Checks market signals, competitors, and customer pain.",
    icon: Search,
  },
  {
    title: "Trust & Risk Agent",
    description: "Evaluates SSL, reachability, brand risk, and credibility.",
    icon: ShieldCheck,
  },
  {
    title: "Proof Verifier Agent",
    description: "Checks whether key claims have supporting evidence.",
    icon: BadgeCheck,
  },
  {
    title: "Verdict Agent",
    description: "Combines scores into a clear Build / Pivot / Avoid signal.",
    icon: Bot,
  },
  {
    title: "Launch Kit Agent",
    description: "Creates Devpost pitch, demo script, and launch assets.",
    icon: Rocket,
  },
];

export default function AgentWorkflow() {
  return (
    <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5 transition-all duration-200 hover:border-blue-400/30">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
        Validom Agent Workflow
      </p>

      <h3 className="mt-2 text-xl font-bold text-white">
        From random domain to launch-ready strategy
      </h3>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent, index) => {
          const Icon = agent.icon;

          return (
            <div
              key={agent.title}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Icon size={18} className="text-cyan-300" />
                </div>

                <span className="text-xs font-semibold text-yellow-300">
                  Agent {index + 1}
                </span>
              </div>

              <p className="font-semibold text-white">{agent.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {agent.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


