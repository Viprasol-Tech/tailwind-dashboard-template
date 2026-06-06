/**
 * Series transforms for charts and tables. Pure, dependency-free, fully
 * unit-tested. These power the SVG mini-charts and the filterable table.
 */

/** A single (x, y) point in normalized SVG coordinate space. */
export interface Point {
  x: number;
  y: number;
}

/** Inclusive numeric range. */
export interface Range {
  min: number;
  max: number;
}

/**
 * Compute the inclusive [min, max] range of a series.
 *
 * Non-finite values are ignored. An empty (or all-invalid) series returns
 * `{ min: 0, max: 0 }` so downstream math never divides by NaN.
 */
export function range(series: readonly number[]): Range {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));
  if (clean.length === 0) {
    return { min: 0, max: 0 };
  }
  let min = clean[0]!;
  let max = clean[0]!;
  for (const n of clean) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return { min, max };
}

/**
 * Linearly map a value from one range to another.
 *
 * If the source range has zero width, the destination midpoint is returned
 * so a flat series renders centered instead of collapsing to one edge.
 *
 * @example normalize(5, 0, 10, 0, 100) // 50
 */
export function normalize(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (!Number.isFinite(value)) return outMin;
  const span = inMax - inMin;
  if (span === 0) {
    return (outMin + outMax) / 2;
  }
  const t = (value - inMin) / span;
  return outMin + t * (outMax - outMin);
}

/**
 * Clamp a number into the inclusive [min, max] interval.
 *
 * @example clamp(12, 0, 10) // 10
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Project a numeric series onto a fixed-size SVG viewport.
 *
 * X is evenly distributed across `[padding, width - padding]`; Y is inverted
 * (SVG's origin is top-left) and mapped from the series range onto
 * `[padding, height - padding]`. The result is ready to feed into a
 * polyline or a set of `<rect>` bars.
 */
export function toSvgPoints(
  series: readonly number[],
  width: number,
  height: number,
  padding = 0,
): Point[] {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));
  if (clean.length === 0) return [];

  const { min, max } = range(clean);
  const innerW = Math.max(0, width - padding * 2);
  const innerH = Math.max(0, height - padding * 2);

  if (clean.length === 1) {
    return [{ x: padding + innerW / 2, y: padding + innerH / 2 }];
  }

  return clean.map((value, index) => {
    const x = padding + (innerW * index) / (clean.length - 1);
    // Invert Y so larger values sit higher on screen.
    const y = padding + innerH - normalize(value, min, max, 0, innerH);
    return { x, y };
  });
}

/**
 * Build an SVG `points` attribute string from a list of points.
 *
 * @example toPolylinePoints([{ x: 0, y: 1 }, { x: 2, y: 3 }]) // "0,1 2,3"
 */
export function toPolylinePoints(points: readonly Point[]): string {
  return points
    .map((p) => `${round(p.x)},${round(p.y)}`)
    .join(" ");
}

/**
 * Trailing simple moving average of a series.
 *
 * The first `window - 1` points use as many prior values as are available,
 * so the output always has the same length as the input. A window <= 1
 * returns a copy of the input. Non-finite values are dropped first.
 */
export function movingAverage(series: readonly number[], window: number): number[] {
  const clean = (series ?? []).filter((n) => Number.isFinite(n));
  if (window <= 1) return [...clean];

  const out: number[] = [];
  let sum = 0;
  const buffer: number[] = [];
  for (const value of clean) {
    buffer.push(value);
    sum += value;
    if (buffer.length > window) {
      sum -= buffer.shift()!;
    }
    out.push(sum / buffer.length);
  }
  return out;
}

/**
 * Cumulative running total of a series.
 *
 * @example cumulativeSum([1, 2, 3]) // [1, 3, 6]
 */
export function cumulativeSum(series: readonly number[]): number[] {
  let running = 0;
  return (series ?? [])
    .filter((n) => Number.isFinite(n))
    .map((n) => (running += n));
}

/**
 * Round to a fixed number of decimal places, stripping trailing zeros.
 *
 * Used to keep generated SVG coordinate strings compact.
 *
 * @example round(1.23456) // 1.23
 * @example round(2) // 2
 */
export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
