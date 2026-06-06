import { describe, it, expect } from "vitest";
import {
  computeStats,
  percentChangeBetween,
  summarizeSeries,
} from "@/lib/metrics";

describe("computeStats", () => {
  it("computes total, average, max, min and percent change", () => {
    const stats = computeStats([100, 150, 200]);
    expect(stats.total).toBe(450);
    expect(stats.average).toBe(150);
    expect(stats.max).toBe(200);
    expect(stats.min).toBe(100);
    expect(stats.percentChange).toBe(100);
  });

  it("returns zeros for an empty series", () => {
    expect(computeStats([])).toEqual({
      total: 0,
      average: 0,
      max: 0,
      min: 0,
      percentChange: 0,
    });
  });

  it("ignores non-finite values", () => {
    const stats = computeStats([10, NaN, Infinity, 30]);
    expect(stats.total).toBe(40);
    expect(stats.average).toBe(20);
    expect(stats.max).toBe(30);
    expect(stats.min).toBe(10);
  });

  it("handles a single-element series (no change)", () => {
    const stats = computeStats([42]);
    expect(stats.total).toBe(42);
    expect(stats.percentChange).toBe(0);
  });

  it("reports a negative percent change when the series declines", () => {
    const stats = computeStats([200, 150, 100]);
    expect(stats.percentChange).toBe(-50);
  });
});

describe("percentChangeBetween", () => {
  it("computes positive growth", () => {
    expect(percentChangeBetween(100, 125)).toBe(25);
  });

  it("computes a decline", () => {
    expect(percentChangeBetween(80, 60)).toBeCloseTo(-25);
  });

  it("returns 0 when the base is zero", () => {
    expect(percentChangeBetween(0, 50)).toBe(0);
  });

  it("returns 0 for non-finite inputs", () => {
    expect(percentChangeBetween(NaN, 10)).toBe(0);
    expect(percentChangeBetween(10, Infinity)).toBe(0);
  });
});

describe("summarizeSeries", () => {
  it("builds a labelled summary using the series total", () => {
    const summary = summarizeSeries("Revenue", [100, 150, 200]);
    expect(summary.label).toBe("Revenue");
    expect(summary.value).toBe(450);
    expect(summary.percentChange).toBe(100);
  });
});
