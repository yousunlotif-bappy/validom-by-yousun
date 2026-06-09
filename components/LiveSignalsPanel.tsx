import { LiveDomainSignals } from "@/types/validation";

/*
  LiveSignalsPanel shows real technical domain signals.

  This makes Validom feel much more credible than a static scoring app.
*/
type LiveSignalsPanelProps = {
  signals?: LiveDomainSignals;
};

export default function LiveSignalsPanel({ signals }: LiveSignalsPanelProps) {
  if (!signals) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
      <h3 className="font-semibold text-emerald-200">
        Live Domain Signals
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        Checked at {new Date(signals.checkedAt).toLocaleString()}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <SignalGroup
          title="DNS"
          items={[
            ["A Records", signals.dns.hasARecords],
            ["MX Records", signals.dns.hasMxRecords],
            ["SPF Record", signals.dns.hasSpfRecord],
            ["DMARC Record", signals.dns.hasDmarcRecord],
            ["CAA Record", signals.dns.hasCaaRecord],
          ]}
        />

        <SignalGroup
          title="SSL"
          items={[
            ["SSL Checked", signals.ssl.checked],
            ["Certificate Valid", signals.ssl.valid],
            ["Authorized", signals.ssl.authorized],
          ]}
          note={
            signals.ssl.daysRemaining !== null
              ? `${signals.ssl.daysRemaining} days remaining`
              : "Expiry unavailable"
          }
        />

        <SignalGroup
          title="Website"
          items={[
            ["Reachable", signals.http.reachable],
            ["Security Headers", signals.http.hasSecurityHeaders],
            ["Title Found", Boolean(signals.http.title)],
            ["Social Links", signals.http.socialLinks.length > 0],
          ]}
          note={
            signals.http.status
              ? `HTTP status: ${signals.http.status}`
              : "No HTTP response"
          }
        />
      </div>
    </div>
  );
}

function SignalGroup({
  title,
  items,
  note,
}: {
  title: string;
  items: [string, boolean][];
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="mb-3 font-semibold text-white">{title}</p>

      <div className="space-y-2 text-sm">
        {items.map(([label, active]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-slate-400">{label}</span>

            <span
              className={
                active
                  ? "text-xs font-semibold text-emerald-300"
                  : "text-xs font-semibold text-red-300"
              }
            >
              {active ? "Yes" : "No"}
            </span>
          </div>
        ))}
      </div>

      {note && <p className="mt-3 text-xs text-slate-400">{note}</p>}
    </div>
  );
}

