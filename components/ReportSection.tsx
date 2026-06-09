import { ReactNode } from "react";

/*
  Reusable report section wrapper.

  This keeps the full report page clean and consistent.
*/
type ReportSectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ReportSection({
  title,
  subtitle,
  children,
}: ReportSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-cyan-400/20">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p>
        )}
      </div>

      {children}
    </section>
  );
}


