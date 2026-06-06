import { formatPercent } from "@/lib/format";
import Sparkline from "@/components/Sparkline";

export interface StatCardProps {
  /** Short metric name, e.g. "Revenue". */
  label: string;
  /** Pre-formatted display value, e.g. "$24,010". */
  value: string;
  /** Percent change versus the previous period (in percent units). */
  delta: number;
  /** Optional series to render as a sparkline beneath the value. */
  series?: readonly number[];
}

/**
 * A single KPI tile: label, big value, a colored delta badge, and an optional
 * trend sparkline. Dark-mode aware.
 */
export function StatCard({ label, value, delta, series }: StatCardProps) {
  const positive = delta >= 0;
  const deltaText = formatPercent(delta, { signed: true });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p
          className="text-2xl font-semibold text-slate-900 dark:text-slate-100"
          data-testid="stat-value"
        >
          {value}
        </p>
        <span
          data-testid="stat-delta"
          className={
            "rounded-full px-2 py-0.5 text-xs font-semibold " +
            (positive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300")
          }
        >
          {deltaText}
        </span>
      </div>
      {series && series.length > 0 ? (
        <div className="mt-3">
          <Sparkline data={series} label={`${label} trend`} />
        </div>
      ) : null}
    </div>
  );
}

export default StatCard;
