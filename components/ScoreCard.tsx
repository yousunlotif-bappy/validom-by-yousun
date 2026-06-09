import { LucideIcon } from "lucide-react";

/*
  Props for the ScoreCard component.

  This component is reusable.
  You can use it for different dashboard stats like:
  - Validation Score
  - Trust Score
  - Market Fit
  - Launch Readiness
*/
type ScoreCardProps = {
  title: string;
  value: string;
  subtitle: string;
  footer: string;
  icon: LucideIcon;
};

export default function ScoreCard({
  title,
  value,
  subtitle,
  footer,
  icon: Icon,
}: ScoreCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-500/5">
      {/* Card Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
          <Icon size={20} className="text-emerald-300" />
        </div>

        <p className="font-semibold text-white">{title}</p>
      </div>

      {/* Main Score / Value */}
      <p className="text-4xl font-bold tracking-tight text-white">{value}</p>

      {/* Short explanation under the score */}
      <p className="mt-2 text-sm text-slate-300">{subtitle}</p>

      {/* Footer insight */}
      <div className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-emerald-300">
        {footer}
      </div>
    </div>
  );
}

