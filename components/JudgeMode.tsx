/*
  JudgeMode explains the project in judge language.

  This makes your contest alignment obvious:
  - problem
  - solution
  - why it matters
  - challenge fit
  - demo path
*/
export default function JudgeMode() {
  return (
    <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5 transition-all duration-200 hover:border-purple-400/30">
      <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
        Judge Mode
      </p>

      <h3 className="mt-3 text-xl font-bold text-white">
        Why this project deserves attention
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <JudgeCard
          title="Problem"
          text="Founders and hackathon teams waste time building ideas without validating domain fit, market demand, trust, and launch readiness."
        />

        <JudgeCard
          title="Solution"
          text="Validom validates a domain-first startup concept using AI strategy, trust scoring, live domain signals, competitor context, and proof verification."
        />

        <JudgeCard
          title="Why it matters"
          text="It helps builders decide whether to build, pivot, or avoid before investing time into a weak idea."
        />

        <JudgeCard
          title="Challenge fit"
          text="Validom is built for Domain Roulette because it starts with the domain first and turns that domain into the product strategy."
        />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-white">Demo path:</span> Enter a
        domain → run validation → review score → open full report → generate
        launch kit.
      </div>
    </div>
  );
}

function JudgeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="font-semibold text-purple-200">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}


