import { describe, it, expect } from "vitest";
import {
  range,
  normalize,
  clamp,
  toSvgPoints,
  toPolylinePoints,
  movingAverage,
  cumulativeSum,
  round,
} from "@/lib/series";

describe("range", () => {
  it("finds min and max", () => {
    expect(range([3, 1, 4, 1, 5, 9, 2])).toEqual({ min: 1, max: 9 });
  });

  it("ignores non-finite values", () => {
    expect(range([10, NaN, Infinity, 30])).toEqual({ min: 10, max: 30 });
  });

  it("returns zeros for an empty series", () => {
    expect(range([])).toEqual({ min: 0, max: 0 });
  });
});

describe("normalize", () => {
  it("maps a value linearly between ranges", () => {
    expect(normalize(5, 0, 10, 0, 100)).toBe(50);
  });

  it("returns the destination midpoint for a zero-width source", () => {
    expect(normalize(5, 5, 5, 0, 100)).toBe(50);
  });

  it("returns outMin for non-finite input", () => {
    expect(normalize(NaN, 0, 10, 0, 100)).toBe(0);
  });
});

describe("clamp", () => {
  it("clamps above the max", () => {
    expect(clamp(12, 0, 10)).toBe(10);
  });

  it("clamps below the min", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it("leaves in-range values untouched", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("toSvgPoints", () => {
  it("returns one point per value evenly spaced in x", () => {
    const points = toSvgPoints([0, 10], 100, 50);
    expect(points).toHaveLength(2);
    expect(points[0]!.x).toBe(0);
    expect(points[1]!.x).toBe(100);
  });

  it("inverts y so larger values are higher (smaller y)", () => {
    const points = toSvgPoints([0, 10], 100, 50);
    expect(points[1]!.y).toBeLessThan(points[0]!.y);
  });

  it("centers a single point", () => {
    const points = toSvgPoints([42], 100, 50);
    expect(points).toEqual([{ x: 50, y: 25 }]);
  });

  it("returns an empty array for no data", () => {
    expect(toSvgPoints([], 100, 50)).toEqual([]);
  });

  it("honors padding", () => {
    const points = toSvgPoints([0, 10], 100, 50, 5);
    expect(points[0]!.x).toBe(5);
    expect(points[1]!.x).toBe(95);
  });
});

describe("toPolylinePoints", () => {
  it("serializes points into an SVG points string", () => {
    expect(toPolylinePoints([{ x: 0, y: 1 }, { x: 2, y: 3 }])).toBe("0,1 2,3");
  });

  it("rounds coordinates", () => {
    expect(toPolylinePoints([{ x: 1.23456, y: 2 }])).toBe("1.23,2");
  });
});

describe("movingAverage", () => {
  it("computes a trailing average over the window", () => {
    expect(movingAverage([1, 2, 3, 4], 2)).toEqual([1, 1.5, 2.5, 3.5]);
  });

  it("uses available values for the leading edge", () => {
    expect(movingAverage([2, 4, 6], 3)).toEqual([2, 3, 4]);
  });

  it("returns a copy for window <= 1", () => {
    const input = [1, 2, 3];
    const out = movingAverage(input, 1);
    expect(out).toEqual([1, 2, 3]);
    expect(out).not.toBe(input);
  });

  it("drops non-finite values first", () => {
    expect(movingAverage([2, NaN, 4], 2)).toEqual([2, 3]);
  });
});

describe("cumulativeSum", () => {
  it("accumulates a running total", () => {
    expect(cumulativeSum([1, 2, 3])).toEqual([1, 3, 6]);
  });

  it("ignores non-finite values", () => {
    expect(cumulativeSum([1, Infinity, 2])).toEqual([1, 3]);
  });
});

describe("round", () => {
  it("rounds to two decimals by default", () => {
    expect(round(1.23456)).toBe(1.23);
  });

  it("leaves whole numbers intact", () => {
    expect(round(2)).toBe(2);
  });

  it("respects a custom precision", () => {
    expect(round(1.23456, 3)).toBe(1.235);
  });
});
