/*
  JudgeMode is a contest-focused explanation block.

  This makes the Domain Roulette alignment obvious for judges:
  Validom starts with the domain first, then builds the startup strategy.
*/
export default function JudgeMode() {
  return (
    <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5 transition-all duration-200 hover:border-purple-400/30">
      <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
        Judge Mode
      </p>

      <h3 className="mt-3 text-xl font-bold text-white">
        Why this matches Domain Roulette
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-300">
        Validom starts with the domain first, then turns it into a startup
        concept, validation report, trust analysis, AI strategy, and launch kit.
        The selected domain is not just branding — it defines the product
        strategy.
      </p>

      <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-slate-300">
          Creative interpretation
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-slate-300">
          Technical execution
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-slate-300">
          Product polish
        </div>
      </div>
    </div>
  );
}


