import { formatPercent } from "@/lib/format";

export interface StatCardProps {
  /** Short metric name, e.g. "Revenue". */
  label: string;
  /** Pre-formatted display value, e.g. "$24,010". */
  value: string;
  /** Percent change versus the previous period (in percent units). */
  delta: number;
}

/**
 * A single KPI tile: label, big value, and a colored delta badge.
 */
export function StatCard({ label, value, delta }: StatCardProps) {
  const positive = delta >= 0;
  const deltaText = formatPercent(delta, { signed: true });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-slate-900" data-testid="stat-value">
          {value}
        </p>
        <span
          data-testid="stat-delta"
          className={
            "rounded-full px-2 py-0.5 text-xs font-semibold " +
            (positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")
          }
        >
          {deltaText}
        </span>
      </div>
    </div>
  );
}

export default StatCard;
