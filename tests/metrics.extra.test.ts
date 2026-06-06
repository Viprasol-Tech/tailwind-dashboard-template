import { describe, it, expect } from "vitest";
import { median, standardDeviation, trend } from "@/lib/metrics";

describe("median", () => {
  it("returns the middle value for odd-length series", () => {
    expect(median([3, 1, 2])).toBe(2);
  });

  it("averages the two central values for even-length series", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("ignores non-finite values", () => {
    expect(median([5, NaN, 1, Infinity, 3])).toBe(3);
  });

  it("returns 0 for an empty series", () => {
    expect(median([])).toBe(0);
  });

  it("does not mutate the input order", () => {
    const input = [3, 1, 2];
    median(input);
    expect(input).toEqual([3, 1, 2]);
  });
});

describe("standardDeviation", () => {
  it("computes population standard deviation", () => {
    // mean 4, variance ((4+1+0+1+4)/5)=2 -> sqrt(2)
    expect(standardDeviation([2, 3, 4, 5, 6])).toBeCloseTo(Math.sqrt(2));
  });

  it("returns 0 for a constant series", () => {
    expect(standardDeviation([7, 7, 7])).toBe(0);
  });

  it("returns 0 for fewer than two valid points", () => {
    expect(standardDeviation([42])).toBe(0);
    expect(standardDeviation([])).toBe(0);
  });
});

describe("trend", () => {
  it("detects an upward trend", () => {
    expect(trend([1, 2, 3])).toBe("up");
  });

  it("detects a downward trend", () => {
    expect(trend([3, 2, 1])).toBe("down");
  });

  it("treats a flat series as flat", () => {
    expect(trend([5, 5, 5])).toBe("flat");
  });

  it("treats tiny changes within epsilon as flat", () => {
    expect(trend([1000, 1000.5], 0.001)).toBe("flat");
  });

  it("returns flat for fewer than two points", () => {
    expect(trend([1])).toBe("flat");
  });
});
