import { StartupConcept } from "@/types/validation";

type StartupConceptsProps = {
  concepts: StartupConcept[];
};

export default function StartupConcepts({ concepts }: StartupConceptsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-cyan-400/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">Top Startup Concepts</h3>

        <button
          type="button"
          className="text-xs font-medium text-slate-400 transition hover:text-cyan-300"
        >
          View all
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {concepts.map((concept) => (
          <div
            key={concept.title}
            className="rounded-xl border border-white/10 bg-black/20 p-4 transition-all duration-200 hover:border-emerald-400/30 hover:bg-black/30"
          >
            <p className="text-sm font-semibold leading-5 text-white">
              {concept.title}
            </p>

            <p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">
              {concept.description}
            </p>

            <span className="mt-3 inline-block rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-300">
              {concept.status}
            </span>

            <div className="mt-5 text-right">
              <p className="text-xs text-slate-400">Score</p>
              <p className="text-xl font-bold text-emerald-300">
                {concept.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

