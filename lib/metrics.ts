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

/**
 * Median (50th percentile) of a series.
 *
 * For an even number of points the mean of the two central values is used.
 * Non-finite values are ignored; an empty series returns 0.
 *
 * @example median([3, 1, 2]) // 2
 * @example median([1, 2, 3, 4]) // 2.5
 */
export function median(series: readonly number[]): number {
  const sorted = (series ?? []).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 0) return 0;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!;
}

/**
 * Population standard deviation of a series.
 *
 * Measures spread around the mean. Non-finite values are ignored; a series
 * with fewer than two valid points returns 0.
 */
export function standardDeviation(series: readonly number[]): number {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));
  if (clean.length < 2) return 0;
  const mean = clean.reduce((sum, n) => sum + n, 0) / clean.length;
  const variance =
    clean.reduce((sum, n) => sum + (n - mean) ** 2, 0) / clean.length;
  return Math.sqrt(variance);
}

/** Direction of a series over its window. */
export type Trend = "up" | "down" | "flat";

/**
 * Classify the overall direction of a series.
 *
 * Compares the first and last valid points. Differences within `epsilon`
 * (as a fraction of the starting magnitude) are treated as flat, so tiny
 * fluctuations don't flicker the UI between up and down.
 */
export function trend(series: readonly number[], epsilon = 0.001): Trend {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));
  if (clean.length < 2) return "flat";
  const first = clean[0]!;
  const last = clean[clean.length - 1]!;
  const threshold = Math.abs(first) * epsilon;
  if (last - first > threshold) return "up";
  if (first - last > threshold) return "down";
  return "flat";
}
