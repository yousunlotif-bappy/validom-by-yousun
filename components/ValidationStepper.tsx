/*
  Validation process steps for Validom.

  This stepper shows the full journey:
  from entering a domain to getting a final launch-ready verdict.
*/
const validationSteps = [
  {
    number: "1",
    title: "Domain",
    description: "Define focus",
  },
  {
    number: "2",
    title: "Idea",
    description: "Shape concept",
  },
  {
    number: "3",
    title: "Research",
    description: "Market intelligence",
  },
  {
    number: "4",
    title: "Trust",
    description: "Credibility check",
  },
  {
    number: "5",
    title: "Proof",
    description: "Evidence & traction",
  },
  {
    number: "6",
    title: "Verdict",
    description: "AI evaluation",
  },
  {
    number: "7",
    title: "Launch",
    description: "Go to market",
  },
];

export default function ValidationStepper() {
  return (
    <div className="my-5 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-7">
      {validationSteps.map((step) => (
        <div
          key={step.number}
          className="flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-white/5"
        >
          {/* Step Number */}
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-yellow-400/50 bg-black/30 font-bold text-yellow-300">
            {step.number}
          </div>

          {/* Step Title and Short Description */}
          <div>
            <p className="text-sm font-semibold text-white">{step.title}</p>
            <p className="text-xs text-slate-400">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


