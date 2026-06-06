import { range, normalize, round } from "@/lib/series";

export interface BarChartProps {
  /** Numeric series; one bar per value. */
  data: readonly number[];
  /** Viewport width in px. Defaults to 240. */
  width?: number;
  /** Viewport height in px. Defaults to 120. */
  height?: number;
  /** Gap between bars in px. Defaults to 4. */
  gap?: number;
  /** Accessible label. Defaults to "Bar chart". */
  label?: string;
}

/**
 * A responsive bar chart rendered as pure SVG `<rect>` elements. Bars are
 * baseline-aligned and scaled so the tallest bar fills the viewport. Works in
 * both light and dark themes via `currentColor`.
 */
export function BarChart({
  data,
  width = 240,
  height = 120,
  gap = 4,
  label = "Bar chart",
}: BarChartProps) {
  const clean = data.filter((n) => Number.isFinite(n));

  if (clean.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label={`${label}: no data`}
        data-testid="barchart-empty"
      />
    );
  }

  const { min, max } = range(clean);
  // Anchor the baseline at zero when the data is non-negative, otherwise at min.
  const base = Math.min(0, min);
  const barWidth = (width - gap * (clean.length - 1)) / clean.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      data-testid="barchart"
      className="text-brand-500"
    >
      {clean.map((value, index) => {
        const top = height - normalize(value, base, max, 0, height);
        const bottom = height - normalize(base, base, max, 0, height);
        const y = round(Math.min(top, bottom));
        const barHeight = round(Math.max(1, Math.abs(bottom - top)));
        const x = round(index * (barWidth + gap));
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={round(barWidth)}
            height={barHeight}
            rx={2}
            fill="currentColor"
            data-testid="bar"
          />
        );
      })}
    </svg>
  );
}

export default BarChart;
