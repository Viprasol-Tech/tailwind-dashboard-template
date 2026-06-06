import { toSvgPoints, toPolylinePoints, round } from "@/lib/series";
import { trend } from "@/lib/metrics";

export interface SparklineProps {
  /** Time-ordered numeric series (oldest first). */
  data: readonly number[];
  /** Viewport width in px. Defaults to 120. */
  width?: number;
  /** Viewport height in px. Defaults to 36. */
  height?: number;
  /** Stroke width in px. Defaults to 2. */
  strokeWidth?: number;
  /** Accessible label. Defaults to "Trend sparkline". */
  label?: string;
}

const TREND_STROKE: Record<ReturnType<typeof trend>, string> = {
  up: "text-emerald-500",
  down: "text-rose-500",
  flat: "text-slate-400",
};

/**
 * A compact line chart drawn from pure SVG — no chart library. The stroke
 * color reflects the overall trend (green up, red down, gray flat).
 */
export function Sparkline({
  data,
  width = 120,
  height = 36,
  strokeWidth = 2,
  label = "Trend sparkline",
}: SparklineProps) {
  const pad = strokeWidth;
  const points = toSvgPoints(data, width, height, pad);
  const polyline = toPolylinePoints(points);
  const direction = trend(data);
  const last = points[points.length - 1];

  if (points.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${label}: no data`}
        data-testid="sparkline-empty"
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      data-testid="sparkline"
      className={TREND_STROKE[direction]}
    >
      <polyline
        points={polyline}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {last ? (
        <circle
          cx={round(last.x)}
          cy={round(last.y)}
          r={strokeWidth}
          fill="currentColor"
        />
      ) : null}
    </svg>
  );
}

export default Sparkline;
