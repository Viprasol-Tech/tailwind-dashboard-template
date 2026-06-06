/**
 * Metric math for the dashboard. Pure, dependency-free, and unit-tested.
 */

export interface Stats {
  /** Sum of all points in the series. */
  total: number;
  /** Arithmetic mean of the series (0 for an empty series). */
  average: number;
  /** Largest value in the series (0 for an empty series). */
  max: number;
  /** Smallest value in the series (0 for an empty series). */
  min: number;
  /**
   * Percent change from the first to the last point of the series.
   * Returns 0 when there are fewer than two points or the first point is 0.
   */
  percentChange: number;
}

/**
 * Compute summary statistics over a numeric series.
 *
 * The series is typically a time-ordered list (oldest first), so
 * `percentChange` measures growth from the start to the end of the window.
 *
 * @throws never — invalid inputs are treated as an empty series.
 */
export function computeStats(series: readonly number[]): Stats {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));

  if (clean.length === 0) {
    return { total: 0, average: 0, max: 0, min: 0, percentChange: 0 };
  }

  let total = 0;
  let max = clean[0]!;
  let min = clean[0]!;
  for (const n of clean) {
    total += n;
    if (n > max) max = n;
    if (n < min) min = n;
  }

  const average = total / clean.length;
  const first = clean[0]!;
  const last = clean[clean.length - 1]!;
  const percentChange = percentChangeBetween(first, last);

  return { total, average, max, min, percentChange };
}

/**
 * Percent change from `from` to `to`.
 *
 * Returns 0 when `from` is 0 (change is undefined) so callers never see
 * Infinity/NaN leaking into the UI.
 *
 * @example percentChangeBetween(100, 125) // 25
 * @example percentChangeBetween(80, 60) // -25
 */
export function percentChangeBetween(from: number, to: number): number {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) {
    return 0;
  }
  return ((to - from) / Math.abs(from)) * 100;
}

/**
 * Build a ready-to-render stat-card descriptor from a labelled series.
 */
export interface StatSummary {
  label: string;
  value: number;
  percentChange: number;
}

export function summarizeSeries(label: string, series: readonly number[]): StatSummary {
  const { total, percentChange } = computeStats(series);
  return { label, value: total, percentChange };
}
